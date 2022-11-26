import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    genreList: null,
}

export const genreSlice = createSlice({
    name:"genres",
    initialState,
    reducers:{
        setGenreList:(state, action) =>{
            state.genreList=action.payload
        }
    }
})

export const {actions} = genreSlice;
export const selectGenreList = state => state.genres.genreList;

export default genreSlice.reducer