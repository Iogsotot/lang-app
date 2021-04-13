import React, { FC } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { PhraseProps } from '../Puzzle.model';

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

const Phrase: FC<PhraseProps> = ({ phrase, word, item, outline }) => {
  const splicePhrase = () => (word && phrase ? phrase.toLowerCase().split(word) : []);
  const [firstPart, secondPart] = splicePhrase();

  return (
    <div className="puzzle__phrase" style={{ border: `4px solid ${outline}` }}>
      <div>{firstPart}</div>
      <Droppable droppableId="phrase" direction="horizontal">
        {(provided) => (
          <div ref={provided.innerRef} className="puzzle__space">
            {item && (
              <Draggable key={item.id} draggableId={item.id || '0'} index={0}>
                {(provided2, snapshot2) => (
                  <div
                    ref={provided2.innerRef}
                    {...provided2.draggableProps}
                    {...provided2.dragHandleProps}
                    className="card"
                    style={getItemStyle(
                      snapshot2.isDragging,
                      provided2.draggableProps.style,
                    )}
                  >
                    {item.word}
                  </div>
                )}
              </Draggable>
            )}
          </div>
        )}
      </Droppable>
      <div>{secondPart}</div>
    </div>
  );
};

export default Phrase;
