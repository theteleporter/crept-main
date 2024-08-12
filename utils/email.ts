import nodemailer from "nodemailer";

export async function sendEmail(urls: string[]) {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILGUN_SMTP_LOGIN,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.COMPANY_EMAIL,
    to: process.env.ADMIN_EMAIL, // Replace with your email
    subject: "Videos Uploaded",
    text: `The following videos have been uploaded and processed:\n\n${urls.join(
      "\n"
    )}`,
  });
}

