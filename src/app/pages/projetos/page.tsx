import React from 'react';
import Image from 'next/image';
import { projects } from '../../../../data/projetos';

const Projetos = () => {
  return (
    <section className="py-1 pb-10">
      <h3 className="text-3xl font-bold text-center mt-16 mb-8">
        <span className="text-blue-600">[</span> Todos os Projetos{' '}
        <span className="text-blue-600">]</span>
      </h3>
      <h2 className="text-3xl font-bold mt-16 mb-8">Projetos publicados</h2>
      <div className="grid md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-1 gap-5 px-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 text-white p-4 rounded-lg flex flex-col justify-between"
          >
            <div>
              <Image
                src={project.imageUrl}
                alt={project.title}
                className="rounded-t-lg w-full h-48 object-cover"
                width={500}
                height={192}
              />
              <h2 className="text-xl font-bold mt-4">{project.title}</h2>
              <p className="text-sm mt-2">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={project.link}
                className="block mt-6 text-center bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
              >
                Acesse o site
              </a>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-bold mt-4 mb-8">Projetos no Github</h2>
    </section>
  );
};

export default Projetos;
