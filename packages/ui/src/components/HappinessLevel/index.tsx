import React from 'react';
import styled from 'styled-components';
import Heart from "react-heart";
import { RedHeart } from '../../assets';

const StyledHappinessLevel = styled.div.attrs<{ children?: React.ReactNode }>({})`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  margin-top: 1rem;
  margin-left: 0.7rem;
`;

interface HappinessLevelProps {
  happiness: number; 
}

export const HappinessLevel: React.FC<HappinessLevelProps> = ({ happiness }) => {
  const filledHearts = Math.min(5, Math.floor(happiness / 20));

  return (
    <StyledHappinessLevel>
      {Array.from({ length: 5 }).map((_, index) => (
        <React.Fragment key={index}>
          {index <= filledHearts ? (
            <RedHeart />
          ) : (
            <div style={{ width: "20px", height: "20px" }}>
              <Heart isActive={false} onClick={() => {}} />
            </div>
          )}
        </React.Fragment>
      ))}
    </StyledHappinessLevel>
  );
};
