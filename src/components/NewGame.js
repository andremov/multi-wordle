import React from 'react';
import {useDispatch} from "react-redux";
import {resetWordles} from "../services/wordleSlice";
import {resetGuesses} from "../services/guessSlice";

export const NewGame = ({close, visible}) => {
    const dispatch = useDispatch();
    const [num, setNum] = React.useState(1);

    const onChange = val => isNaN(+val)? false : setNum(+val);
    const onSubmit = async () => {
        dispatch(() => resetWordles(dispatch, num))
        dispatch(resetGuesses)
        close();
    }

    if (!visible) {
        return false
    }

    return <>
        <div className={'new-game__backdrop'}/>
        <div className={'new-game__container'}>
            <div className={'new-game__close'} onClick={close}/>
            <h3>New game</h3>
            <span>
                # of simultaneous Wordles:
            </span>
            <input
                onChange={e => onChange(e.target.value)}
                value={num}
            />
            <button onClick={onSubmit}>
                OK
            </button>
        </div>
    </>
}