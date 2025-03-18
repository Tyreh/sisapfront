interface Project {
    id: number;
    name: string;
    status: string;
}

export default function UserProjectsSection({ projects }: { projects: Project[] }) {
    return (
        <section className="mt-10 mb-10 w-full">
            <h2 className="text-2xl font-bold mb-6 text-roble">Tus Proyectos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {projects.map(project => (
                    <div key={project.id} className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                        <p className="mt-2 text-gray-600">Estado: {project.status === 'en_ejecucion' ? 'En ejecución' : 'Completado'}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
