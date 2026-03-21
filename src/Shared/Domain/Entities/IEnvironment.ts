export const ENUM_NODE_ENV = {
  development: 'development',
  production: 'production',
} as const;

export type NodeEnv = (typeof ENUM_NODE_ENV)[keyof typeof ENUM_NODE_ENV];

export interface IEnvironment {
  NODE_ENV: NodeEnv;
  PORT: number;
  DATABASE_URL: string;
  BCRYPT_SALT_ROUNDS: string;
}
