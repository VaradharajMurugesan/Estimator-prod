import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './bi-estimate-list/counterSlice'
import biEstimateReducer from './bi-estimate-list/biEstimateSlice'
import etlEstimateReducer from './bi-estimate-list/etlEstimateSlice'
import qaEstimateReducer from './bi-estimate-list/qaEstimateSlice'
import commonReducer from './bi-estimate-list/commonSlice'

export const Store = configureStore({
  reducer: {
    // counter: counterReducer,
    biEstimates: biEstimateReducer,
    etlEstimates: etlEstimateReducer,
    qaEstimates: qaEstimateReducer,
    commonData: commonReducer
  },
})

export default Store;


// import { applyMiddleware, compose, createStore } from 'redux';
// import thunk from 'redux-thunk';
// import RootReducer from './reducers/RootReducer';

// const initialState = {};
// const middlewares = [thunk];
// let devtools = (x) => x;

// // if (
// //   process &&
// //   process.env.NODE_ENV !== 'production' &&
// //   process.browser &&
// //   window.__REDUX_DEVTOOLS_EXTENSION__
// // ) {
// //   devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
// // }

// export const Store = createStore(
//   RootReducer,
//   initialState,
//   compose(applyMiddleware(...middlewares), devtools)
// );
