import { ReactElement, RefObject, useRef, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { XCircle } from 'react-feather';

import { IUploadInput, IUploadInputMultiple, IUploadInputSingle, IUploadInputValue } from './UploadInput.interfaces';
import { PreviewImgContainer, DeleteImageButton, PreviewImg, Container, Label, ImageUpload, PreviewImagesContainer } from './UploadInput.styles';

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
        <PreviewImg objectFit={objectFit} className="preview-image" alt="preview" src={val.selectedFile} />
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
        <PreviewImg objectFit={objectFit} className="preview-image" alt={`preview-${idx}`} src={val.selectedFile} />
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

