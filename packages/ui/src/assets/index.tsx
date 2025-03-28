import styled from 'styled-components';

import baby_porcu from './baby_porcu.svg';
import porcu from './porcu.svg';
import frame from './frame.svg';
import heart from './heart.svg';

export const BabyPorcu = styled.img.attrs({ src: baby_porcu })``;
export const Porcu = styled.img.attrs({ src: porcu })``;
export const Frame = styled.img.attrs({ src: frame })`
    width: 90%;
    max-width: 450px;
    z-index: -1;
`;
export const RedHeart = styled.img.attrs({ src: heart})`
  width: 20px;
  height: 20px;
`;
