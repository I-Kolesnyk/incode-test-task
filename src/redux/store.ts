import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/slice';

export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
 auth: authReducer
});

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['accessToken'],
  };

  export const store = configureStore ({
    reducer: {
        auth: persistReducer (authPersistConfig, rootReducer),
    },
    middleware: getDefaultMiddleware => 
    getDefaultMiddleware ({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
  });

  setupListeners(store.dispatch);

  export const persistor = persistStore(store);