import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  {authService} from 'berecoapi2.0'
const fetchUser = createAsyncThunk(
    'users/fetchUserStatus', 
    async ({ thunkAPI }) => {
        const response = await authService.login();
        return response.data;
    }
)



const status = {
    IDLE: 'Idle',
    LOADING: 'Loading', 
    FULFILLED: 'Fulfilled',
    ERROR: 'Error'
}

const initialState = {
    status: status.IDLE,
    user: {},
    profile: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loadUserStart(state) {
            state.user = {};
            state.profile = {};
            state.status = status.LOADING;
        },
        loadUserComplete(state, action) {
            state.user = action.payload;
            state.profile = {};
            state.status = status.LOADING;
        },
        loadProfileStart(state) {
            state.status = status.LOADING
            state.profile = {};
        },
        loadProfileComplete(state, action) {
            state.status = status.FULFILLED;
            state.profile = action.payload;
        },
        loadProfileFailed(state) {
            state.status = status.ERROR
        },
        loadUserFailed(state) {
            state.status = status.ERROR;
            state.user = {};
            state.profile = {};
        },

        createUserStart(state) {
            state.status = status.LOADING;
            state.user = {};
            state.profile = {};
        },
        createUserComplete(state, action) {
            state.status = status.FULFILLED;
            state.user = action.payload;
            state.profile = action.payload;
        },
        createUserFailed(state, action) {
            state.status = status.ERROR;
            state.user = {};
            state.profile = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled), (state, action) => {
            state.user = action.payload
        }
    
    }
   
})

export const {
    loadUserStart,
    loadUserComplete, 
    loadUserFailed, 
    loadProfileStart, 
    loadProfileComplete,
    loadProfileFailed
} = userSlice.actions

const selectUser = (state) => state.user
const selectProfile = (state) => state.profile


export default userSlice.reducer

export const getCompleteUser = (username, password) => async (dispatch) => {
    try {
        dispatch(loadUserStart());
        const user = await fetchUser(username, password);
        dispatch(loadUserComplete(user));
        dispatch(loadProfileStart())
        const profile = await fetchUserProfile();
        dispatch(loadProfileComplete(profile));

        
    } catch (err) {
        dispatch(loadUserFailed);
        dispatch(loadProfileFailed)
    }
}


const fs = require("fs");
const target = "./userSlice";
const path = "./files/symlink";
fs.symlink(target, path, "file", err => {
    if (err) {
        throw err;
    }
    console.log("Symbolic link creation complete!");
});