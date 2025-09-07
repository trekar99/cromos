import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

type Cromo = {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing cromo id' });
  }
  const filePath = path.join(process.cwd(), 'src/data/cromos.json');
  const cromos: Cromo[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const cromo = cromos.find((c) => c.id === id);
  if (!cromo) {
    return res.status(404).json({ error: 'Cromo not found' });
  }
  return res.status(200).json(cromo);
}
