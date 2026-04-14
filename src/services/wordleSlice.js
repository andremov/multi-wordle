import {createSlice} from '@reduxjs/toolkit'
import {getWordles} from "../utils/words";

const initialState = {
    wordleList: undefined
}

export const userSlice = createSlice({
    name: 'wordle',
    initialState,
    reducers: {
        wordleListLoaded: (state, action) => {
            state.wordleList = action.payload
            localStorage.setItem('wordle_list', JSON.stringify(state.wordleList));
        },
        solveWordle: (state, action) => {
            const {solvedWordle, numGuesses} = action.payload
            let draftList = state.wordleList
            draftList.find(item => item.value === solvedWordle).solved = numGuesses;
            state.wordleList = draftList
            localStorage.setItem('wordle_list', JSON.stringify(state.wordleList));
        },
        updateWordleScore: (state, action) => {
            const {solvedWordle, score} = action.payload
            let draftList = state.wordleList
            draftList.find(item => item.value === solvedWordle).score = score;
            state.wordleList = draftList
            localStorage.setItem('wordle_list', JSON.stringify(state.wordleList));
        },
    },
})

export const {wordleListLoaded, solveWordle, updateWordleScore} = userSlice.actions

export const loadWordles = async (dispatch, number) => {
    const wordleList = JSON.parse(localStorage.getItem('wordle_list'));
    if (wordleList) {
        dispatch(wordleListLoaded(wordleList))
    } else {
        dispatch(wordleListLoaded(getWordles(number).map(item => ({solved: 0, value: item, score: 0}))))
    }
}

export const resetWordles = async (dispatch, number) => {
    dispatch(wordleListLoaded(getWordles(number).map(item => ({solved: 0, value: item, score: 0}))))
}

export const getWordleList = (state) => state.wordle.wordleList

export default userSlice.reducer
