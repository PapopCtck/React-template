import { useCallback, useState, useRef, useLayoutEffect, 
  forwardRef, useImperativeHandle, ReactElement, createElement } from 'react';
import { IInput, IOTPInput, IisFocusingCurrentTarget } from './OTPInput.interfaces';
import { StyledOTPInputContainer, StyledCountdown } from './OTPInput.styles';

const Input = ({ otpValues,index, focus,blur,count,loading, handleOnFocus,handleOnKeyDown,handleOnChange, handleOnPaste,...rest }: IInput): ReactElement => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useLayoutEffect(() => {
    if (inputRef.current){
      if (focus){
        inputRef.current?.focus();
      }
      if (blur){
        inputRef.current?.blur();
      }
    }
  },[focus, blur]);
  return <input 
    value={otpValues[index]}
    name={index === 0 ? 'otp' : ''}
    autoComplete="one-time-code"
    type="tel" ref={inputRef}  
    className={`otp-number ${focus && 'focus'}`}
    pattern="[0-9]*" 
    disabled={loading}
    maxLength={count}
    onFocus={handleOnFocus(index)} 
    onKeyDown={handleOnKeyDown}
    onInput={handleOnChange}
    onPaste={handleOnPaste}
    placeholder=" "
    {...rest} />;
};

export const OTPInput = forwardRef(({ onChange, count = 0,invalid,id, onLastInput, loading, resendBtn = false, resendFn, delay = false, resendDelay = 60, invalidMessage = null, disabled = false }: IOTPInput,ref): ReactElement => {
  const [activeInput, setActiveInput] = useState(-1);
  const [blurInput, setBlurInput] = useState(-1);
  const [otpValues, setOTPValues] = useState(Array(count).fill(''));
  const [timer, setTime] = useState(resendDelay);
  const [countdown, setCountdown] = useState(false);

  useImperativeHandle(ref, () => ({
    clear: () => {
      const newArr = Array(count).fill('');
      setOTPValues(newArr);
      setActiveInput(-1);
      setBlurInput(-1);
      if (onChange){
        onChange('', { id,value:'', isFilled: false });
      }
    },
  }));

  useLayoutEffect(() => {
    if (!countdown) {return;}
    const interval = setInterval(() => {
      if (countdown && timer > 0){
        setTime(timer - 1);
      } else {
        setCountdown(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  },[countdown, timer]);

  const focusInput = useCallback(
    (inputIndex) => {
      const selectedIndex = Math.max(Math.min(count - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [count],
  );

  const handleOnFocus = useCallback(
    (index) => () => {
      focusInput(index);
    },
    [focusInput],
  );


  const onBlur = useCallback((e) => {
    if (!isFocusingCurrentTarget(e)){
      setActiveInput(-1);
      setBlurInput(-1);
    }
  }, []);

  const isFocusingCurrentTarget = ({ relatedTarget, currentTarget }: IisFocusingCurrentTarget) => {
    if (relatedTarget === null) {return false;}
    
    let node = relatedTarget.parentNode;
          
    while (node !== null) {
      if (node === currentTarget) {return true;}
      node = node.parentNode;
    }
  
    return false;
  };

  const handleLastInput = useCallback(
    (otp,maxLength) => {
      setBlurInput(maxLength);
      if (onLastInput){
        const otpValue = otp.join('');
        onLastInput(otpValue,{ id,value:otpValue, isFilled: otpValue.length === count });
      }
    },
    [setBlurInput,onLastInput, count, id],
  );

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  const handleOtpChange = useCallback(
    (otp) => {
      if (onChange){
        const otpValue = otp.join('');
        onChange(otpValue, { id,value:otpValue, isFilled: otpValue.length === count });
      }
    },
    [onChange, id,count],
  );

  const getRightValue = useCallback(
    (val) => !val || /\d{1,4}/.test(val) ? val : '',
    [],
  );

  const changeCodeAtFocus = useCallback(
    (str) => {
      const updatedOTPValues = [...otpValues];
      if (str.length === count){
        const values = str.trim().slice(0, count - activeInput).split('');
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(values.shift() || val);
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
            }
          }
        });
        setBlurInput(activeInput);
        const lastFocusIndex = Math.min(activeInput + str.length, count - 1);
        const maxLength = Math.max(count - 1,0);
        if (lastFocusIndex === maxLength){
          handleLastInput(updatedOTPValues,maxLength);
        }
      } else {
        updatedOTPValues[activeInput] = str[0] || '';
      }
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
      return updatedOTPValues;
    },
    [activeInput, handleOtpChange, otpValues, count, getRightValue, handleLastInput],
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const handleOnKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus('');
            focusPrevInput();
          } else {
            focusPrevInput();
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          focusNextInput();
          break;
        }
        case ' ': {
          e.preventDefault();
          break;
        }
        case otpValues[activeInput]: {
          e.preventDefault();
          focusNextInput();
          break;
        }
        default:
          break;
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues],
  );


  const handleOnChange = useCallback(
    (e) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      } else if (otpValues[activeInput]){
        e.preventDefault();
        return;
      }
      const newOTP = changeCodeAtFocus(val);
      const maxLength = Math.max(count - 1,0);
      if (activeInput === maxLength){
        handleLastInput(newOTP,maxLength);
      } else if (val.length !== count) {
        focusNextInput();
      }
    },
    [changeCodeAtFocus, focusNextInput, getRightValue, activeInput, count, handleLastInput],
  );

  const handleOnPaste = useCallback(
    (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData('text/plain')
        .trim()
        .slice(0, count - activeInput)
        .split('');
      if (pastedData) {
        let nextFocusIndex = 0;
        const updatedOTPValues = [...otpValues];
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || val);
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updatedOTPValues);
        setActiveInput(Math.min(nextFocusIndex + 1, count - 1));
      }
    },
    [activeInput, getRightValue, count, otpValues],
  );

  const handleResend = useCallback(
    () => {
      if (delay){
        setTime(resendDelay);
        setCountdown(true);
      }
      if (resendFn){
        resendFn();
      }
    },
    [resendFn, setCountdown, delay, resendDelay],
  );

  const renderInputs = () => {
    const returnArr = otpValues.map((_,index) => {
      const focus = activeInput === index;
      const blur = blurInput === index;
      return createElement(Input ,{ otpValues,index, focus,blur,count,loading, handleOnFocus, handleOnKeyDown,handleOnChange, handleOnPaste, key: index });
    });
    return returnArr;
  };

  return (
    <>
      <StyledOTPInputContainer className={`${activeInput !== -1 && 'focus'} ${invalid && 'invalid'} ${loading && 'loading'} ${disabled && 'disabled'}`} onSubmit={(e) => e.preventDefault()} onBlur={onBlur}>
        <div className={`shimmer-container ${loading && 'loading'}`}>
          <div className="shimmer"/>
        </div>
        {renderInputs()}
        {invalid && <div className="invalid-message">{invalidMessage}</div>}
        {resendBtn && <div className={`link ${(loading || disabled) && 'disabled'} ${countdown && 'countdown-shown'}`} onClick={loading || countdown ? undefined : () => handleResend()}> ขอหมายเลข OTP อีกครั้ง</div>}
      </StyledOTPInputContainer>
      {countdown && <StyledCountdown>โปรดรอ {timer} วินาที ก่อนขอ otp อีกครั้ง</StyledCountdown> }
    </>
  );
});
