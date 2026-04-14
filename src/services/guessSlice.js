import {createSlice} from '@reduxjs/toolkit'
import {isValid} from "../utils/words";

const initialState = {
    current: '',
    guessList: undefined
}

export const userSlice = createSlice({
    name: 'guess',
    initialState,
    reducers: {
        addLetter: (state, action) => {
            if (state.current.length < 5) {
                state.current = `${state.current}${action.payload}`
            }
        },
        submitGuess: (state, action) => {
            if (isValid(state.current)) {
                state.guessList.push(state.current)
                state.current = ""
            }
        },
        deleteLetter: (state, action) => {
            state.current = state.current.substring(0, state.current.length - 1)
        },
        guessListLoaded: (state, action) => {
            state.guessList = action.payload
            localStorage.setItem('wordle_guesses', JSON.stringify(state.guessList));
        },
        newGuess: (state, action) => {
            state.guessList = [...state.guessList, action.payload]
            localStorage.setItem('wordle_guesses', JSON.stringify(state.guessList));
        },
    },
})

export const {guessListLoaded, newGuess, addLetter, submitGuess, deleteLetter} = userSlice.actions

export const loadGuesses = async (dispatch) => {
    const guessList = JSON.parse(localStorage.getItem('wordle_guesses'));
    if (guessList) {
        dispatch(guessListLoaded(guessList))
    } else {
        dispatch(guessListLoaded([]))
    }
}

export const resetGuesses = async (dispatch) => {
    dispatch(guessListLoaded([]))
}

export const getGuessList = (state) => state.guess.guessList
export const getCurrentGuess = (state) => state.guess.current

export default userSlice.reducer
