import { createSlice } from '@reduxjs/toolkit';


export const taskReducer = createSlice({
    name: 'task',
    initialState: {
        key: 0,
        detailTask:{},
        deleteTask:{},
        isCreateProject:false,
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
        setDeleteTask: (state, action) => {
            state.deleteTask = action.payload;
        },
        setIsAdd: (state, action) => {
            state.isAdd = action.payload;
        },
        setIsCreateProject: (state, action) => {
            state.isCreateProject = action.payload;
        },
        setIsEdit: (state, action) => {
            state.isEdit = action.payload;
        },
        setTask: (state, action) => {
            state.task = action.payload;
        },
        setIsReset: (state, action) => {
            state.isReset = action.payload;
        },
    },
});

export const { setIsAdd,setIsEdit, setTask,setIsReset,setDetailTask,setDeleteTask,setIsCreateProject } = taskReducer.actions;

export default taskReducer.reducer;
