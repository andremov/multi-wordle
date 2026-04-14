import { useState } from 'react';
import { useWordleStore } from '../services/wordle-store';
import { useGuessStore } from '../services/guess-store';

interface NewGameProps {
  visible: boolean;
  close: () => void;
}

export const NewGame = ({ close, visible }: NewGameProps) => {
  const [num, setNum] = useState(1);

  if (!visible) {
    return null;
  }

  const onChange = (val: string) => {
    const parsed = Number(val);
    if (!Number.isNaN(parsed)) setNum(parsed);
  };

  const onSubmit = () => {
    useWordleStore.getState().resetWordles(num);
    useGuessStore.getState().resetGuesses();
    close();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-20 h-screen w-full max-w-full bg-neutral-100/50 dark:bg-neutral-900/50"
        onClick={close}
      />
      <div className="fixed top-1/2 left-1/2 z-20 box-border h-[120px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-[5px] border border-neutral-400 bg-neutral-100 px-4 py-2 shadow-[0_0_4px_4px_rgba(0,0,0,0.3)] dark:border-neutral-600 dark:bg-neutral-800">
        <div
          className="absolute top-[10px] right-[10px] h-[15px] w-[15px] cursor-pointer rounded-full bg-wordle-red"
          onClick={close}
        />
        <h3 className="mt-0 mb-2 font-semibold">New game</h3>
        <span># of simultaneous Wordles:</span>
        <div className="mt-2 flex items-center">
          <input
            className="box-border border border-neutral-400 bg-neutral-100 px-2 py-1 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
            onChange={(e) => onChange(e.target.value)}
            value={num}
          />
          <button
            className="ml-4 cursor-pointer rounded-[5px] border border-neutral-400 bg-neutral-100 px-4 py-1 text-neutral-900 transition-colors duration-100 hover:bg-neutral-400/50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-600/50"
            onClick={onSubmit}
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};
