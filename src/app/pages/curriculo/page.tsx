import React from 'react';
import { Github, Phone } from 'lucide-react';
import { Email } from '@mui/icons-material';

const CurriculumPage = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
          NICEU SANTOS BIRIBA
        </h1>
        <h2 className="text-2xl text-blue-600 font-semibold mb-4">
          Web Developer
        </h2>
        <h3 className="text-xl font-bold text-gray-700">Sobre</h3>
        <p className="text-gray-600 mt-4 leading-relaxed max-w-2xl mx-auto">
          Estudante da Universidade Federal de Sergipe (UFS) com bastante
          experiência em desenvolvimento de Web Services. Atualmente, atuo como
          desenvolvedor fullstack na Prefeitura Municipal de Estância, onde
          aplico minhas habilidades em C#, .NET, React e SQL.
        </p>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Habilidades */}
        <div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">Habilidades</h3>
          <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>HTML, CSS, TAILWIND</li>
              <li>Next.js, React</li>
              <li>C#, .NET, SQL Server, NestJS</li>
              <li>Front End & Back End</li>
              <li>Engenharia de Software</li>
              <li>Teste de Software</li>
              <li>Desenvolvimento ágil</li>
            </ul>
          </section>
        </div>

        {/* Educação */}
        <div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">Educação</h3>
          <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              <strong>Bacharelado em Sistemas de Informação</strong>
              <br />
              Universidade Federal de Sergipe (UFS)
              <br />
              Em curso, previsão de término em 2025.
            </p>
          </section>
        </div>

        {/* Experiência */}
        <div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">Experiência</h3>
          <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Web Developer</h4>
            <p className="text-gray-700 leading-relaxed">
              Prefeitura Municipal de Estância
              <br />
              (desde 10/2022 até o presente momento)
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Desenvolvedor fullstack responsável pelo ciclo de vida do
              software, desde o levantamento de requisitos até a implementação e
              manutenção de sistemas como Sistemas de Arquivos, Saneamento de
              Água e Processos Seletivos.
            </p>
          </section>
        </div>

        {/* Certificados */}
        <div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">
            Certificados
          </h3>
          <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Curso C# Essencial 2023 (.NET 7) - Udemy</li>
              <li>React JS do Zero ao Avançado - Udemy</li>
              <li>Modelagem de Dados - Fundação Bradesco</li>
              <li>Tempest Academy Conference 2023</li>
            </ul>
          </section>
        </div>

        {/* Idiomas */}
        <div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">Idiomas</h3>
          <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Inglês: Avançado</li>
              <li>Espanhol: Intermediário</li>
            </ul>
          </section>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">Contato</h3>
          <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <p className="flex items-center text-gray-700 mb-2">
              <Phone className="mr-2" /> (79) 99608-4047
            </p>
            <p className="flex items-center text-gray-700 mb-2">
              <Email className="mr-2" /> niceusantos1365@gmail.com
            </p>
            <p className="flex items-center text-gray-700">
              <Github className="mr-2" />{' '}
              <a
                href="https://github.com/niceusts"
                className="text-blue-600 hover:underline"
              >
                github.com/niceusts
              </a>
            </p>
          </section>
        </div>

        {/* Referências */}
        <div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">Referência</h3>
          <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              Prefeitura Municipal de Estância
              <br />
              Órgão Público do Município de Estância
              <br />
              Telefone: (79) 3522-1143
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CurriculumPage;
