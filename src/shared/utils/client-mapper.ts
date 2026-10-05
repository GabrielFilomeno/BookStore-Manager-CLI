import { Client } from '../../entities/client.js';
import type { ClientModel } from '../../models/client-model.js';

export class ClientMapper {
  public static toEntity(model: ClientModel): Client {
    return new Client({
      id: model.id,
      name: model.name,
      cpf: model.cpf,
      address: model.address ?? null,
      createdAt: new Date(model.created_at),
      updatedAt: new Date(model.updated_at),
    });
  }

  public static toModel(client: Client): ClientModel {
    return {
      id: client.id,
      name: client.name,
      cpf: client.cpf,
      address: client.address ?? null,
      created_at: client.createdAt,
      updated_at: client.updatedAt,
    };
  }
}
