import React, { FC } from 'react';
import styled from 'styled-components';
import { BabyPorcu, Porcu } from '../../assets';


const CharacterImage = styled.div<{ hunger: number}>`
  width: 7rem;
  height: 8rem;
  z-index: 1.1;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: ${({ hunger })=> `${hunger * 0.9}%`};
    height: ${({ hunger }) => `${hunger * 0.9}%`};
    transition: width 2s, height 2s;
  }
`;

const getCharacterImage = (age: number) => {
  if (age < 30) {
    return <BabyPorcu />;
  }
  return <Porcu />;
}

export interface ICharacterProps {
  hunger: number;
  age: number;
}

export const Character: FC<ICharacterProps> = ({
  hunger,
  age,
}) => {
  return (
    <CharacterImage hunger={hunger}>{getCharacterImage(age)}</CharacterImage>
  );
};
