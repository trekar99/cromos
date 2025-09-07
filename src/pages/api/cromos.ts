import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'src/data/cromos.json');
  const cromos = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return res.status(200).json(cromos);
}
