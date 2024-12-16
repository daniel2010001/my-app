import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const rutas = await prisma.ruta.findMany();
    res.json(rutas);
  } else if (req.method === 'POST') {
    const { id_origen, id_destino, texto, distancia_km, tiempo_estimado, costo } = req.body;
    const ruta = await prisma.ruta.create({
      data: {
        id_origen,
        id_destino,
        texto,
        distancia_km,
        tiempo_estimado,
        costo,
      },
    });
    res.json(ruta);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}