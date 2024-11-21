import React, { useState } from 'react'
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bars3BottomLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native'
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import Loading from '../components/loading';

const ios = Platform.OS == "ios";

export default function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4 mt-2">
          <TouchableOpacity>
            <Bars3BottomLeftIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>GM</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {
        loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            <TrendingMovies data={trending} />

            <MovieList title="Próximos lançamentos" data={upcoming} />

            <MovieList title="Melhor Avaliados" data={topRated} />
          </ScrollView>
        )
      }

    </View>
  )
}
