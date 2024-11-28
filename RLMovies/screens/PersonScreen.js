import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { Shadow } from 'react-native-shadow-2';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fetchPersonDetails, fetchSimilarMovies, image342, image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');

export default function PersonScreen() {
  const { params: item } = useRoute(); 
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = useState(false)
  const [personMovies, setPersonMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [person, setPerson] = useState({});

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
    setLoading(false);
  }, [item])

  const getPersonDetails = async id => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
  }
  const getPersonMovies = async id => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setPersonMovies(data.results);
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20, minHeight: '100%' }}
      className="flex-1 bg-neutral-900"
    >
      {/* Botões de Navegação */}
      <SafeAreaView className={"z-20 w-full flex-row justify-between items-center p-4 pt-3"}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-3xl font-bold">
          <Text style={styles.text}>GM</Text>ovies
        </Text>
        <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
          <HeartIcon size="36" color={isFavorite ? theme.background : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Dados da Pessoa */}
      {
        loading ? (
          <Loading />
        ) : (
          <View>
            <View className="flex-row justify-center">
              <Shadow className="items-center overflow-hidden h-72 w-72 border-3 border-neutral-500" startColor='rgb(60 60 60)' distance={50}>
                <Image
                  style={{ height: height * 0.42, width: width * 0.70, borderRadius: 150 }}
                  source={{uri: image342(person?.profile_path)}}
                />
              </Shadow>
            </View>
            <View className="mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                {person?.name}
              </Text>
              <Text className="text-base text-neutral-500 text-center">
                {person?.place_of_birth}
              </Text>
            </View>
            <View className="mx-3 p-4 mt-6 flex flex-row items-center bg-neutral-700 rounded-full">
              <View className="basis-1/3 border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gênero</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.gender == 1 ? 'Feminino' : 'Masculino'}
                </Text>
              </View>
              
              <View className="basis-1/3 border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Nascimento</Text>
                <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
              </View>
              
              <View className="basis-1/3 px-2 items-center">
                <Text className="text-white font-semibold">Popularidade</Text>
                <Text className="text-neutral-300 text-sm">{person?.popularity?.toFixed(1)}%</Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biografia</Text>
              <Text className="text-neutral-400 tracking-wide">
                {person?.biography || 'N/A'}
              </Text>
            </View>

            {/* Filmes */}
            <MovieList title={'Filmes'} hideSeeAll={true} data={personMovies} />
          </View>
        )
      }
    </ScrollView>
  )
}
