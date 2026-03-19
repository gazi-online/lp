import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const dbFetch = async <T>(query: string, params?: any[]): Promise<T[]> => {
  const [rows] = await pool.execute(query, params);
  return rows as T[];
};

export const dbExec = async (query: string, params?: any[]): Promise<any> => {
  const [result] = await pool.execute(query, params);
  return result;
};

export default pool;
