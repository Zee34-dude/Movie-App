import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { DimensionsContext } from '../App'
import * as Progress from 'react-native-progress';
import { theme } from '../theme';


export default function Loading() {
    const {width, height}= useContext(DimensionsContext)
  return (
    <View style={{height,width}} className='absolute flex-row justify-center items-center '>
     <Progress.CircleSnail thickness={12} size={160} color={theme.background}/>
    </View>
  )
}