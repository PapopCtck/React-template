import { ReactNode } from 'react';
import { ReactDatePickerProps } from 'react-datepicker';

export interface IStyledDatePickerContainer {
  block?: boolean,
}

export interface IonChangeDatePicker {
  target: {
    id?: string,
    value: string | [Date,Date] | null,
  }
}

export interface IDatePickerCustomOnchange {
  onChange?: (target: IonChangeDatePicker, date: Date | [Date, Date] | null) => void,
}

export interface IDatePickerBase extends Omit<ReactDatePickerProps,keyof IDatePickerCustomOnchange> {
  label?: ReactNode,
  className?: string,
  block?: boolean,
  suffix?: ReactNode,
  errorMessage?: string,
  customValidate?: boolean,
  customValidateMessage?: string,
  id?: string,
  value?: string,
  dateFormat?: string,
  valueFormat?: string,
}

export type IDatePicker = IDatePickerBase & IDatePickerCustomOnchange;

export interface IonChangeLegacyDatePicker {
  target: {
    name?: string,
    id?: string,
    value: string,
  }
}

export interface ILegacyDatepicker{
  onChange: (val: IonChangeLegacyDatePicker) => void,
  id?: string, 
  name?: string, 
  maxYear: number, 
  minYear: number, 
  value: string
  showDate?: boolean,
  showMonth?: boolean, 
  showYear?: boolean, 
  zeroFill?: boolean, 
  language?:string,
}

export interface IDATE {
  [key: string]: string,
  th: string,
  en: string,
}

export interface IMONTH {
  [key: string]: string,
  th: string,
  en: string,
}

export interface IYEAR {
  [key: string]: string,
  th: string,
  en: string,
}

export interface IMONTHS {
  [key: string]: string[],
  th: string[],
  en: string[],
}

export interface ILegacyTimepicker{
  onChange?: (val: IonChangeLegacyDatePicker) => void,
  id?: string, 
  name?: string, 
  value?: string,
  language?:string,
}
