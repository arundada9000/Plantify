import { TConfig } from "@baijanstack/express-auth";
import { env } from "./env";

export const authConfig: TConfig = {
  BASE_PATH: "/v1/auth", // base path for authentication
  SALT_ROUNDS: env.auth.SALT_ROUNDS, // number of rounds for password hashing
  TOKEN_SECRET: env.auth.TOKEN_SECRET, // secret for token generation
  ACCESS_TOKEN_AGE: env.auth.ACCESS_TOKEN_AGE, // age of access token in seconds
  REFRESH_TOKEN_AGE: env.auth.REFRESH_TOKEN_AGE, // age of refresh token in seconds
  OTP_AGE: env.auth.OTP_AGE, // age of otp in seconds
  OTP_SECRET: env.auth.OTP_SECRET,
  TEST_OTP: env.auth.TEST_OTP, // test otp for testing purposes
};
