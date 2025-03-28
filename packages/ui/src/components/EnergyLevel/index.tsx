import React from 'react';
import styled from 'styled-components';

const StyledEnergyBar = styled.div`
  width: 20px;
  height: 100px;
  border: 2px solid #000;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
  margin-top: 1rem;
  margin-right: 0.7rem;
`;

const EnergyFillment = styled.div<{ energy: number }>`
  width: 100%;
  height: ${({ energy}) => energy }%;
  background: ${({ energy }) => ( energy < 20 ? 'rgba(238, 62, 68 , 1)' : 'rgba(112, 230, 67, 0.8)')};
  transition: height 4s ease-in-out;
`;

interface EnergyLevelProps {
  energy: number;
}

export const EnergyLevel: React.FC<EnergyLevelProps> = ({ energy }) => {
  return (
    <StyledEnergyBar>
      <EnergyFillment energy={energy} />
    </StyledEnergyBar>
  );
};
