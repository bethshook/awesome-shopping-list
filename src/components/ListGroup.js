import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "styled-react-modal";
import EditForm from "./EditForm";

const Wrapper = styled.div`
  border: 1px solid lightgray;
  border-radius: 4px;
  box-shadow: 0px 0px 39px -9px rgba(0, 0, 0, 0.16);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const H3 = styled.h3`
  margin-top: 0;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;
const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

const PlainButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  font-size: 1rem;
`;

const FlexGroup = styled.div`
    display: flex;
`;

const Item = styled(PlainButton)`
    text-align: left;
`;

const ItemWrapper = styled.div`
    margin: 0 2rem;
    display: flex;
    align-items: flex-end;
`;

const EditButton = styled(PlainButton)`
  margin-left: 0.5rem;
  font-size: .75rem;
`;

const StyledModal = styled(Modal)``;

function ListGroup({ title, items, itemClickHandler, itemEditHandler }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (e) => {
    setIsOpen(!isOpen);
  };

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
        {items.sort(sortByLabel).map((item) => (
          <React.Fragment key={item.id}>
            <ListItem>
              <FlexGroup>
                {item.qty}
                <ItemWrapper>
                  <Item onClick={() => itemClickHandler(item)}>
                    {item.label}
                  </Item>
                  {typeof itemEditHandler === "function" ? (
                    <>
                      <EditButton onClick={() => toggleModal()}>
                        edit
                      </EditButton>
                      <StyledModal
                        isOpen={isOpen}
                        onBackgroundClick={toggleModal}
                        onEscapeKeydown={toggleModal}
                      >
                        <EditForm
                          item={item}
                          itemSaveHandler={(updatedItem) => {
                            itemEditHandler(updatedItem);
                            toggleModal();
                          }}
                          closeHandler={() => toggleModal()}
                        />
                      </StyledModal>
                    </>
                  ) : null}
                </ItemWrapper>
              </FlexGroup>
              ${item.price}.00
            </ListItem>
          </React.Fragment>
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
};

ListGroup.defaultProps = {
  title: "",
  items: [],
  itemClickHandler: () => {},
  itemEditHandler: null,
};

export default ListGroup;
