import { createSlice } from '@reduxjs/toolkit';


export const staffReducer = createSlice({
    name: 'staff',
    initialState: {
        key: 0,
        isAdd: false,
        isEdit: false,
        isReset:'reset-page',
        staff: {},
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
        setStaff: (state, action) => {
            state.staff = action.payload;
        },
        setIsReset: (state, action) => {
            state.isReset = action.payload;
        },
    },
});

export const { setIsAdd,setIsEdit, setStaff,setIsReset } = staffReducer.actions;

export default staffReducer.reducer;
