import { View, Text, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { DimensionsContext, LoaderContext } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LanguageIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { debounce } from 'lodash'
import { fetchSearchResults, image500 } from '../api/moviedb'


export default function SearchScreen() {

  const { width, height } = useContext(DimensionsContext)
  const { loading, setLoading } = useContext(LoaderContext)
  const navigation = useNavigation()
  const [results, setResults] = useState([])
  let movieName = " the Guardians of the galaxy"
  const handleSearch = value => {
    if (value && value.length > 2) {
      setLoading(true);
      fetchSearchResults({
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: '1'
      }).then(res => {
        setLoading(false),
        setResults(res.results)
        console.log(res.results)
      })

    }
    else{
      setLoading(false)
      setResults([])
    }
  }
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])
  return (
    <SafeAreaView className='bg-neutral-800 flex-1'>
      <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder='Search Movie'
          placeholderTextColor={'lightgray'}
          className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className='rounded-full p-3 m-l bg-neutral-500'
        >
          <XMarkIcon size={'25'} color={'white'} />
        </TouchableOpacity>

      </View>
      {/* results */}
      {loading ? <Loading /> :


        results.length > 0 ? (<ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className='space-y-3'
        >
          <Text className='text-white font-semibold ml-1 mb-2'>Results ({results?.length})</Text>
          <View className='flex-row justify-between flex-wrap'>
            {
              results.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => navigation.push("Movie", item)}
                  >
                    <View className='mb-4 space-y-2'>
                      <Image className="rounded-3xl"
                        source={{uri:image500(item.poster_path)}}
                        style={{ width: width * 0.44, height: height * 0.3 }}
                      />
                      <Text className='text-neutral-400 ml-1'>
                        {
                          item.original_title.length > 22 ? item.original_title.slice(0, 22) + '...' : item.original_title
                        }
                      </Text>
                    </View>

                  </TouchableWithoutFeedback>
                )
              })

            }
          </View>
        </ScrollView>) :
          (
            <View className='flex-row justify-center'>
              <Image source={require('../assets/noResults.jpg')}
                className='h-96 w-96' />
            </View>

          )
      }


    </SafeAreaView>
  )
}