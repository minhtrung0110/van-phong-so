import { createSlice } from '@reduxjs/toolkit';


export const decentralizeReducer = createSlice({
    name: 'decentralize',
    initialState: {
        key: 0,
        isAdd: false,
        isEdit: false,
        isReset:'reset-page',
        decentralize: {},
    },
    reducers: {
        setKey: (state, action) => {
            state.key = action.payload;
        },
        setIsAdd: (state, action) => {
            state.isAdd = action.payload;
        },
        setIsEdit: (state, action) => {
            state.isEdit = action.payload;
        },
        setDecentralize: (state, action) => {
            state.decentralize = action.payload;
        },
        setIsReset: (state, action) => {
            state.isReset = action.payload;
        },
    },
});

export const { setIsAdd,setIsEdit, setDecentralize,setIsReset } = decentralizeReducer.actions;

export default decentralizeReducer.reducer;
