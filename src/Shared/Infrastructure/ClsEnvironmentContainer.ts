import { IEnvironment } from '../Domain/Entities/IEnvironment';
import { validateEnvironment } from './EnvironmentValidator';
import dotenv from 'dotenv';

/* process.loadEnvFile(); */

// Carga .env solo en desarrollo, pero de forma SINCRÓNICA
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export class ClsEnvironmentContainer {
  private static instance: IEnvironment;

  public static getInstance(): IEnvironment {
    if (!this.instance) {
      const envValues = {
        NODE_ENV: process.env.NODE_ENV,
        PORT: Number(process.env.PORT),
        DATABASE_URL: process.env.DATABASE_URL,
        BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
      };

      try {
        this.instance = validateEnvironment(envValues);
      } catch (error) {
        console.error('Error validating environment variables:', error);
        process.exit(1);
      }
    }

    return this.instance;
  }
}

export const env = ClsEnvironmentContainer.getInstance();
