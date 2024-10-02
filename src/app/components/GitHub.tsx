import React from 'react';
import { githubProjects } from '../../../data/githubProjects';

const GitHubProjetos = () => {
  return (
    <section className="py-12">
      <h3 className="text-2xl font-bold text-center mt-16 mb-8">
        <span className="text-blue-600">[</span> Projetos do GitHub{' '}
        <span className="text-blue-600">]</span>
      </h3>
      <div className="grid md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-1 gap-5 px-5">
        {githubProjects.slice(0, 4).map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 text-white p-4 rounded-lg flex flex-col justify-between shadow-content"
            data-aos="flip-left"
            data-aos-duration="1000"
          >
            <div>
              <h2 className="text-2xl font-bold mt-4">{project.title}</h2>
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
                href={project.link}
                className="block mt-6 text-center bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
                rel="noopener noreferrer"
              >
                Acesse o projeto
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* Botão 'Veja Mais' */}
      <div className="flex justify-center mt-8">
        <a
          href="../pages/projetos"
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded"
        >
          Veja mais
        </a>
      </div>
    </section>
  );
};

export default GitHubProjetos;
