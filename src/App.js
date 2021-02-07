import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ListGroup from "./components/ListGroup";

const Wrapper = styled.main``;
const FlexSection = styled.section``;
const FlexItem = styled.div``;
const Input = styled.input``;
const Button = styled.button``;

const H1 = styled.h1``;
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
    // Changes made to pending reset visible pending items.
    setVisiblePendingItems(pendingItems);

    let subtotalHolder = 0;
    pendingItems.forEach(item => subtotalHolder += (item.price * item.qty));
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
      { label: inputValue, qty: 1, price: 0, category: "uncategorized", id: itemCount},
    ]);
    setItemCount(itemCount + 1);
    setInputValue("");
  };

  return (
    <Wrapper>
      <H1>Awesome Shopping List App</H1>
      <FlexSection>
        <Input
          value={inputValue}
          placeholder="Item name"
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
        <Button onClick={() => handleAdd()}>Create</Button>
        Subtotal (USD): ${subtotal}.00
      </FlexSection>

      <FlexSection>
        <FlexItem>
          <H2>Pending</H2>
          {categories.map((cat) => (
              itemsByCategory[cat] && itemsByCategory[cat].length ? (
                <ListGroup
                  key={cat}
                  title={cat}
                  items={itemsByCategory[cat]}
                  itemClickHandler={(item) => {
                    setPendingItems(pendingItems.filter((i) => i !== item));
                    setRemovedItems([...removedItems, item]);
                  }}
                  itemEditHandler={(newItem) => {
                    const newCategory = newItem.category.toLowerCase();
                    if (categories.indexOf(newCategory) < 0) {
                      setCategories([...categories, newCategory]);
                      setItemsByCategory({...itemsByCategory, newCategory: []})
                    };
                    const updatedPending = pendingItems.map(pending => {
                      return pending.id === newItem.id ? newItem : pending;
                    })
                    setPendingItems(updatedPending);                    
                  }}
                />
              ) : null
            )
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
