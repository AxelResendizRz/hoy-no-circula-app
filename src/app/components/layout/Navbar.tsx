"use client";
import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo / Nombre de la app */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white text-xl font-black shadow-md">
                🚘
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 tracking-tight block leading-none">
                  Hoy No Circula
                </span>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  CDMX & EDOMEX
                </span>
              </div>
            </div>

            {/* Menú de Escritorio */}
            <div className="hidden md:flex items-center gap-6 font-bold text-sm text-slate-600">
              <a
                href="#inicio"
                className="text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Inicio
              </a>
            </div>

            {/* Botón de Menú Móvil */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
                aria-label="Abrir menú"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Desplegable Menú Móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-2 font-bold text-slate-700 text-sm">
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-xl hover:bg-slate-50 text-emerald-600"
            >
              Inicio
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
