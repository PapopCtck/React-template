import styled from '@emotion/styled/macro';
import { FullImg } from './ProgressiveImage.interfaces';

export const ImageContainer = styled.div`
position: relative;
overflow: hidden;
background: rgba(0, 0, 0, 0.05);
width: 100%;
height: 100%;
border-radius: inherit;
`;

export const Img = styled.img`
  position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
border-radius: inherit;
`;

export const Thumb = styled(Img)`
filter: blur(20px);
transform: scale(1.1);
transition: visibility 0ms ease 300ms;
`;

export const Full = styled(Img)<FullImg>`
transition: opacity 300ms ease 0ms;
object-fit: ${props => props.objectFit};
`;
