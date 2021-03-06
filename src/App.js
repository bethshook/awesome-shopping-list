import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import ListGroup from "./components/ListGroup";
import Button from "./components/Button";
import breakpoints from "./utils/breakpoints";

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.blue};
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Intro = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;

const Wrapper = styled.main`
  padding: 10rem 2rem 2rem;
  max-width: 70rem;
  margin: 0 auto;

  @media (min-width: ${breakpoints.md}) {
    width: 60%;
  }
`;

const FlexSection = styled.section`
  margin-top: 3rem;

  @media (min-width: ${breakpoints.xl}) {
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
  color: ${({ theme }) => theme.colors.orangered};
  margin-right: 0.5rem;
`;

const Subtotal = styled.span`
  font-size: 1.5rem;
`;

const Input = styled.input`
  height: 2.5rem;
  background: ${({ theme }) => theme.colors.lightgray};
  border: none;
  padding: 0 1rem;
  font-size: 1rem;
  margin-bottom: 2rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 1rem;
  }

  @media (min-width: ${breakpoints.xl}) {
    margin-bottom: 0;
  }
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.lightyellow};
  font-weight: 700;
  text-decoration: none;
  transition: all 0.1s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 0;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.white};
`;

const H2 = styled.h2`
  color: ${({ theme }) => theme.colors.darkblue};
`;

function App() {
  const [itemCount, setItemCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [pendingItems, setPendingItems] = useState([]);
  const [visiblePendingItems, setVisiblePendingItems] = useState([]);
  const [visibleRemovedItems, setVisibleRemovedItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);
  const [categories, setCategories] = useState(["uncategorized"]);
  const [itemsByCategory, setItemsByCategory] = useState({ uncategorized: [] });
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // Reset visible items on items change.
    setVisiblePendingItems(pendingItems);
    setVisibleRemovedItems(removedItems);

    // Update subtotal on pending items change.
    let subtotalHolder = 0;
    pendingItems.forEach((item) => (subtotalHolder += parseFloat((item.price * item.qty).toFixed(2))));
    setSubtotal(subtotalHolder);
  }, [pendingItems, removedItems]);

  useEffect(() => {
    // Update sorted visible items when visible items changes.
    const categoryObj = {};
    categories.forEach((cat) => {
      if (!categoryObj[cat]) categoryObj[cat] = [];
    });
    visiblePendingItems.forEach((i) =>
      categoryObj[i.category.toLowerCase()].push(i)
    );
    setItemsByCategory(categoryObj);
  }, [visiblePendingItems, categories]);

  // Handle input change.
  const handleChange = (input) => {
    setInputValue(input);
    if (!input) {
      setVisiblePendingItems(pendingItems);
      setVisibleRemovedItems(removedItems);
    } else {
      // Filter pending and removed items for those that match search.
      const matchingPending = pendingItems.filter(item =>
        item.label.includes(input)
      );
      const matchingRemoved = removedItems.filter(item => 
        item.label.includes(input)
      );
      setVisiblePendingItems(matchingPending);
      setVisibleRemovedItems(matchingRemoved);
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
        price: 0.00,
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
            An OpenStax shopping list app by{" "}
            <Link href="https://github.com/bethshook" target="_blank">
              Beth Shook
            </Link>
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
            <Button title="Create" clickHandler={handleAdd} />
          </InputGroup>

          <FlexItem>
            <SubtotalLabel>Subtotal (USD):</SubtotalLabel>{" "}
            <Subtotal>${subtotal}</Subtotal>
          </FlexItem>
        </FlexSection>

        <FlexSection>
          <FlexItem>
            <H2>Pending</H2>
            <p>{visiblePendingItems.length ? "Click on an item to cross it out." : "No pending items to show."}</p>
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
                  isPending
                />
              ) : null
            )}
          </FlexItem>

          <FlexItem>
            <H2>Crossed Off</H2>
            <p>{visibleRemovedItems.length ? "Click on an item to return it to pending." : "No crossed off items to show."}</p>
            <ListGroup
              title=""
              items={visibleRemovedItems}
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
