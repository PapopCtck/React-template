import React,{ useState, useEffect, ReactNode, ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../Button/Button';
import styled from '@emotion/styled';

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

export const StyledDynamicFormContainer = styled.div`
  .dynamicform-input {
    margin: ${props => props.theme.spaces.mg4} 0;
    .input-container {
      display: inline-block;
    }
  }
`;

export const DynamicForm = (props: IDynamicForm): ReactElement => {
  const [keys,setKeys] = useState<string[]>([]);
  const [id, setId] = useState(uuidv4());
  const [data, setData] = useState<Array<IDynamicFormData>>([]);
  const { customFunction, edit } = props;

  useEffect(() => {
    if (props.data){
      const newKeys = props.data.map(obj => obj.id);
      const newData = [...props.data];
      setKeys(newKeys);
      setData(newData);
      setId(uuidv4());
    }
  },[props.data]);

  const add = () => {
    const newKeys = [...keys];
    const newData = [...data];
    newData.push({ id, value: '' });
    newKeys.push(id);
    setKeys(newKeys);
    setId(uuidv4());
    // setData(newData);
    props.onDataChange(newData);
    props.onAdd && props.onAdd(newData);
  };

  const handleDelete = (id: string) => {
    if (props.onDataDelete){
      props.onDataDelete(id,() => remove(id));
    } else {
      remove(id);
    }
  };

  const remove = (id: string) => {
    const newKeys = keys.filter(key => key !== id);
    const newData = data.filter(data => data.id !== id);
    setKeys(newKeys);
    setData(newData);
    props.onDataChange(newData);
  };
  
  const handleChange = (value: Record<string,unknown> | string,i: string, isError = false) => {
    const newData = [...data];
    const index = data.findIndex(data => data.id === i);
    if (isError){
      newData[index] = { ...data[index], 'value': value, error: {} };
    } else {
      newData[index] = { ...data[index], 'value': value };
    }
    // setData(newData);
    props.onDataChange(newData);
  };

  const renderForm = () => keys.map((val,index) => {
    const onChange = (value: Record<string,unknown>,isError: boolean) => handleChange(value,val,isError);
    const onClickDelete = () => handleDelete(val);
    const data = props?.data?.find(data => data.id === val)?.value;
    const error = props?.data?.find(data => data.id === val)?.error;
    return React.cloneElement(props.template, { onChange, onClickDelete, data, key:val, index, customFunction, error, edit });
  });

  return (
    <StyledDynamicFormContainer>
      {renderForm()}
      <div className="dynamicform-bottom">
        {
          (props.maxLength ? keys.length < props.maxLength : true) && !edit ?
            <Button buttonType="link" onClick={add}>{props.addText ? props.addText : 'Add'}</Button> : null
        }
      </div>
    </StyledDynamicFormContainer>
  );
};
