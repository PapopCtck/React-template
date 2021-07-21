import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';

import { ISkeleton } from './Skeleton.interfaces';

const loading = keyframes`
100% {
  transform: translateX(100%);
}
`;

export const SkeletonWrapper = styled.div<ISkeleton>(props => css`
  width: ${props.width || '100%'};
  height: ${props.height || '100%'};
  position: relative;
  overflow: hidden;
  background-color: ${props.dark ? 'rgba(255, 255, 255, 0.175)' : 'rgba(0, 0, 0, 0.055)'};
  border-radius: ${props.type === 'circle' ? '50%' : '2px'};
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${props.dark ? 'linear-gradient(90deg,rgba(255, 255, 255, 0),rgba(255, 255, 255, 0.12),rgba(255, 255, 255, 0))' 
    : 'linear-gradient(90deg,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.07),rgba(0, 0, 0, 0))'};
    transform: translateX(-100%);
  }
`, props => props.loading ? css`
&:after{
  animation: ${loading} ${`${props.duration}s`} ${`${props.delay}s`} infinite;
}
` : css`
&:after{
animation: none;
}
`);
