import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image,Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';
import { image500 } from '../api/moviedb';

const { width, height } = Dimensions.get('window')
const TrendingMovies = ({ data }) => {
    const navigation = useNavigation()
    const handleClick = (item) => {
        navigation.navigate('Movie', item)
        console.log(navigation)

    }
    return (
        <View className='mb-8'>
            <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
            <Carousel
                firstItem={1}
                data={
                    data
                }
                slideStyle={{ display: 'flex', alignItems: 'center' }}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                itemWidth={width * 0.62}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}

            />
        </View>
    );
};

export default TrendingMovies;

const MovieCard = ({ item, handleClick }) => {
    console.log('item.poster_path :', item.poster_path)
    return (
        <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
            <Image
                source={{uri:image500(item.poster_path)}}
                style={{
                    width: width * 0.6,
                    height: height * 0.4
                }}
                className='rounded-3xl'
            />
        </TouchableWithoutFeedback>
    );
};
