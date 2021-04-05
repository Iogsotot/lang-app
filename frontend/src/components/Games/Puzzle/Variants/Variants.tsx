import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Word } from '../../../../models/word';
import { VariantsProps } from '../Puzzle.model';

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

const Variants = (props: VariantsProps) => {
  const { items, handleDoubleClick } = props;
  return (
    <div className="puzzle__variants">
      <Droppable droppableId="variants" direction="horizontal">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className="cards-wrapper" style={getListStyle(snapshot.isDraggingOver)}>
            {items && items.map((item: Word, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided2, snapshot2) => (
                  <div
                    ref={provided2.innerRef}
                    {...provided2.draggableProps}
                    {...provided2.dragHandleProps}
                    className="card"
                    id={item.id}
                    onDoubleClick={handleDoubleClick}
                    style={getItemStyle(
                      snapshot2.isDragging,
                      provided2.draggableProps.style,
                    )}
                  >
                    {item.word}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Variants;
