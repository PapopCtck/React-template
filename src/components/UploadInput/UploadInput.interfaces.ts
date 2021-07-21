import { HTMLAttributes, ReactElement } from 'react';

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

export interface Size{
  width: string, 
  height: string,
}

export interface Image {
  objectFit: string,
}

export interface ILabel extends Size{
  error: boolean,
  validated: boolean,
}
