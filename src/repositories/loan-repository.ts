import { pool } from '../infra/database.js';
import { Loan } from '../entities/loan.js';
import { LoanMapper, type LoanQueryResult, type LoanWithDetails } from '../shared/utils/loan-mapper.js';
import type { LoanModel } from '../models/loan-model.js';

export class LoanRepository {
  public async create(loan: Loan): Promise<void> {
    const query = `
      INSERT INTO loans (id, book_id, client_id, loan_date, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [
      loan.id,
      loan.bookId,
      loan.clientId,
      loan.loanDate,
      loan.createdAt,
      loan.updatedAt,
    ];
    await pool.query(query, values);
  }

  public async findAll(): Promise<Loan[]> {
    const query = `
      SELECT id, book_id, client_id, loan_date, created_at, updated_at
      FROM loans
      ORDER BY loan_date DESC
    `;
    const result = await pool.query<LoanModel>(query);
    return result.rows.map((model) => LoanMapper.toEntity(model));
  }

  public async findAllWithDetails(): Promise<LoanWithDetails[]> {
    const query = `
      SELECT 
        l.id,
        l.book_id,
        b.title AS book_title,
        l.client_id,
        c.name AS client_name,
        c.cpf AS client_cpf,
        l.loan_date,
        l.created_at,
        l.updated_at
      FROM loans l
      INNER JOIN books b ON b.id = l.book_id
      INNER JOIN clients c ON c.id = l.client_id
      ORDER BY l.loan_date DESC
    `;
    const result = await pool.query<LoanQueryResult>(query);
    return result.rows.map((row) => LoanMapper.toLoanWithDetails(row));
  }

  public async findById(id: string): Promise<Loan | null> {
    const query = `
      SELECT id, book_id, client_id, loan_date, created_at, updated_at
      FROM loans
      WHERE id = $1
    `;
    const result = await pool.query<LoanModel>(query, [id]);
    const model = result.rows[0];

    if (!model) {
      return null;
    }

    return LoanMapper.toEntity(model);
  }

  public async delete(id: string): Promise<void> {
    const query = `
      DELETE FROM loans
      WHERE id = $1
    `;
    await pool.query(query, [id]);
  }
}
