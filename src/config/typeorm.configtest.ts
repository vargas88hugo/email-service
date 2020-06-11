import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfigTest: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'test',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  dropSchema: true,
};
