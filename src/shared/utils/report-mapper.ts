export interface AvailableBookRaw {
  id: string;
  title: string;
  genre: string;
  author_name: string;
  available_quantity: number;
  total_quantity: number;
}

export interface AvailableBookReportItem {
  id: string;
  title: string;
  genre: string;
  authorName: string;
  availableQuantity: number;
  totalQuantity: number;
}

export interface BorrowedBookRaw {
  loan_id: string;
  book_title: string;
  client_name: string;
  client_cpf: string;
  loan_date: Date;
}

export interface BorrowedBookReportItem {
  loanId: string;
  bookTitle: string;
  clientName: string;
  clientCpf: string;
  loanDate: Date;
}

export interface BooksByAuthorRaw {
  author_id: string;
  author_name: string;
  book_id: string | null;
  book_title: string | null;
  genre: string | null;
  available_quantity: number | null;
}

export interface BooksByAuthorReportItem {
  authorId: string;
  authorName: string;
  bookId: string | null;
  bookTitle: string | null;
  genre: string | null;
  availableQuantity: number | null;
}

export interface LoansPerBookRaw {
  book_id: string;
  book_title: string;
  loans_count: string | number;
}

export interface LoansPerBookReportItem {
  bookId: string;
  bookTitle: string;
  loansCount: number;
}

export interface ClientsWithActiveLoansRaw {
  client_id: string;
  client_name: string;
  client_cpf: string;
  active_loans_count: string | number;
}

export interface ClientsWithActiveLoansReportItem {
  clientId: string;
  clientName: string;
  clientCpf: string;
  activeLoansCount: number;
}

export class ReportMapper {
  public static toAvailableBookItem(row: AvailableBookRaw): AvailableBookReportItem {
    return {
      id: row.id,
      title: row.title,
      genre: row.genre,
      authorName: row.author_name,
      availableQuantity: Number(row.available_quantity),
      totalQuantity: Number(row.total_quantity),
    };
  }

  public static toBorrowedBookItem(row: BorrowedBookRaw): BorrowedBookReportItem {
    return {
      loanId: row.loan_id,
      bookTitle: row.book_title,
      clientName: row.client_name,
      clientCpf: row.client_cpf,
      loanDate: new Date(row.loan_date),
    };
  }

  public static toBooksByAuthorItem(row: BooksByAuthorRaw): BooksByAuthorReportItem {
    return {
      authorId: row.author_id,
      authorName: row.author_name,
      bookId: row.book_id,
      bookTitle: row.book_title,
      genre: row.genre,
      availableQuantity: row.available_quantity !== null ? Number(row.available_quantity) : null,
    };
  }

  public static toLoansPerBookItem(row: LoansPerBookRaw): LoansPerBookReportItem {
    return {
      bookId: row.book_id,
      bookTitle: row.book_title,
      loansCount: Number(row.loans_count),
    };
  }

  public static toClientsWithActiveLoansItem(row: ClientsWithActiveLoansRaw): ClientsWithActiveLoansReportItem {
    return {
      clientId: row.client_id,
      clientName: row.client_name,
      clientCpf: row.client_cpf,
      activeLoansCount: Number(row.active_loans_count),
    };
  }
}
