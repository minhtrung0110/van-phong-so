import { createSlice } from '@reduxjs/toolkit';


export const taskReducer = createSlice({
    name: 'task',
    initialState: {
        key: 0,
        detailTask:{},
        isAdd: false,
        isEdit: false,
        isReset:'reset-page',
        task: {},
    },
    reducers: {
        setKey: (state, action) => {
            state.key = action.payload;
        },
        setDetailTask: (state, action) => {
            state.detailTask = action.payload;
        },
        setIsAdd: (state, action) => {
            state.isAdd = action.payload;
        },
        setIsEdit: (state, action) => {
            state.isEdit = action.payload;
        },
        setStaff: (state, action) => {
            state.task = action.payload;
        },
        setIsReset: (state, action) => {
            state.isReset = action.payload;
        },
    },
});

export const { setIsAdd,setIsEdit, setStaff,setIsReset,setDetailTask } = taskReducer.actions;

export default taskReducer.reducer;
