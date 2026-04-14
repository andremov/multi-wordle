import { useState } from 'react';
import { NewGame } from './new-game';
import { useWordleStore } from '../services/wordle-store';
import { useGuessStore } from '../services/guess-store';

export const InfoHeader = () => {
  const [showModal, setModal] = useState(false);
  const wordleList = useWordleStore((s) => s.wordleList);
  const guessList = useGuessStore((s) => s.guessList);

  const activeCount = wordleList.filter((i) => i.solved === 0).length;

  return (
    <>
      <NewGame visible={showModal} close={() => setModal(false)} />
      <div className="mx-auto mb-4 flex h-[50px] w-[260px]">
        <div className="flex-[3]">
          <div>{`Active games: ${activeCount}/${wordleList.length}`}</div>
          <div>{`Guesses: ${guessList.length}`}</div>
        </div>
        <button
          className="flex-1 ml-4 rounded-[5px] border border-neutral-400 bg-neutral-100 text-neutral-900 hover:bg-neutral-400/50 transition-colors duration-100 cursor-pointer dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-600/50"
          onClick={() => setModal(true)}
        >
          New
        </button>
      </div>
    </>
  );
};
