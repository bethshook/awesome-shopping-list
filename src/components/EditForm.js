import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div``;
const Input = styled.input``;

function EditForm({ title, item, itemSaveHandler, closeHandler }) {
    const [updatedItem, setUpdatedItem] = useState({});

    useEffect(() => {
        setUpdatedItem(item);
    }, [item]);

  return (
    <Wrapper>
      <h4>{item.label}</h4>
      <p>{item.label}</p>
      Category:
      <Input
        placeholder={item.category}
        onChange={e => setUpdatedItem({...updatedItem, category: e.target.value})}
        onKeyDown={(e) => {
          // if (e.key === "Enter") handleAdd();
        }}
      />
      Quantity:
      <Input
        placeholder={item.qty}
        type="number"
        onChange={e => setUpdatedItem({...updatedItem, qty: e.target.value})}
        onKeyDown={(e) => {
          // if (e.key === "Enter") handleAdd();
        }}
      />
      Price:
      <Input
        placeholder={item.price}
        type="number"
        onChange={e => setUpdatedItem({...updatedItem, price: e.target.value})}
        onKeyDown={(e) => {
          // if (e.key === "Enter") handleAdd();
        }}
      />
        <button onClick={() => itemSaveHandler(updatedItem)}>Save</button>
        <button onClick={() => closeHandler()}>Close me</button>
    </Wrapper>
  );
}

EditForm.propTypes = {
  title: PropTypes.string,
  item: PropTypes.object,
  closeHandler: PropTypes.func,
  itemSaveHandler: PropTypes.func,
};

EditForm.defaultProps = {
  title: "",
  item: {},
  closeHandler: () => {},
  itemSaveHandler: null,
};

export default EditForm;
