import { Loan } from '../../entities/loan.js';
import type { LoanModel } from '../../models/loan-model.js';

export interface LoanQueryResult {
  id: string;
  book_id: string;
  book_title: string;
  client_id: string;
  client_name: string;
  client_cpf: string;
  loan_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface LoanWithDetails {
  id: string;
  bookId: string;
  bookTitle: string;
  clientId: string;
  clientName: string;
  clientCpf: string;
  loanDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class LoanMapper {
  public static toEntity(model: LoanModel): Loan {
    return new Loan({
      id: model.id,
      bookId: model.book_id,
      clientId: model.client_id,
      loanDate: new Date(model.loan_date),
      createdAt: new Date(model.created_at),
      updatedAt: new Date(model.updated_at),
    });
  }

  public static toModel(loan: Loan): LoanModel {
    return {
      id: loan.id,
      book_id: loan.bookId,
      client_id: loan.clientId,
      loan_date: loan.loanDate,
      created_at: loan.createdAt,
      updated_at: loan.updatedAt,
    };
  }

  public static toLoanWithDetails(row: LoanQueryResult): LoanWithDetails {
    return {
      id: row.id,
      bookId: row.book_id,
      bookTitle: row.book_title,
      clientId: row.client_id,
      clientName: row.client_name,
      clientCpf: row.client_cpf,
      loanDate: new Date(row.loan_date),
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
