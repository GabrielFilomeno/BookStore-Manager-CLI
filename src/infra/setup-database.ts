import { readFile } from 'node:fs/promises';
import { pool } from './database.js';

export async function setupDatabase(): Promise<void> {
  console.log('Iniciando criação das tabelas no PostgreSQL...');
  try {
    const schemaSql = await readFile(new URL('./schema.sql', import.meta.url), 'utf-8');
    await pool.query(schemaSql);

    console.log('Tabelas criadas com sucesso no banco de dados!');
    console.log('  - authors OK');
    console.log('  - books OK');
    console.log('  - clients OK');
    console.log('  - loans OK');
  } catch (error) {
    console.error('Erro ao criar as tabelas no banco de dados:');
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    throw error;
  } finally {
    await pool.end();
  }
}

setupDatabase().catch(() => {
  process.exit(1);
});
