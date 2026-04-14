import {useSelector} from "react-redux";
import {getCurrentGuess} from "../services/guessSlice";
import {Letter} from "./Letter";

export const CurrentGuessDisplay = () => {
    const guess = useSelector(getCurrentGuess)

    return <div className={'current-guess__container'}>
        {
            [...guess.split(''), ...new Array(5 - guess.length)]
                .map(
                    (item, key) => <Letter
                        key={key}
                        value={item}
                    />
                )
        }
    </div>
}