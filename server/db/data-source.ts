import { DataSource, DataSourceOptions } from 'typeorm';

import {config} from "dotenv"
import { dirname } from 'path';
config();

export const datasourceOptions : DataSourceOptions = 
{
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  port: Number(process.env.POSTGRESQL_PORT),
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  entities: [
      'dist/**/*.entity{.ts,.js}',
  ],
  migrations: [
    "dist/db/migrations/*{.ts,.js}",
  ],
  synchronize: false, 
  logging: false
}


const datasource= new DataSource(datasourceOptions);

export default datasource;