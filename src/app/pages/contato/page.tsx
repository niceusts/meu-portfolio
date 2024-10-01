import React from 'react';
import Image from 'next/image';
import { Facebook, Github } from 'lucide-react';
import { EmailOutlined, WhatsApp } from '@mui/icons-material';

const ContactSection = () => {
  const whatsappNumber = '5579996084047';
  const message = 'Olá! Gostaria de mais informações sobre seu currículo.';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const email = 'niceusantos1365@gmail.com';
  const subject = 'Informações sobre seu currículo';
  const body = 'Olá! Gostaria de mais informações sobre seu currículo.';

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <section className="py-12" data-aos="fade-up" id="contato">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
        <div className="text-white flex-col items-right lg:items-end mb-8 lg:mb-0"></div>

        {/* Formulário de Contato */}
        <div className="w-full lg:w-2/5 bg-gray-900 p-8 rounded-lg text-white">
          <div className="">
            <Image
              src="/Contact.png"
              alt="Ilustração"
              layout="responsive"
              width={50}
              height={50}
            />
          </div>
          <h3 className="text-lg font-semibold mb-6 text-center">
            Entre em contato
          </h3>
          {/* Links para LinkedIn e GitHub */}
          <div className="sm:flex flex flex-wrap space-x-4 space-y-4 text-white items-end justify-center">
            <a
              href="https://www.linkedin.com/in/niceu-santos-biriba-1055301b2/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 border p-2 rounded hover:bg-blue-800"
            >
              <Facebook size={24} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/niceusts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 border p-2 rounded hover:bg-purple-800"
            >
              <Github size={24} />
              <span>GitHub</span>
            </a>
            <a
              href={whatsappLink}
              target="_blank" // Abre em uma nova aba
              rel="noopener noreferrer" // Segurança ao abrir nova aba
              className="flex items-center space-x-2 border p-2 rounded hover:bg-green-800"
            >
              <WhatsApp />
              <span>Whatsapp</span>
            </a>
            <a
              href={mailtoLink}
              className="flex items-center space-x-2 border p-2 rounded hover:bg-red-800"
            >
              <EmailOutlined />
              <span>E-mail</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
