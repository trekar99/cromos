

"use client";
import MarkVisited from './MarkVisited';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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


const CardClient = ({ id }: { id: string }) => {
  const [cromo, setCromo] = useState<Cromo | null>(null);
  const [error, setError] = useState(false);
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    fetch(`/api/cromo/${id}`)
      .then(res => {
        if (!res.ok) {
          setError(true);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) setCromo(data);
      });
  }, [id]);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data));
  }, []);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-yellow-800">Cromo no encontrado</h1>
          <Link href="/" className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">Volver a la página principal</Link>
        </div>
      </main>
    );
  }

  if (!cromo || !config) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-8">
        <div className="bg-[#181824] rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-md w-full border-4 border-[#00fff0]">
          <span className="text-4xl text-[#00fff0] animate-pulse">Cargando...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-8">
      <MarkVisited id={cromo.id} />
      <div className="bg-[#181824] rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-md w-full border-4 border-[#00fff0]">
  <Image src={`/api/image/${cromo.id}`} alt="" width={300} height={300} style={{objectFit: 'cover'}} className="rounded-xl mb-6 border-2 border-[#ff00ea] shadow-[0_0_30px_#00fff0]" />
        <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00fff0] via-[#ff00ea] to-[#00ff85] drop-shadow-[0_0_20px_#00fff0] text-center">{cromo.nombre}</h1>
        <p className="text-lg text-[#e0e0e0] mb-6 text-center">{cromo.descripcion}</p>
  <Link href="/" className="px-6 py-2 bg-gradient-to-r from-[#ff00ea] to-[#00fff0] text-white rounded-full font-bold shadow-lg hover:from-[#00fff0] hover:to-[#ff00ea] transition">Volver a la página principal</Link>
      </div>
      <footer
        className="mt-8 text-center font-semibold text-lg drop-shadow-[0_0_10px_#00fff0]"
        style={{ color: config.colorNeon1 }}
      >
        © 2025 {config.autor}
      </footer>
    </main>
  );
};

export default CardClient;
