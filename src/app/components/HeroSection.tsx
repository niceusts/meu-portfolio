import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section
      className="pt-16 flex sm:flex-row flex-col-reverse justify-evenly items-center"
      data-aos="fade-up"
    >
      <div className="flex flex-col">
        <div className="sm:text-left text-center">
          <h1 className="text-5xl font-bold mb-4">
            <div className="bg-blue-600 w-20 h-1 mb-2 "></div>Hello world!
          </h1>
          <h2 className="text-3xl font-medium mb-2">Sou o Niceu</h2>
          <p className="text-blue-600 text-xl mb-6">
            &lt;/ Desenvolvedor Frontend &gt;
          </p>
        </div>
        <p className="text-lg max-w-md mb-6 text-justify sm:text-start">
          Feliz em ter você em minha página. Estou aqui para mostrar um pouco
          sobre a minha evolução na área de desenvolvimento web. Atualmente
          estou cursando Sistemas de Informação. Fiz alguns cursos externos
          focados em front-end, porém fiz outros voltados para o backend,
          portanto não me limito somente ao frontend.
        </p>
        <div className="flex space-x-4 mb-6">
          <a
            href="pages/curriculo"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Currículo
          </a>
        </div>
      </div>

      <div>
        <div className="image-container mb-6">
          <Image
            src="/perfil.JPG"
            alt="Profile Image"
            width={260}
            height={260}
          />
        </div>
        {/* <div className="w-45 h-45 rounded-full border-8 border-blue-600 mb-6 object-cover  p-2 ">
          <Image
            src="/perfil.JPG"
            alt="Niceu Photo"
            width={260}
            height={260}
            className="rounded-full border-blue-600 object-cover"
          />
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
