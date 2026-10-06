import { ReportService } from '../services/report-service.js';

export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  public async availableBooksReport(): Promise<void> {
    console.log('\n--- RELATÓRIO: LIVROS DISPONÍVEIS ---');

    try {
      const items = await this.reportService.getAvailableBooks();

      if (items.length === 0) {
        console.log('Nenhum livro disponível no momento.');
        return;
      }

      console.table(
        items.map((item) => ({
          ID: item.id,
          Título: item.title,
          Autor: item.authorName,
          Gênero: item.genre,
          Disponíveis: item.availableQuantity,
          Total: item.totalQuantity,
        }))
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao gerar relatório de livros disponíveis: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao gerar relatório.');
      }
    }
  }

  public async borrowedBooksReport(): Promise<void> {
    console.log('\n--- RELATÓRIO: LIVROS EMPRESTADOS ---');

    try {
      const items = await this.reportService.getBorrowedBooks();

      if (items.length === 0) {
        console.log('Nenhum livro encontra-se emprestado no momento.');
        return;
      }

      console.table(
        items.map((item) => ({
          'ID Empréstimo': item.loanId,
          Livro: item.bookTitle,
          Cliente: item.clientName,
          CPF: item.clientCpf,
          'Data do Empréstimo': item.loanDate.toLocaleDateString('pt-BR'),
        }))
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao gerar relatório de livros emprestados: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao gerar relatório.');
      }
    }
  }

  public async booksByAuthorReport(): Promise<void> {
    console.log('\n--- RELATÓRIO: LIVROS CADASTRADOS POR AUTOR ---');

    try {
      const items = await this.reportService.getBooksByAuthor();

      if (items.length === 0) {
        console.log('Nenhum autor ou livro cadastrado no momento.');
        return;
      }

      console.table(
        items.map((item) => ({
          Autor: item.authorName,
          Livro: item.bookTitle ?? '(Nenhum livro cadastrado)',
          Gênero: item.genre ?? 'N/A',
          Disponíveis: item.availableQuantity !== null ? item.availableQuantity : 'N/A',
        }))
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao gerar relatório de livros por autor: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao gerar relatório.');
      }
    }
  }

  public async loansPerBookReport(): Promise<void> {
    console.log('\n--- RELATÓRIO: QUANTIDADE DE EMPRÉSTIMOS POR LIVRO ---');

    try {
      const items = await this.reportService.getLoansPerBook();

      if (items.length === 0) {
        console.log('Nenhum livro cadastrado no momento.');
        return;
      }

      console.table(
        items.map((item) => ({
          ID: item.bookId,
          Livro: item.bookTitle,
          'Total de Empréstimos': item.loansCount,
        }))
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao gerar relatório de empréstimos por livro: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao gerar relatório.');
      }
    }
  }

  public async clientsWithActiveLoansReport(): Promise<void> {
    console.log('\n--- RELATÓRIO: CLIENTES COM EMPRÉSTIMOS ATIVOS ---');

    try {
      const items = await this.reportService.getClientsWithActiveLoans();

      if (items.length === 0) {
        console.log('Nenhum cliente com empréstimo ativo no momento.');
        return;
      }

      console.table(
        items.map((item) => ({
          ID: item.clientId,
          Cliente: item.clientName,
          CPF: item.clientCpf,
          'Empréstimos Ativos': item.activeLoansCount,
        }))
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao gerar relatório de clientes com empréstimos ativos: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao gerar relatório.');
      }
    }
  }
}
