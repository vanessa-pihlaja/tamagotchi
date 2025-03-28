import { gql, useQuery } from 'urql';
import { Character as CharacterType } from '../types';

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      name
      age
      hunger
      happiness
      energy
    }
  }
`;

export const useGetCharacter = () => {
  const [result] = useQuery<{ characters: CharacterType[] }>({query: GET_CHARACTERS});

  // Find the character named "Porcu"
  const character = result.data?.characters.find((character) => character.name === 'Porcu');

  return {
    character,
    fetching: result.fetching,
    error: result.error,
  };
};