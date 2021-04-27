import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Card from './card';

const Container = styled.div`
  margin: 8px;
  border: ${(props) => (props.bordered ? 1 : 0)}px solid lightgrey;
  width: ${(props) => (props.width ? props.width : '100%')};
  border-radius: 2px;
  margin: auto;

  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'lightgrey' : 'white')};
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: ${(props) => (props.direction === 'column' ? '200px' : '100px')};
  border-radius: 8px;
`;

export default class Box extends React.Component {
  render() {
    const {
      box, cards, width, direction, bordered,
    } = this.props;
    return (
      <Container width={width} bordered={bordered}>
        <Droppable droppableId={box.id} direction={direction}>
          {(provided, snapshot) => (
            <CardList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              direction={direction === 'vertical' ? 'column' : 'row'}
            >
              {cards.map((card, index) => <Card key={card.id} card={card} index={index} />)}
              {provided.placeholder}
            </CardList>
          )}
        </Droppable>
      </Container>
    );
  }
}

Box.propTypes = {
  box: PropTypes.objectOf(PropTypes.shape()).isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  width: PropTypes.number,
  direction: PropTypes.string,
  bordered: PropTypes.bool,
};

Box.defaultProps = {
  width: null,
  direction: 'vertical',
  bordered: false,
};
