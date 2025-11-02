import { createTransport } from "nodemailer";
import { HTML_TEMPLATE } from "./template";
import { env } from "../../env";
interface TSendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export interface IEmailService {
  sendEmail(options: TSendEmailOptions): Promise<void>;
}

console.log('debug user, pass', env.smtp.SMTP_AUTH_PASS, env.smtp.SMTP_AUTH_USER)
const transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: env.smtp.SMTP_AUTH_USER,
    pass: env.smtp.SMTP_AUTH_PASS,
  },
});

interface TSendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export class GoogleEmailService implements IEmailService {
  async sendEmail(options: TSendEmailOptions) {
    try {
      const info = await transporter.sendMail({
        to: options.to,
        from: env.smtp.SMTP_AUTH_USER,
        text: options.text,
        subject: options.subject,
        html: HTML_TEMPLATE(options.html),
      });
    } catch (error) {
      console.error(
        {
          error,
          message: "Error sending email",
          options,
        },
        "Email sending failed"
      );
    }
  }
}
