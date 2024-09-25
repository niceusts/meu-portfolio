import React from 'react';

const HabilitySection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold text-center  mt-16 mb-8">
          <span className="text-blue-500">[</span> Habilidades{' '}
          <span className="text-blue-500">]</span>
        </h3>

        {/* Grid de Habilidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-5">
          {/* Habilidade 1 - HTML */}
          <div className="bg-gray-900 text-white p-4 rounded-lg">
            <h4 className="text-lg font-bold text-orange-500">HTML</h4>
            <p className="text-sm mt-2">Nível de conhecimento: 90%</p>
            <div className="relative pt-1 mt-2">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-900">
                <div
                  style={{ width: '85%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                ></div>
              </div>
            </div>
            <button className="mt-4 bg-blue-600 hover:bg-blue-900 text-white py-2 px-4 rounded w-full">
              Ver mais
            </button>
          </div>

          {/* Habilidade 2 - CSS */}
          <div className="bg-gray-900 text-white p-4 rounded-lg">
            <h4 className="text-lg font-bold text-blue-500">CSS</h4>
            <p className="text-sm mt-2">Nível de conhecimento: 70%</p>
            <div className="relative pt-1 mt-2">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-900">
                <div
                  style={{ width: '70%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>
            <button className="mt-4 bg-blue-600 hover:bg-blue-900 text-white py-2 px-4 rounded w-full">
              Ver mais
            </button>
          </div>

          {/* Habilidade 3 - JavaScript */}
          <div className="bg-gray-900 text-white p-4 rounded-lg">
            <h4 className="text-lg font-bold text-yellow-500">JAVASCRIPT</h4>
            <p className="text-sm mt-2">Nível de conhecimento: 60%</p>
            <div className="relative pt-1 mt-2">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-900">
                <div
                  style={{ width: '60%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                ></div>
              </div>
            </div>
            <button className="mt-4 bg-blue-600 hover:bg-blue-900 text-white py-2 px-4 rounded w-full">
              Ver mais
            </button>
          </div>

          {/* Habilidade 4 - React */}
          <div className="bg-gray-900 text-white p-4 rounded-lg">
            <h4 className="text-lg font-bold text-red-400">REACT</h4>
            <p className="text-sm mt-2">Nível de conhecimento: 50%</p>
            <div className="relative pt-1 mt-2">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-900">
                <div
                  style={{ width: '50%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-400"
                ></div>
              </div>
            </div>
            <button className="mt-4 bg-blue-600 hover:bg-blue-900 text-white py-2 px-4 rounded w-full">
              Ver mais
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HabilitySection;
