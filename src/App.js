import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getWordleList, loadWordles} from "./services/wordleSlice";
import {CurrentGuessDisplay} from "./components/CurrentGuessDisplay";
import {addLetter, deleteLetter, loadGuesses, submitGuess} from "./services/guessSlice";
import {InfoHeader} from "./components/InfoHeader";
import {Game} from "./components/Game";

const App = () => {
    const dispatch = useDispatch();
    const wordleList = useSelector(getWordleList);

    const handleKeyDown = (e) => {
        if (e.key === "Backspace") {
            dispatch(deleteLetter());
        } else if (e.key === "Enter") {
            dispatch(submitGuess());
        } else {
            const value = e.key.toLocaleUpperCase();
            if (value.length === 1 && isNaN(parseInt(value))) {
                dispatch(addLetter(value));
            }
        }
    }

    React.useEffect(() => {
        dispatch(() => loadWordles(dispatch, 1))
        dispatch(loadGuesses)

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [])

    return (
        <div className={'app'}>
            <InfoHeader/>
            <CurrentGuessDisplay/>
            <div className={'games-container'}>
                {
                    wordleList && wordleList.filter(i => i.solved === 0).sort((a,b) => b.score - a.score).map(
                        (item, key) => <Game
                            wordle={item}
                            key={key}
                        />
                    )
                }
                {
                    wordleList && wordleList.filter(i => i.solved === 0).length === 0 && <div>
                        Done.
                    </div>
                }
            </div>
        </div>
    );
}

export default App;