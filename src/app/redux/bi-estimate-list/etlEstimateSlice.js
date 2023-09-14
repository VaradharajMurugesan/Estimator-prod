import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import etlEstimateService from '../services/etlEstimateService';


const initialState = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getEtlEstimates = createAsyncThunk(
    "etlLists",
    async (thunkAPI) => {
        try {
            return await etlEstimateService.getEtlEstimates();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const getEtlEstimateById = createAsyncThunk(
    "etlEstimateById",
    async (thunkAPI) => {
        try {
            return await etlEstimateService.getEtlEstimateById(thunkAPI);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const addEtlEstimate = createAsyncThunk(
    "addEstimate",
    async (thunkAPI, { rejectWithValue }) => {
        try {
            return await etlEstimateService.addEtlEstimate(thunkAPI);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const editEtlEstimate = createAsyncThunk(
    "editEstimate",
    async (thunkAPI, { rejectWithValue }) => {
        try {
            return await etlEstimateService.addEtlEstimate(thunkAPI);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const deleteEtlEstimate = createAsyncThunk(
    "deleteEstimate",
    async (thunkAPI, { rejectWithValue }) => {
        try {
            return await etlEstimateService.addEtlEstimate(thunkAPI);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const etlEstimateSlice = createSlice({
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
            .addCase(getEtlEstimates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEtlEstimates.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'ETL Estimate list loaded successfully!'
                state.etlEstimateList = action.payload;
            })
            .addCase(getEtlEstimates.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
        builder
            .addCase(getEtlEstimateById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEtlEstimateById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'ETL Estimate by id loaded successfully!'
                state.viewEtlEstimate = action.payload;
            })
            .addCase(getEtlEstimateById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
        builder
            .addCase(addEtlEstimate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addEtlEstimate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'ETL Estimate added successfully!'
                state.etlEstimateAdd = action.payload;
            })
            .addCase(addEtlEstimate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            });

        builder
            .addCase(editEtlEstimate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editEtlEstimate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = 'ETL Estimate updated successfully!'
                state.etlEstimateAdd = action.payload;
            })
            .addCase(editEtlEstimate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            });

        builder
            .addCase(deleteEtlEstimate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteEtlEstimate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.etlEstimateDelete = action.payload;
                state.message = 'ETL Estimate DELETED successfully'
                // state.etlEstimateDelete = action.payload;
            })
            .addCase(deleteEtlEstimate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                // state.biEstimateDelete = action.error
                // state.message = 'Error : ETL Estimate NOT DELETED';
            });
    }
})

// Action creators are generated for each case reducer function
export const { getList, clearState } = etlEstimateSlice.actions

export default etlEstimateSlice.reducer