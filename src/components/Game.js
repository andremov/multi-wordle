import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getGuessList} from "../services/guessSlice";
import {BlankGuessDisplay, GuessDisplay} from "./GuessDisplay";
import {isSolved, parseGuess, wordleScore} from "../utils/words";
import {solveWordle, updateWordleScore} from "../services/wordleSlice";

export const Game = ({wordle}) => {
    const dispatch = useDispatch();
    const guessList = useSelector(getGuessList);

    React.useEffect(() => {
        if (isSolved(wordle.value, guessList)) {
            const payload = {solvedWordle: wordle.value, numGuesses: guessList.length}
            dispatch(solveWordle(payload))
        } else {
            const payload = {solvedWordle: wordle.value, score: wordleScore(wordle.value, guessList)}
            dispatch(updateWordleScore(payload))
        }
    }, [guessList])

    return <div className={'single-game__container'}>
        {
            guessList && guessList.map(
                (item, key) => <GuessDisplay
                    key={key}
                    guess={parseGuess(wordle.value.toLocaleUpperCase(), item)}
                />
            )
        }
        {
            !guessList && <BlankGuessDisplay
            />
        }
    </div>
}