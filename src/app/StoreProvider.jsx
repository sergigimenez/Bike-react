'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'

export function Providers({ children }) {
    const storeRef = useRef(null)
    if (!storeRef.current) {
        storeRef.current = store
    }
  
    return <Provider store={storeRef.current}>{children}</Provider>
  }