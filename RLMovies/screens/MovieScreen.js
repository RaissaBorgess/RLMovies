import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';

var { width, height } = Dimensions.get('window');

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = useState(false)
  const [cast, setCast] = useState([1, 2, 3, 4, 5])
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5])
  const [loading, setLoading] = useState(false)
  let movieName = "Joker: Folie à Deux";

  useEffect(() => {
    // call API
  }, [item])

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20, minHeight: '100%' }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center p-4 pt-3" }>
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
        {
          loading ? (
            <Loading />
          ) : (
            <>
              <View>
                <Image
                  source={require('../assets/images/moviePoster2.jpg')}
                  style={{ width: width, height: height * 0.55 }}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                  style={{ width, height: height * 0.4 }}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  className="absolute bottom-0"
                />
              </View>
              <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                {/* Nome do Filme */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                  {movieName}
                </Text>

                {/* Status, Estreia, Tempo de Duração */}
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  Lancado • 2024 • 138 min
                </Text>

                {/* Gêneros */}
                <View className="flex-row justify-center mx-4 space-x-2">
                  <Text className="text-neutral-400 font-semibold text-base text-center">
                    Drama  •
                  </Text>
                  <Text className="text-neutral-400 font-semibold text-base text-center">
                    Crime  •
                  </Text>
                  <Text className="text-neutral-400 font-semibold text-base text-center">
                    Thriller
                  </Text>
                </View>

                {/* Sinopse */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                  Coringa 2 se passa depois dos acontecimentos do filme de 2019, após ser iniciado um movimento popular contra a elite de Gotham City, revolução esta, que teve o Coringa como seu maior representante. Preso no hospital psiquiátrico de Arkham, ele acaba conhecendo Harleen "Lee" Quinzel (Lady Gaga). A curiosidade mútua acaba se transformando em paixão e obsessão e eles desenvolvem um relacionamento romântico e doentio. Lee e Arthur embarcam em uma desventura alucinada, fervorosa e musical pelo submundo de Gotham City, enquanto o julgamento público d'O Coringa se desenrola, impactando toda a cidade e suas próprias mentes conturbadas.
                </Text>

                {/* Elenco */}
                <Cast navigation={navigation} cast={cast} />

                {/* Filmes Similares */}
                <MovieList title="Filmes Similares" hideSeeAll={true} data={similarMovies} />

              </View>
            </>
          )
        }

      </View>

    </ScrollView>
  )
}