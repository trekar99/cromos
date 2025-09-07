import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).send('Missing image id');
  }
  const exts = ['jpg', 'jpeg', 'png', 'webp'];
  let imagePath = '';
  let contentType = '';
  for (const ext of exts) {
    const candidate = path.join(process.cwd(), 'src/images', `${id}.${ext}`);
    if (fs.existsSync(candidate)) {
      imagePath = candidate;
      contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'png' ? 'image/png' : 'image/webp';
      break;
    }
  }
  if (!imagePath) {
    // Si no existe la imagen, servir un placeholder
    const placeholderPath = path.join(process.cwd(), 'src/images', 'placeholder.jpg');
    if (fs.existsSync(placeholderPath)) {
      const imageBuffer = fs.readFileSync(placeholderPath);
      res.setHeader('Content-Type', 'image/jpeg');
      return res.status(200).send(imageBuffer);
    } else {
      return res.status(404).send('Image not found');
    }
  }
  const imageBuffer = fs.readFileSync(imagePath);
  res.setHeader('Content-Type', contentType);
  return res.status(200).send(imageBuffer);
}
