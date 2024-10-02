import React from 'react';
import { skills } from '../../../data/skills';

const HabilitySection = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold text-center mt-16 mb-8">
          <span className="text-blue-500">[</span> Habilidades{' '}
          <span className="text-blue-500">]</span>
        </h3>

        {/* Grid de Habilidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-5">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-gray-800 text-white p-4 rounded-lg shadow-content"
              data-aos="flip-left"
              data-aos-duration="1000"
            >
              <h4 className={`text-lg font-bold `}>{skill.title}</h4>
              <p className="text-sm mt-2">
                Nível de conhecimento: {skill.knowledgeLevel}
              </p>
              <div className="relative pt-1 mt-2">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-900">
                  <div
                    style={{
                      width: skill.percentage,
                      backgroundColor: skill.bgColor,
                    }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão 'Veja Mais' */}
        <div className="flex justify-center mt-8">
          <a
            href="../pages/habilidades"
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded"
          >
            Veja mais
          </a>
        </div>
      </div>
    </section>
  );
};

export default HabilitySection;
