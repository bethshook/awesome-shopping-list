import React, { useEffect, useState } from "react";
import styled from "styled-components";
import './App.css';
import ListGroup from "./components/ListGroup";
import breakpoints from "./utils/breakpoints";

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${({theme}) => theme.colors.blue};
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Intro = styled.p`
  text-align: center;
  color: ${({theme}) => theme.colors.white};
`;

const Wrapper = styled.main`
  padding: 10rem 2rem 2rem;
  max-width: 70rem;
  margin: 0 auto;
  
  @media (min-width: ${breakpoints.lg}) {
    width: 80%;
  }
`;

const FlexSection = styled.section`
  margin-top: 3rem;

  @media (min-width: ${breakpoints.md}) {
    display: flex;
    justify-content: space-between;
    margin: 3rem -3rem 0 -3rem;
  }
`;

const FlexItem = styled.div`
  flex: 1;
  
  @media (min-width: ${breakpoints.md}) {
    margin: 0 3rem;
  }
`;

const InputGroup = styled(FlexItem)`
  width: 100%;
  display: flex;

  @media (min-width: ${breakpoints.sm}) {
    width: auto;
  }
`;

const SubtotalLabel = styled.span`
  font-weight: 700;
  color: ${({theme}) => theme.colors.orangered};
  margin-right: .5rem;
`;

const Subtotal = styled.span`
  font-size: 1.5rem;
`;

const Input = styled.input`
  height: 2.5rem;
  background: ${({theme}) => theme.colors.lightgray};
  border: none;
  padding: 0 1rem;
  font-size: 1rem;
  margin-bottom: 2rem;

  &::placeholder {
    color: ${({theme}) => theme.colors.gray};
    font-size: 1rem;
  }

  @media (min-width: ${breakpoints.md}) {
    margin-bottom: 0;
  }
`;

const Button = styled.button`
  height: 2.5rem;
  border-radius: 0;
  border: none;
  padding: 0 1rem;
  font-size: .75rem;
  font-weight: 700;
  background: ${({theme}) => theme.colors.blue};
  color: ${({theme}) => theme.colors.white};
  cursor: pointer;
  transition: all .2s ease;

  &:hover {
    background: ${({theme}) => theme.colors.darkblue};
  }
`;

const Link = styled.a`
  color: ${({theme}) => theme.colors.lightyellow};
  font-weight: 700;
  text-decoration: none;
  transition: all 0.1s ease;

  &:hover {
    color: ${({theme}) => theme.colors.white};
  }
`;

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 0;
  font-size: 2.5rem;
  color: ${({theme}) => theme.colors.white};
`;

const H2 = styled.h2`
  color: ${({theme}) => theme.colors.darkblue}
`;

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
    categories.forEach(cat => {
      if (!categoryObj[cat]) categoryObj[cat] = [];
    });
    visiblePendingItems.forEach((i) => categoryObj[i.category.toLowerCase()].push(i));
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
    if (!inputValue) return;
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
    <>
    <Header>
      <div>
        <H1>StaxList</H1>
        <Intro>
          An OpenStax shopping list app by <Link href="https://github.com/bethshook" target="_blank">Beth Shook</Link>
        </Intro>
      </div>
    </Header>
    <Wrapper>
      <FlexSection>
        <InputGroup>
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
        </InputGroup>
        <FlexItem>
          <SubtotalLabel>Subtotal (USD):</SubtotalLabel> <Subtotal>${subtotal}.00</Subtotal>
        </FlexItem>
      </FlexSection>

      <FlexSection>
        <FlexItem>
          <H2>Pending</H2>
          <p>Click on an item to cross it out.</p>
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
          <p>Click on an item to move it back to pending.</p>
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
    </>
  );
}

export default App;
