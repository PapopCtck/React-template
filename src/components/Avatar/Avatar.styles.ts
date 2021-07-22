import styled from '@emotion/styled';
import { IStoryAvatarContainer } from './Avatar.interfaces';

export const StyledStoryAvatarContainer = styled.div<IStoryAvatarContainer>`
  border-radius: 50%;
  border: 1px solid ${props => props.borderColor ?? props.theme.primaryColor};
  padding: ${props => props.theme.spaces.pd1};
  width: fit-content;
`;
