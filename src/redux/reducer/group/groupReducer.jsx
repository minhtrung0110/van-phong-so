import { createSlice } from '@reduxjs/toolkit';


export const groupReducer = createSlice({
    name: 'group',
    initialState: {
        key: 0,
        isAdd: false,
        isEdit: false,
        isReset:'reset-page',
        group: {},
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
        setGroup: (state, action) => {
            state.group = action.payload;
        },
        setIsReset: (state, action) => {
            state.isReset = action.payload;
        },
    },
});

export const { setIsAdd,setIsEdit, setGroup,setIsReset } = groupReducer.actions;

export default groupReducer.reducer;
