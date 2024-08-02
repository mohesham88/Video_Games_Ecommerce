import { DataSource, DataSourceOptions } from 'typeorm';
import { URL } from 'url';
import { config } from 'dotenv';
config();

const dbUrl = new URL(process.env.DATABASE_URL);
const routingId = dbUrl.searchParams.get('options');
dbUrl.searchParams.delete('options');

export const dataSourceOptions: DataSourceOptions = {
  type: 'cockroachdb',
  url: dbUrl.toString(),
  ssl: true,
  extra: {
    options: routingId,
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  timeTravelQueries: false,
  synchronize: false,
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
