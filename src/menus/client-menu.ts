import type * as readline from 'node:readline/promises';
import { ClientRepository } from '../repositories/client-repository.js';
import { ClientService } from '../services/client-service.js';
import { ClientController } from '../controllers/client-controller.js';

enum ClientMenuOption {
  REGISTER = '1',
  LIST = '2',
  GET = '3',
  UPDATE = '4',
  DELETE = '5',
  BACK = '6',
}

const clientRepository = new ClientRepository();
const clientService = new ClientService(clientRepository);
const clientController = new ClientController(clientService);

function displayClientMenu(): void {
  console.clear();
  console.log('========================================');
  console.log('          GERENCIAR CLIENTES            ');
  console.log('========================================');
  console.log('1. Cadastrar cliente');
  console.log('2. Listar clientes');
  console.log('3. Buscar cliente por ID');
  console.log('4. Atualizar cliente');
  console.log('5. Remover cliente');
  console.log('6. Voltar ao menu principal');
  console.log('========================================');
}

async function waitForKeyPress(terminal: readline.Interface): Promise<void> {
  await terminal.question('\nPressione Enter para continuar...');
}

export async function clientMenu(terminal: readline.Interface): Promise<void> {
  let isRunning = true;

  while (isRunning) {
    displayClientMenu();
    const choice = (await terminal.question('Escolha uma opção: ')).trim();

    switch (choice) {
      case ClientMenuOption.REGISTER:
        await clientController.register(terminal);
        await waitForKeyPress(terminal);
        break;

      case ClientMenuOption.LIST:
        await clientController.list();
        await waitForKeyPress(terminal);
        break;

      case ClientMenuOption.GET:
        await clientController.getById(terminal);
        await waitForKeyPress(terminal);
        break;

      case ClientMenuOption.UPDATE:
        await clientController.update(terminal);
        await waitForKeyPress(terminal);
        break;

      case ClientMenuOption.DELETE:
        await clientController.delete(terminal);
        await waitForKeyPress(terminal);
        break;

      case ClientMenuOption.BACK:
        isRunning = false;
        break;

      default:
        console.log('\nOpção inválida! Escolha um número entre 1 e 6.');
        await waitForKeyPress(terminal);
        break;
    }
  }
}
