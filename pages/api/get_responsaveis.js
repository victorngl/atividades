// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
 
  // Get data submitted in request's body.
  const body = req.body

  if (!body.username) {

    return res.status(400).json({ error: 'Credenciais inválidas' })
  }

  const login = await prisma.responsaveis.findMany({
    where: {
      username: body.username,
    },
    include: {
      aluno: true, // Return all fields
    },
  })
  
  return res.status(200).json({ login: login })

}