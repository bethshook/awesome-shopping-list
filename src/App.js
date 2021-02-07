import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.main``;
const FlexSection = styled.section``;
const FlexItem = styled.div``;
const ListGroup = styled.div``;
const Input = styled.input``;
const Button = styled.button``;

const H1 = styled.h1``;
const H2 = styled.h2``;
const H3 = styled.h3``;

function App() {
  const [inputValue, setInputValue] = useState('');
  const [pendingItems, setPendingItems] = useState([]);
  const [visiblePendingItems, setVisiblePendingItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [itemsByCategory, setItemsByCategory] = useState({'uncategorized': []});

  useEffect(() => {
    // Changes made to pending reset visible pending items.
    setVisiblePendingItems(pendingItems);
  }, [pendingItems]);

  useEffect(() => {
    // Update sorted visible items when visible items changes.
    const categoryObj = {};
    categories.forEach(cat => categoryObj[cat] = []);
    visiblePendingItems.forEach(i => categoryObj[i.category].push(i));
    setItemsByCategory(categoryObj);
  }, [visiblePendingItems]);

  // Handle input change.
  const handleChange = input => {
    setInputValue(input);
    if (!input) {
      setVisiblePendingItems(pendingItems);
    } else {
      // Filter pending items for those that match search.
      const matchingPending = pendingItems.filter(item => item.label.includes(input));
      setVisiblePendingItems(matchingPending);
    }
  }

  // Handle adding new item.
  const handleAdd = () => {
    setPendingItems([...pendingItems, {label: inputValue, qty: 1, price: 0, category: 'uncategorized'}]);
    setInputValue('');
  } 

  return (
    <Wrapper>
      <H1>Awesome Shopping List App</H1>
      <FlexSection>
        {/* Input and subtotal go at top */}
        <Input 
          value={inputValue} 
          placeholder="Item name" 
          onChange={(e)  => handleChange(e.target.value)}
          onKeyDown={e => {if (e.key === "Enter") handleAdd()}}
        />
        <Button onClick={() => handleAdd()}>Create</Button>
        Subtotal (USD): $0.00
      </FlexSection>

      <FlexSection>
        <FlexItem>
          <H2>Pending</H2>
          {categories.map(cat => {
            return itemsByCategory[cat].length ? (
              <>
                <H3>{cat}</H3>
                {itemsByCategory[cat].map(item => (
                  <>
                    <li onClick={() => {
                      setPendingItems(pendingItems.filter(i => i !== item));
                      setRemovedItems([...removedItems, item]);
                    }}>
                      {item.qty} {item.label}
                    </li>
                    <button onClick={() => console.log(item)}>edit</button>
                  </>
                ))
              </>
            ) : null;
          })}
        </FlexItem>
        <FlexItem>
          <H2>Crossed Off</H2>
          {/* Crossed off items go here */}
          {/* Only one list group bc no categories shown */}
          <ul>
            {removedItems.map(item => (
              <li onClick={() => {
                setRemovedItems(removedItems.filter(i => i !== item));
                setPendingItems([...pendingItems, item]);
              }}>
                {item.qty} {item.label} ${item.price}.00
              </li>
            ))}
          </ul>
          <ListGroup />
        </FlexItem>
      </FlexSection>

    </Wrapper>
  );
}

export default App;
