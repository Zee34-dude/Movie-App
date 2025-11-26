import { View, Text, ScrollView, TouchableOpacity, Platform, Dimensions, Image } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles } from '../theme'
import { LinearGradient } from 'expo-linear-gradient'
import { DimensionsContext, LoaderContext } from '../App'
import Cast from '../components/Cast'
import MovieList from '../components/MovieList'
import Loading from '../components/Loading'
import { fetchMovieDetails, fetchSimilarMovies, image500, fetchMovieCast } from '../api/moviedb'

const ios = Platform.OS == 'ios'

const topMargin = ios ? '' : 'mt-3'
export default function MovieScreen() {

    const { width, height } = useContext(DimensionsContext)
    const { loading, setLoading } = useContext(LoaderContext)
    const { params: item } = useRoute()
    const [isFavourite, toggleFavourite] = useState(false)
    const navigation = useNavigation()
    const [cast, setCast] = useState([1, 2, 3, 4])
    const [movieDetails, setMovieDetails] = useState([])
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4])


    useEffect(() => {
        setLoading(true)
        getMovieDetails()
        getSimilarMovies()
        getMovieCast()
        setLoading(false)
    }, [item])
    const getMovieDetails = async () => {
        // console.log('item :', item)

        const data = await fetchMovieDetails(item.id)
        if (data) {
            console.log('cast_data :', data)

            setMovieDetails(data)
        }
    }
    const getSimilarMovies = async () => {
        const data = await fetchSimilarMovies(item.id)
        if (data && data.results) {
            console.log('similar_data :', data.results)
            setSimilarMovies(data.results)
        }
    }
    const getMovieCast = async () => {
        const data = await fetchMovieCast(item.id)
        if (data) {
            setCast(data.cast)
        }
    }


    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className='flex-1 bg-neutral-900'
        >
            {/* back button and movie poster */}
            <View className='w-full'>
                <SafeAreaView className={'absolute z-20 w-full flex-row justify-between items-center px-4' + topMargin}>
                    <TouchableOpacity onPress={navigation.goBack} style={styles.background} className='rounded-xl p-1'>
                        <ChevronLeftIcon size='28' strokeWidth={2.5} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} className='rounded-xl p-1'>
                        <HeartIcon size='35' color={isFavourite ? "red" : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>

                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image
                                source={{ uri: image500(item.poster_path) }}
                                style={{ width, height: height * 0.55 }}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={{ width, height: height * 0.40 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className='absolute bottom-0'
                            />

                        </View>
                    )
                }

            </View>

            {/* movie details */}
            <View style={{ marginTop: -(height * 0.09) }} className='space-y-3' >
                {/* title */}
                <Text className='text-white text-center text-3xl font-bold tracking-wider'>
                    {item.original_title}
                </Text>
                {/* status, release, runtime */}
                {
                    movieDetails.id?
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                  {movieDetails?.status} • {item.release_date?.split('-')[0]} • {movieDetails?.runtime} min
                </Text>
                :null
                }

                {/* genres */}
                <View className='flex-row justify-center mx-4 space-x-4 gap-2'>

                    {
                        movieDetails.genres?.map((genre, idx) =>
                        (<Text key={idx} className='text-neutral-400 font-semibold text-base text-center '>
                            {genre.name} {idx!==movieDetails.genres?.length-1 && '•'}
                        </Text>))
                    }



                </View>

                {/* description */}
                <Text className='text-neutral-400 mx-4 tracking-wide '>
                    {item.overview}
                </Text>

                {/* cast */}
                {cast.length>0 &&<Cast navigation={navigation} cast={cast} />}

                {/* similar Movies */}
                {similarMovies.length>0&&<MovieList title='similar' hideSeeAll={true} data={similarMovies} />}



            </View>
        </ScrollView>
    )
}