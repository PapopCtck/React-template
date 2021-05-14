import { cloneElement, CSSProperties, HTMLAttributes, Key, ReactElement, ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { XCircle, CheckCircle, AlertCircle, X } from 'react-feather';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { AnimatePresence,motion } from 'framer-motion'; 
import { v4 as uuidv4 } from 'uuid';

import { colorMix } from '../../utils';
import { State } from '../..';

export interface IAlert {
  className?: string,
  type?: 'success' | 'danger' | 'warning',
  closable?: boolean,
  show?: boolean,
  onCloseClick?: () => void,
  children?: ReactNode,
  styleCloseBtn?: CSSProperties,
  styleBanner?: CSSProperties,
  duration?: number,
  absolute?: boolean,
  key?: Key | null,
  standalone?: boolean,
}

interface IStyledAlert {
  show: boolean,
  absolute: boolean,
  standalone: boolean,
}

export const StyledAlert = styled(motion.div)<IStyledAlert>(props => ({
  maxHeight: 0,
  overflow: 'hidden',
  transition: 'max-height 0.5s ease-in',
  borderRadius: '4px',
  width: 'fit-content',
  minWidth: '200px',
  margin: '15px auto',
  fontSize: props.theme.fontSizeBase,
  position: 'relative',
}),
props => props.show && ({
  padding: '10px 15px',
  maxHeight: 'fit-content',
}),
props => props.absolute && ({
  position: 'absolute',
  left: 0,
  right: 0,
  margin: '0 auto',
}),
props => props.standalone && ({
  opacity: props.show ? 1 : 0,
  transition: 'opacity 0.5s ease-in',
}),
);

const Close = styled(X)`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const Icon = styled.span`
  font-size: 0;
  margin-right: 10px;
`;

const AlertContent = styled.div`
  display: flex;
  align-items: center;
`;

export const Alert = ({
  className,
  type,
  closable,
  show = true,
  onCloseClick,
  children,
  styleCloseBtn,
  styleBanner,
  duration = 5000,
  absolute = false,
  key,
  standalone = true,
}: IAlert): ReactElement => {
  const theme = useTheme();
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        if (onCloseClick) { onCloseClick(); }
      }, duration);
      return () => clearTimeout(timer);
    }
  },[show]);

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
      case 'warning':
        types = {
          class: 'warning',
          style: { 
            backgroundColor: colorMix(theme.warningColor,1),
            border:`1px solid ${colorMix(theme.warningColor,3)}`,
            color: theme.textColor,
          },
          icon: <AlertCircle size={theme.fontSizeBase} color={theme.warningColor} />,
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

  const motionAnimation = standalone ? {} : {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <StyledAlert
      key={key}
      className={`${className} ${types().class}`}
      style={{ ...types().style, ...styleBanner }}
      show={show}
      absolute={absolute}
      standalone={standalone}
      {
        ...motionAnimation
      }
    >
      {closable && <Close width="10px" height="10px" style={styleCloseBtn} onClick={onCloseClick} />}
      <AlertContent>
        <Icon>{types().icon}</Icon>
        {children}
      </AlertContent>

    </StyledAlert>
  );
};

export interface IAlerts extends HTMLAttributes<HTMLDivElement> {
  stateName?: string,
}

const AlertsContainer = styled.div`
  position: fixed;
  z-index: 999999;
  top: 0;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`;


export const ReduxAlerts = ({ stateName = 'alerts' , ...props }: IAlerts): ReactElement => {
  const [alerts, setAlerts] = useState<Array<ReactElement>>([]);
  const alertsState = useSelector((state: State) => state[stateName]);

  useLayoutEffect(() => {
    if (alertsState.data){
      setAlerts(alerts => [...alerts, 
        cloneElement(<Alert show {...alertsState.data} 
          standalone={false}
          onCloseClick={() => setAlerts(alerts => alerts.slice(1))}>
          {alertsState.data.message}
        </Alert>,{ key: uuidv4() },
        )],
      );
    }
  },[alertsState]);

  return (
    <AlertsContainer {...props} >
      <AnimatePresence initial={false}>
        {
          alerts
        }
      </AnimatePresence>
    </AlertsContainer>
  );
};
