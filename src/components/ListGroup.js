import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div``;
const H3 = styled.h3``;
const List = styled.ul``;
const ListItem = styled.li``;
const EditButton = styled.button``;

function ListGroup({ title, items, itemClickHandler, itemEditHandler }) {

    const sortByLabel = (a,b) => {
        const labelA = a.label.toUpperCase();
        const labelB = b.label.toUpperCase();
        return (labelA > labelB) ? 1 : ((labelB > labelA) ? -1 : 0);
    }

  return (
    <Wrapper>
      <H3>{title}</H3>
      <List>
        {items.sort(sortByLabel).map((item) => (
          <React.Fragment key={item.id}>
            <ListItem onClick={() => itemClickHandler(item)}>
              {item.qty} {item.label} ${item.price}.00
            </ListItem>
            <EditButton onClick={() => itemEditHandler(item)}>edit</EditButton>
          </React.Fragment>
        ))}
      </List>
    </Wrapper>
  );
}

ListGroup.propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    itemClickHandler: PropTypes.func,
    itemEditHandler: PropTypes.func,
};

ListGroup.defaultProps = {
    title: "",
    items: [],
    itemClickHandler: () => {},
    itemEditHandler: () => {},
};

export default ListGroup;
