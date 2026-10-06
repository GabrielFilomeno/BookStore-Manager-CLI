import { Author } from '../../entities/author.js';
import type { AuthorModel } from '../../models/author-model.js';

export class AuthorMapper {
  public static toEntity(model: AuthorModel): Author {
    return new Author({
      id: model.id,
      name: model.name,
      createdAt: new Date(model.created_at),
      updatedAt: new Date(model.updated_at),
    });
  }

  public static toModel(author: Author): AuthorModel {
    return {
      id: author.id,
      name: author.name,
      created_at: author.createdAt,
      updated_at: author.updatedAt,
    };
  }
}
