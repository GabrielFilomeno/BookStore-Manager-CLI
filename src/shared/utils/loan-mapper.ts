import { Loan } from '../../entities/loan.js';
import type { LoanModel } from '../../models/loan-model.js';

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
}
