import React, { HTMLAttributes, ReactElement, RefObject, useRef, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import styled from '@emotion/styled';
import { XCircle } from 'react-feather';


export interface IUploadInputValue {
  selectedFile: string,
  file?: File,
  base64?: string,
  fileType?: string, 
}

export interface IUploadInputChangeEvent<T>{
  target: { 
    id?: string, 
    value: T }
}

export interface IUploadInputBase extends HTMLAttributes<HTMLInputElement> {
  label?: string,
  dropText?: string,
  className?: string,
  id?: string,
  multiple?: boolean,
  deleteButton?: ReactElement,
  maxFileSize?: number,
  sizeExceedWarning?: string,
  maxImage?: number,
  maxVideo?: number,
  limit?: boolean,
  limitExceedWarning?: string,
  supportedImageExtensions?: Array<string>,
  supportedVideoExtensions?: Array<string>,
  required?: boolean,
  validated?: boolean,
  width?: string,
  height?: string,
  objectFit?: string,
}

export interface IUploadInputSingle extends Omit<IUploadInputBase,'onChange'> {
  onChange?: (target : IUploadInputChangeEvent<IUploadInputValue | Record<string,never>>) => void,
  value: IUploadInputValue | Record<string,never>,
}

export interface IUploadInputMultiple extends Omit<IUploadInputBase,'onChange'> {
  onChange?: (target : IUploadInputChangeEvent<Array<IUploadInputValue> | Array<never>>) => void,
  value: Array<IUploadInputValue> | Array<never>,
}

export type IUploadInput = IUploadInputSingle | IUploadInputMultiple;
interface Size{
  width: string, 
  height: string,
}

interface Image {
  objectFit: string,
}

interface ILabel extends Size{
  error: boolean,
  validated: boolean,
}

const Container = styled.div`
  width: 100%;
`;


const Label = styled.label<ILabel>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px 10px;
    background: ${props => props.theme.disabledColor};
    border-radius: 8px;
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

const PreviewImgContainer = styled.div<Size>`
    background: ${props => props.theme.disabledColor};
    border-radius: 8px;
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

const DeleteImageButton = styled.div`
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

const PreviewImg = styled.img<Image>`
    width: 100%;
    height: 100%;
    object-fit: ${props => props.objectFit};
`;

const PreviewImagesContainer = styled.div`
   .preview-image-container {
      margin: 0 5px 10px;
      vertical-align: top;
    }
`;

const ImageUpload = styled.input`
      display: none;
`;

export const UploadInput = ({ multiple = false,...rest }: IUploadInput): ReactElement =>
  multiple ? <UploadInputMultiple {...rest as IUploadInputMultiple} /> : <UploadInputSingle {...rest as IUploadInputSingle} />;

export const UploadInputSingle = ({
  label = 'เลือกไฟล์',
  dropText = 'วาง',
  className,
  id = 'upload',
  onChange,
  value = {},
  deleteButton = <XCircle />,
  maxFileSize = 26214400,
  sizeExceedWarning = 'ไฟล์มีขนาดเกิน  25 mb',
  supportedImageExtensions = ['.jpg', '.jpeg', '.png'],
  supportedVideoExtensions = ['.mp4', '.mov'],
  required = false,
  validated = false,
  width = '200px',
  height = '200px',
  objectFit = 'fill',
  ...rest
}:IUploadInputSingle): ReactElement => {
  const [status, setStatus] = useState(label);
  const input = useRef() as RefObject<HTMLInputElement>;

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const supportedFilesTypes = ['image/jpeg', 'image/png'];
    const { type } = event.dataTransfer.files[0];
    if (supportedFilesTypes.indexOf(type) > -1) {
      fileSelectedHandeler(event.dataTransfer.files);
    } else {
      alert('invalid file format');
    }
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setStatus(dropText);
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setStatus(label);
  };

  const doNothing = (event: React.DragEvent) => event.preventDefault();

  const getBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const onChangeHandler = (files: FileList, base64: string) => {
    if (onChange){
      onChange({
        target: {
          id,
          value: {
            selectedFile: URL.createObjectURL(files[0]),
            file: files[0],
            base64,
          },
        },
      });
    }
  };

  const fileSelectedHandeler = async (files: FileList | null) => {
    if (files && files.length > 0) {
      if (files[0].size < maxFileSize) {
        if (onChange) {
          const base64 = await getBase64(files[0]) as string;
          onChangeHandler(files, base64);
        }
        setStatus(label);
      } else {
        alert(sizeExceedWarning);
      }
    }
  };

  const handleDelete = () => {
    if (onChange){
      onChange({
        target: {
          id,
          value: {},
        },
      });
    }
    if (input.current){
      input.current.value = '';
    }
  };

  const handleRenderPreview = (val: IUploadInputValue | Record<string,never>) => (
    (val.file && videoTypeRegex.test(val.file.type)) || (val.selectedFile && supportedVideoExtensions.includes(val.selectedFile.split('.').pop() ?? '')) 
      ? <PreviewImgContainer width={width} height={height} className="preview-image-container video">
        {deleteButton && <DeleteImageButton className="del-image" onClick={() => handleDelete()}>{deleteButton}</DeleteImageButton>}
        <video className="preview-video" onMouseOver={e => {
          const target = e.target as HTMLVideoElement;
          target.currentTime = 0;
          target.play();
        }} onMouseOut={e => (e.target as HTMLVideoElement).pause()}>
          <source src={val.selectedFile} type="video/mp4" />
          <source src={val.selectedFile} type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </PreviewImgContainer> : <PreviewImgContainer width={width} height={height} className="preview-image-container">
        {deleteButton && <DeleteImageButton className="del-image" onClick={() => handleDelete()}>{deleteButton}</DeleteImageButton>}
        <PreviewImg objectFit={objectFit} className="preview-image" src={val.selectedFile} />
      </PreviewImgContainer>
  );

  const supportedFileExtensions = [...supportedImageExtensions, ...supportedVideoExtensions];

  return (
    <Container className={`input-container image-upload-container ${className}`} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={doNothing} onDrop={handleDrop}>
      {
        label ?
          (value && !isEmpty(value) ?
            handleRenderPreview(value)
            : <Label width={width} height={height} error={required && isEmpty(value)} validated={validated} htmlFor={id}>{status}</Label>)
          : null
      }
      <ImageUpload ref={input} type="file" accept={supportedFileExtensions.join(',')} id={id} className={`image-upload ${className}`}
        onChange={(e) => fileSelectedHandeler(e.target.files)}
        {...rest}
      />
    </Container >
  );
};

const videoTypeRegex = /video\/\w*/;
const imageTypeRegex = /image\/\w*/;

export const UploadInputMultiple = ({
  label = 'เลือกไฟล์',
  dropText = 'วาง',
  className,
  id = 'upload',
  onChange,
  value = [],
  deleteButton = <XCircle />,
  maxFileSize = 26214400,
  sizeExceedWarning = 'ไฟล์มีขนาดเกิน  25 mb',
  limit = false,
  limitExceedWarning = 'จำนวนไฟล์เกินจำนวนที่กำหนด',
  maxImage = 5,
  maxVideo = 1,
  supportedImageExtensions = ['.jpg', '.jpeg', '.png'],
  supportedVideoExtensions = ['.mp4', '.mov'],
  required = false,
  validated = false,
  width = '200px',
  height = '200px',
  objectFit = 'fill',
  ...rest
}:IUploadInputMultiple): ReactElement => {
  const [status, setStatus] = useState(label);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const supportedFilesTypes = ['image/jpeg', 'image/png'];
    const { type } = event.dataTransfer.files[0];
    if (supportedFilesTypes.indexOf(type) > -1) {
      fileSelectedHandeler(event.dataTransfer.files);
    } else {
      alert('invalid file format');
    }
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setStatus(dropText);
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setStatus(label);
  };

  const doNothing = (event: React.DragEvent) => event.preventDefault();

  const getBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const onChangeHandler = (files: FileList, base64: string) => {
    if (onChange) {
      onChange({
        target: {
          id, value: [...value, {
            selectedFile: URL.createObjectURL(files[0]),
            file: files[0],
            base64,
          }],
        },
      });
    }
  };

  const getCount = (value: IUploadInputValue[], regex: RegExp) => value.reduce((accumulator, currentValue) => regex.test((currentValue.file?.type || currentValue.fileType) || '') ? accumulator + 1 : accumulator, 0);

  const fileSelectedHandeler = async (files: FileList | null, input?: HTMLInputElement) => {
    if (files && files.length > 0) {
      if (files[0].size < maxFileSize) {
        if (onChange) {
          const base64 = await getBase64(files[0]) as string;
          if (!limit) {
            onChangeHandler(files, base64);
          } else if (limit) {
            const imageCount = getCount(value, imageTypeRegex);
            const videoCount = getCount(value, videoTypeRegex);
            if (imageTypeRegex.test(files[0].type) && imageCount < maxImage) {
              onChangeHandler(files, base64);
            } else if (videoTypeRegex.test(files[0].type) && videoCount < maxVideo) {
              onChangeHandler(files, base64);
            } else {
              alert(limitExceedWarning);
            }
          }
        }
        setStatus(label);
      } else {
        alert(sizeExceedWarning);
      }
    }
    if (input){
      input.value = '';
    }
  };

  const handleDelete = (val: IUploadInputValue) => {
    if (onChange) {
      onChange({ target: { id, value: value.filter(file => file.selectedFile !== val.selectedFile) } });
    }
  };

  const handleRenderPreview = (val: IUploadInputValue, idx: number) => (
    (val.file && videoTypeRegex.test(val.file.type)) 
    || (val.selectedFile && supportedVideoExtensions.includes(val.selectedFile.split('.').pop() ?? '')) 
      ? <PreviewImgContainer width={width} height={height} key={idx} className="preview-image-container video">
        {deleteButton && <DeleteImageButton className="del-image" onClick={() => handleDelete(val)}>{deleteButton}</DeleteImageButton>}
        <video className="preview-video" onMouseOver={e => {
          const target = e.target as HTMLVideoElement;
          target.currentTime = 0;
          target.play();
        }} onMouseOut={e => (e.target as HTMLVideoElement).pause()}>
          <source src={val.selectedFile} type="video/mp4" />
          <source src={val.selectedFile} type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </PreviewImgContainer> : <PreviewImgContainer width={width} height={height} key={idx} className="preview-image-container">
        {deleteButton && <DeleteImageButton className="del-image" onClick={() => handleDelete(val)}>{deleteButton}</DeleteImageButton>}
        <PreviewImg objectFit={objectFit} className="preview-image" src={val.selectedFile} />
      </PreviewImgContainer>
  );

  const supportedFileExtensions = [...supportedImageExtensions, ...supportedVideoExtensions];

  return (
    <Container className={`input-container image-upload-container ${className}`} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={doNothing} onDrop={handleDrop}>
      {
        label ?
          (value && !isEmpty(value) ?
            <PreviewImagesContainer className="preview-images-container">
              {value.map((val: IUploadInputValue, idx: number) =>
                <>
                  {handleRenderPreview(val, idx)}
                </>,
              )}
              <Label width={width} height={height} error={required && isEmpty(value)} validated={validated} htmlFor={id}>{status}</Label>
            </PreviewImagesContainer>
            : <Label width={width} height={height} error={required && isEmpty(value)} validated={validated} htmlFor={id}>{status}</Label>)
          : null
      }
      <ImageUpload type="file" accept={supportedFileExtensions.join(',')} id={id} className={`image-upload ${className}`}
        onChange={(e) => fileSelectedHandeler(e.target.files, e.target)}
        {...rest}
      />
    </Container >
  );
};

