// import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { sessionSlice } from "./feature/sessionSlice";


// // Create Store here //
// export const createStore = (
//     options?: ConfigureStoreOptions["preloadedState"] | undefined
//   ) =>
//     configureStore({
//       reducer: {

//         sessionState:sessionSlice.reducer

//       },
//       middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//           immutableCheck: false,
//           serializableCheck: false,
//         }),
//       ...options,
//     });
  
//   export const store: any = createStore();
  
//   export type AppDispatch = typeof store.dispatch;
//   export const useAppDispatch: () => AppDispatch = useDispatch;
//   export type RootState = ReturnType<typeof store.getState>;
//   export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;