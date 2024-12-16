import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const ruta = await prisma.ruta.findUnique({
      where: { id: Number(id) },
    });
    res.json(ruta);
  } else if (req.method === 'PUT') {
    const { id_origen, id_destino, texto, distancia_km, tiempo_estimado, costo } = req.body;
    const ruta = await prisma.ruta.update({
      where: { id: Number(id) },
      data: { id_origen, id_destino, texto, distancia_km, tiempo_estimado, costo },
    });
    res.json(ruta);
  } else if (req.method === 'DELETE') {
    await prisma.ruta.delete({
      where: { id: Number(id) },
    });
    res.status(204).end(); 
  } else {
    res.status(405).end(); 
  }
}