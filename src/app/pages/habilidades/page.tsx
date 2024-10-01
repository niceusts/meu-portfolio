import React from 'react';
import { habilidades } from '../../../../data/habilidades';
import Image from 'next/image';

const Habilidades = () => {
  return (
    <div className="py-6">
      <h3 className="text-3xl font-bold text-center mt-16 mb-8">
        <span className="text-blue-600">[</span> Habilidades{' '}
        <span className="text-blue-600">]</span>
      </h3>

      {/* Seção Frontend */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Frontend</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habilidades.frontend.map((skill) => (
            <div
              key={skill.id}
              className="bg-gray-900 text-white p-4 rounded-lg"
              data-aos="flip-left"
              data-aos-duration="1000"
            >
              <Image
                src={skill.logo}
                alt={skill.title}
                width={32}
                height={32}
                className="h-8 w-8 mb-2"
              />
              <h3 className="text-lg font-bold">{skill.title}</h3>
              <div className="bg-blue-950">
                <p
                  className="text-xs flex justify-center items-center text-white py-2 rounded-sm mt-1 bg-color-"
                  style={{
                    backgroundColor: skill.bgColor,
                    width: skill.percentage,
                  }}
                >
                  Nível de conhecimento: {skill.knowledgeLevel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção Backend */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Backend</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habilidades.backend.map((skill) => (
            <div
              key={skill.id}
              className="bg-gray-900 text-white p-4 rounded-lg"
              data-aos="flip-left"
              data-aos-duration="1000"
            >
              <Image
                src={skill.logo}
                alt={skill.title}
                className="h-8 w-8 mb-2"
                width={32}
                height={32}
              />
              <h3 className="text-lg font-bold">{skill.title}</h3>
              <div className="bg-blue-950">
                <p
                  className="text-xs flex justify-center items-center text-white py-2 rounded-sm mt-1"
                  style={{
                    backgroundColor: skill.bgColor,
                    width: skill.percentage,
                  }}
                >
                  Nível de conhecimento: {skill.knowledgeLevel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção Banco de Dados */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Banco de Dados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habilidades.database.map((skill) => (
            <div
              key={skill.id}
              className="bg-gray-900 text-white p-4 rounded-lg"
              data-aos="flip-left"
              data-aos-duration="1000"
            >
              <Image
                src={skill.logo}
                alt={skill.title}
                width={32}
                height={32}
                className="h-8 w-8 mb-2"
              />
              <h3 className="text-lg font-bold">{skill.title}</h3>
              <div className="bg-blue-950">
                <p
                  className="text-xs flex justify-center items-center text-white py-2 rounded-sm mt-1"
                  style={{
                    backgroundColor: skill.bgColor,
                    width: skill.percentage,
                  }}
                >
                  Nível de conhecimento: {skill.knowledgeLevel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adicione mais seções conforme necessário */}
    </div>
  );
};

export default Habilidades;
