import { pool } from '../infra/database.js';
import {
  ReportMapper,
  type AvailableBookRaw,
  type AvailableBookReportItem,
  type BorrowedBookRaw,
  type BorrowedBookReportItem,
  type BooksByAuthorRaw,
  type BooksByAuthorReportItem,
  type LoansPerBookRaw,
  type LoansPerBookReportItem,
  type ClientsWithActiveLoansRaw,
  type ClientsWithActiveLoansReportItem,
} from '../shared/utils/report-mapper.js';

export {
  type AvailableBookReportItem,
  type BorrowedBookReportItem,
  type BooksByAuthorReportItem,
  type LoansPerBookReportItem,
  type ClientsWithActiveLoansReportItem,
};

export class ReportRepository {
  public async getAvailableBooks(): Promise<AvailableBookReportItem[]> {
    const query = `
      SELECT 
        b.id,
        b.title,
        b.genre,
        a.name AS author_name,
        b.available_quantity,
        b.total_quantity
      FROM books b
      INNER JOIN authors a ON a.id = b.author_id
      WHERE b.available_quantity > 0
      ORDER BY b.title ASC
    `;
    const result = await pool.query<AvailableBookRaw>(query);
    return result.rows.map((row) => ReportMapper.toAvailableBookItem(row));
  }

  public async getBorrowedBooks(): Promise<BorrowedBookReportItem[]> {
    const query = `
      SELECT 
        l.id AS loan_id,
        b.title AS book_title,
        c.name AS client_name,
        c.cpf AS client_cpf,
        l.loan_date
      FROM loans l
      INNER JOIN books b ON b.id = l.book_id
      INNER JOIN clients c ON c.id = l.client_id
      ORDER BY l.loan_date DESC
    `;
    const result = await pool.query<BorrowedBookRaw>(query);
    return result.rows.map((row) => ReportMapper.toBorrowedBookItem(row));
  }

  public async getBooksByAuthor(): Promise<BooksByAuthorReportItem[]> {
    const query = `
      SELECT 
        a.id AS author_id,
        a.name AS author_name,
        b.id AS book_id,
        b.title AS book_title,
        b.genre,
        b.available_quantity
      FROM authors a
      LEFT JOIN books b ON b.author_id = a.id
      ORDER BY a.name ASC, b.title ASC
    `;
    const result = await pool.query<BooksByAuthorRaw>(query);
    return result.rows.map((row) => ReportMapper.toBooksByAuthorItem(row));
  }

  public async getLoansPerBook(): Promise<LoansPerBookReportItem[]> {
    const query = `
      SELECT 
        b.id AS book_id,
        b.title AS book_title,
        COUNT(l.id) AS loans_count
      FROM books b
      LEFT JOIN loans l ON l.book_id = b.id
      GROUP BY b.id, b.title
      ORDER BY loans_count DESC, b.title ASC
    `;
    const result = await pool.query<LoansPerBookRaw>(query);
    return result.rows.map((row) => ReportMapper.toLoansPerBookItem(row));
  }

  public async getClientsWithActiveLoans(): Promise<ClientsWithActiveLoansReportItem[]> {
    const query = `
      SELECT 
        c.id AS client_id,
        c.name AS client_name,
        c.cpf AS client_cpf,
        COUNT(l.id) AS active_loans_count
      FROM clients c
      INNER JOIN loans l ON l.client_id = c.id
      GROUP BY c.id, c.name, c.cpf
      ORDER BY active_loans_count DESC, c.name ASC
    `;
    const result = await pool.query<ClientsWithActiveLoansRaw>(query);
    return result.rows.map((row) => ReportMapper.toClientsWithActiveLoansItem(row));
  }
}
