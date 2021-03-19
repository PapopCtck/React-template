import { CSSProperties, ReactElement, ReactNode, useEffect, useRef } from 'react';
import { XCircle, CheckCircle } from 'react-feather';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { colorMix } from '../../utils';

export interface IAlert {
  className?: string,
  type: 'success' | 'danger',
  closable?: boolean,
  show: boolean,
  onCloseClick?: () => void,
  children?: ReactNode,
  styleCloseBtn?: CSSProperties,
  styleBanner?: CSSProperties,
}

export const StyledAlert = styled.div`
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in;
  transition: opacity 0.5s ease-in;
  border-radius: 4px;
  width: fit-content;
  min-width: 200px;
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: 0px;
  font-size: ${props => props.theme.fontSizeBase};
  &.show {
    padding: 10px 15px;
    display: block;
    max-height: fit-content;
    opacity: 1;
  }
  .close {
    float: right;
    font-size: 10px;
    margin-top: -8px;
    margin-right: -8px;
    cursor: pointer;
  }
  .icon {
    position: relative;
    top: 2px;
    margin-right: 10px;
  }
`;

export const Alert = ({
  className,
  type,
  closable,
  show,
  onCloseClick,
  children,
  styleCloseBtn,
  styleBanner,
}: IAlert): ReactElement => {
  const didMountRef = useRef(false);
  const theme = useTheme();
  useEffect(() => {
    if (didMountRef.current && show) {
      const timer = setTimeout(() => {
        if (onCloseClick) { onCloseClick(); }
      }, 5000);
      return () => clearTimeout(timer);
    } else { didMountRef.current = true; }
  });
  const types = () => {
    let types;
    switch (type) {
      case 'success':
        types = {
          class: 'success', style: {
            backgroundColor: colorMix(theme.successColor,1),
            border: `1px solid ${colorMix(theme.successColor,3)}`,
            color: theme.textColor,
          }, icon: <CheckCircle size={theme.fontSizeBase} color={theme.successColor} />,
        };
        break;
      case 'danger':
        types = {
          class: 'danger',
          style: { 
            backgroundColor: colorMix(theme.errorColor,1),
            border:`1px solid ${colorMix(theme.errorColor,3)}`,
            color: theme.textColor,
          },
          icon: <XCircle size={theme.fontSizeBase} color={theme.errorColor} />,
        };
        break;
      default:
        types = {
          class: 'success', style: {
            backgroundColor: colorMix(theme.successColor,2),
            border: `1px solid ${colorMix(theme.successColor,3)}`,
            color: theme.textColor,
            icon: null,
          },
        };
        break;
    }
    return types;
  };


  return (
    <StyledAlert
      className={`alert-container ${className} ${types().class} ${show ? 'show' : ''}`}
      style={{ ...types().style, ...styleBanner }}>
      {closable && <span className="close" style={styleCloseBtn} onClick={onCloseClick}>x</span>}
      <span className="icon">{types().icon}</span>
      {children}
    </StyledAlert>
  );
};
