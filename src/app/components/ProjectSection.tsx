/* eslint-disable prettier/prettier */
import React from 'react';
import Image from 'next/image';

const ProjectSection = () => {
  return (
    <section className=" py-12">
      <h3 className="text-2xl font-bold text-center mt-16 mb-8">
        <span className="text-blue-600">[</span> Projetos <span className="text-blue-600">]</span>
      </h3>
      <div className="grid md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-1 gap-5 px-5">
        {/* Card 1 */}
        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <Image
            src="/path-to-image2.jpg"
            alt="Projeto 2"
            className="rounded-t-lg w-full h-48 object-cover"
            width={500}
            height={192}
          />
          <h2 className="text-xl font-bold mt-4">Dogs - Rede Social</h2>
          <p className="text-sm mt-2">
            Desenvolvemos um site para rede social de cães, com interações e muito mais sobre o mundo de fotografias.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#React</span>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#Dogs</span>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#Social</span>
          </div>
          <a
            href="#"
            className="block mt-6 text-center bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
          >
            Acesse o site
          </a>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <Image
            src="/path-to-image2.jpg"
            alt="Projeto 2"
            className="rounded-t-lg w-full h-48 object-cover"
            width={500}
            height={192}
          />
          <h2 className="text-xl font-bold mt-4">Animais Fantásticos</h2>
          <p className="text-sm mt-2">
            Um site para promover o conhecimento de animais raros e proteger os que estão em perigo de extinção.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#Next.js</span>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#API</span>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#Conservation</span>
          </div>
          <a
            href="#"
            className="block mt-6 text-center bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
          >
            Acesse o site
          </a>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <Image
            src="/path-to-image2.jpg"
            alt="Projeto 2"
            className="rounded-t-lg w-full h-48 object-cover"
            width={500}
            height={192}
          />
          <h2 className="text-xl font-bold mt-4">Bikecraft - Loja de Bicicletas</h2>
          <p className="text-sm mt-2">
            Loja online de bicicletas personalizadas para ciclistas de todos os níveis.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#E-commerce</span>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#Bikes</span>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#Custom</span>
          </div>
          <a
            href="#"
            className="block mt-6 text-center bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
          >
            Acesse o site
          </a>
        </div>

        {/* Card 4 */}
        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <Image
            src="/path-to-image2.jpg"
            alt="Projeto 2"
            className="rounded-t-lg w-full h-48 object-cover"
            width={500}
            height={192}
          />
          <h2 className="text-xl font-bold mt-4">Bikecraft - Loja de Bicicletas</h2>
          <p className="text-sm mt-2">
            Loja online de bicicletas personalizadas para ciclistas de todos os níveis.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#E-commerce</span>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#Bikes</span>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#Custom</span>
          </div>
          <a
            href="#"
            className="block mt-6 text-center bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
          >
            Acesse o site
          </a>
        </div>

        {/* Card 5 */}
        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <Image
            src="/path-to-image2.jpg"
            alt="Projeto 2"
            className="rounded-t-lg w-full h-48 object-cover"
            width={500}
            height={192}
          />
          <h2 className="text-xl font-bold mt-4">Bikecraft - Loja de Bicicletas</h2>
          <p className="text-sm mt-2">
            Loja online de bicicletas personalizadas para ciclistas de todos os níveis.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#E-commerce</span>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#Bikes</span>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">#Custom</span>
          </div>
          <a
            href="#"
            className="block mt-6 text-center bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
          >
            Acesse o site
          </a>
        </div>
      </div>



      {/* Botão 'Veja Mais' */}
      <div className="flex justify-center mt-8">
        <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded">
          Veja mais
        </button>
      </div>
    </section >

  );
};

export default ProjectSection;
