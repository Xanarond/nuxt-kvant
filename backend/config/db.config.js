export const HOST = process.env.DB_HOST;
export const USER = process.env.DB_USERNAME;
export const PASSWORD = process.env.DB_PASSWORD;
export const DB = process.env.DB_DATABASE;
export const dialect = process.env.DB_CONNECTION;
export const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};
export const port = 5432;
