import { React, useContext, createContext, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import AppNavigation from './navigation/appNavigation'
import './global.css'

const { width, height } = Dimensions.get('window')

export const DimensionsContext = createContext({
  width,
  height
}
)
export const LoaderContext = createContext({
  loading:false, setLoading:()=>{}
})
const app = () => {
  const [loading, setLoading] = useState(false)
  return (
    <LoaderContext.Provider value={{loading,setLoading}}>
      <DimensionsContext.Provider value={{ width, height }}>
        <AppNavigation />
      </DimensionsContext.Provider>
    </LoaderContext.Provider>
  )
}

export default app