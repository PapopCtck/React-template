import { ReactElement } from 'react';
import { StyledBoxCheckboxContainer, StyledCheckboxContainer } from './Checkbox.styles';
import { ICheckbox } from './Checkbox.interfaces';


export const Checkbox = ({ label, checked = false, className,containerClassname, checkmarkColor = '#2C2C2C', borderColor = '#2C2C2C', onClick, type = 'circle',id, ...rest }: ICheckbox): ReactElement => {
  if (type === 'circle'){
    return <StyledCheckboxContainer className={containerClassname} borderColor={borderColor}>
      <label onClick={onClick}>
        {label}
      </label>
      <input className={className} type="checkbox" id={id} checked={checked} onClick={onClick} {...rest} />
      <span className="checkmark" onClick={onClick}>
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.85273 1.09275C10.2524 0.69304 10.9005 0.69304 11.3002 1.09275C11.6999 1.49247 11.6999 2.14053 11.3002 2.54024L5.15904 8.68142C4.75933 9.08113 4.11126 9.08113 3.71155 8.68142L0.299785 5.26965C-0.0999283 4.86994 -0.0999283 4.22188 0.299785 3.82217C0.699498 3.42245 1.34756 3.42245 1.74727 3.82217L4.43529 6.51019L9.85273 1.09275Z" fill={checkmarkColor}/>
        </svg>
      </span>
    </StyledCheckboxContainer>;
  } else {
    return (
      <StyledBoxCheckboxContainer>
        <label onClick={onClick}>
          {label}
        </label>
        <input className={className} type="checkbox" id={id} checked={checked} onClick={onClick} {...rest} />
        <span className="checkmark" onClick={onClick} />
      </StyledBoxCheckboxContainer>
    );
  }
};
