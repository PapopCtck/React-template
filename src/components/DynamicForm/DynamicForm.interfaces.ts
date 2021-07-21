import { ReactNode, ReactElement } from 'react';

export interface IDynamicFormData {
  id: string,
  value: Record<string,unknown> | string,
  error?: Record<string,unknown>
}

export interface IDynamicForm {
  data: Array<IDynamicFormData>,
  onDataDelete?: (id: string,callback: () => void) => void,
  onDataChange: (data: IDynamicFormData[]) => void,
  onAdd?: (data: IDynamicFormData[]) => void,
  placeholder?: string,
  addText?: ReactNode,
  maxLength?: number,
  template: ReactElement,
  customFunction?: () => void | Record<string,unknown>,
  edit: boolean,
}

export interface IDynamicFormTemplate {
  onChange?: (value: Record<string,unknown>,isError: boolean) => void, 
  onClickDelete?: () => void,
  data?: Array<IDynamicFormData>,
  key?: string, 
  index?: string, 
  customFunction?: Record<string,() => void>, 
  error?: Record<string,unknown>,
  edit?: boolean,
}
