// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from "nodemailer";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {user_email, indicated, indicated_manager  } = req.query

  // console.table({user_email, indicated, indicated_manager})

  const mailTransporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: indicated_manager,
    subject: "Please approve this in your email",
    text: "lmao",
    html: `
      <b>Approve here:</b>
      <a href="http://localhost:3000/api/approve-email?user_email=${user_email}&indicated=${indicated}&indicated_manager=${indicated_manager}">Click here</a>"
    `
  }

  mailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) res.status(500).json(error)
    res.status(200).json({ message: info })
  })
}
