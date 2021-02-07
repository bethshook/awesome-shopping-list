import styled from 'styled-components';

const Wrapper = styled.div``;
const FlexSection = styled.div``;
const FlexItem = styled.div``;
const ListGroup = styled.div``;

function App() {
  return (
    <Wrapper>
      <h1>Awesome Shopping List App</h1>
      <FlexSection>
        {/* Input and subtotal go at top */}
      </FlexSection>

      <FlexSection>
        <FlexItem>
          {/* Pending items go here */}
          {/* Mapped ListGroups */}
        </FlexItem>
        <FlexItem>
          {/* Crossed off items go here */}
          {/* Only one list group bc no categories shown */}
          <ListGroup />
        </FlexItem>
      </FlexSection>

    </Wrapper>
  );
}

export default App;
