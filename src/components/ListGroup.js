import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ListItem from "./ListItem";
import breakpoints from "./../utils/breakpoints";

const Wrapper = styled.div`
  box-shadow: 0 10px 6px -6px #777;
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: ${({ theme }) => theme.colors.lightyellow};

  @media (min-width: ${breakpoints.lg}) {
    margin-bottom: 2rem;
  }
`;

const H3 = styled.h3`
  margin-top: 0;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const HeadingRow = styled.li`
  font-size: 0.75rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkgray};
  font-weight: 700;
  display: flex;
  justify-content: space-between;
`;

const FlexGroup = styled.div`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
`;

const ItemWrapper = styled.div`
  margin: 0 2rem;
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: space-between;
`;

const FixedSpan = styled.span`
  width: 2rem;
`;

function ListGroup({
  title,
  items,
  itemClickHandler,
  itemEditHandler,
  isPending,
}) {
  const sortByLabel = (a, b) => {
    const labelA = a.label.toUpperCase();
    const labelB = b.label.toUpperCase();
    return labelA > labelB ? 1 : labelB > labelA ? -1 : 0;
  };

  const formattedTitle = title
    ? title[0].toUpperCase() + title.substring(1)
    : "";

  return items.length ? (
    <Wrapper>
      {formattedTitle && <H3>{formattedTitle}</H3>}
      <List>
        <HeadingRow>
          <FlexGroup>
            <FixedSpan>Qty</FixedSpan>
            <ItemWrapper>
              <span>Item Name</span>
            </ItemWrapper>
          </FlexGroup>
          <span>Price</span>
        </HeadingRow>

        {items.sort(sortByLabel).map((item) => (
          <ListItem 
            item={item} 
            key={item.id} 
            itemClickHandler={itemClickHandler}
            itemEditHandler={itemEditHandler}
            isPending={isPending}
          />
        ))}
      </List>
    </Wrapper>
  ) : null;
}

ListGroup.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  itemClickHandler: PropTypes.func,
  itemEditHandler: PropTypes.func,
  isPending: PropTypes.bool,
};

ListGroup.defaultProps = {
  title: "",
  items: [],
  itemClickHandler: () => {},
  itemEditHandler: null,
  isPending: false,
};

export default ListGroup;
