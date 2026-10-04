import { pool } from '../infra/database.js';
import { Book } from '../entities/book.js';
import { BookMapper } from '../shared/utils/book-mapper.js';
import type { BookModel } from '../models/book-model.js';

export class BookRepository {
  public async create(book: Book): Promise<void> {
    const query = `
      INSERT INTO books (id, author_id, title, genre, release_date, total_quantity, available_quantity, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    const values = [
      book.id,
      book.authorId,
      book.title,
      book.genre,
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
      SELECT id, author_id, title, genre, release_date, total_quantity, available_quantity, created_at, updated_at
      FROM books
      ORDER BY title ASC
    `;
    const result = await pool.query<BookModel>(query);
    return result.rows.map((model) => BookMapper.toEntity(model));
  }

  
  public async findById(id: string): Promise<Book | null> {
    const query = `
      SELECT id, author_id, title, genre, release_date, total_quantity, available_quantity, created_at, updated_at
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
}
