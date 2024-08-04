"use client";
import { store} from '@/redux/store'
import { Children } from 'react'
import {Provider} from 'react-redux'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'


persistStore(store);
export const StoreProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        {children}
      {/* </PersistGate> */}
    </Provider>
  )
}