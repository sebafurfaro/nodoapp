"use client";

import React, { useState } from "react";
import { Typography } from "../Typography";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);

  const menuItems = [
    { label: "Soluciones", href: "#soluciones" },
    { label: "Proceso", href: "#process" },
    { label: "Contacto", href: "#contacto" },
    { label: "Recursos", href: "/recursos" }
  ];

  return (
    <header className="w-full flex items-center md:grid md:grid-cols-[1fr_auto_1fr] px-8 py-4 border-b border-gray-300/20 fixed top-0 left-0 z-999">
      <div className="space-x-4 flex items-center">
        <svg width="60" height="60" viewBox="0 0 696 696" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="166.944" cy="213.944" r="115.944" fill="white"/>
          <circle cx="530.056" cy="213.944" r="115.944" fill="white"/>
          <ellipse cx="348.5" cy="481.047" rx="115.5" ry="116" fill="white"/>
        </svg>
        <span className="text-white text-2xl font-bold">NODO APP</span>
      </div>
      <div className="hidden md:flex gap-8">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-white hover:text-blue-500 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <Link href="#contacto" className="ml-auto group flex items-center gap-3 border border-[#00f0ff] bg-[#00f0ff]/10 px-8 py-2 text-white transition-all duration-500 hover:bg-[#00f0ff] hover:text-black">
        Comenzar
        <span className="transition-transform duration-300 group-hover:translate-x-2">
          →
        </span>
      </Link>
      <button onClick={toggleMenu} className="block md:hidden ml-4 text-white p-2">
        {!open ? <MenuIcon /> : <XIcon />}
      </button>

        <div className={`fixed top-0 right-0 w-1/2 min-h-screen bg-violet-900/60 backdrop-blur-2xl p-8 z-9999 flex flex-col transition-all duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <button onClick={toggleMenu}>X</button>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-blue-500 transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
    </header>
  );
};
