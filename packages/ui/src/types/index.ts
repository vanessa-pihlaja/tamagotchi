export type Character = {
  name: string;
  age: number;
  hunger: number;
  happiness: number;
  energy: number;
};

export type GetCharactersResponse = {
  characters: Character[];
};

export type UpdateCharacterVariables = {
  name: string;
  age: number;
  hunger: number;
  happiness: number;
  energy: number;
};

export type UpdateCharacterResponse = {
  updateCharacter: Character;
};