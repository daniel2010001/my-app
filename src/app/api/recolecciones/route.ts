import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const recolecciones = await prisma.recoleccion.findMany();
    res.json(recolecciones);
  } else if (req.method === "POST") {
    const { id_parcela } = req.body;
    const recoleccion = await prisma.recoleccion.create({
      data: {
        id_parcela,
        fecha: new Date(),
        estado: "Pendiente",
        parcela: { connect: { id: id_parcela } },
        vehiculo: { connect: { id: 1 } },
        centroAcopio: { connect: { id: 1 } },
      },
    });
    res.json(recoleccion);
  } else {
    res.status(405).end();
  }
}
