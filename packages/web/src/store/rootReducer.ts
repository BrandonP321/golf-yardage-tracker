import { combineReducers } from "@reduxjs/toolkit";
import responsiveSlice from "../features/responsive/responsiveSlice";

const rootReducer = combineReducers({
  responsive: responsiveSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
