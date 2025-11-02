import { Application } from "express";
import { initAuth, RouteGenerator } from "@baijanstack/express-auth";
import { GoogleEmailService } from "./google-email";
import { authConfig } from "../../config";
import { EmailNotificationService } from "./notifier";
import {
  SignUpHandler,
  LoginHandler,
  LogoutHandler,
  RefreshHandler,
  ResetPasswordHandler,
  MeRouteHandler,
  VerifyEmailHandler,
  ForgotPasswordHandler,
  SendOtpHandler,
} from "./handler";

export function createAuth(app: Application) {
  const emailService = new GoogleEmailService();

  const notificationService = new EmailNotificationService(emailService);

  const routeGenerator = new RouteGenerator(
    app,
    notificationService,
    authConfig
  );

  initAuth({
    routeGenerator,
    signUpHandler: new SignUpHandler(),
    loginHandler: new LoginHandler(),
    logoutHandler: new LogoutHandler(),
    refreshHandler: new RefreshHandler(),
    resetPasswordHandler: new ResetPasswordHandler(),
    meRouteHandler: new MeRouteHandler(),
    verifyEmailHandler: new VerifyEmailHandler(),
    forgotPasswordHandler: new ForgotPasswordHandler(),
    sendOtpHandler: new SendOtpHandler(),
  });

  return routeGenerator;
}
