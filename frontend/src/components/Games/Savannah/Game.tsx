// import { FC } from 'react';
// import { GameProps } from './Savannah.model';

// const Game: GameProps = ({
//   statsData,
//   currentWordClassNames,
//   WORDS,
//   currentWords,
//   wordsChunk,
//   soughtIndex,
//   checkPair,
// }) => {
//   <div className="savannah-body">
//     <div className="status-bar box">
//       <div>lives: {statsData.current.lives}</div>
//       <div className="lives">
//         <i className="fas fa-heart" />
//         <i className="fas fa-heart" />
//         <i className="fas fa-heart" />
//         <i className="fas fa-heart" />
//         <i className="far fa-heart" />
//       </div>
//     </div>

//     <div className="current-word__container title is-3 has-text-centered">
//       <div className={currentWordClassNames} key={currentWords[wordsChunk[soughtIndex]].word}>
//         {currentWords[wordsChunk[soughtIndex]].wordTranslate}
//       </div>
//     </div>

//     <div className="answer-variants">
//       <div className="wrapper">
//         {WORDS.map(word => (
//           <div className="button  is-primary is-outlined" onClick={() => checkPair(word)} key={word}>
//             {currentWords[wordsChunk[word]].word}
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>;
// };

export default 'Game';
