import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import biEstimateService from '../services/biEstimateService';


const initialState = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getBiEstimates = createAsyncThunk(
    "biLists",
    async (thunkAPI) => {
        try {
            return await biEstimateService.getbiEstimates();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const getbiEstimateById = createAsyncThunk(
    "biEstimateById",
    async (thunkAPI) => {
        try {
            return await biEstimateService.getbiEstimateById(thunkAPI);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const addbiEstimate = createAsyncThunk(
    "addEstimate",
    async (thunkAPI, { rejectWithValue }) => {
        try {
            return await biEstimateService.addbiEstimate(thunkAPI);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editBiEstimate = createAsyncThunk(
    "editEstimate",
    async (thunkAPI, { rejectWithValue }) => {
        try {
            return await biEstimateService.addbiEstimate(thunkAPI);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteBiEstimate = createAsyncThunk(
    "deleteEstimate",
    async (thunkAPI, { rejectWithValue }) => {
        try {
            return await biEstimateService.addbiEstimate(thunkAPI);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const biEstimateSlice = createSlice({
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
            .addCase(getBiEstimates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBiEstimates.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'BI Estimate list loaded successfully!'
                state.biEstimateList = action.payload;
            })
            .addCase(getBiEstimates.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
        builder
            .addCase(getbiEstimateById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getbiEstimateById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'BI Estimate by id loaded successfully!'
                state.viewBiEstimate = action.payload;
            })
            .addCase(getbiEstimateById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
        builder
            .addCase(addbiEstimate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addbiEstimate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'BI Estimate added successfully!'
                state.biEstimateAdd = action.payload;
            })
            .addCase(addbiEstimate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
        builder
            .addCase(editBiEstimate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editBiEstimate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'BI Estimate updated successfully!'
                state.biEstimateAdd = action.payload;
            })
            .addCase(editBiEstimate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });

        builder
            .addCase(deleteBiEstimate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBiEstimate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.biEstimateDelete = action.payload;
                state.message = 'BI Estimate DELETED successfully'
            })
            .addCase(deleteBiEstimate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            });
    }
})

// Action creators are generated for each case reducer function
export const { getList, clearState } = biEstimateSlice.actions

export default biEstimateSlice.reducer