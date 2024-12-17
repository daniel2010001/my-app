import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    const recoleccion = await prisma.recoleccion.findUnique({
      where: { id: Number(id) },
    });
    res.json(recoleccion);
  } else if (req.method === "PUT") {
    const { id_parcela } = req.body;
    const recoleccion = await prisma.recoleccion.update({
      where: { id: Number(id) },
      data: { id_parcela },
    });
    res.json(recoleccion);
  } else if (req.method === "DELETE") {
    await prisma.recoleccion.delete({
      where: { id: Number(id) },
    });
    res.status(204).end(); // No Content
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
