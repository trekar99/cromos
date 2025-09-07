"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

import ImageWithLoader from './ImageWithLoader';

type Config = {
  titulo: string;
  autor: string;
  colorFondo: string;
  colorNeon1: string;
  colorNeon2: string;
  colorNeon3: string;
};

type Cromo = {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
};

export default function Home() {

  const [visitados, setVisitados] = useState<string[]>([]);
  const [config, setConfig] = useState<Config | null>(null);
  const [cromos, setCromos] = useState<Cromo[] | null>(null);

  useEffect(() => {
    const v = JSON.parse(localStorage.getItem('cromosVisitados') || '[]');
    setVisitados(v);
  }, []);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data));
    fetch('/api/cromos')
      .then(res => res.json())
      .then(data => setCromos(data));
  }, []);

  if (!config || !cromos) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-8">
        <span className="text-4xl text-[#00fff0] animate-pulse">Cargando...</span>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen p-8 flex flex-col items-center"
      style={{
        background: `linear-gradient(135deg, ${config.colorFondo}, ${config.colorNeon1}, ${config.colorNeon2}, ${config.colorNeon3})`,
      }}
    >
      <h1
        className="text-6xl font-extrabold mb-10 text-center text-transparent bg-clip-text drop-shadow-[0_0_20px_#00fff0]"
        style={{
          backgroundImage: `linear-gradient(90deg, ${config.colorNeon1}, ${config.colorNeon2}, ${config.colorNeon3})`,
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {config.titulo}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full max-w-6xl">
        {cromos.filter(c => visitados.includes(c.id)).map((cromo) => (
          <div
            key={cromo.id}
            className="rounded-2xl shadow-2xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 group"
            style={{
              background: config.colorFondo,
              border: `4px solid ${config.colorNeon1}`,
            }}
          >
            <ImageWithLoader id={cromo.id} nombre={cromo.nombre} colorNeon2={config.colorNeon2} />
            <h2
              className="text-2xl font-bold mb-2 drop-shadow-[0_0_10px_#00fff0]"
              style={{ color: config.colorNeon1 }}
            >
              {cromo.nombre}
            </h2>
            <p className="mb-4 text-center" style={{ color: '#e0e0e0' }}>{cromo.descripcion}</p>
            <Link
              href={`/cardpage/${cromo.id}`}
              className="px-4 py-2 rounded-full font-bold shadow-lg transition"
              style={{
                background: `linear-gradient(90deg, ${config.colorNeon2}, ${config.colorNeon1})`,
                color: '#fff',
              }}
            >
              Ver cromo
            </Link>
          </div>
        ))}
  {cromos.filter(c => !visitados.includes(c.id)).map((cromo) => (
          <div
            key={cromo.id}
            className="rounded-2xl shadow-2xl p-6 flex flex-col items-center opacity-30"
            style={{
              background: config.colorFondo,
              border: '2px solid #444',
            }}
          >
            <div
              className="w-44 h-44 flex items-center justify-center rounded-xl mb-4 animate-pulse"
              style={{
                background: `linear-gradient(135deg, ${config.colorNeon2}, ${config.colorNeon1})`,
              }}
            >
              <span className="text-6xl drop-shadow-[0_0_20px_#00fff0]" style={{ color: config.colorNeon1 }}>?</span>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: config.colorNeon2 }}>Cromo bloqueado</h2>
            <p className="mb-4 text-center" style={{ color: '#888' }}>Visita el cromo para desbloquearlo</p>
            <span
              className="px-4 py-2 rounded-full font-bold cursor-not-allowed"
              style={{
                background: 'linear-gradient(90deg, #444, #888)',
                color: '#fff',
              }}
            >
              Ver cromo
            </span>
          </div>
        ))}
      </div>
      <footer
        className="mt-16 text-center font-semibold text-lg drop-shadow-[0_0_10px_#00fff0]"
        style={{ color: config.colorNeon1 }}
      >
        © 2025 {config.autor}
      </footer>
    </main>
  );
}
