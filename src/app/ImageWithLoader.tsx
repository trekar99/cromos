import { useState } from 'react';

type Props = {
  id: string;
  nombre: string;
  colorNeon2: string;
};

export default function ImageWithLoader({ id, nombre, colorNeon2 }: Props) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative w-44 h-44">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#181824] rounded-xl animate-pulse border-2" style={{ borderColor: colorNeon2 }}>
          <span className="text-3xl text-[#00fff0]">Cargando...</span>
        </div>
      )}
      <img
        src={`/api/image/${id}`}
        alt=""
        style={{ objectFit: 'cover', border: `2px solid ${colorNeon2}` }}
        className="w-44 h-44 rounded-xl mb-4 group-hover:shadow-[0_0_30px_#00fff0] transition-shadow duration-300"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
}