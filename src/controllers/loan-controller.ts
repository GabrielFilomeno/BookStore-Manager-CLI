import type * as readline from 'node:readline/promises';
import { LoanService } from '../services/loan-service.js';

export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  public async register(terminal: readline.Interface): Promise<void> {
    console.log('\n--- REALIZAR EMPRÉSTIMO DE LIVRO ---');

    try {
      const books = await this.loanService.getBooks();
      if (books.length === 0) {
        console.log('\nNenhum livro cadastrado no sistema.');
        return;
      }

      console.log('\n--- LIVROS DISPONÍVEIS ---');
      console.table(
        books.map((b) => ({
          ID: b.id,
          Título: b.title,
          Gênero: b.genre,
          Disponíveis: b.available_quantity,
        }))
      );

      const bookId = (await terminal.question('\nInforme o ID do livro: ')).trim();

      const clients = await this.loanService.getClients();
      if (clients.length === 0) {
        console.log('\nNenhum cliente cadastrado no sistema.');
        return;
      }

      console.log('\n--- CLIENTES CADASTRADOS ---');
      console.table(
        clients.map((c) => ({
          ID: c.id,
          Nome: c.name,
          CPF: c.cpf,
        }))
      );

      const clientId = (await terminal.question('\nInforme o ID do cliente: ')).trim();

      const loanDateInput = (
        await terminal.question('\nInforme a data do empréstimo (DD/MM/AAAA) ou pressione Enter para usar a data atual: ')
      ).trim();

      let loanDate: Date | undefined;
      if (loanDateInput.length > 0) {
        loanDate = this.parseDate(loanDateInput);
      }

      const loan = await this.loanService.createLoan({
        bookId,
        clientId,
        loanDate,
      });

      console.log('\nEmpréstimo realizado com sucesso!');
      console.log(`ID do Empréstimo: ${loan.id}`);
      console.log(`ID do Livro: ${loan.bookId}`);
      console.log(`ID do Cliente: ${loan.clientId}`);
      console.log(`Data do Empréstimo: ${loan.loanDate.toLocaleDateString('pt-BR')}`);
      console.log(`Registrado em: ${loan.createdAt.toLocaleString('pt-BR')}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao realizar empréstimo: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao realizar empréstimo.');
      }
    }
  }

  public async returnBook(terminal: readline.Interface): Promise<void> {
    console.log('\n--- REGISTRAR DEVOLUÇÃO DE LIVRO ---');

    try {
      const loans = await this.loanService.listLoans();
      if (loans.length === 0) {
        console.log('\nNenhum empréstimo pendente para devolução.');
        return;
      }

      console.log('\n--- EMPRÉSTIMOS ATIVOS ---');
      console.table(
        loans.map((l) => ({
          'ID Empréstimo': l.id,
          'Livro': l.bookTitle,
          'Cliente': l.clientName,
          'Data Empréstimo': l.loanDate.toLocaleDateString('pt-BR'),
        }))
      );

      const loanId = (await terminal.question('\nInforme o ID do empréstimo a ser devolvido: ')).trim();

      if (!loanId) {
        console.log('\nID do empréstimo não pode ser vazio.');
        return;
      }

      await this.loanService.returnLoan(loanId);
      console.log('\nDevolução registrada com sucesso! A quantidade disponível do livro foi atualizada.');
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao registrar devolução: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao registrar devolução.');
      }
    }
  }

  public async list(): Promise<void> {
    console.log('\n--- CONSULTAR EMPRÉSTIMOS ---');

    try {
      const loans = await this.loanService.listLoans();

      if (loans.length === 0) {
        console.log('Nenhum empréstimo cadastrado até o momento.');
        return;
      }

      console.table(
        loans.map((loan) => ({
          'ID Empréstimo': loan.id,
          'Livro (ID)': `${loan.bookTitle} - (${loan.bookId})`,
          'Cliente (CPF)': `${loan.clientName} - (${loan.clientCpf})`,
          'Data Empréstimo': loan.loanDate.toLocaleDateString('pt-BR'),
        }))
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao consultar empréstimos: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao consultar empréstimos.');
      }
    }
  }

  private parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    if (!day || !month || !year) {
      throw new Error('Data no formato inválido. Use o formato DD/MM/AAAA.');
    }
    return new Date(year, month - 1, day);
  }
}
