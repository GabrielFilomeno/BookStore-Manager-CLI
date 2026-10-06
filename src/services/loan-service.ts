import { Loan } from '../entities/loan.js';
import { LoanRepository } from '../repositories/loan-repository.js';
import { BookRepository } from '../repositories/book-repository.js';
import { ClientRepository } from '../repositories/client-repository.js';
import { Book } from '../entities/book.js';
import { Client } from '../entities/client.js';
import { InvalidParamError } from '../shared/errors/invalid-param.error.js';
import { NotFoundError } from '../shared/errors/not-found.error.js';
import { BookNotAvailableError } from '../shared/errors/book-not-available.error.js';
import type { LoanWithDetails } from '../shared/utils/loan-mapper.js';

export interface CreateLoanDTO {
  bookId: string;
  clientId: string;
  loanDate?: Date | undefined;
}

export class LoanService {
  constructor(
    private readonly loanRepository: LoanRepository,
    private readonly bookRepository: BookRepository,
    private readonly clientRepository: ClientRepository
  ) {}

  public async getBooks(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  public async getClients(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }

  public async createLoan(data: CreateLoanDTO): Promise<Loan> {
    const { bookId, clientId, loanDate } = data;

    if (!bookId || bookId.trim().length === 0) {
      throw new InvalidParamError('O ID do livro é obrigatório.', 'bookId');
    }

    if (!clientId || clientId.trim().length === 0) {
      throw new InvalidParamError('O ID do cliente é obrigatório.', 'clientId');
    }

    const book = await this.bookRepository.findById(bookId.trim());
    if (!book) {
      throw new NotFoundError(`Livro com ID "${bookId}" não foi encontrado.`);
    }

    const client = await this.clientRepository.findById(clientId.trim());
    if (!client) {
      throw new NotFoundError(`Cliente com ID "${clientId}" não foi encontrado.`);
    }

    if (book.available_quantity <= 0) {
      throw new BookNotAvailableError(
        `O livro "${book.title}" não possui exemplares disponíveis para empréstimo.`
      );
    }

    const finalLoanDate = loanDate && !isNaN(loanDate.getTime()) ? loanDate : new Date();

    const loan = new Loan({
      bookId: book.id,
      clientId: client.id,
      loanDate: finalLoanDate,
    });

    book.setAvailableQuantity(book.available_quantity - 1);
    await this.bookRepository.update(book);

    await this.loanRepository.create(loan);

    return loan;
  }

  public async returnLoan(loanId: string): Promise<void> {
    if (!loanId || loanId.trim().length === 0) {
      throw new InvalidParamError('O ID do empréstimo é obrigatório.', 'loanId');
    }

    const loan = await this.loanRepository.findById(loanId.trim());
    if (!loan) {
      throw new NotFoundError(`Empréstimo com ID "${loanId}" não foi encontrado.`);
    }

    const book = await this.bookRepository.findById(loan.bookId);
    if (book) {
      const newQuantity = book.available_quantity + 1;
      book.setAvailableQuantity(newQuantity);
      await this.bookRepository.update(book);
    }

    await this.loanRepository.delete(loan.id);
  }

  public async listLoans(): Promise<LoanWithDetails[]> {
    return this.loanRepository.findAllWithDetails();
  }

  public async getLoanById(loanId: string): Promise<Loan> {
    if (!loanId || loanId.trim().length === 0) {
      throw new InvalidParamError('O ID do empréstimo é obrigatório.', 'loanId');
    }

    const loan = await this.loanRepository.findById(loanId.trim());
    if (!loan) {
      throw new NotFoundError(`Empréstimo com ID "${loanId}" não foi encontrado.`);
    }

    return loan;
  }
}
