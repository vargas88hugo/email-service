import { createConnection, EntitySchema } from 'typeorm';
type Entity = Function | string | EntitySchema<any>;

export async function typeOrmTest(entities: Entity[]) {
  return createConnection({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'test',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    dropSchema: true,
  });
}
