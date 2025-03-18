import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { secureFetch } from "@/secure-fetch";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Home() {
  const strategicLines = await secureFetch(`${process.env.API_URL}/strategicLine`);
  const projects = await secureFetch(`${process.env.API_URL}/project`);

  return (
    <PageContainer>
      <div className="w-full">
        <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-sm">
          <Image src="/logoUebH.png" alt="Logo de la empresa" width={150} height={50} />
          <Button asChild className="text-white py-2 px-4 rounded hover:bg-acacia">
            <Link href="/auth/login">Iniciar sesión</Link>
          </Button>
        </nav>

        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto flex items-center gap-6">

            <img
              src="/ImgInitialSection.png"
              alt="Descripción de la imagen" width={450} height={100}
            />

            <div>
              <h1 className="text-4xl font-bold mb-4 text-roble">Proyectos de la Universidad El Bosque</h1>
              <p className="text-xl text-gray-600">
                La Universidad El Bosque está comprometida con su crecimiento, es por ello que los proyectos
                arraigados a El Plan de Desarrollo Institucional PDI de la Universidad El Bosque, se constituye
                como la hoja de ruta que guiará la gestión de la Universidad para los próximos 6 años
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-roble">Indicadores y Categorías de proyectos</h2>


            <p className="text-center mb-8 text-gray-600">
              Teniendo en cuenta el contexto económico, social y de salud pública en el que se encuentra
              inmersa la Educación Superior en Colombia y mediante la definición de los aspectos de interés
              estratégicos, se ha dado paso a los componentes del PDI que facilitarán su apropiación,
              entendimiento y ejecución. En este marco, se conciben 5 líneas centrales que están directamente
              relacionadas con las funciones misionales y 2 transversales que permean a toda la actividad de
              la Institución.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {strategicLines.data.map((strategicLine, index) => (
                <div
                  key={index}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${index < 5
                    ? "bg-primary text-primary-foreground hover:bg-eucalipto hover:text-white"
                    : "bg-primary text-primary-foreground hover:bg-green-600 hover:text-white"
                    }`}
                >
                  {strategicLine.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-roble">Nuestros Proyectos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.data.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">

                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-green-500 text-[#2b3427] py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Título general */}
            <h2 className="font-bold text-xl mb-6 text-center">Universidad El Bosque</h2>
            {/* Contenedor de las secciones */}
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
                      <strong className="text-[#ffffff]">018000 113033</strong>
                    </p> <br />
                    <p>PBX: <br /> <strong className="text-[#ffffff]" >(601) 648 9000</strong></p>
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
                    <p>Teléfono: <br /> <strong className="text-[#ffffff]">(601) 676 3110</strong></p> <br />
                    <p>Línea gratuita: <br />  <strong className="text-[#ffffff]">018000 113033</strong></p> <br />
                    <p>PBX: <br /> <strong className="text-[#ffffff]">(601) 648 9000</strong></p>
                  </div>
                </div>
              </div>

              {/* Admisiones */}
              <div>
                <p className="mb-2 font-bold text-lg">Admisiones</p>
                <p>PBX: <br /> <strong className="text-[#ffffff]">(601) 648 9000</strong></p> <br />
                <p>Línea gratuita: <br />  <strong className="text-[#ffffff]">018000 113033</strong></p> <br />
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
        </footer>
      </div>
    </PageContainer>

  );
}