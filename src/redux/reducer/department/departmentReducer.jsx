import { createSlice } from '@reduxjs/toolkit';


export const departmentReducer = createSlice({
    name: 'department',
    initialState: {
        key: 0,
        isAdd: false,
        isEdit: false,
        isReset:'reset-page',
        department: {},
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
        setDepartment: (state, action) => {
            state.department = action.payload;
        },
        setIsReset: (state, action) => {
            state.isReset = action.payload;
        },
    },
});

export const { setIsAdd,setIsEdit, setDepartment,setIsReset } = departmentReducer.actions;

export default departmentReducer.reducer;
