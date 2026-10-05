import type * as readline from 'node:readline/promises';
import { ClientService } from '../services/client-service.js';

export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  public async register(terminal: readline.Interface): Promise<void> {
    console.log('\n--- CADASTRO DE CLIENTE ---');
    const name = (await terminal.question('Informe o nome do cliente: ')).trim();
    const cpf = (await terminal.question('Informe o CPF do cliente (ex: 123.456.789-00): ')).trim();
    const addressInput = (await terminal.question('Informe o endereço do cliente (opcional): ')).trim();

    try {
      const client = await this.clientService.createClient({
        name,
        cpf,
        address: addressInput.length > 0 ? addressInput : null,
      });

      console.log('\nCliente cadastrado com sucesso!');
      console.log(`ID: ${client.id}`);
      console.log(`Nome: ${client.name}`);
      console.log(`CPF: ${client.cpf}`);
      console.log(`Endereço: ${client.address ?? 'N/A'}`);
      console.log(`Criado em: ${client.createdAt.toLocaleString('pt-BR')}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao cadastrar cliente: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao cadastrar cliente.');
      }
    }
  }

  public async list(): Promise<void> {
    console.log('\n--- LISTA DE CLIENTES ---');

    try {
      const clients = await this.clientService.listClients();

      if (clients.length === 0) {
        console.log('Nenhum cliente cadastrado até o momento.');
        return;
      }

      console.table(
        clients.map((client) => ({
          ID: client.id,
          Nome: client.name,
          CPF: client.cpf,
          Endereço: client.address ?? 'N/A',
          'Criado em': client.createdAt.toLocaleString('pt-BR'),
          'Atualizado em': client.updatedAt.toLocaleString('pt-BR'),
        }))
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao listar clientes: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao listar clientes.');
      }
    }
  }

  public async getById(terminal: readline.Interface): Promise<void> {
    console.log('\n--- BUSCAR CLIENTE POR ID ---');
    const id = (await terminal.question('Informe o ID do cliente: ')).trim();

    try {
      const client = await this.clientService.getClientById(id);
      console.log('\nCliente encontrado com sucesso!');
      console.log(`ID: ${client.id}`);
      console.log(`Nome: ${client.name}`);
      console.log(`CPF: ${client.cpf}`);
      console.log(`Endereço: ${client.address ?? 'N/A'}`);
      console.log(`Criado em: ${client.createdAt.toLocaleString('pt-BR')}`);
      console.log(`Atualizado em: ${client.updatedAt.toLocaleString('pt-BR')}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao buscar cliente: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao buscar cliente.');
      }
    }
  }

  public async update(terminal: readline.Interface): Promise<void> {
    console.log('\n--- ATUALIZAR CLIENTE ---');
    const id = (await terminal.question('Informe o ID do cliente: ')).trim();

    if (!id) {
      console.log('\nID não pode ser vazio.');
      return;
    }

    try {
      const existingClient = await this.clientService.getClientById(id);
      console.log(`\nCliente atual: "${existingClient.name}" (CPF: ${existingClient.cpf})`);
      console.log('Pressione Enter em qualquer campo para manter o valor atual.\n');

      const nameInput = (await terminal.question(`Novo nome [${existingClient.name}]: `)).trim();
      const cpfInput = (await terminal.question(`Novo CPF [${existingClient.cpf}]: `)).trim();
      const addressInput = (await terminal.question(`Novo endereço [${existingClient.address ?? ''}]: `)).trim();

      const name = nameInput.length > 0 ? nameInput : undefined;
      const cpf = cpfInput.length > 0 ? cpfInput : undefined;
      const address = addressInput.length > 0 ? addressInput : null;

      const updatedClient = await this.clientService.updateClient(id, {
        name,
        cpf,
        address,
      });

      console.log('\nCliente atualizado com sucesso!');
      console.log(`ID: ${updatedClient.id}`);
      console.log(`Nome: ${updatedClient.name}`);
      console.log(`CPF: ${updatedClient.cpf}`);
      console.log(`Endereço: ${updatedClient.address ?? 'N/A'}`);
      console.log(`Atualizado em: ${updatedClient.updatedAt.toLocaleString('pt-BR')}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao atualizar cliente: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao atualizar cliente.');
      }
    }
  }

  public async delete(terminal: readline.Interface): Promise<void> {
    console.log('\n--- EXCLUIR CLIENTE ---');
    const id = (await terminal.question('Informe o ID do cliente a ser excluído: ')).trim();

    if (!id) {
      console.log('\nID não pode ser vazio.');
      return;
    }

    try {
      const existingClient = await this.clientService.getClientById(id);
      const confirm = (
        await terminal.question(`Tem certeza que deseja remover o cliente "${existingClient.name}"? (s/N): `)
      ).trim().toLowerCase();

      if (confirm === 's' || confirm === 'sim') {
        await this.clientService.deleteClient(id);
        console.log('\nCliente excluído com sucesso!');
      } else {
        console.log('\nOperação cancelada.');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nErro ao excluir cliente: ${error.message}`);
      } else {
        console.error('\nErro desconhecido ao excluir cliente.');
      }
    }
  }
}
