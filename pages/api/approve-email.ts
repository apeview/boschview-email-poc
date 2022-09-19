// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {user_email, indicated, indicated_manager  } = req.query
  console.table({user_email, indicated, indicated_manager})
  res.status(200).json({ message: "stored in db" })
}
