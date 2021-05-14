import { CSSProperties, MouseEventHandler, ReactElement } from 'react';
import styled from '@emotion/styled';
import { Skeleton } from '../Skeleton/Skeleton';
import { ProgressiveImage } from '../ProgressiveImage/ProgressiveImage';
export interface IAvatar {
  borderRadius?: string,
  src?: string,
  srcset?: string,
  name: string,
  color?: string,
  colors?: Array<string>,
  size: string,
  style?: CSSProperties,
  className?: string,
  loading?: boolean,
  onClick?: MouseEventHandler,
}

export interface IStoryAvatarContainer {
  borderColor?: string,
}

export interface IStoryAvatar extends IAvatar {
  borderColor?: string,
  loading?: boolean,
}

export interface IStoryAvatarContainer {
  borderColor?: string,
}

export interface IStoryAvatar extends IAvatar {
  borderColor?: string,
}

const defaultColors = [
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e67e22', // carrot
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50', // midnight blue
];

function sumChars(str: string) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

export const Avatar = (props: IAvatar): ReactElement => {
  const {
    borderRadius = '50%',
    src,
    srcset,
    name,
    color,
    colors = defaultColors,
    size,
    style,
    className,
    loading,
    onClick,
  } = props;

  if (!name) {throw new Error('UserAvatar requires a name');}

  const imageStyle: Record<string,string> = {
    'display': 'block',
    borderRadius,
  };

  const innerStyle: Record<string,string> = {
    lineHeight: size ?? '',
    textAlign: 'center',
    borderRadius,
  };

  if (size) {
    imageStyle.width = innerStyle.width = innerStyle.maxWidth = size;
    imageStyle.height = innerStyle.height = innerStyle.maxHeight = size;
  }

  // eslint-disable-next-line prefer-const
  let inner, classes = [className, 'UserAvatar'];
  if (src || srcset) {
    inner = <ProgressiveImage className="UserAvatar--img" thumbWidth={20} style={imageStyle} src={src} srcSet={srcset || ' '} alt={name}/>;
  } else {
    let background;
    if (color) {
      background = color;
    } else {
      // pick a deterministic color from the list
      const i = sumChars(name) % colors.length;
      background = colors[i];
    }

    innerStyle.backgroundColor = background;

    inner = name.substr(0,2);
  }

  if (loading) {return <div aria-label={name} className={classes.join(' ')} style={style}>
    <Skeleton type="circle" height={size} width={size} />
  </div>; }
  return (
    <div aria-label={name} className={classes.join(' ')} style={style} onClick={onClick}>
      <div className="UserAvatar--inner" style={innerStyle}>
        {inner}
      </div>
    </div>);
};

export const StyledStoryAvatarContainer = styled.div<IStoryAvatarContainer>`
  border-radius: 50%;
  border: 1px solid ${props => props.borderColor ?? props.theme.primaryColor};
  padding: 2px;
  width: fit-content;
`;

export const StoryAvatar = (props: IStoryAvatar): ReactElement => (
  <StyledStoryAvatarContainer className="styled-story-avatar-container" borderColor={props.borderColor}>
    {
      props.loading ? <Skeleton type="circle" height={props.size} width={props.size} /> 
        : <Avatar {...props}/>
    }
  </StyledStoryAvatarContainer>
);
