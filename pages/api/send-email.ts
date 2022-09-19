// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from "nodemailer";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const {user_email, indicated, indicated_manager  } = req.query

  const mailTransporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user_email,
    subject: "Please verify this in your email",
    text: "lmao",
    html: `
      <b>Verify here:</b>
      <a href="http://localhost:3000/api/verify-email?user_email=${user_email}&indicated=${indicated}&indicated_manager=${indicated_manager}">Click here</a>"
    `
  }

  mailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) res.status(500).json(error)
    res.status(200).json({ message: info })
  })
}
