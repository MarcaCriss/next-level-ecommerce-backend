import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

function typeormModuleOptions(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    //host: process.env.DATABASE_HOST,
    // port: parseInt(process.env.DATABASE_PORT, 10),
    // username: process.env.DATABASE_USERNAME,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_NAME,
    entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
    autoLoadEntities: true,
    // migrations
    // migrationsRun: true,
    // migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
    // migrationsTableName: 'migrations_typeorm',
    // cli: {
    //   migrationsDir: 'src/migration',
    // },
    ssl: {
      rejectUnauthorized: false,
    },

    // Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
    //synchronize: true,
    //logging: true,
    //logger: 'file',
  };
}

export default registerAs('database', () => ({
  config: typeormModuleOptions(),
}));
