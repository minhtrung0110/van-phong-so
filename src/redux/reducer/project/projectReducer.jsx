import { createSlice } from '@reduxjs/toolkit';


export const projectReducer = createSlice({
    name: 'project',
    initialState: {
        key: 0,
        board: {},
        detailTask:{},
        deleteTask:{},
        isCreateProject:false,
        isAdd: false,
        isViewTimeline:false,
        isEdit: false,
        isReset:'reset-page',
        task: {},
    },
    reducers: {
        setKeyProject: (state, action) => {
            state.key = action.payload;
        },
        setBoard: (state, action) => {
            state.board = action.payload;
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
        setIsViewTimeline: (state, action) => {
            state.isViewTimeline = action.payload;
        },
    },
});

export const { setKeyProject,setIsAdd,setIsEdit, setTask,setIsReset,setBoard,setDetailTask,setDeleteTask,setIsCreateProject,setIsViewTimeline } = projectReducer.actions;

export default projectReducer.reducer;
