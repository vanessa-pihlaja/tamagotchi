import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color:rgb(137, 236, 236);
  border: none;
  border-radius: 50%;
  border: 0.1px solid grey;
  width: 48px;
  height: 48px;
  padding: 1rem 1rem;
  margin-top: 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.5);
  
  &:hover {
    background-color: rgb(178, 251, 251);
  }
`;

interface SleepButtonProps {
  energy: number;
  setSleeping: (sleeping: boolean) => void;
  updateStats: (statObjects: {stat: 'age' | 'energy' | 'happiness' | 'hunger', value: number}[]) => void;
}

export const SleepButton: React.FC<SleepButtonProps> = ({ energy, setSleeping, updateStats }) => {

  const handleSleep = () => {
    const newEnergy = Math.min(energy + 25, 100);
    setSleeping(true);
    updateStats([{stat: 'energy', value: newEnergy}]);

    setTimeout(async () => {
      setSleeping(false);
    }, 4000);
  }

  return (
    <StyledButton onClick={handleSleep}>
      Sleep
    </StyledButton>
  );
}