/* eslint-disable prettier/prettier */
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para fechar o menu ao clicar em um link
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="text-white p-4 bg-gray-900">
      <nav className="container mx-auto flex justify-between lg:justify-around items-center">
        <h1 className="text-2xl font-bold">
          Meu<span className="text-blue-500">Portfólio</span>
        </h1>

        {/* Botão para abrir o menu em telas pequenas */}
        <div className="block md:hidden">
          <button
            id="menu-btn"
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Menu de navegação */}
        <ul className="hidden md:flex space-x-4" id="desktop-menu">
          <li>
            <Link href="/" className="hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/pages/projetos" className="hover:text-blue-500">
              Projetos
            </Link>
          </li>
          <li>
            <Link href="/pages/habilidades" className="hover:text-blue-500">
              Habilidades
            </Link>
          </li>
          <li>
            <Link href="/pages/curriculo" className="hover:text-blue-500">
              Curriculo
            </Link>
          </li>
          <li>
            <Link href="#contato" className="hover:text-blue-500">
              Contato
            </Link>
          </li>
        </ul>

        {/* Menu colapsado para telas menores com animação */}
        <ul
          id="mobile-menu"
          className={`
            ${isMenuOpen ? 'block' : 'hidden'
            } absolute top-16 left-0 w-full bg-gray-900 text-white space-y-2 p-4 md:hidden
             transition-all duration-300 transform
             ${isMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0'
            }`}
        >
          <li>
            <Link
              href="/"
              className="hover:text-blue-500"
              onClick={handleCloseMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/pages/projetos"
              className="hover:text-blue-500"
              onClick={handleCloseMenu}
            >
              Projetos
            </Link>
          </li>
          <li>
            <Link
              href="/pages/habilidades"
              className="hover:text-blue-500"
              onClick={handleCloseMenu}
            >
              Habilidades
            </Link>
          </li>
          <li>
            <Link
              href="/pages/curriculo"
              className="hover:text-blue-500"
              onClick={handleCloseMenu}
            >
              Curriculo
            </Link>
          </li>
          <li>
            <Link
              href="#contato"
              className="hover:text-blue-500"
              onClick={handleCloseMenu}
            >
              Contato
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
