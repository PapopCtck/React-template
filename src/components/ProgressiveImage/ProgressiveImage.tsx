import { CSSProperties, MouseEventHandler, ReactElement, RefObject, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { useIntersectionObserver } from '../../hooks';

export interface IProgressiveImage {
  src?: string,
  alt?: string,
  className?: string,
  animationUrl?: string,
  srcSet?: string,
  thumbWidth?: number,
  style?: CSSProperties,
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down',
  onClick?: MouseEventHandler,
  widthPrefix?: string,
}

interface FullImg {
  objectFit: string,
}

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

const Img = styled.img`
    position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

const Thumb = styled(Img)`
  filter: blur(20px);
  transform: scale(1.1);
  transition: visibility 0ms ease 300ms;
`;

const Full = styled(Img)<FullImg>`
  transition: opacity 300ms ease 0ms;
  object-fit: ${props => props.objectFit};
`;

export const ProgressiveImage = ({ className, style,onClick, ...rest }: IProgressiveImage): ReactElement => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const [isVisible, setIsVisible] = useState(false);
  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        setIsVisible(true);
        observerElement.unobserve(ref.current as HTMLDivElement);
      }
    },
  });

  return (
    <ImageContainer ref={ref} className={className} style={style} onClick={onClick}>
      {isVisible && (
        <Image {...rest} />
      )}
    </ImageContainer>
  );
};


const Image = ({ src, alt, animationUrl, thumbWidth = 60, srcSet, objectFit = 'fill', widthPrefix = '?width=' }: IProgressiveImage): ReactElement => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <Thumb
        alt={alt}
        src={`${src}${widthPrefix}${thumbWidth}`}
        style={{ visibility: isLoaded ? 'hidden' : 'visible', objectFit: objectFit }}
        draggable="false"
      />
      <Full
        onLoad={() => {
          setIsLoaded(true);
        }}
        objectFit={objectFit}
        style={{ opacity: isLoaded ? 1 : 0 }}
        alt={alt}
        srcSet={srcSet || `
        ${src}${widthPrefix}750 2400w,
        ${src}${widthPrefix}580 1900w,
        ${src}${widthPrefix}485 1600w,
        ${src}${widthPrefix}375 1281w,
        ${src}${widthPrefix}480 1000w,
        ${src}${widthPrefix}250 904w,
        ${src}${widthPrefix}339 728w,
        ${src}${widthPrefix}295 640w,
        ${src}${widthPrefix}187 425w,
        ${src}${widthPrefix}160 375w,
        ${src}${widthPrefix}135 320w,
        `}
        src={src}
        loading="lazy"
        draggable="false"
      />
      {
        isLoaded && animationUrl && <Img className="animated" src={animationUrl} alt="thumbnail" loading="lazy" draggable="false" />
      }
    </>
  );
};
export default Image;
