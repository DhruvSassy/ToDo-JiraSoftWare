import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import todoReducer from '../reducers';

const persistConfig = {
  key: 'root', 
  storage,
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

const store = configureStore({
  reducer: {
    todoJira: persistedReducer,
  },
});


const persistor = persistStore(store);
export { store, persistor };

