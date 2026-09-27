import { pool } from '../infra/database.js';
import { Author } from '../entities/author.js';
import { AuthorMapper } from '../shared/utils/author-mapper.js';
import type { AuthorModel } from '../models/author-model.js';

export class AuthorRepository {
  public async create(author: Author): Promise<void> {
    const query = `
      INSERT INTO authors (id, name, created_at, updated_at)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [author.id, author.name, author.createdAt, author.updatedAt];
    await pool.query(query, values);
  }

  public async findAll(): Promise<Author[]> {
    const query = `
      SELECT id, name, created_at, updated_at
      FROM authors
      ORDER BY name ASC
    `;
    const result = await pool.query<AuthorModel>(query);
    return result.rows.map((model) => AuthorMapper.toEntity(model));
  }
}
