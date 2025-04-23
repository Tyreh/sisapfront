'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { match } from 'path-to-regexp';

type BreadcrumbItem = {
  title: string;
  link: string;
};

// Mapeo de rutas incluyendo dinámicas
const routeMapping: Record<string, BreadcrumbItem[]> = {
  '/dashboard': [{ title: 'Inicio', link: '/dashboard' }],
  '/dashboard/dependency': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Dependencias', link: '/dashboard/dependency' }
  ],
  '/dashboard/dependency/edit': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Dependencias', link: '/dashboard/dependency' },
    { title: 'Editar', link: '/dashboard/dependency/edit' }
  ],
  '/dashboard/dependency/:id': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Dependencias', link: '/dashboard/dependency' },
    { title: 'Detalle', link: '/dashboard/dependency/edit' }
  ],

  '/dashboard/project': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Proyectos', link: '/dashboard/project' }
  ],
  '/dashboard/project/edit': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Proyectos', link: '/dashboard/project' },
    { title: 'Editar', link: '/dashboard/project/edit' }
  ],
  '/dashboard/project/:id': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Proyectos', link: '/dashboard/project' },
    { title: 'Detalle', link: '/dashboard/project/edit' }
  ],

  '/dashboard/coreProcess': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Procesos misionales', link: '/dashboard/coreProcess' }
  ],
  '/dashboard/coreProcess/edit': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Procesos misionales', link: '/dashboard/coreProcess' },
    { title: 'Editar', link: '/dashboard/coreProcess/edit' }
  ],
  '/dashboard/coreProcess/:id': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Procesos misionales', link: '/dashboard/coreProcess' },
    { title: 'Detalle', link: '/dashboard/coreProcess/edit' }
  ],

  '/dashboard/currency': [
    { title: 'Inicio', link: '/currency' },
    { title: 'Divisas', link: '/dashboard/currency' }
  ],
  '/dashboard/currency/edit': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Divisas', link: '/dashboard/currency' },
    { title: 'Editar', link: '/dashboard/currency/edit' }
  ],
  '/dashboard/currency/:id': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Divisas', link: '/dashboard/currency' },
    { title: 'Detalle', link: '/dashboard/currency/edit' }
  ],

  '/dashboard/strategicLine': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Líneas estratégicas', link: '/dashboard/strategicLine' }
  ],
  '/dashboard/strategicLine/edit': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Líneas estratégicas', link: '/dashboard/strategicLine' },
    { title: 'Editar', link: '/dashboard/strategicLine/edit' }
  ],
  '/dashboard/strategicLine/:id': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Líneas estratégicas', link: '/dashboard/strategicLine' },
    { title: 'Detalle', link: '/dashboard/strategicLine/edit' }
  ],


  '/dashboard/apiUser': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Usuarios', link: '/dashboard/apiUser' }
  ],
  '/dashboard/apiUser/edit': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Usuarios', link: '/dashboard/apiUser' },
    { title: 'Editar', link: '/dashboard/apiUser/edit' }
  ],
  '/dashboard/apiUser/:id': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Usuarios', link: '/dashboard/apiUser' },
    { title: 'Detalle', link: '/dashboard/apiUser/edit' }
  ],


  '/dashboard/role': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Roles', link: '/dashboard/role' }
  ],
  '/dashboard/role/edit': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Roles', link: '/dashboard/role' },
    { title: 'Editar', link: '/dashboard/role/edit' }
  ],
  '/dashboard/role/:id': [
    { title: 'Inicio', link: '/dashboard' },
    { title: 'Roles', link: '/dashboard/role' },
    { title: 'Detalle', link: '/dashboard/role/edit' }
  ],

  // Add more custom mappings as needed
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Buscar una ruta que haga match usando path-to-regexp
    for (const pattern in routeMapping) {
      const matcher = match(pattern, { decode: decodeURIComponent });
      const matched = matcher(pathname);
      if (matched) {
        return routeMapping[pattern];
      }
    }

    // Si no hay coincidencia, generar los breadcrumbs automáticamente
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const isId = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(segment);
      const title = isId ? 'Detalle' : segment.charAt(0).toUpperCase() + segment.slice(1);
      const link = `/${segments.slice(0, index + 1).join('/')}`;
      return { title, link };
    });
  }, [pathname]);

  return breadcrumbs;
}
