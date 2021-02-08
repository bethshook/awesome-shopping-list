import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "styled-react-modal";
import EditForm from "./EditForm";
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

const ListItem = styled.li`
  display: flex;
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
  align-items: flex-end;
  flex-grow: 1;
`;

const Item = styled(PlainButton)`
  text-align: left;
`;

const ItemWrapper = styled.div`
  margin: 0 2rem;
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: space-between;
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
  width: 2rem;
`;

const Emphasized = styled(FixedSpan)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkblue};
  width: 2rem;
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

function ListGroup({
  title,
  items,
  itemClickHandler,
  itemEditHandler,
  isPending,
}) {
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
          <React.Fragment key={item.id}>
            <ListItem isPending={isPending}>
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
                          itemSaveHandler={(e, updatedItem) => {
                            itemEditHandler(updatedItem);
                            toggleModal(e);
                          }}
                          closeHandler={toggleModal}
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
