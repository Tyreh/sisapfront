"use client";

import { useEffect, useState } from "react";

export default function HeaderComponent() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = document.getElementById("header");
    const navcontent = document.getElementById("nav-content");
    const navaction = document.getElementById("navAction");
    const toToggle = document.querySelectorAll(".toggleColour");
    const navMenuDiv = document.getElementById("nav-content");
    const navMenu = document.getElementById("nav-toggle");

    function handleScroll() {
      const scrollpos = window.scrollY;

      if (scrollpos > 10) {
        setScrolled(true);
        header?.classList.add("bg-white", "shadow");
        navcontent?.classList.remove("bg-gray-100");
        navcontent?.classList.add("bg-white");

        navaction?.classList.remove("bg-white", "text-gray-800");
        navaction?.classList.add(
          "bg-[linear-gradient(90deg,_#021913_0%,_#063f2e_100%)]",
          "text-white"
        );

        toToggle.forEach((el) => {
          el.classList.add("text-gray-800");
          el.classList.remove("text-white");
        });
      } else {
        setScrolled(false);
        header?.classList.remove("bg-white", "shadow");
        navcontent?.classList.remove("bg-white");
        navcontent?.classList.add("bg-gray-100");

        navaction?.classList.remove(
          "bg-[linear-gradient(90deg,_#021913_0%,_#063f2e_100%)]",
          "text-white"
        );
        navaction?.classList.add("bg-white", "text-gray-800");

        toToggle.forEach((el) => {
          el.classList.add("text-white");
          el.classList.remove("text-gray-800");
        });
      }
    }

    function check(e: any) {
      const target = e.target;
      if (!checkParent(target, navMenuDiv)) {
        if (checkParent(target, navMenu)) {
          navMenuDiv?.classList.toggle("hidden");
        } else {
          navMenuDiv?.classList.add("hidden");
        }
      }
    }

    function checkParent(t: any, elm: any) {
      while (t.parentNode) {
        if (t === elm) return true;
        t = t.parentNode;
      }
      return false;
    }

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", check);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", check);
    };
  }, []);

  return (
    <nav id="header" className="fixed w-full z-30 top-0 text-white">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <a
            className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="#"
          >
            <img
              src={scrolled ? "/LogoUebH.png" : "/logoU.png"}
              className="h-20 fill-current inline transition-all duration-300"
              alt="Logo UEB"
            />
          </a>
        </div>
        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            className="flex items-center p-1 text-[#ea7600] hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20 justify-end"
          id="nav-content"
        >
          <a
            href="/auth/login"
            id="navAction"
            className="cursor-pointer mx-auto w-full md:w-fit lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            Iniciar Sesión
          </a>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
}
