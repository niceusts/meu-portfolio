import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="pt-16 flex flex-row justify-evenly items-center">
      <div className="flex flex-col">
        <h1 className="text-5xl font-bold mb-4">Hello world!</h1>
        <h2 className="text-3xl font-medium mb-2">Sou o Niceu</h2>
        <p className="text-blue-600 text-xl mb-6">
          &lt;/ Desenvolvedor Frontend &gt;
        </p>
        <p className="text-lg max-w-md mb-6">
          Feliz em ter você em minha página. Estou aqui para mostrar um pouco
          sobre a minha evolução na área de desenvolvimento web. Atualmente
          estou cursando Sistemas de Informação. Fiz alguns cursos externos
          focados em front-end, porém fiz outros voltados para o backend,
          portanto não me limito somente ao frontend.
        </p>
        <div className="flex space-x-4 mb-6">
          <a
            href="page/curriculo"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Currículo
          </a>
        </div>
      </div>

      <div>
        <div className="w-45 h-45 rounded-full border-8 border-blue-600 mb-6 object-cover p-2 ">
          <Image
            src="/niceu.png"
            alt="Niceu Photo"
            width={160}
            height={160}
            className="rounded-full border-blue-600 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
