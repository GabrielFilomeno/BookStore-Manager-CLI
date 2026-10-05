import { pool } from '../infra/database.js';
import { Book } from '../entities/book.js';
import { BookMapper } from '../shared/utils/book-mapper.js';
import type { BookModel } from '../models/book-model.js';

export class BookRepository {
  public async create(book: Book): Promise<void> {
    const query = `
      INSERT INTO books (id, author_id, title, genre, description, release_date, total_quantity, available_quantity, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
    const values = [
      book.id,
      book.authorId,
      book.title,
      book.genre,
      book.description ?? null,
      book.releaseDate,
      book.total_quantity,
      book.available_quantity,
      book.createdAt,
      book.updatedAt,
    ];
    await pool.query(query, values);
  }

  
  public async findAll(): Promise<Book[]> {
    const query = `
      SELECT id, author_id, title, genre, description, release_date, total_quantity, available_quantity, created_at, updated_at
      FROM books
      ORDER BY title ASC
    `;
    const result = await pool.query<BookModel>(query);
    return result.rows.map((model) => BookMapper.toEntity(model));
  }

  
  public async findById(id: string): Promise<Book | null> {
    const query = `
      SELECT id, author_id, title, genre, description, release_date, total_quantity, available_quantity, created_at, updated_at
      FROM books
      WHERE id = $1
    `;
    const result = await pool.query<BookModel>(query, [id]);
    const model = result.rows[0];

    if (!model) {
      return null;
    }

    return BookMapper.toEntity(model);
  }

  public async update(book: Book): Promise<void> {
    const query = `
      UPDATE books
      SET author_id = $1, title = $2, genre = $3, description = $4, release_date = $5, total_quantity = $6, available_quantity = $7, updated_at = $8
      WHERE id = $9
    `;
    await pool.query(query, [
      book.authorId,
      book.title,
      book.genre,
      book.description ?? null,
      book.releaseDate,
      book.total_quantity,
      book.available_quantity,
      book.updatedAt,
      book.id,
    ]);
  }

  public async delete(id: string): Promise<void> {
    const query = `
      DELETE FROM books
      WHERE id = $1
    `;
    await pool.query(query, [id]);
  }
}
