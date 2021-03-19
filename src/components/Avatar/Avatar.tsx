import { CSSProperties, ReactElement } from 'react';

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
    borderRadius = '100%',
    src,
    srcset,
    name,
    color,
    colors = defaultColors,
    size,
    style,
    className,
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
    inner = <img className="UserAvatar--img" style={imageStyle} src={src} srcSet={srcset} alt={name} />;
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


  return (
    <div aria-label={name} className={classes.join(' ')} style={style}>
      <div className="UserAvatar--inner" style={innerStyle}>
        {inner}
      </div>
    </div>);
};
