import React, { FC } from 'react';
import styled from 'styled-components';

const StyledRowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: bold;
  margin-bottom: 0rem;
  column-gap: 15px;
`;


interface HeadingProps {
  name: string,
  age: number;
}

export const Heading: FC<HeadingProps> = ({ name, age }) => {
  return (
    <StyledRowContainer>
      <div>Name: {name}</div>
      <div>Age: {age}</div>
    </StyledRowContainer>
  );
};