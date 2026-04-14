import React from 'react';
import {NewGame} from "./NewGame";
import {useSelector} from "react-redux";
import {getWordleList} from "../services/wordleSlice";
import {getGuessList} from "../services/guessSlice";

export const InfoHeader = () => {
    const [showModal, setModal] = React.useState(false);
    const wordleList = useSelector(getWordleList);
    const guessList = useSelector(getGuessList)

    return <>
        <NewGame visible={showModal} close={() => setModal(false)}/>
        <div className={'info-header__container'}>
            <div className={'info-header__info'}>
                <div>
                    {wordleList && `Active games: ${wordleList.filter(i => i.solved === 0).length}/${wordleList.length}`}
                </div>
                <div>
                    {guessList && `Guesses: ${guessList.length}`}
                </div>
            </div>
            <button className={'info-header__new'} onClick={() => setModal(true)}>
                New
            </button>
        </div>
    </>
}