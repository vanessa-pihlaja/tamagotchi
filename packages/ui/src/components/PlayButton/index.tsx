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

interface PlayButtonProps {
  happiness: number;
  energy: number;
  setPlaying: (playing: boolean) => void;
  setPlayColorIndex: (playColorIndex: number) => void;
  updateStats: (statObjects: {stat: 'age' | 'energy' | 'happiness' | 'hunger', value: number}[]) => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ 
  happiness,
  energy, 
  setPlaying, 
  setPlayColorIndex,
  updateStats
}) => {

  const handlePlay = () => {
    let index = 0;
    const newHappiness = Math.min(happiness + 25, 100);
    const newEnergy = Math.max(energy - 10, 0);
    setPlaying(true);
    
    updateStats([{stat: 'energy', value: newEnergy}, {stat: 'happiness', value: newHappiness}]);

    const interval = setInterval(() => {
      setPlayColorIndex(index);
      index++;
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setPlaying(false);
      setPlayColorIndex(0);
    }, 4000);
  }

  return (
    <StyledButton onClick={handlePlay}>
      Play
    </StyledButton>
  );
}