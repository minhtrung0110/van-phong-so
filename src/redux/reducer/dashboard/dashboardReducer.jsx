import { createSlice } from '@reduxjs/toolkit';

export const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState: {
        collapseSideBar: false,

    },
    reducers: {
        setCollapseSideBar: (state, action) => {
            state.collapseSideBar = action.payload;
        },

    },
});

export const {
 setCollapseSideBar
} = dashboardReducer.actions;

export default dashboardReducer.reducer;
