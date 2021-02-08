import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  height: 2.5rem;
  border-radius: 0;
  border: none;
  padding: 0 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.darkblue};
  }
`;

const Button = ({ title, clickHandler, className }) => (
  <StyledButton onClick={clickHandler} className={className}>
    {title}
  </StyledButton>
);

Button.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  clickHandler: PropTypes.func,
};

Button.defaultProps = {
  title: "",
  className: "",
  clickHandler: () => {},
};

export default Button;
