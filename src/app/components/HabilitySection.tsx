import React from 'react';
import { skills } from '../../../data/skills';

const HabilitySection = () => {
  return (
    <section className="py-12">
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
              className="bg-gray-900 text-white p-4 rounded-lg"
            >
              <h4 className={`text-lg font-bold  ${skill.color}`}>
                {skill.title}
              </h4>
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
              <button className="mt-4 bg-blue-600 hover:bg-blue-900 text-white py-2 px-4 rounded w-full">
                Ver mais
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HabilitySection;
