import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

// Define the schema for your environment variables
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(5000),
  MONGODB_URI: Joi.string().required().description('Mongo DB URL'),
  
  // JWT Secrets MUST be provided in production (and generally)
  JWT_SECRET: Joi.string().required().description('JWT Access Secret'),
  JWT_REFRESH_SECRET: Joi.string().required().description('JWT Refresh Secret'),
  
  // Allowed CORS Origins (Comma-separated)
  ALLOWED_ORIGINS: Joi.string().default('http://localhost:3000').description('Comma-separated list of allowed CORS origins'),
  
  // Sentry
  SENTRY_DSN: Joi.string().uri().allow('').optional().description('Sentry DSN for error tracking'),
  
  // Stripe
  STRIPE_SECRET_KEY: Joi.string().optional().description('Stripe Secret Key'),
  STRIPE_WEBHOOK_SECRET: Joi.string().optional().description('Stripe Webhook Secret'),
}).unknown(); // Allow other unvalidated env variables

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  // If we are missing a secret, crash the app immediately before it can do harm
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    uri: envVars.MONGODB_URI,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    refreshSecret: envVars.JWT_REFRESH_SECRET,
  },
  allowedOrigins: envVars.ALLOWED_ORIGINS,
  sentryDsn: envVars.SENTRY_DSN,
  stripe: {
    secretKey: envVars.STRIPE_SECRET_KEY,
    webhookSecret: envVars.STRIPE_WEBHOOK_SECRET,
  }
};
