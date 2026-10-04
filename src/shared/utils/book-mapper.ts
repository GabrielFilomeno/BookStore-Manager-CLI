import { Book } from '../../entities/book.js';
import type { BookModel } from '../../models/book-model.js';

export class BookMapper {
  public static toEntity(model: BookModel): Book {
    return new Book({
      id: model.id,
      authorId: model.author_id,
      title: model.title,
      genre: model.genre,
      releaseDate: new Date(model.release_date),
      total_quantity: model.total_quantity,
      available_quantity: model.available_quantity,
      createdAt: new Date(model.created_at),
      updatedAt: new Date(model.updated_at),
    });
  }

  public static toModel(book: Book): BookModel {
    return {
      id: book.id,
      author_id: book.authorId,
      title: book.title,
      genre: book.genre,
      release_date: book.releaseDate,
      total_quantity: book.total_quantity,
      available_quantity: book.available_quantity,
      created_at: book.createdAt,
      updated_at: book.updatedAt,
    };
  }
}
