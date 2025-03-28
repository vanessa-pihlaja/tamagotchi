import { gql, useMutation } from 'urql';

export const UPDATE_CHARACTER = gql`
  mutation UpdateCharacter($name: String!, $age: Int!, $energy: Int!, $hunger: Int!, $happiness: Int!) {
    updateCharacter(name: $name, age: $age, energy: $energy, hunger: $hunger, happiness: $happiness) {
      name
      age
      energy
      hunger
      happiness
    }
  }
`
export const useUpdateCharacter = () => {
  const [updateResult, updateCharacter] = useMutation(UPDATE_CHARACTER);

  return {
    updateCharacter,
    updating: updateResult.fetching,
    error: updateResult.error,
  };
}

