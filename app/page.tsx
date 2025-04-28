import React from "react";
import HeaderComponent from "./header-component";

export default async function Home() {
  let error = false;
  let projects;
  try {
    projects = await fetch(`${process.env.API_URL}/ecommerce/projects`);
    projects = await projects.json();
  } catch {
    error = true;
  }

  if (error) {
    return (
      <div className="leading-normal tracking-normal text-white bg-[linear-gradient(90deg,_#021913_0%,_#063f2e_100%)]">
        <HeaderComponent />
        <div className="pt-24">
          <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
              <h1 className="my-4 text-5xl font-bold leading-tight">
                Proyectos de la Universidad El Bosque
              </h1>
              <p className="leading-normal text-2xl mb-8">
                La Universidad El Bosque está comprometida con su crecimiento, es por ello que los proyectos arraigados a El Plan de Desarrollo Institucional PDI de la Universidad El Bosque, se constituye como la hoja de ruta que guiará la gestión de la Universidad para los próximos 6 años.
              </p>
            </div>
            <div className="w-full md:w-3/5 py-6 text-center">
              <img className="w-full md:w-4/5 z-50" src="draw3.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="relative -mt-12 lg:-mt-24">
          <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
                <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                ></path>
                <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
              </g>
              <g transform="translate(-4.000000, 76.000000)" fill="#FFFFFF" fillRule="nonzero">
                <path
                  d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <section className="bg-white border-b py-8">
          <div className="container max-w-5xl mx-auto m-8">
            <div className="flex flex-wrap">
              <div className="w-5/6 sm:w-1/2 p-6 justify-center items-center flex">
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                  No se pudo establecer conexión con el servidor, inténtalo más tarde.
                </h3>
              </div>
              <div className="w-full sm:w-1/2 p-6">
                <img src="./serverError.svg" alt="" />
              </div>
            </div>
          </div>
        </section>

        <svg className="wave-top" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
              <g className="wave" fill="#f8fafc">
                <path
                  d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"
                ></path>
              </g>
              <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
                <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                  <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                  <path
                    d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                    opacity="0.100000001"
                  ></path>
                  <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <footer className="container mx-auto text-center py-6">
          <div className="container mx-auto px-8">
            <div className="w-full flex flex-col md:flex-row py-6">
              <div className="flex-1">
                <p className="uppercase text-white md:mb-6">Instalaciones Bogotá</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <p>Av. Cra. 9 No. 131 A-02</p>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <p>Línea Gratuita:</p>
                    <a href="#" className="no-underline hover:underline text-white hover:text-[#ea7600]">018000 113033</a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <p>PBX:</p>
                    <a href="tel:6016489000" className="no-underline hover:underline text-white hover:text-[#ea7600]">(601) 648 9000</a>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="uppercase text-white md:mb-6">Instalaciones Chía</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <p>Autopista Norte Km. 20 costado occidental Vía Chía - Bogotá</p>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <p>Línea Gratuita:</p>
                    <a href="#" className="no-underline hover:underline text-white hover:text-[#ea7600]">018000 113033</a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <p>PBX:</p>
                    <a href="tel:6016489000" className="no-underline hover:underline text-white hover:text-[#ea7600]">(601) 648 9000</a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <p>Teléfono:</p>
                    <a href="tel:6016763110" className="no-underline hover:underline text-white hover:text-[#ea7600]">(601) 676 3110</a>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="uppercase text-white md:mb-6">Admisiones</p>
                <ul className="list-reset mb-6">
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <p>PBX:</p>
                    <a href="tel:6016489000" className="no-underline hover:underline text-white hover:text-[#ea7600]">(601) 648 9000</a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <p>Línea Gratuita:</p>
                    <a href="#" className="no-underline hover:underline text-white hover:text-[#ea7600]">018000 113033</a>
                  </li>
                  <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                    <p>Edificio Fundadores:</p>
                    <p>Av. Cra 9 No. 131 A - 02</p>
                    <a href="email:atencionalusuario@unbosque.edu.co" className="no-underline hover:underline text-white hover:text-[#ea7600]">atencionalusuario@unbosque.edu.co</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="leading-normal tracking-normal text-white bg-[linear-gradient(90deg,_#021913_0%,_#063f2e_100%)]">
      <HeaderComponent />
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <h1 className="my-4 text-5xl font-bold leading-tight">
              Proyectos de la Universidad El Bosque
            </h1>
            <p className="leading-normal text-2xl mb-8">
              La Universidad El Bosque está comprometida con su crecimiento, es por ello que los proyectos arraigados a El Plan de Desarrollo Institucional PDI de la Universidad El Bosque, se constituye como la hoja de ruta que guiará la gestión de la Universidad para los próximos 6 años.
            </p>
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            <img className="w-full md:w-4/5 z-50" src="draw3.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="relative -mt-12 lg:-mt-24">
        <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
              <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
            </g>
            <g transform="translate(-4.000000, 76.000000)" fill="#FFFFFF" fillRule="nonzero">
              <path
                d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
              ></path>
            </g>
          </g>
        </svg>
      </div>
      <section className="bg-white border-b py-8">
        <div className="container max-w-5xl mx-auto m-8">
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Indicadores y Categorías de proyectos
              </h3>
              <p className="text-gray-600 mb-8">
                Teniendo en cuenta el contexto económico, social y de salud pública en el que se encuentra inmersa la Educación Superior en Colombia y mediante la definición de los aspectos de interés estratégicos, se ha dado paso a los componentes del PDI que facilitarán su apropiación, entendimiento y ejecución. En este marco, se conciben 5 líneas centrales que están directamente relacionadas con las funciones misionales y 2 transversales que permean a toda la actividad de la Institución.
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img src="./draw1.svg" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white border-b py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Nuestros Proyectos
          </h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-[#ea7600] w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>

          {projects.data.map((project: any) =>
            <div key={project.id} className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                <div className="flex flex-wrap no-underline hover:no-underline">
                  <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                    {project.strategicLine.toUpperCase()}
                  </p>
                  <div className="w-full font-bold text-xl text-gray-800 px-6">
                    {project.name}
                  </div>
                  <p className="text-gray-800 text-base px-6 mb-5">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <svg className="wave-top" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
            <g className="wave" fill="#f8fafc">
              <path
                d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"
              ></path>
            </g>
            <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
              <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                ></path>
                <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <footer className="container mx-auto text-center py-6">
        <div className="container mx-auto px-8">
          <div className="w-full flex flex-col md:flex-row py-6">
            <div className="flex-1">
              <p className="uppercase text-white md:mb-6">Instalaciones Bogotá</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <p>Av. Cra. 9 No. 131 A-02</p>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <p>Línea Gratuita:</p>
                  <a href="#" className="no-underline hover:underline text-white hover:text-[#ea7600]">018000 113033</a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <p>PBX:</p>
                  <a href="tel:6016489000" className="no-underline hover:underline text-white hover:text-[#ea7600]">(601) 648 9000</a>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-white md:mb-6">Instalaciones Chía</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <p>Autopista Norte Km. 20 costado occidental Vía Chía - Bogotá</p>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <p>Línea Gratuita:</p>
                  <a href="#" className="no-underline hover:underline text-white hover:text-[#ea7600]">018000 113033</a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <p>PBX:</p>
                  <a href="tel:6016489000" className="no-underline hover:underline text-white hover:text-[#ea7600]">(601) 648 9000</a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <p>Teléfono:</p>
                  <a href="tel:6016763110" className="no-underline hover:underline text-white hover:text-[#ea7600]">(601) 676 3110</a>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-white md:mb-6">Admisiones</p>
              <ul className="list-reset mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <p>PBX:</p>
                  <a href="tel:6016489000" className="no-underline hover:underline text-white hover:text-[#ea7600]">(601) 648 9000</a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <p>Línea Gratuita:</p>
                  <a href="#" className="no-underline hover:underline text-white hover:text-[#ea7600]">018000 113033</a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <p>Edificio Fundadores:</p>
                  <p>Av. Cra 9 No. 131 A - 02</p>
                  <a href="email:atencionalusuario@unbosque.edu.co" className="no-underline hover:underline text-white hover:text-[#ea7600]">atencionalusuario@unbosque.edu.co</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

}