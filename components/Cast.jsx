import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { image500 } from '../api/moviedb'


export default function Cast({ cast, navigation }) {

    return (
        <View className='my-6'>
            <Text className='text-white text-lg mx-4 mb-5'>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >

                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                className='mr-4 items-center'
                                onPress={() => navigation.navigate('Person', person)}
                            >
                                <View
                                    className='overflow-hidden rounded-full h-20 w-20 item-center border-neutral-500'
                                >
                                    <Image
                                        className="rounded-2xl h-24 w-20"
                                        source={
                                            person?.profile_path
                                                ? { uri: image500(person.profile_path) }
                                                : require('../assets/fallbackPersonImage.png')
                                        }
                                    />

                                </View>
                                <Text className='text-neutral-400 text-xs mt-1'>
                                    {
                                        person.original_name?.length > 10 ? person.original_name.slice(0, 10) + '...' : person.original_name
                                    }
                                </Text>
                                <Text className='text-neutral-400 text-xs mt-1'>
                                    {
                                        person.character?.length > 10 ? person.character?.slice(0, 10) + '...' : person.character
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>
        </View>
    )
}