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
    { label: "Ecosistema", href: "#ecosistema" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header className="w-full flex items-center md:grid md:grid-cols-[1fr_auto_1fr] px-8 py-4 border-b border-gray-300/20 fixed top-0 left-0 z-[999]">
      <Typography variant="h3" className="text-white">
        NODO App
      </Typography>
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

      {open && (
        <div className="absolute top-full left-0 w-full bg-[#05070a] flex flex-col items-center gap-4 py-4 md:hidden">
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
      )}
    </header>
  );
};
