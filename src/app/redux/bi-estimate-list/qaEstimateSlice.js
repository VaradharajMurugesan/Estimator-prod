import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import qaEstimateService from '../services/qaEstimateService';


const initialState = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getQaEstimates = createAsyncThunk(
    "qaLists",
    async (thunkAPI) => {
        try {
            return await qaEstimateService.getqaEstimates();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const getQaEstimateById = createAsyncThunk(
    "qaEstimateById",
    async (thunkAPI) => {
        try {
            return await qaEstimateService.getqaEstimateById(thunkAPI);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const addQaEstimate = createAsyncThunk(
    "addEstimate",
    async (thunkAPI, { rejectWithValue }) => {
        try {
            return await qaEstimateService.addqaEstimate(thunkAPI);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const editQaEstimate = createAsyncThunk(
    "editEstimate",
    async (thunkAPI, { rejectWithValue }) => {
        try {
            return await qaEstimateService.addqaEstimate(thunkAPI);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const deleteQaEstimate = createAsyncThunk(
    "deleteEstimate",
    async (thunkAPI, { rejectWithValue }) => {
        try {
            return await qaEstimateService.addqaEstimate(thunkAPI);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const qaEstimateSlice = createSlice({
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
            console.log(state)
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
            .addCase(getQaEstimates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQaEstimates.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'QA Estimate list loaded successfully!'
                state.qaEstimateList = action.payload;
            })
            .addCase(getQaEstimates.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
        builder
            .addCase(getQaEstimateById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQaEstimateById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'QA Estimate by id loaded successfully!'
                state.viewQaEstimate = action.payload;
            })
            .addCase(getQaEstimateById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
        builder
            .addCase(addQaEstimate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addQaEstimate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'QA Estimate added successfully!'
                state.qaEstimateAdd = action.payload;
            })
            .addCase(addQaEstimate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });

        builder
            .addCase(editQaEstimate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editQaEstimate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'QA Estimate updated successfully!'
                state.qaEstimateAdd = action.payload;
            })
            .addCase(editQaEstimate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });

        builder
            .addCase(deleteQaEstimate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteQaEstimate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.qaEstimateDelete = action.payload;
                state.message = 'QA Estimate DELETED successfully'
            })
            .addCase(deleteQaEstimate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            });
    }
})

// Action creators are generated for each case reducer function
export const { getList, clearState } = qaEstimateSlice.actions

export default qaEstimateSlice.reducer