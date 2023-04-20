import { createSlice } from '@reduxjs/toolkit';


export const postReducer = createSlice({
    name: 'post',
    initialState: {
        key: 0,
        isAdd: false,
        isEdit: false,
        isReset:'reset-page',
        post: {},
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
        setPost: (state, action) => {
            state.post = action.payload;
        },
        setIsReset: (state, action) => {
            state.isReset = action.payload;
        },
    },
});

export const { setIsAdd,setIsEdit, setPost,setIsReset } = postReducer.actions;

export default postReducer.reducer;
