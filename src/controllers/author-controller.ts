import type * as readline from 'node:readline/promises';
import { AuthorService } from '../services/author-service.js';

export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  public async register(terminal: readline.Interface): Promise<void> {
    console.log('\n--- CADASTRO DE AUTOR ---');
    const name = await terminal.question('Informe o nome do autor: ');

    try {
      const author = await this.authorService.createAuthor(name);
      console.log('\nAutor cadastrado com sucesso!');
      console.log(`ID: ${author.id}`);
      console.log(`Nome: ${author.name}`);
      console.log(`Criado em: ${author.createdAt.toLocaleString('pt-BR')}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao cadastrar autor: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao cadastrar autor.');
      }
    }
  }

    public async list(): Promise<void> {
    console.log('\n--- LISTA DE AUTORES ---');

    try {
      const authors = await this.authorService.listAuthors();

      if (authors.length === 0) {
        console.log('Nenhum autor cadastrado até o momento.');
        return;
      }

      console.table(
        authors.map((author) => ({
          ID: author.id,
          Nome: author.name,
          'Criado em': author.createdAt.toLocaleString('pt-BR'),
          'Atualizado em': author.updatedAt.toLocaleString('pt-BR'),
        }))
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao listar autores: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao listar autores.');
      }
    }
  }

  public async getById(terminal: readline.Interface): Promise<void> {
    console.log('\n--- BUSCAR AUTOR POR ID ---');
    const id = await terminal.question('Informe o ID do autor: ');

    try {
      const author = await this.authorService.getAuthorById(id);
      console.log('\nAutor encontrado com sucesso!');
      console.log(`ID: ${author.id}`);
      console.log(`Nome: ${author.name}`);
      console.log(`Criado em: ${author.createdAt.toLocaleString('pt-BR')}`);
      console.log(`Atualizado em: ${author.updatedAt.toLocaleString('pt-BR')}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao buscar autor: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao buscar autor.');
      }
    }
  }

  public async update(terminal: readline.Interface): Promise<void> {
    console.log('\n--- ATUALIZAR AUTOR ---');
    const id = (await terminal.question('Informe o ID do autor: ')).trim();

    if (!id) {
      console.log('\nID não pode ser vazio.');
      return;
    }

    const newName = await terminal.question('Informe o novo nome do autor: ');

    try {
      const author = await this.authorService.updateAuthor(id, newName);
      console.log('\nAutor atualizado com sucesso!');
      console.log(`ID: ${author.id}`);
      console.log(`Novo Nome: ${author.name}`);
      console.log(`Atualizado em: ${author.updatedAt.toLocaleString('pt-BR')}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao atualizar autor: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao atualizar autor.');
      }
    }
  }
}
