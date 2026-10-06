import type * as readline from 'node:readline/promises';
import { ReportRepository } from '../repositories/report-repository.js';
import { ReportService } from '../services/report-service.js';
import { ReportController } from '../controllers/report-controller.js';

enum ReportMenuOption {
  AVAILABLE_BOOKS = '1',
  BORROWED_BOOKS = '2',
  BOOKS_BY_AUTHOR = '3',
  LOANS_PER_BOOK = '4',
  CLIENTS_WITH_ACTIVE_LOANS = '5',
  BACK = '6',
}

const reportRepository = new ReportRepository();
const reportService = new ReportService(reportRepository);
const reportController = new ReportController(reportService);

function displayReportMenu(): void {
  console.clear();
  console.log('========================================');
  console.log('         PAINEL DE RELATÓRIOS           ');
  console.log('========================================');
  console.log('1. Livros disponíveis');
  console.log('2. Livros emprestados');
  console.log('3. Livros cadastrados por autor');
  console.log('4. Quantidade de empréstimos por livro');
  console.log('5. Clientes com empréstimos ativos');
  console.log('6. Voltar ao menu principal');
  console.log('========================================');
}

async function waitForKeyPress(terminal: readline.Interface): Promise<void> {
  await terminal.question('\nPressione Enter para continuar...');
}

export async function reportMenu(terminal: readline.Interface): Promise<void> {
  let isRunning = true;

  while (isRunning) {
    displayReportMenu();
    const choice = (await terminal.question('Escolha um relatório: ')).trim();

    switch (choice) {
      case ReportMenuOption.AVAILABLE_BOOKS:
        await reportController.availableBooksReport();
        await waitForKeyPress(terminal);
        break;

      case ReportMenuOption.BORROWED_BOOKS:
        await reportController.borrowedBooksReport();
        await waitForKeyPress(terminal);
        break;

      case ReportMenuOption.BOOKS_BY_AUTHOR:
        await reportController.booksByAuthorReport();
        await waitForKeyPress(terminal);
        break;

      case ReportMenuOption.LOANS_PER_BOOK:
        await reportController.loansPerBookReport();
        await waitForKeyPress(terminal);
        break;

      case ReportMenuOption.CLIENTS_WITH_ACTIVE_LOANS:
        await reportController.clientsWithActiveLoansReport();
        await waitForKeyPress(terminal);
        break;

      case ReportMenuOption.BACK:
        isRunning = false;
        break;

      default:
        console.log('\nOpção inválida! Escolha um número entre 1 e 6.');
        await waitForKeyPress(terminal);
        break;
    }
  }
}
