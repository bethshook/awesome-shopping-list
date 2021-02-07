import React, { useEffect, useState } from "react";
import styled from "styled-components";
import './App.css';
import ListGroup from "./components/ListGroup";

const BREAKPOINTS = {
  SM: '480px',
  MD: '768px',
  LG: '1024px',
};

const Wrapper = styled.main`
  padding: 0 2rem;
  max-width: 80rem;
  margin: 0 auto;
  
  @media (min-width: ${BREAKPOINTS.LG}) {
    width: 80%;
  }
`;

const FlexSection = styled.section`
  @media (min-width: ${BREAKPOINTS.MD}) {
    display: flex;
    justify-content: space-between;
    margin: 0 -3rem;
  }
`;

const FlexItem = styled.div`
  flex: 1;
  margin: 0 3rem;
`;

const Input = styled.input``;
const Button = styled.button``;

const H1 = styled.h1`
  text-align: center;
`;
const H2 = styled.h2``;

function App() {
  const [itemCount, setItemCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [pendingItems, setPendingItems] = useState([]);
  const [visiblePendingItems, setVisiblePendingItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);
  const [categories, setCategories] = useState(["uncategorized"]);
  const [itemsByCategory, setItemsByCategory] = useState({ uncategorized: [] });
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // Reset visible pending items on pending items change.
    setVisiblePendingItems(pendingItems);

    // Update subtotal on pending items change.
    let subtotalHolder = 0;
    pendingItems.forEach((item) => (subtotalHolder += item.price * item.qty));
    setSubtotal(subtotalHolder);
  }, [pendingItems]);

  useEffect(() => {
    // Update sorted visible items when visible items changes.
    const categoryObj = {};
    categories.forEach((cat) => (categoryObj[cat] = []));
    visiblePendingItems.forEach((i) => categoryObj[i.category].push(i));
    setItemsByCategory(categoryObj);
  }, [visiblePendingItems]);

  // Handle input change.
  const handleChange = (input) => {
    setInputValue(input);
    if (!input) {
      setVisiblePendingItems(pendingItems);
    } else {
      // Filter pending items for those that match search.
      const matchingPending = pendingItems.filter((item) =>
        item.label.includes(input)
      );
      setVisiblePendingItems(matchingPending);
    }
  };

  // Handle adding new item.
  const handleAdd = () => {
    setPendingItems([
      ...pendingItems,
      {
        label: inputValue,
        qty: 1,
        price: 0,
        category: "uncategorized",
        id: itemCount,
      },
    ]);
    setItemCount(itemCount + 1);
    setInputValue("");
  };

  // Handle editing item.
  const handleEdit = (newItem) => {
    const newCategory = newItem.category.toLowerCase();
    if (categories.indexOf(newCategory) < 0) {
      setCategories([...categories, newCategory]);
      setItemsByCategory({ ...itemsByCategory, newCategory: [] });
    }
    const updatedPending = pendingItems.map((pending) => {
      return pending.id === newItem.id ? newItem : pending;
    });
    setPendingItems(updatedPending);
  };

  return (
    <Wrapper>
      <H1>Awesome Shopping List</H1>
      <FlexSection>
        <FlexItem>
          <Input
            value={inputValue}
            aria-label="Item name"
            placeholder="Item name"
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
          />
          <Button onClick={() => handleAdd()}>Create</Button>
        </FlexItem>
        <FlexItem>Subtotal (USD): ${subtotal}.00</FlexItem>
      </FlexSection>

      <FlexSection>
        <FlexItem>
          <H2>Pending</H2>
          {categories.map((cat) =>
            itemsByCategory[cat] && itemsByCategory[cat].length ? (
              <ListGroup
                key={cat}
                title={cat}
                items={itemsByCategory[cat]}
                itemClickHandler={(item) => {
                  setPendingItems(pendingItems.filter((i) => i !== item));
                  setRemovedItems([...removedItems, item]);
                }}
                itemEditHandler={(newItem) => handleEdit(newItem)}
              />
            ) : null
          )}
        </FlexItem>
        <FlexItem>
          <H2>Crossed Off</H2>
          <ListGroup
            title=""
            items={removedItems}
            itemClickHandler={(item) => {
              setRemovedItems(removedItems.filter((i) => i !== item));
              setPendingItems([...pendingItems, item]);
            }}
          />
        </FlexItem>
      </FlexSection>
    </Wrapper>
  );
}

export default App;
