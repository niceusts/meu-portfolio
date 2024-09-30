import React from 'react';
import Image from 'next/image';
import { Facebook, Github } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
        <div className="text-white flex-col items-right lg:items-end mb-8 lg:mb-0">
          <div className="mb-6 w-96">
            <Image
              src="/Contact.png"
              alt="Ilustração"
              layout="responsive"
              width={50}
              height={50}
            />
          </div>

          {/* Links para LinkedIn e GitHub */}
          <div className="flex space-x-4 text-white items-end justify-center">
            <a
              href="https://www.linkedin.com/in/niceu-santos-biriba-1055301b2/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Facebook size={24} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/niceusts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Github size={24} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Formulário de Contato */}
        <div className="w-full lg:w-2/5 bg-gray-900 p-8 rounded-lg text-white">
          <h3 className="text-lg font-semibold mb-6 text-center">
            Deixe seu recado.
          </h3>

          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm mb-1">
                Nome:
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-600 rounded bg-black text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-600 rounded bg-black text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm mb-1">
                Telefone:
              </label>
              <input
                type="text"
                id="phone"
                className="w-full p-2 border border-gray-600 rounded bg-black text-white"
                placeholder="opcional"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm mb-1">
                Mensagem:
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-2 border border-gray-600 rounded bg-black text-white"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-800 text-white py-2 px-4 rounded"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
