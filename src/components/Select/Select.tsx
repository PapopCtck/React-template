import React, { createRef, CSSProperties, ReactElement, ReactNode } from 'react';
import styled from '@emotion/styled';
import { withTheme, Theme } from '@emotion/react';
import { ChevronDown } from 'react-feather';

import { colorMix } from '../../utils';
import { Checkbox } from '../Checkbox/Checkbox';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    name?: string;
  }
}

export interface ICustomSelectData {
  target: {
    name?: string,
    value: string,
    id?: string,
  }
}

export interface ICustomSelectProps {
  value?: string,
  children?: ReactNode,
  placeholder?: string,
  onChange: ({ 'target': { name, value, id } }:ICustomSelectData) => void,
  name?: string,
  id?: string,
  disabled?: boolean,
  allKeyword?: string,
  showSelect?: boolean,
  customCarret?: ReactElement,
  theme?: Theme,
}

export interface ISelect extends ICustomSelectProps{
  children?: ReactNode,
  block?: boolean,
  containerClassname?: string,
  containerStyle?: CSSProperties,
}

export interface ICustomSelectState {
  showOptionList: boolean,
  defaultSelectText: ReactNode,
}

export const StyledSelectContainer = styled.div`
  max-width: 400px;
  position: relative;
  &.block {
    max-width: 100%;
    display: block;
    box-sizing: border-box;
  }
  .select-carret {
    position: absolute;
    right: 0.8rem;
    top: 50%;
    transform: translateY(-45%);
  }
`;

export const StyledCustomSelectContainer = styled.div`
.custom-select-container {
  text-align: center;
  position: relative;
  padding: 10px;
  border: 1px solid ${props => props.theme.borderColorBase};
  border-radius: ${props => props.theme.borderRadiusBase};
  outline: none;
  background: ${props => props.theme.componentBackgroundColor};
  transition: .3s all;
  &:focus {
    box-shadow: ${props => `${props.theme.boxShadowInput} ${colorMix(props.theme.primaryColor, 2)}`};
    border: 1px solid ${props => props.theme.primaryColor};
  }
  &.block {
      display: block;
      margin: 10px 0;
      width: 100%;
      box-sizing: border-box;
    }
    & + .error-message {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in;
      transition: opacity 0.3s ease-in;
  }
  &.active {
    box-shadow: ${props => `${props.theme.boxShadowInput} ${colorMix(props.theme.primaryColor, 2)}`};
    border: 1px solid ${props => props.theme.primaryColor};
  }

  &.disabled {
    color: ${props => props.theme.disabledColor};
    & ~ .shellselect-carret {
      color: ${props => props.theme.disabledColor};
    }
  }

  .selected-text {
    margin-right: calc(0.8rem + 15px);
    height: calc(1em + 5px);
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
    &.placeholder {
      color: #404040;
      font-weight: normal;
    }
  }

  .select-options-container {
    position: absolute;
    width: 100%;
    z-index: 1000;
    top: calc(1em + 28px);
    left: 0;
    padding-bottom: 20px;
    ul.select-options {
      margin: 0;
      padding: 10px;
      text-align: left;
      width: 100%;
      background-color: ${props => props.theme.componentBackgroundColor};
      box-shadow:${props => props.theme.boxShadowBase};
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      box-sizing: border-box;
      li.custom-select-option {
        list-style-type: none;
        padding: 6px 10px;
        background: ${props => props.theme.componentBackgroundColor};
        cursor: pointer;
        display: flex;
        align-items: center;
        border-bottom: 1px solid ${props => props.theme.borderColorBase};
        color: ${props => props.theme.textColorSecondary};
      }
    }
  }
}
`;

class CustomSelect extends React.Component<ICustomSelectProps,ICustomSelectState> {
  constructor(props: ICustomSelectProps) {
    super(props);
    this.state = {
      'defaultSelectText': props.value ? props.value : '',
      'showOptionList': false,
    };
    this.container = createRef();
  }

  componentDidMount(): void {
    // Add Event Listner to handle the click that happens outside
    // the Custom Select Container
    document.addEventListener('mousedown', this.handleClickOutside);
    this.getDefaultSelectText(this.props);
  }

  componentDidUpdate(prevProps: ICustomSelectProps): void {
    if (prevProps.value !== this.props.value || prevProps.children !== this.props.children) {
      this.getDefaultSelectText(this.props);
    }
  }

  componentWillUnmount(): void {
    // Remove the event listner on component unmounting
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  private container: React.RefObject<HTMLDivElement>;

  // This method handles the click that happens outside the
  // select text and list area
  handleClickOutside = (e: MouseEvent): void => {
    if (this.container && !this.container.current?.contains(e.target as Node)) {
      this.setState({
        'showOptionList': false,
      });
    }
  };

  // This method handles the display of option list
  handleListDisplay = (): void => {
    this.setState(prevState => ({
      'showOptionList': !prevState.showOptionList,
    }));
  };

  // This method handles the setting of name in select text area
  // and list display on selection
  handleOptionClick = (onChange: ({ 'target': { name, value, id } }:ICustomSelectData) => void, name: string | undefined, children: ReactNode, value: string, id: string | undefined): void => {
    onChange({ 'target': { name, value, id } });
    this.setState({
      'defaultSelectText': children,
      // showOptionList: false,
    });
  };

  getDefaultSelectText = (props: ICustomSelectProps): void => {
    if ((props.value === '' || props.value) && Array.isArray(props.children)) {
      const defaultOption = props.children?.flat().find(e => React.isValidElement(e) ? e.props.value === props.value : false);
      this.setState({
        'defaultSelectText': defaultOption && React.isValidElement(defaultOption) ? defaultOption.props.children : '',
      });
    }
  }

  render(): ReactElement {
    const { children, placeholder, onChange, name, id, value, disabled = false, allKeyword, showSelect = false, customCarret } = this.props;
    const { showOptionList, defaultSelectText } = this.state;
    const isAll = allKeyword && ((value === allKeyword) || (React.Children.count(children) === 2));
    return (
      <StyledCustomSelectContainer ref={this.container} onClick={disabled ? undefined : this.handleListDisplay}>
        <div className={`custom-select-container  ${disabled ? 'disabled' : ''} ${showOptionList ? 'active' : ''}`}
        >
          <div
            className={showOptionList ? `selected-text active ${value === '' && 'placeholder'}` : `selected-text ${value === '' && 'placeholder'}`}
          >
            {defaultSelectText ? defaultSelectText : placeholder}
          </div>
          <div className="select-options-container">
            {showOptionList && !disabled && (
              <ul className={`select-options ${showOptionList ? 'active' : ''}`}>
                {Array.isArray(children) ? children.map((option, idx) => {
                  if (!option) {
                    return null;
                  }
                  if (Array.isArray(option)) {
                    return option.map((ele, index) => {
                      if (ele && React.isValidElement(ele)) {
                        return (<li
                          key={`${idx}-${index}`}
                          className={`custom-select-option ${ele.props.disabled && 'disabled'}`}
                          name={name}
                          id={id}
                          value={ele.props.value}
                          onClick={ele.props.disabled ? undefined : () => this.handleOptionClick(onChange, name, ele.props.children, ele.props.value, id)}
                        >
                          {showSelect && <Checkbox id={`${id}-checkbox${idx}-${index}`} type="box" className="custom-select-option" checked={isAll || (value === ele.props.value)} readOnly />}
                          <span className="custom-select-option">{ele.props.children}</span>
                        </li>
                        );
                      }
                      return null;
                    });
                  } else if (React.isValidElement(option)) {
                    return (
                      <li
                        key={idx}
                        className={`custom-select-option ${option.props.disabled && 'disabled'}`}
                        name={name}
                        id={id}
                        value={option.props.value}
                        onClick={option.props.disabled ? undefined : () => this.handleOptionClick(onChange, name, option.props.children, option.props.value, id)}
                      >
                        {showSelect && <Checkbox id={`${id}-checkbox${idx}`} className="custom-select-option" type="box" checked={isAll || (value === option.props.value)} readOnly />}
                        <span className="custom-select-option">{option.props.children}</span>
                      </li>
                    );
                  }
                }) : React.isValidElement(children) && <li
                  className={`custom-select-option ${children.props.disabled && 'disabled'}`}
                  name={name}
                  id={id}
                  value={children.props.value}
                  onClick={() => this.handleOptionClick(onChange, name, children.props.children, children.props.value, id)}
                >
                  {showSelect && <Checkbox id={`${id}-checkbox`} className="custom-select-option" type="box" checked={isAll || (value === children.props.value)} readOnly />}
                  <span className="custom-select-option">{children.props.children}</span>
                </li>}
              </ul>
            )}
          </div>
        </div>
        <span className="select-carret">
          {
            customCarret ? customCarret : <ChevronDown color={disabled ? this.props.theme?.disabledColor : this.props.theme?.textColor} />
          }
        </span>
      </StyledCustomSelectContainer>
    );
  }
}

const CustomSelectWithTheme = withTheme(CustomSelect);

export const Select = ({ children, block, containerClassname,containerStyle, ...rest }: ISelect): ReactElement => (
  <StyledSelectContainer className={`${block ? 'block' : ''} ${containerClassname}`} style={containerStyle}>
    <CustomSelectWithTheme {...rest}>
      {children}
    </CustomSelectWithTheme>
  </StyledSelectContainer>
);
