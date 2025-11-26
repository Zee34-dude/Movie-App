import { View, Text, Platform, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { DimensionsContext, LoaderContext } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native'
import { styles } from '../theme'
import { LinearGradient } from 'expo-linear-gradient'
import MovieList from '../components/MovieList'
import Loading from '../components/Loading'
import { fetchpersonDetails,fetchPersonMovies,image500 } from '../api/moviedb'

const ios = Platform.OS == 'ios'
const verticalMargin = ios ? '' : 'my-3'
export default function PersonScreen() {
    const { width, height } = useContext(DimensionsContext)
    const { loading, setLoading } = useContext(LoaderContext)
    const { params: item } = useRoute()
    const navigtion = useNavigation()
    const [isFavourite, toggleFavourite] = useState(false)
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4])
    const [person, setPerson] = useState({})

    useEffect(() => {
        setLoading(true)
        getpersonDetails()
        getPersonMovies()
        setLoading(false)
        
    }, [item])
    const getpersonDetails = async () => {
        const data = await fetchpersonDetails(item.id)
        setPerson(data)


    }
    const getPersonMovies=async()=>{
        const data=await fetchPersonMovies(item.id)
        setPersonMovies(data.cast)
    }
    return (
        <ScrollView className='flex-1 bg-neutral-900' contentContainerStyle={{ paddingBottom: 20 }}>
            {/* back button */}
            <SafeAreaView className={' z-20 w-full flex-row justify-between items-center px-4' + verticalMargin}>
                <TouchableOpacity onPress={navigtion.goBack} style={styles.background} className='rounded-xl p-1'>
                    <ChevronLeftIcon size='28' strokeWidth={2.5} color="white" />
                </TouchableOpacity>

                <TouchableOpacity className='rounded-xl p-1'>
                    <HeartIcon onPress={() => toggleFavourite(!isFavourite)} size='35' color={isFavourite ? 'red' : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>
            {/* person details */}
            {
                loading ? <Loading /> :
                    (

                        <View>
                            <View className='flex-row justify-center '
                                style={{

                                    shadowColor: 'gray',
                                    shadowRadius: 40,
                                    shadowOffset: { width: 0, height: 5 },
                                    shadowOpacity: 1,
                                    elevation: 10,
                                }}
                            >
                                <View className='items-center rounded-full overflow-hidden h-72 w-72 border-2  shadow-2xl shadow-gray-400'>
                                    <Image style={{
                                        width: width * 0.74,
                                        height: height * 0.43
                                    }} source={
                                        person?.profile_path
                                            ? { uri: image500(person.profile_path) }
                                            : require('../assets/fallbackPersonImage.png')
                                    }
                                    />
                                </View>

                            </View>
                            <View className='mt-6'>
                                <Text className='text-3xl text-white font-bold text-center'>
                                    {person.name}
                                </Text>
                                <Text className='text-base text-neutral-500  font-bold text-center'>
                                    {person.place_of_birth}
                                </Text>
                            </View>
                            <View className='mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full'>
                                <View className='border-r-2 border-r-neutral-400 px-2 items-center '>
                                    <Text className='text-white font-semibold'>Gender</Text>
                                    <Text className='text-neutral-300 font-semibold'>{person.gender==2?'Male':'Female'}</Text>
                                </View>
                                <View className='border-r-2 border-r-neutral-400 px-2 items-center '>
                                    <Text className='text-white font-semibold'>Birthday</Text>
                                    <Text className='text-neutral-300 font-semibold'>{person.birthday?.split('-')[0]}</Text>
                                </View>
                                <View className='border-r-2 border-r-neutral-400 px-2 items-center '>
                                    <Text className='text-white font-semibold'>Know for</Text>
                                    <Text className='text-neutral-300 font-semibold'>{person.known_for_department}</Text>
                                </View>
                                <View className=' px-2 items-center '>
                                    <Text className='text-white font-semibold'>Popularity</Text>
                                    <Text className='text-neutral-300 font-semibold'>{person?.popularity?.toFixed(2)}%</Text>
                                </View>

                            </View>
                            <View className='my-6 mx-4 space-y-2'>
                                <Text className='text-white text-lg'> Biography</Text>
                                <Text className='text-neutral-400 tracking-wide'> {person.biography} </Text>
                            </View>
                            {/* Movies */}
                            <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
                        </View>
                    )

            }
        </ScrollView>
    )
}