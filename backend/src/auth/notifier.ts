import { INotifyService } from "@baijanstack/express-auth";
interface TSendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export interface IEmailService {
  sendEmail(options: TSendEmailOptions): Promise<void>;
}

export class EmailNotificationService implements INotifyService {
  constructor(private emailService: IEmailService) {}

  async sendTokenStolen(email: string): Promise<void> {
    await this.emailService.sendEmail({
      to: email,
      html: `<h1>Token Stolen</h1>`,
      subject: " Stolen",
      text: "Token Stolen",
    });
  }
  async sendOtp(
    email: string,
    payload: { code: string; generatedAt: number }
  ): Promise<void> {
    await this.emailService.sendEmail({
      to: email,
      html: `<h1>Code: ${payload.code}</h1>`,
      subject: "OTP Code",
      text: `Code: ${payload.code}`,
    });
  }
  async notifyEmailVerified(email: string): Promise<void> {
    await this.emailService.sendEmail({
      to: email,
      html: `<h1>Account Verified</h1>`,
      subject: "Account Verified",
      text: "Account Verified",
    });
  }
}
