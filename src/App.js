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

function App() {
  const [inputValue, setInputValue] = useState('');
  const [pendingItems, setPendingItems] = useState([]);
  const [visiblePendingItems, setVisiblePendingItems] = useState([]);

  useEffect(() => {
    setVisiblePendingItems(pendingItems);
  }, [pendingItems])

  const handleChange = input => {
    setInputValue(input);
    if (!input) {
      setVisiblePendingItems(pendingItems);
    } else {
      const matchingPending = pendingItems.filter(item => item.includes(input));
      setVisiblePendingItems(matchingPending);
    }
  }

  return (
    <Wrapper>
      <H1>Awesome Shopping List App</H1>
      <FlexSection>
        {/* Input and subtotal go at top */}
        <Input value={inputValue} placeholder="Item name" onChange={(e)  => handleChange(e.target.value)}/>
        <Button onClick={() => setPendingItems([...pendingItems, inputValue])}>Create</Button>
        Subtotal (USD): $0.00
      </FlexSection>

      <FlexSection>
        <FlexItem>
          <H2>Pending</H2>
          {/* For each category create a list group */}
          {/* Mapped categories */}
          <ul>
            {visiblePendingItems.map(item => (
              <li>{item}</li>
            ))}
          </ul>
        </FlexItem>
        <FlexItem>
          <H2>Crossed Off</H2>
          {/* Crossed off items go here */}
          {/* Only one list group bc no categories shown */}
          <ListGroup />
        </FlexItem>
      </FlexSection>

    </Wrapper>
  );
}

export default App;
