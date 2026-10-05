import { pool } from '../infra/database.js';
import { Client } from '../entities/client.js';
import { ClientMapper } from '../shared/utils/client-mapper.js';
import type { ClientModel } from '../models/client-model.js';

export class ClientRepository {
  public async create(client: Client): Promise<void> {
    const query = `
      INSERT INTO clients (id, name, cpf, address, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [
      client.id,
      client.name,
      client.cpf,
      client.address ?? null,
      client.createdAt,
      client.updatedAt,
    ];
    await pool.query(query, values);
  }

  public async findAll(): Promise<Client[]> {
    const query = `
      SELECT id, name, cpf, address, created_at, updated_at
      FROM clients
      ORDER BY name ASC
    `;
    const result = await pool.query<ClientModel>(query);
    return result.rows.map((model) => ClientMapper.toEntity(model));
  }

  public async findById(id: string): Promise<Client | null> {
    const query = `
      SELECT id, name, cpf, address, created_at, updated_at
      FROM clients
      WHERE id = $1
    `;
    const result = await pool.query<ClientModel>(query, [id]);
    const model = result.rows[0];

    if (!model) {
      return null;
    }

    return ClientMapper.toEntity(model);
  }

  public async findByCpf(cpf: string): Promise<Client | null> {
    const query = `
      SELECT id, name, cpf, address, created_at, updated_at
      FROM clients
      WHERE cpf = $1
    `;
    const result = await pool.query<ClientModel>(query, [cpf]);
    const model = result.rows[0];

    if (!model) {
      return null;
    }

    return ClientMapper.toEntity(model);
  }

  public async update(client: Client): Promise<void> {
    const query = `
      UPDATE clients
      SET name = $1, cpf = $2, address = $3, updated_at = $4
      WHERE id = $5
    `;
    await pool.query(query, [
      client.name,
      client.cpf,
      client.address ?? null,
      client.updatedAt,
      client.id,
    ]);
  }

  public async delete(id: string): Promise<void> {
    const query = `DELETE FROM clients WHERE id = $1`;
    await pool.query(query, [id]);
  }
}
