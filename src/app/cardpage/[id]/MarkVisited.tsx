"use client";
import { useEffect } from 'react';

export default function MarkVisited({ id }: { id: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const visitados = JSON.parse(localStorage.getItem('cromosVisitados') || '[]');
      if (!visitados.includes(id)) {
        visitados.push(id);
        localStorage.setItem('cromosVisitados', JSON.stringify(visitados));
      }
    }
  }, [id]);
  return null;
}
