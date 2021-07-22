import { Children, Component, createRef, isValidElement, ReactElement, ReactNode, RefObject } from 'react';
import { withTheme } from '@emotion/react';
import { ChevronDown } from 'react-feather';

import Checkbox from '../Checkbox';
import * as styled from './Select.styles';
import { ICustomSelectProps, ICustomSelectState, ICustomSelectData, ISelect } from './Select.interfaces';

const { SelectCarret, SelectContainer, 
  SelectedText, SelectOption, 
  SelectOptionContainer, SelectOptions, 
  StyledCustomSelectContainer, StyledSelectContainer, 
} = styled;

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    name?: string;
  }
}

class CustomSelect extends Component<ICustomSelectProps,ICustomSelectState> {
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

  private container: RefObject<HTMLDivElement>;

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
      const defaultOption = props.children?.flat().find(e => isValidElement(e) ? e.props.value === props.value : false);
      this.setState({
        'defaultSelectText': defaultOption && isValidElement(defaultOption) ? defaultOption.props.children : '',
      });
    }
  }

  render(): ReactElement {
    const { children, placeholder, onChange, name, id, value, disabled = false, allKeyword, showSelect = false, customCarret } = this.props;
    const { showOptionList, defaultSelectText } = this.state;
    const isAll = allKeyword && ((value === allKeyword) || (Children.count(children) === 2));
    return (
      <StyledCustomSelectContainer ref={this.container} onClick={disabled ? undefined : this.handleListDisplay}>
        <SelectContainer disabled={disabled} active={showOptionList} className={showOptionList ? 'active' : ''}
        >
          <SelectedText
            className={`${showOptionList && 'active'} ${value === '' && 'placeholder'}`}
          >
            {defaultSelectText ? defaultSelectText : placeholder}
          </SelectedText>
          <SelectOptionContainer>
            {showOptionList && !disabled && (
              <SelectOptions className={`${showOptionList ? 'active' : ''}`}>
                {Array.isArray(children) ? children.map((option, idx) => {
                  if (!option) {
                    return null;
                  }
                  if (Array.isArray(option)) {
                    return option.map((ele, index) => {
                      if (ele && isValidElement(ele)) {
                        return (<SelectOption
                          key={`${idx}-${index}`}
                          className={`${ele.props.disabled && 'disabled'}`}
                          name={name}
                          id={id}
                          value={ele.props.value}
                          onClick={ele.props.disabled ? undefined : () => this.handleOptionClick(onChange, name, ele.props.children, ele.props.value, id)}
                        >
                          {showSelect && <Checkbox id={`${id}-checkbox${idx}-${index}`} type="box" className="custom-select-option" checked={isAll || (value === ele.props.value)} readOnly />}
                          <span className="custom-select-option">{ele.props.children}</span>
                        </SelectOption>
                        );
                      }
                      return null;
                    });
                  } else if (isValidElement(option)) {
                    return (
                      <SelectOption
                        key={idx}
                        className={`${option.props.disabled && 'disabled'}`}
                        name={name}
                        id={id}
                        value={option.props.value}
                        onClick={option.props.disabled ? undefined : () => this.handleOptionClick(onChange, name, option.props.children, option.props.value, id)}
                      >
                        {showSelect && <Checkbox id={`${id}-checkbox${idx}`} className="custom-select-option" type="box" checked={isAll || (value === option.props.value)} readOnly />}
                        <span className="custom-select-option">{option.props.children}</span>
                      </SelectOption>
                    );
                  }
                }) : isValidElement(children) && <SelectOption
                  className={`${children.props.disabled && 'disabled'}`}
                  name={name}
                  id={id}
                  value={children.props.value}
                  onClick={() => this.handleOptionClick(onChange, name, children.props.children, children.props.value, id)}
                >
                  {showSelect && <Checkbox id={`${id}-checkbox`} className="custom-select-option" type="box" checked={isAll || (value === children.props.value)} readOnly />}
                  <span className="custom-select-option">{children.props.children}</span>
                </SelectOption>}
              </SelectOptions>
            )}
          </SelectOptionContainer>
        </SelectContainer>
        <SelectCarret>
          {
            customCarret ? customCarret : <ChevronDown color={disabled ? this.props.theme?.disabledColor : this.props.theme?.textColor} />
          }
        </SelectCarret>
      </StyledCustomSelectContainer>
    );
  }
}

const CustomSelectWithTheme = withTheme(CustomSelect);

export const Select = ({ children, block, containerClassname,containerStyle, ...rest }: ISelect): ReactElement => (
  <StyledSelectContainer className={`${containerClassname}`} block={block} style={containerStyle}>
    <CustomSelectWithTheme {...rest}>
      {children}
    </CustomSelectWithTheme>
  </StyledSelectContainer>
);
