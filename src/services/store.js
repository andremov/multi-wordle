import { configureStore } from '@reduxjs/toolkit'
import guessReducer from './guessSlice'
import wordleReducer from './wordleSlice'

const store = configureStore({
    reducer: {
        guess: guessReducer,
        wordle: wordleReducer,
    },
})

export default store
