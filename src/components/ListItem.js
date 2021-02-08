import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "styled-react-modal";
import EditForm from "./EditForm";
import breakpoints from "./../utils/breakpoints";

const Wrapper = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0.75rem 0;
  text-decoration: ${(props) => (props.isPending ? "" : "line-through")};
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
  align-items: flex-start;
  flex-grow: 1;
`;

const Item = styled(PlainButton)`
  text-align: left;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 1.5rem;

  @media (min-width: ${breakpoints.md}) {
    padding: 0 2rem;
  }
`;

const EditButton = styled(PlainButton)`
  margin-left: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.orangered};
  border-bottom: 1px solid transparent;
  border-radius: 1rem;
  padding: 0.25rem 0.75rem;
  transition: border 0.1s linear;
  color: ${({ theme }) => theme.colors.white};
  &:hover {
  }
`;

const FixedSpan = styled.span`
  min-width: 3rem;
  text-align: right;
`;

const Emphasized = styled(FixedSpan)`
  min-width: 2rem;
  text-align: left;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkblue};
`;

const StyledModal = Modal.styled`
  padding: 3rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.darkblue};
  width: 80%;

  @media (min-width: ${breakpoints.md}) {
    min-width: 20rem;
    width: auto;
  }
`;

function ListItem({ item, itemClickHandler, itemEditHandler, isPending }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper isPending={isPending}>
    <FlexGroup>
      <Emphasized>{item.qty}</Emphasized>
      <ItemWrapper>
        <Item onClick={() => itemClickHandler(item)}>
          {item.label}
        </Item>
        {isPending ? (
          <>
            <EditButton onClick={toggleModal}>
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
                closeHandler={toggleModal}
              />
            </StyledModal>
          </>
        ) : null}
      </ItemWrapper>
    </FlexGroup>
    <FixedSpan>${item.price}</FixedSpan>
  </Wrapper>
  )
}

ListItem.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  itemClickHandler: PropTypes.func,
  itemEditHandler: PropTypes.func,
  isPending: PropTypes.bool,
};

ListItem.defaultProps = {
  title: "",
  items: [],
  itemClickHandler: () => {},
  itemEditHandler: null,
  isPending: false,
};

export default ListItem;
