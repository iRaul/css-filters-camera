// React
import React from 'react'

// Styled Components
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  border-radius: 4px;
  border: none;
  padding: 8px;
  background: #222;
  color: #FFF;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;

  &:focus {
    outline: 1px dashed #333;
  }
`;

const SnapButton = props => {
  return (
    <Button onClick={ props.handleTakePic }>SNAP</Button>
  )
}

export default SnapButton;
