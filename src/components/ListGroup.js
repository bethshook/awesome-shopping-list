import styled from 'styled-components';

const Wrapper = styled.div``;
const H3 = styled.h3``;
const List = styled.ul``;
const ListItem = styled.li``;
const EditButton = styled.button``;

function ListGroup({ title, items, itemClickHandler, itemEditHandler }) {
  return (
    <Wrapper>
        <H3>{title}</H3>
        <List>
            {items.map(item => (
                <>
                <ListItem onClick={() => itemClickHandler(item)}>
                    {item.qty} {item.label} {item.price}
                </ListItem>
                <EditButton onClick={() => itemEditHandler(item)}>edit</EditButton>
                </>
            ))
            }
        </List>
    </Wrapper>
  );
}

export default ListGroup;
