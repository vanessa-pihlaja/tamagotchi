import { Application } from 'express';
import { Database } from 'sqlite3';
import { handlerTree } from '../handlers';

export type AppConfig = {
  port: number;
  databasePath: string;
};

export type Character = {
  name: string;
  age: number;
  description: string;
  hunger: number;
  happiness: number;
  energy: number;
};

export type Handler<Args extends unknown, ReturnValue extends unknown> = (
  ctx: Context,
  args: Args,
) => Promise<ReturnValue>;

export type Context = {
  globals: {
    server: Application;
    db: Database;
    config: AppConfig;
  };
  handlers: typeof handlerTree;
};
