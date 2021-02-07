import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "styled-react-modal";
import EditForm from "./EditForm";

const Wrapper = styled.div``;
const H3 = styled.h3``;
const List = styled.ul``;
const ListItem = styled.li``;
const EditButton = styled.button``;
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

  const formattedTitle = title ? title[0].toUpperCase() + title.substring(1) : "";

  return (
    <Wrapper>
      {formattedTitle && <H3>{formattedTitle}</H3>}
      <List>
        {items.sort(sortByLabel).map((item) => (
          <React.Fragment key={item.id}>
            <ListItem onClick={() => itemClickHandler(item)}>
              {item.qty} {item.label} ${item.price}.00
            </ListItem>
            {typeof itemEditHandler === "function" ? (
              <>
                <EditButton onClick={() => toggleModal()}>edit</EditButton>
                <StyledModal
                  isOpen={isOpen}
                  onBackgroundClick={toggleModal}
                  onEscapeKeydown={toggleModal}
                >
                  <EditForm 
                    item={item} 
                    itemSaveHandler={(updatedItem) => {
                        itemEditHandler(updatedItem)
                        toggleModal();
                    }}
                    closeHandler={() => toggleModal()}
                    />
                </StyledModal>
              </>
            ) : null}
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
  itemEditHandler: null,
};

export default ListGroup;
