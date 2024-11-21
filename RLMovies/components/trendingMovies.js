import React from 'react'
import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel'

var { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  }

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-1">Em Alta</Text>
      <Carousel
        loop
        width={width * 0.6}
        height={height * 0.4}
        autoPlay={false}
        data={data}
        renderItem={({item}) =>
          <MovieCard item={item} handleClick={handleClick} />
        }
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 1,
          parallaxAdjacentItemScale: 0.9
        }}
        style={{ width: width, justifyContent: 'center'}}
      />
    </View>
  )
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={require('../assets/images/moviePoster1.jpg')}
        style={{ width: '100%', height: '100%' }}
        className="rounded-2xl"
      />
    </TouchableWithoutFeedback>
  )
}