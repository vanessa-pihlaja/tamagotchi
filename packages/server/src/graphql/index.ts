import { buildSchema } from 'graphql';
import { Context } from '../types/global';

export const graphQLSchema = buildSchema(`
  type Character {
    name: String!
    age: Int!
    description: String!
    hunger: Int!
    happiness: Int!
    energy: Int!
  }

  type Query {
    characters: [Character]
  }

  type Mutation {
    updateCharacter(
      name: String!,
      age: Int!, 
      hunger: Int!, 
      happiness: Int!, 
      energy: Int!
    ): Character
  }
`);

// Passing in ctx to all resolvers for dependency injection
// All resolvers have access to all handlers and globals
export const createResolvers = (ctx: Context) => ({
  characters: ctx.handlers.character.getAll(ctx, {}),
  updateCharacter: async ({ name, age, hunger, happiness, energy }: { name: string; age: number; hunger: number; happiness: number; energy: number; }) => {
    return await ctx.handlers.character.updateCharacter(ctx, { name, age, hunger, happiness, energy });
  },
});
