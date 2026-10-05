import { Client } from '../entities/client.js';
import { ClientRepository } from '../repositories/client-repository.js';
import { InvalidParamError } from '../shared/errors/invalid-param.error.js';
import { NotFoundError } from '../shared/errors/not-found.error.js';

export interface CreateClientDTO {
  name: string;
  cpf: string;
  address?: string | null;
}

export interface UpdateClientDTO {
  name?: string | undefined;
  cpf?: string | undefined;
  address?: string | null;
}

export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async createClient(data: CreateClientDTO): Promise<Client> {
    const { name, cpf, address } = data;

    if (!name || name.trim().length < 2) {
      throw new InvalidParamError('O nome do cliente deve conter pelo menos 2 caracteres.', 'name');
    }

    const cleanCpf = cpf ? cpf.replace(/\D/g, '') : '';
    if (cleanCpf.length !== 11) {
      throw new InvalidParamError('O CPF do cliente deve conter 11 dígitos numéricos.', 'cpf');
    }

    const existingClient = await this.clientRepository.findByCpf(cpf.trim());
    if (existingClient) {
      throw new InvalidParamError(`Já existe um cliente cadastrado com o CPF "${cpf}".`, 'cpf');
    }

    const client = new Client({
      name: name.trim(),
      cpf: cpf.trim(),
      address: address?.trim() ? address.trim() : null,
    });

    await this.clientRepository.create(client);
    return client;
  }

  public async listClients(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }

  public async getClientById(id: string): Promise<Client> {
    if (!id || id.trim().length === 0) {
      throw new InvalidParamError('O ID do cliente é obrigatório.', 'id');
    }

    const client = await this.clientRepository.findById(id.trim());
    if (!client) {
      throw new NotFoundError(`Cliente com ID "${id}" não foi encontrado.`);
    }

    return client;
  }

  public async updateClient(id: string, data: UpdateClientDTO): Promise<Client> {
    const client = await this.getClientById(id);

    if (data.name !== undefined) {
      if (data.name.trim().length < 2) {
        throw new InvalidParamError('O nome do cliente deve conter pelo menos 2 caracteres.', 'name');
      }
      client.updateName(data.name.trim());
    }

    if (data.cpf !== undefined) {
      const cleanCpf = data.cpf.replace(/\D/g, '');
      if (cleanCpf.length !== 11) {
        throw new InvalidParamError('O CPF do cliente deve conter 11 dígitos numéricos.', 'cpf');
      }
      const existingClient = await this.clientRepository.findByCpf(data.cpf.trim());
      if (existingClient && existingClient.id !== client.id) {
        throw new InvalidParamError(`Já existe outro cliente cadastrado com o CPF "${data.cpf}".`, 'cpf');
      }
      client.updateCpf(data.cpf.trim());
    }

    if (data.address !== undefined) {
      client.updateAddress(data.address?.trim().length ? data.address.trim() : null);
    }

    await this.clientRepository.update(client);
    return client;
  }

  public async deleteClient(id: string): Promise<void> {
    await this.getClientById(id);
    await this.clientRepository.delete(id);
  }
}
