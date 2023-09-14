import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import biEstimateService from '../services/biEstimateService';
import commonService from '../services/commonService';


const initialState = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getAllCategories = createAsyncThunk(
    "AllCategories",
    async (thunkAPI) => {
        try {
            return await commonService.getAllCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const getAllTasks = createAsyncThunk(
    "AllTasks",
    async (thunkAPI) => {
        try {
            return await commonService.getAllTasks(thunkAPI);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getWfValuesByCategory = createAsyncThunk(
    "AllWfValues",
    async (thunkAPI) => {
        try {
            return await commonService.getWfValuesByCategory(thunkAPI);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);



export const commonSlice = createSlice({
    name: 'some',
    initialState,
    reducers: {
        clearState: () => initialState,
        getList: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            //   state.value += 1            
        },
        // increment: (state) => {
        //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //   // doesn't actually mutate the state because it uses the Immer library,
        //   // which detects changes to a "draft state" and produces a brand new
        //   // immutable state based off those changes
        //   state.value += 1
        // },
        // decrement: (state) => {
        //   state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'All Categories loaded successfully!'
                state.allCategories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });

        builder
            .addCase(getAllTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'All Task Lists loaded successfully!'
                state.allTaskLists = action.payload;
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
        //To get all WF Values by Category
        builder
            .addCase(getWfValuesByCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWfValuesByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'WF Values loaded successfully based on category!'
                state.allWfValues = action.payload;
            })
            .addCase(getWfValuesByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });

    }
})

// Action creators are generated for each case reducer function
export const { getList } = commonSlice.actions

export default commonSlice.reducer