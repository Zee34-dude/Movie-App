import { View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { LoaderContext } from "../App";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/moviedb";
const ios = Platform.ios == 'ios'
export default function HomeScreen() {
  const { loading, setLoading } = useContext(LoaderContext)
  const navigation = useNavigation()
  const [upComing, setUpcoming] = useState([1, 2, 3])
  const [topRated, setTopRated] = useState([1, 2, 3])
  const [trending, setTrending] = useState([
    { id: 1, title: 'Godfather', poster: require('../assets/Godfather.jpg') },
    { id: 2, title: 'Moonlight', poster: require('../assets/moonlight_0.jpg') },
    { id: 3, title: 'Guardians of the Galaxy', poster: require('../assets/GOG.jpg') },

  ]);
  useEffect(() => {
    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  }, [])
  const getTrendingMovies = async () => {
    setLoading(true)
    const data = await fetchTrendingMovies()
    // console.log('trending movies :', data.results)
    if (data && data.results) {
      setTrending(data.results)
      setLoading(false)
    }
  }
  const getUpcomingMovies = async () => {
   
    const data = await fetchUpcomingMovies()
    // console.log('trending movies :', data.results)
    if (data && data.results) {
      setUpcoming(data.results)

    }
  }
  const getTopRatedMovies = async () => {
    setLoading(true)
    const data = await fetchTopRatedMovies()
    // console.log('trending movies :', data.results)
    if (data && data.results) {
      setTopRated(data.results)
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar and logo */}
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar style='light' />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />
          <Text
            className='text-white text-3xl font-bold'
          >
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color={'white'} />
          </TouchableOpacity>

        </View>
      </SafeAreaView>
      {
        loading ? (
          <Loading />
        ) : (

          <ScrollView showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {/* Trending movie carousel */}
            {trending.length > 0 && <TrendingMovies data={trending} />}

            {/* upcoming movies row */}
            <MovieList title='Upcoming' data={upComing} />

            {/* top rated movies row */}
            <MovieList title='Top Rated' data={topRated} />
          </ScrollView>
        )

      }
    </View>
  )
}

