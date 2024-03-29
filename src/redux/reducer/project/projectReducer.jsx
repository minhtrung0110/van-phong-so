import { createSlice } from '@reduxjs/toolkit';


export const projectReducer = createSlice({
    name: 'project',
    initialState: {
        key: 0,
        project: {},
        sprint:{},
        detailTask:{},
        deleteTask:{},
        isCreateProject:false,
        isAdd: false,
        isViewTimeline:false,
        isEditProject: false,
        isReset:'reset-page',
        isResetSprint:false,
        isResetTask:false,
        members:[],
        task: {},
    },
    reducers: {
        setKeyProject: (state, action) => {
            state.key = action.payload;
        },
        setProject: (state, action) => {
            state.project = action.payload;
        },
        setSprint: (state, action) => {
            state.sprint = action.payload;
        },
        setMembers: (state, action) => {
            state.members = action.payload;
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
        setIsEditProject: (state, action) => {
            state.isEditProject = action.payload;
        },
        setTask: (state, action) => {
            state.task = action.payload;
        },
        setIsReset: (state, action) => {
            state.isReset = action.payload;
        },
        setIsResetSprint: (state, action) => {
            state.isResetSprint = action.payload;
        },
        setIsResetTask: (state, action) => {
            state.isResetTask = action.payload;
        },
        setIsViewTimeline: (state, action) => {
            state.isViewTimeline = action.payload;
        },
    },
});

export const { setKeyProject,setIsAdd,setIsEditProject, setTask,setSprint,setIsReset,setIsResetSprint,setIsResetTask,
    setMembers,
    setProject,setDetailTask,setDeleteTask,setIsCreateProject,setIsViewTimeline } = projectReducer.actions;

export default projectReducer.reducer;
