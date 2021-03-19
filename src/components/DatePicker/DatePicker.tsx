import { ReactElement, ReactNode, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ChevronDown } from 'react-feather';
import { colorMix } from '../../utils';

import commonConstant from '../../common/commonConstant';

import 'react-datepicker/dist/react-datepicker.css';

export interface IStyledDatePickerContainer {
  block?: boolean,
}

export interface IonChangeDatePicker {
  target: {
    id?: string,
    value: string,
  }
}

export interface IDatePicker {
  label?: ReactNode,
  className?: string,
  block?: boolean,
  suffix?: ReactNode,
  errorMessage?: string,
  customValidate?: boolean,
  customValidateMessage?: string,
  disabled?: boolean,
  onChange: (target: IonChangeDatePicker) => void,
  id?: string,
  value?: string,
  dateFormat?: string,
}

export const StyledDatePickerContainer = styled('div')<IStyledDatePickerContainer>(
  props => css`
  .label{
    margin-bottom: 5px;
  }
  input {
    padding: 10px;
    border: 1px solid ${props.theme.borderColorBase};
    border-radius: ${props.theme.borderRadiusBase};
    outline: none;
    transition: all .3s;
    :focus {
        border: 1px solid ${props.theme.primaryColor};
        box-shadow: ${`${props.theme.boxShadowInput} ${colorMix(props.theme.primaryColor, 2)}`}
    }
    & + .error-message {
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-in;
        transition: opacity 0.3s ease-in;
    }
  }
  .react-datepicker__day--selected{
    background-color: ${props.theme.primaryColor};
    color: ${props.theme.textColorLight};
    border-radius: 50%;
  }
`,props => props.block && (
    css`
    input{
      display: block;
        width: 100%;
        box-sizing: border-box;
    }
    .react-datepicker-wrapper {
    display: block;
  }
  `
  ));

export const CustomDatePicker = ({
  label,
  className,
  block, suffix,
  errorMessage, customValidate,
  customValidateMessage, disabled,
  onChange, id, value, dateFormat,
  ...rest
}: IDatePicker): ReactElement => (
  <StyledDatePickerContainer block={block}>
    {
      label && <div className="label">{label}</div>
    }
    <DatePicker
      className={`date-picker ${className} ${customValidate ? 'showcustom' : ''}`}
      dateFormat={dateFormat ? dateFormat : 'dd/MM/yyyy'}
      disabled={disabled}
      selected={value ? new Date(value) : null}
      onChange={e => onChange ? onChange({ target: { id, value: dayjs(e as Date).format('YYYY-MM-DD') } }) : undefined}
      onChangeRaw={e => e.preventDefault()}
      {...rest}
    />
    {
      suffix && <span className={`suffix-icon ${disabled && 'disabled'}`}>
        {suffix}
      </span>
    }
    {
      errorMessage && <div className="error-message">{customValidate ? customValidateMessage : errorMessage}</div>
    }

  </StyledDatePickerContainer>
);

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
  value: number,
  showDate?: boolean,
  showMonth?: boolean, 
  showYear?: boolean, 
  zeroFill?: boolean, 
  language?:string,
}

interface IDATE {
  [key: string]: string,
  th: string,
  en: string,
}

interface IMONTH {
  [key: string]: string,
  th: string,
  en: string,
}

interface IYEAR {
  [key: string]: string,
  th: string,
  en: string,
}

interface IMONTHS {
  [key: string]: string[],
  th: string[],
  en: string[],
}

export const StyledLegacyDatePickerContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 10px;
  .inline-picker {
    position: relative;
    display: inline-flex;
    select{
      outline: none;
      padding: 0;
      border: none;
      border-bottom: 1px solid ${props => colorMix(props.theme.borderColorBase,9)};
      width: 100%;
      -moz-appearance: none;
      -webkit-appearance: none;
      &.placeholder{
        color: ${props => props.theme.textColorSecondary};
        border-bottom: 1px solid ${props => colorMix(props.theme.borderColorBase,4)};
      }
    }
  }
`;

export const LegacyDatepicker = (props: ILegacyDatepicker): ReactElement => {
  const { onChange, id , name , maxYear, minYear, value, showDate = true, showMonth = true, showYear = true, zeroFill = false, language = 'th' } = props;
  const date = new Date(value);
  const [day,setDay] = useState(date.getDate());
  const [month,setMonth] = useState(date.getMonth() + 1);
  const [year,setYear] = useState(date.getFullYear() + 543);

  const boolToInt = (bool: boolean) => bool ? 1 : 0;

  const inputCount = boolToInt(showDate) + boolToInt(showMonth) + boolToInt(showYear);

  const templateColumn = () => {
    const template = [];
    for (let i = 0; i < inputCount; i++){
      template.push('auto');
    }
    return template.join(' ');
  };

  useEffect(() => {
    const monthWithZero = month <= 9 ? `0${month}` : month;
    const dayWithZero = day <= 9 ? `0${day}` : day;
    let dayFomatted = '';
    const checkValid = (p: boolean,q: string | number) => !p || q; //material conditional
    const isValueValid = checkValid(showDate,dayWithZero) && checkValid(showMonth,monthWithZero) && checkValid(showYear,year);
    if (isValueValid){
      if (showYear && year){
        dayFomatted = dayFomatted.concat(year.toString());
      } else if (zeroFill){
        dayFomatted = dayFomatted.concat('0000');
      }
      if (showMonth && monthWithZero){
        if (dayFomatted === ''){
          dayFomatted = dayFomatted.concat(monthWithZero.toString());
        } else {
          dayFomatted = dayFomatted.concat('-',monthWithZero.toString());
        }
      } else if (zeroFill){
        if (dayFomatted === ''){
          dayFomatted = dayFomatted.concat('00');
        } else {
          dayFomatted = dayFomatted.concat('-00');
        }
      }
      if (showDate && dayWithZero){
        if (dayFomatted === ''){
          dayFomatted = dayFomatted.concat(dayWithZero.toString());
        } else {
          dayFomatted = dayFomatted.concat('-',dayWithZero.toString());
        }
      } else if (zeroFill){
        if (dayFomatted === ''){
          dayFomatted = dayFomatted.concat('00');
        } else {
          dayFomatted = dayFomatted.concat('-00');
        }
      }
      // const dayFomatted = year && monthWithZero && dayWithZero ? `${year}-${monthWithZero}-${dayWithZero}` : '';
      if (onChange){
        onChange({ 'target':{ name, id, 'value': dayFomatted } });
      }
    }
  },[day, id, month, name, onChange, year]);  

  const renderDayOptions = () => {
    const returnArr = [];
    for (let i = 1; i <= 31; i++){
      returnArr.push(
        <option value={i}>{i}</option>,
      );
    }
    return returnArr;
  };

  const renderMonthOptions = () => {
    const returnArr = [];
    const MONTHS = commonConstant.MONTHS as IMONTHS;
    for (let i = 0; i <= 11; i++){
      returnArr.push(
        <option value={i + 1}>{MONTHS[language][i]}</option>,
      );
    }
    return returnArr;
  };

  // const daysInMonth = (month, year) => new Date(year, month, 0).getDate(); 

  const renderYearOptions = () => {
    const returnArr = [];
    for (let i = maxYear; i >= minYear; i--){
      returnArr.push(
        <option value={i}>{language === 'th' ? i : i - 543 }</option>,
      );
    }
    return returnArr;
  };

  const DATE = commonConstant.date as IDATE;

  const MONTH = commonConstant.month as IMONTH;

  const YEAR = commonConstant.year as IYEAR;

  return (
    <StyledLegacyDatePickerContainer className="datepicker-container" style={{ 'gridTemplateColumns': templateColumn() }}>
      {
        showDate && <div className="inline-picker date">
          <select id="day" className={day ? '' : 'placeholder'} value={day ? day : ''} onChange={e => setDay(parseInt(e.target.value))}>
            <option value="" disabled>{DATE[language]}</option>
            {
              renderDayOptions()
            }
          </select>
          <div className="select_arrow">
            <ChevronDown />
          </div>
        </div>
      }
      {
        showMonth && <div className="inline-picker month">
          <select className={month ? '' : 'placeholder'} value={month ? month : ''} onChange={e => setMonth(parseInt(e.target.value))}>
            <option value="" disabled>{MONTH[language]}</option>
            {
              renderMonthOptions()
            }
          </select>
          <div className="select_arrow">
            <ChevronDown />
          </div>
        </div>    
      }
      {
        showYear && <div className="inline-picker year">
          <select className={year ? '' : 'placeholder'} value={year ? year : ''} onChange={e => setYear(parseInt(e.target.value))}>
            <option value="" disabled>{YEAR[language]}</option>
            {
              renderYearOptions()
            }
          </select>
          <div className="select_arrow">
            <ChevronDown />
          </div>
        </div>
      }
    </StyledLegacyDatePickerContainer>
  );
};

