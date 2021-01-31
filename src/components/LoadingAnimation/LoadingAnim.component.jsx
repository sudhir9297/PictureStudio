import React from "react";
import styled, { keyframes } from "styled-components";

function LoadingAnimation() {
  return (
    <Cont>
      <Spinner>
        <SpinnerOne />
        <SpinnerTwo />
      </Spinner>
    </Cont>
  );
}

export default LoadingAnimation;

const Cont = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const spinnerOne = keyframes`
  0% { transform: rotate(0deg); border-width: 10px; }
  50% { transform: rotate(180deg); border-width: 1px; }
  100% { transform: rotate(360deg); border-width: 10px; }
`;

const spinnerTwo = keyframes`
  0% { transform: rotate(0deg); border-width: 1px; }
  50% { transform: rotate(180deg); border-width: 10px; }
  100% { transform: rotate(360deg); border-width: 1px; }
`;

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

const SpinnerOne = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 8px solid transparent;
  border-top-color:#EEDF77;
  border-radius: 50%;
  animation: ${spinnerOne} 1.2s linear infinite;
`;

const SpinnerTwo = styled(SpinnerOne)`
  border-bottom-color:#EEDF77;
  animation: ${spinnerTwo} 1.2s linear infinite;
`;