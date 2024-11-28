import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import { image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  }

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 my-3">Em alta</Text>
      <Carousel
        loop
        width={width * 0.6}
        height={height * 0.4}
        autoPlay={false}
        data={data}
        // scrollAnimationDuration={5000}
        renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 1,
          parallaxAdjacentItemScale: 0.9,
        }}
        style={{ width: width, justifyContent: 'center' }}
      />
    </View>
  )
}

const MovieCard = ({item, handleClick}) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path)}}
        style={{ width: '100%', height: '100%' }}
        className="rounded-2xl"
      />
    </TouchableWithoutFeedback>
  )
}
