import {Letter} from "./Letter";

export const GuessDisplay = ({guess}) => {

    return <div className={'guess__container'}>
        {
            guess.map(
                (item, key) => <Letter
                    key={key}
                    value={item.letter}
                    color={item.color}
                />
            )
        }
    </div>
}

export const BlankGuessDisplay = () =>
    <div className={'guess__container'}>
        {
            [...new Array(5)].map(
                (item, key) => <Letter
                    key={key}
                />
            )
        }
    </div>
