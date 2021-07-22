import { ReactElement, RefObject, useRef, useState } from 'react';

import { useIntersectionObserver } from '@/hooks';
import { IProgressiveImage } from './ProgressiveImage.interfaces';
import { ImageContainer, Thumb, Full, Img } from './ProgressiveImage.styles';


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
    <ImageContainer data-testid="container" ref={ref} className={className} style={style} onClick={onClick}>
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
