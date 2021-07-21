import styled from '@emotion/styled';
import { ILabel, Size, Image } from './UploadInput.interfaces';

export const Container = styled.div`
  width: 100%;
`;

export const Label = styled.label<ILabel>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: ${props => `0 ${props.theme.spaces.mg1} ${props.theme.spaces.mg3}`};
    background: ${props => props.theme.disabledColor};
    border-radius: ${props => props.theme.borderRadiusBase};
    height: ${props => props.height};
    width: ${props => props.width};
    max-width: 100%;
    transition: 1s all cubic-bezier(0.075, 0.82, 0.165, 1);
    border: 1px solid ${props => props.validated && props.error ? props.theme.errorColor : 'transparent'};
    &:hover,
    &:active {
      border: 1px solid ${props => props.theme.primaryColor};
      transition: 1s all cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

export const PreviewImgContainer = styled.div<Size>`
    background: ${props => props.theme.disabledColor};
    border-radius: ${props => props.theme.borderRadiusBase};
    height: ${props => props.height};
    width: ${props => props.width};
    max-width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: 1s all cubic-bezier(0.075, 0.82, 0.165, 1);
    border: 1px solid transparent;
    padding: 10px;
    &:hover,
    &:active {
      border: 1px solid $yellow;
      transition: 1s all cubic-bezier(0.075, 0.82, 0.165, 1);
      .del-image {
        opacity: 1;
        transition: 1s all cubic-bezier(0.075, 0.82, 0.165, 1);
        backdrop-filter: blur(3px) grayscale(0.6) brightness(0.8);
      }
    }
  &.video{
    &:hover {
      .del-image {
        backdrop-filter: none;
      }
    }
    .del-image {
      bottom: 0;
      height: auto;
      top: auto;
      z-index: 1;
    }
    .preview-video {
      width: 100%;
      height: 100%;
    }
  }
`;

export const DeleteImageButton = styled.div`
  position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      opacity: 0;
      color: ${props => props.theme.textColorLight};
      justify-content: center;
      align-items: center;
      transition: 1s all cubic-bezier(0.075, 0.82, 0.165, 1);
      i {
        font-size: 30px;
      }
`;

export const PreviewImg = styled.img<Image>`
    width: 100%;
    height: 100%;
    object-fit: ${props => props.objectFit};
`;

export const PreviewImagesContainer = styled.div`
   .preview-image-container {
      box-sizing: border-box;
      margin: ${props => `0 ${props.theme.spaces.mg1} ${props.theme.spaces.mg3}`};
      vertical-align: top;
    }
`;

export const ImageUpload = styled.input`
      display: none;
`;
