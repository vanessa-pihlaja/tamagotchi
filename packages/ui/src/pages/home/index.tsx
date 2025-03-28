import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Frame } from '../../assets';
import { Character } from '../../components/Character';
import { Heading } from '../../components/Heading';
import { Screen } from '../../components/Screen';
import { EnergyLevel } from '../../components/EnergyLevel';
import { HappinessLevel } from '../../components/HappinessLevel';
import { EatButton } from '../../components/EatButton';
import { PlayButton } from '../../components/PlayButton';
import { SleepButton } from '../../components/SleepButton';

import { useGetCharacter } from '../../hooks/useGetCharacter';
import { useUpdateCharacter } from '../../hooks/useUpdateCharacter';

const getBackgroundColor = (
  sleeping: boolean,
  playing: boolean,
  playColorIndex: number,
) => {
  const playColors = ['#d5f244', '#fc51be', '#f2b818', '#314cf7'];

  if (sleeping) return '#001f3f';
  if (playing) return playColors[playColorIndex % playColors.length];
  return '#e5fbff';
};

const StyledHome = styled.div<{
  sleeping: boolean;
  playing: boolean;
  playColorIndex: number;
}>`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    getBackgroundColor(props.sleeping, props.playing, props.playColorIndex)};
  transition: background-color 0.2s;
`;

const StyledRowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  column-gap: 15px;
`;

export const Home: React.FC = (): JSX.Element => {
  const { character, fetching, error } = useGetCharacter();
  const { updateCharacter } = useUpdateCharacter();

  const [hunger, setHunger] = React.useState<number>(character?.hunger ?? 0);
  const [happiness, setHappiness] = React.useState<number>(
    character?.happiness ?? 0,
  );
  const [energy, setEnergy] = React.useState<number>(character?.energy ?? 0);
  const [age, setAge] = React.useState<number>(character?.age ?? 0);

  const [eating, setEating] = React.useState<boolean>(false);
  const [playing, setPlaying] = React.useState<boolean>(false);
  const [sleeping, setSleeping] = React.useState<boolean>(false);
  const [playColorIndex, setPlayColorIndex] = React.useState<number>(0);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const handleUpdateCharacter = async (
    name: string,
    age: number,
    hunger: number,
    happiness: number,
    energy: number,
  ) => {
    const { error } = await updateCharacter({
      name,
      age,
      hunger,
      happiness,
      energy,
    });
    if (error) {
      console.error('Error updating character data:', error);
      setUpdateError('Error updating character data.');
      return <p>Error updating character.</p>;
    } else {
      setUpdateError(null);
    }
  };

  const updateStats = (
    statObjects: {
      stat: 'age' | 'energy' | 'happiness' | 'hunger';
      value: number;
    }[],
  ) => {
    const newStats = { age, energy, happiness, hunger };

    statObjects.forEach(({ stat, value }) => {
      newStats[stat] = value;
      switch (stat) {
        case 'age':
          setAge(value);
          break;
        case 'energy':
          setEnergy(value);
          break;
        case 'happiness':
          setHappiness(value);
          break;
        case 'hunger':
          setHunger(value);
          break;
      }
    });

    handleUpdateCharacter(
      'Porcu',
      newStats.age,
      newStats.hunger,
      newStats.happiness,
      newStats.energy,
    );
  };

  useEffect(() => {
    if (error) console.error('Query Error:', error);

    if (character) {
      setHunger(character.hunger);
      setHappiness(character.happiness);
      setEnergy(character.energy);
      setAge(character.age);
    }
  }, [character, error]);

  useEffect(() => {
    const statsInterval = setInterval(() => {
      let newAge = age;
      if (energy >= 40 && happiness >= 40 && hunger >= 40) {
        newAge = Math.min(100, age + 1);
      }
      const newEnery = Math.max(0, energy - 1);
      const newHappiness = Math.max(0, happiness - 1);
      const newHunger = Math.max(20, hunger - 1);

      updateStats([
        { stat: 'age', value: newAge },
        { stat: 'energy', value: newEnery },
        { stat: 'happiness', value: newHappiness },
        { stat: 'hunger', value: newHunger },
      ]);
    }, 10000);
    return () => clearInterval(statsInterval);
  }, [age, energy, happiness, hunger]);

  useEffect(() => {
    if (updateError) {
      const timer = setTimeout(() => {
        setUpdateError(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [updateError]);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error loading game data.</p>;
  if (!character) return <p>Character not found.</p>;

  return (
    <StyledHome
      sleeping={sleeping}
      playing={playing}
      playColorIndex={playColorIndex}
    >
      <Screen>
        <Heading name={'Porcu'} age={Math.floor(age / 10)} />
        <StyledRowContainer>
          <EnergyLevel energy={energy} />
          <Character hunger={hunger} age={age} />
          <HappinessLevel happiness={happiness} />
        </StyledRowContainer>
        <StyledRowContainer>
          <SleepButton
            energy={energy}
            updateStats={updateStats}
            setSleeping={setSleeping}
          />
          <EatButton
            hunger={hunger}
            energy={energy}
            setEating={setEating}
            updateStats={updateStats}
          />
          <PlayButton
            happiness={happiness}
            energy={energy}
            setPlaying={setPlaying}
            setPlayColorIndex={setPlayColorIndex}
            updateStats={updateStats}
          />
        </StyledRowContainer>
        {updateError && (
          <p style={{ color: 'red', fontSize: '10px', paddingTop: '4px' }}>
            {updateError}
          </p>
        )}
      </Screen>
      <Frame />
    </StyledHome>
  );
};
