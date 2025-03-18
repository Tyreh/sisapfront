import PageContainer from "@/components/layout/page-container"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "@/components/ui/card";
import { secureFetch } from "@/secure-fetch";
import { IconBrandWhatsapp, IconCircleFilled, IconTrees } from "@tabler/icons-react";
import Reminder from "./reminder/reminder";

export default async function Page() {
  const userData = await secureFetch(`${process.env.API_URL}/apiUser/logged-user`);
  const loggedUsers = await secureFetch(`${process.env.API_URL}/apiUser/logged-users`);
  const projectData = await secureFetch(`${process.env.API_URL}/project`);
  const inExecutionProjects = projectData.data.filter(project => project.projectStatus.name == 'En ejecución').length;
  const completedProjects = projectData.data.filter(project => project.projectStatus.name == 'Completado').length;

  console.log(userData);
  return (
    <PageContainer>
      <div className="pb-10">
        <section className="py-12 px-6 w-full">
          <div className="w-full max-w-full mx-auto flex items-center gap-6">
            {/* Contenedor para el icono y el texto */}
            <div className="flex items-center gap-4 w-full">
              <IconTrees className="h-12 w-12 text-roble" />
              <h1 className="text-4xl font-bold text-roble">
                ¡Hola, <span className="text-acacia">{userData.data.fullName}</span>! Bienvenido a la Plataforma SISAP
              </h1>
            </div>
            <p className="text-xl text-gray-600 mt-4 w-full">
              Tu rol como <span className="text-acacia font-bold">Administrador</span> te permite gestionar los proyectos arraigados al
              Plan de Desarrollo Institucional de la Universidad El Bosque.
              Este plan guiará la gestión de la Universidad durante los próximos 3 años.
            </p>
          </div>
        </section>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full'>
          <Card className="col-span-full lg:col-span-1">
            <CardHeader className='flex flex-row items-center justify-center space-y-0 pb-2'>
              <CardTitle className='text-md font-semibold'>
                Último Inicio de Sesión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-sm text-center'>{userData.data.lastLogin}</div>
              <p className='text-xs text-muted-foreground text-center'>
                IP: {userData.data.lastIpLogin}
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-full lg:col-span-1">
            <CardHeader className='flex flex-row items-center justify-center space-y-0 pb-2'>
              <CardTitle className='text-md font-semibold'>
                Último Cambio de Contraseña
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-sm text-center'>{userData.data.lastPasswordModified || 'Nunca'}</div>
            </CardContent>
          </Card>
          <Card className="col-span-full lg:col-span-1">
            <CardHeader className='flex flex-row items-center justify-center space-y-0 pb-2'>
              <CardTitle className='text-md font-semibold'>Dependencia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-sm text-center'>{userData.data.dependency || 'Sin Asignar'}</div>
            </CardContent>
          </Card>

          <Reminder apiUserId={userData.data.id} />

          {/* Tarjeta de Usuarios Activos alineada a la derecha */}
          <Card className="col-span-full lg:col-span-1">
            <CardHeader>
              <CardTitle>Usuarios Activos</CardTitle>
              <CardDescription>Aquí puedes ver la lista de usuarios que están actualmente en línea</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-8'>
                {loggedUsers.data.map((loggedUser, index) =>
                  <div key={index} className='flex items-center'>
                    <Avatar className='h-9 w-9'>
                      <AvatarFallback>{`${loggedUser.firstName?.charAt(0)}${loggedUser.lastName?.charAt(0)}`}</AvatarFallback>
                    </Avatar>

                    <div className='ml-4 space-y-1'>
                      <p className='text-sm font-medium leading-none'>{loggedUser.firstName?.split(' ')[0]} {loggedUser.lastName?.split(' ')[0]}</p>
                      <p className='text-sm text-muted-foreground'>
                        {loggedUser.email}
                      </p>
                    </div>
                    <div className='ml-auto font-medium'><IconCircleFilled className="w-4 h-4 text-green-600" /></div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-full lg:col-span-1">
            <CardHeader className='flex flex-row items-center justify-center space-y-0 pb-2'>
              <CardTitle className='text-md font-semibold'>Proyectos Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-sm text-center'>{projectData.data.length}</div>
            </CardContent>
          </Card>

          <Card className="col-span-full lg:col-span-1">
            <CardHeader className='flex flex-row items-center justify-center space-y-0 pb-2'>
              <CardTitle className='text-md font-semibold'>Proyectos en Ejecución</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-sm text-center'>{inExecutionProjects}</div>
            </CardContent>
          </Card>

          <Card className="col-span-full lg:col-span-1">
            <CardHeader className='flex flex-row items-center justify-center space-y-0 pb-2'>
              <CardTitle className='text-md font-semibold'>Proyectos Finalizados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-sm text-center'>{completedProjects}</div>
            </CardContent>
          </Card>

          <div className="col-span-full">
            <h2 className="text-2xl font-bold mb-6 text-roble">Tus Proyectos</h2>
          </div>

          {projectData.data.map((project, index) =>
            <Card key={index} className="col-span-full lg:col-span-1">
              <CardHeader className='flex flex-row items-center justify-center space-y-0 pb-2'>
                <CardTitle className='text-md font-semibold'>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-center'>Estado: {project.projectStatus.name}</div>
              </CardContent>
            </Card>

          )}

          <Card className="col-span-full">
            <CardHeader className='flex flex-row items-center justify-center space-y-0 pb-2'>
              <CardTitle className='text-md font-semibold'>Universidad El Bosque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Instalaciones Bogotá */}
                  <div>
                    <div className="flex items-start gap-4">
                      <img
                        src="/infraImg1.png"
                        alt="Instalaciones Bogotá Icon"
                        className="w-12 h-12"
                      />
                      <div>
                        <p className="mb-2 font-bold text-lg">Instalaciones Bogotá</p>
                        <p>Av. Cra. 9 No. 131 A - 02</p>
                        <p>Línea gratuita:<br />
                          <strong>018000 113033</strong>
                        </p> <br />
                        <p>PBX: <br /> <strong>(601) 648 9000</strong></p>
                      </div>
                    </div>
                  </div>

                  {/* Instalaciones Chía */}
                  <div>
                    <div className="flex items-start gap-4">
                      <img
                        src="/infraImg2.png"
                        alt="Instalaciones Chía Icon"
                        className="w-12 h-12"
                      />
                      <div>
                        <p className="mb-2 font-bold text-lg">Instalaciones Chía</p>
                        <p>Autopista Norte Km. 20 costado occidental Vía Chía - Bogotá</p> <br />
                        <p>Teléfono: <br /> <strong>(601) 676 3110</strong></p> <br />
                        <p>Línea gratuita: <br />  <strong>018000 113033</strong></p> <br />
                        <p>PBX: <br /> <strong>(601) 648 9000</strong></p>
                      </div>
                    </div>
                  </div>

                  {/* Admisiones */}
                  <div>
                    <p className="mb-2 font-bold text-lg">Admisiones</p>
                    <p>PBX: <br /> <strong>(601) 648 9000</strong></p> <br />
                    <p>Línea gratuita: <br />  <strong>018000 113033</strong></p> <br />
                    <p>Edificio Fundadores</p>
                    <p>Av. Cra. 9 No. 131 A - 02</p>
                    <p>Correo electrónico: <a href="mailto:atencionalusuario@unbosque.edu.co" className="underline">atencionalusuario@unbosque.edu.co</a></p>
                    <p className="mt-4 flex items-center gap-2 text-lg">
                      <IconBrandWhatsapp size={24} />
                      <a href="https://wa.me/573115128420" className="font-bold underline">
                        +57 311 5128420
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


      </div>
    </PageContainer>
  )
}
