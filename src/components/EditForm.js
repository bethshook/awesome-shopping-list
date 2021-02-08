import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./../components/Button";

const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.white};
`;

const Heading = styled.h3`
  margin-top: 0;
  color: ${({ theme }) => theme.colors.yellow};
`;

const Input = styled.input`
  height: 2.5rem;
  background: ${({ theme }) => theme.colors.lightgray};
  border: none;
  padding: 0 1rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.darkgray};
    font-size: 1rem;
  }
`;

const StyledButton = styled(Button)`
  font-size: 1rem;
  margin-right: 1rem;

  &:hover {
    background: ${({ theme }) => theme.colors.blue};
  }
  &:last-child {
    margin-right: 0;
  }
`;

const CloseButton = styled(StyledButton)`
  background: transparent;
  &:hover {
    background: transparent;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  margin: 0.75rem 0 0.5rem 0;
`;

function EditForm({ item, itemSaveHandler, closeHandler }) {
  const [updatedItem, setUpdatedItem] = useState({});

  useEffect(() => {
    setUpdatedItem(item);
  }, []);

  useEffect(() => {
    setUpdatedItem(item);
  }, [item]);

  const validateKey = (e) => {
    if (e.key === "e" || e.key ==="-") e.preventDefault();
  }

  return (
    <Wrapper>
      <Heading>Edit Item: {item.label}</Heading>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={updatedItem.category}
          onChange={(e) =>
            setUpdatedItem({ ...updatedItem, category: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          value={updatedItem.qty}
          type="number"
          min="0"
          onKeyDown={validateKey}
          onChange={(e) =>
            setUpdatedItem({ ...updatedItem, qty: e.target.value })
          }
        />
      </div>

      <div>
        <Label htmlFor="price">Price (USD)</Label>
        <Input
          id="price"
          value={updatedItem.price}
          type="number"
          min="0"
          onKeyDown={validateKey}
          onChange={(e) =>{
            setUpdatedItem({ ...updatedItem, price: e.target.value })
          }
            
          }
        />
      </div>

      <StyledButton title="Save" clickHandler={() => itemSaveHandler(updatedItem)} />
      <CloseButton title="Close" clickHandler={closeHandler} />
    </Wrapper>
  );
}

EditForm.propTypes = {
  item: PropTypes.object,
  closeHandler: PropTypes.func,
  itemSaveHandler: PropTypes.func,
};

EditForm.defaultProps = {
  item: {},
  closeHandler: () => {},
  itemSaveHandler: null,
};

export default EditForm;
