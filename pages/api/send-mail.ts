// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from "nodemailer";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const mailTransporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "hidek.abe@outlook.com",
    subject: "Sending an email",
    text: "lmao",
    html: `
      <b>Hello World </b>
    `
  }

  mailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) res.status(500).json(error)
    res.status(200).json({ message: info })
  })
}
