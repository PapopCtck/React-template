import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const shake = keyframes`
8%,
  41% {
    transform: translateX(-10px);
  }
  25%,
  58% {
    transform: translateX(10px);
  }
  75% {
    transform: translateX(-5px);
  }
  92% {
    transform: translateX(5px);
  }
  0%,
  100% {
    transform: translateX(0);
  }
`;

export const loading = keyframes`
  0% {
    transform: translateX(-100%);
  }
  20% {
    transform: translateX(-30%);
  }
  100% {
    transform: translateX(120%);
  }
`;

export const StyledOTPInputContainer = styled.form`
  position: relative;
  overflow: hidden;
  width: fit-content;
  overflow: hidden;
  input {
    display: inline-block;
    width: 40px;
    margin-right: ${props => props.theme.spaces.mg1};
    text-align: center;
    transition: border 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    border: none;
    border-bottom-style: solid;
    border-width: 1px;
    border-color: #2c2c2c;
    background-color: transparent;
    color: #2c2c2c;
    font-size: 16px;
    &:placeholder-shown {
      border-color: #969696;
    }
    &:focus{
      box-shadow: none;
      outline: none;
    }
  }
  &.focus {
    input {
      border-color: #2c2c2c;
    }
  }
  &.loading {
    input {
      color: #d3d3d3;
      border-color: #d3d3d3;
    }
  }
  &.invalid {
    animation: ${shake} 0.5s linear;
    input {
      color: #cb5454;
      border-color: #cb5454;
    }
    &.loading {
      input {
        color: #e7b5b5;
        border-color:#e7b5b5;
      }
    }
  }
  &.disabled {
    input {
      color: #d3d3d3;
      border-color: #d3d3d3;
    }
  }
  .shimmer-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${loading} 2.5s infinite;
    z-index: 2;
    mix-blend-mode: lighten;
    display: none;
    &.loading {
      display: block;
    }
  }
  .shimmer {
    width: 30%;
    height: 100%;
    background: #fafafa;
    opacity: 0.8;
    transform: skew(-20deg);
    position: relative;
    filter: blur(10px);
  }

  .invalid-message {
    color: #cb5454;
    font-size: 12px;
    margin-top: ${props => props.theme.spaces.mg1};
  }

  .link {
    color: #537ce5;
    text-decoration: underline;
    font-size: 14px;
    margin-top: ${props => props.theme.spaces.mg3};
    cursor: pointer;
    &.disabled {
      opacity: 0.5;
    }
    &.countdown-shown {
      opacity: 0.5;
    }
  }
`;

export const StyledCountdown = styled.div`
  margin-top: ${props => props.theme.spaces.mg1};
  font-size: 12px;
  color: #cb5454;
`;
