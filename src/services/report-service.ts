import {
  ReportRepository,
  type AvailableBookReportItem,
  type BorrowedBookReportItem,
  type BooksByAuthorReportItem,
  type LoansPerBookReportItem,
  type ClientsWithActiveLoansReportItem,
} from '../repositories/report-repository.js';

export class ReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  public async getAvailableBooks(): Promise<AvailableBookReportItem[]> {
    return this.reportRepository.getAvailableBooks();
  }

  public async getBorrowedBooks(): Promise<BorrowedBookReportItem[]> {
    return this.reportRepository.getBorrowedBooks();
  }

  public async getBooksByAuthor(): Promise<BooksByAuthorReportItem[]> {
    return this.reportRepository.getBooksByAuthor();
  }

  public async getLoansPerBook(): Promise<LoansPerBookReportItem[]> {
    return this.reportRepository.getLoansPerBook();
  }

  public async getClientsWithActiveLoans(): Promise<ClientsWithActiveLoansReportItem[]> {
    return this.reportRepository.getClientsWithActiveLoans();
  }
}
