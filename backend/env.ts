import z from "zod";
import dotenv from "dotenv";

dotenv.config();
const envSchema = z.object({
  PORT: z.number(),
  WHITELISTED_ORIGINS: z.array(z.string()),
  DATABASE_URL: z.string().min(1),
  auth: z.object({
    SALT_ROUNDS: z.number(),
    TOKEN_SECRET: z.string().min(1),
    ACCESS_TOKEN_AGE: z.number(),
    REFRESH_TOKEN_AGE: z.number(),
    OTP_AGE: z.number(),
    OTP_SECRET: z.string().min(1),
    TEST_OTP: z.string().optional(),
  }),
  smtp: z.object({
    SMTP_AUTH_USER: z.string().min(5),
    SMTP_AUTH_PASS: z.string().min(5),
  }),
  cloudinary: z.object({
    cloud_name:  z.string().min(5),
    api_key:  z.string().min(5),
    api_secret: z.string().min(5) ,
  })
});

type TEnv = z.infer<typeof envSchema>;

const env: TEnv = {
  PORT: Number(process.env["PORT"]),
  WHITELISTED_ORIGINS: process.env["WHITELISTED_ORIGINS"]?.split(",") ?? [],
  DATABASE_URL: process.env["DATABASE_URL"] || "",
  auth: {
    SALT_ROUNDS: Number(process.env["SALT_ROUNDS"]) || 10,
    TOKEN_SECRET: process.env["TOKEN_SECRET"] || "",
    ACCESS_TOKEN_AGE: Number(process.env["ACCESS_TOKEN_AGE"]) || 60000,
    REFRESH_TOKEN_AGE: Number(process.env["REFRESH_TOKEN_AGE"]) || 86400000,
    OTP_AGE: Number(process.env["OTP_AGE"]) || 50,
    OTP_SECRET: process.env["OTP_SECRET"] || "",
    TEST_OTP: process.env["TEST_OTP"] || "",
  },
  smtp: {
    SMTP_AUTH_USER: process.env["SMTP_AUTH_USER"] || "",
    SMTP_AUTH_PASS: process.env["SMTP_AUTH_PASS"] || "",
  },
  cloudinary: {
    api_key: process.env["CLOUDINARY_API_KEY"] || "",
    api_secret: process.env["CLOUDINARY_API_SECRET"] || "",
    cloud_name: process.env["CLOUDINARY_CLOUD_NAME"] || ""
  }
};

export { env };
