import { PostgreSqlContainer } from '@testcontainers/postgresql'

const postgresContainer = await new PostgreSqlContainer('postgres:15.6-alpine').start()
// here we inject env for `start/env`, which then be used in `config/database.ts`.
process.env.DB_HOST = postgresContainer.getHost()
process.env.DB_PORT = String(postgresContainer.getPort())
process.env.DB_USER = postgresContainer.getUsername()
process.env.DB_DATABASE = postgresContainer.getDatabase()
process.env.DB_PASSWORD = postgresContainer.getPassword()
