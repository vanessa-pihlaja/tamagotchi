import React from 'react';
import styled from 'styled-components';

import burgerImage from '../../assets/burger.svg';

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

const BurgerImage = styled.img`
  position: fixed;
  top: 55%;
  left: 52.5%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  z-index: 100;
  display: ${({ show }: { show: boolean }) => (show ? 'block' : 'none')}
`;

interface EatButtonProps {
  hunger: number;
  energy: number;
  setEating: (eating: boolean) => void;
  updateStats: (statObjects: {stat: 'age' | 'energy' | 'happiness' | 'hunger', value: number}[]) => void;
}

export const EatButton: React.FC<EatButtonProps> = ({
  hunger,
  energy,
  setEating,
  updateStats
}) => {
  const [showBurger, setShowBurger] = React.useState(false);

  const HandleEating  = () => {
    setEating(true);
    const newHunger = Math.max(Math.min(hunger + 20, 100), 20);
    const newEnergy = Math.min(energy + 10, 100);
    updateStats([{stat: 'hunger', value: newHunger}, {stat: 'energy', value: newEnergy}]);
    setShowBurger(true);

    setTimeout(() => {
      setShowBurger(false);
      setEating(false);
    }, 3000);
  }

  return (
    <>
      <StyledButton onClick={HandleEating}>
        Eat
      </StyledButton>
      <BurgerImage src={burgerImage} show={showBurger} />
    </>
  );
}