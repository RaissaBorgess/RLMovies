import React, { useState } from 'react'
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

var { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([])
  let movieName = "Joker: Folie à Deux";
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="m-4 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Pesquisar..."
          placeholderTextColor={'lightgray'}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* resultado da pesquisa */}
      {
        results.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            className="space-y-3"
          >
            <Text className="text-white font-semibold ml-1">Resultados ({results.length})</Text>
            <View className="flex-row justify-between flex-wrap">
              {
                results.map((item, index) => {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => navigation.push("Movie", item)}
                    >
                      <View className="space-y-2 mb-4">
                        <Image className="rounded-2xl"
                          source={require('../assets/images/moviePoster2.jpg')}
                          style={{ width: width * 0.44, height: height * 0.3 }}
                        />
                        <Text className="text-neutral-400 ml-1">
                          {
                            movieName.length > 22 ? movieName.slice(0, 22) + '...' : movieName
                          }
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })
              }
            </View>
          </ScrollView>
        ) : (
          <View className="flex-1 flex-col justify-center items-center">
            <Text className="text-white text-center mb-7"
              style={{ fontSize: 32, display: 'none' }}>Nenhum Resultado Encontrado</Text>
            <Image className="h-96 w-96 rounded-2xl"
              source={require('../assets/images/movieTime.jpg')}
            />
          </View>
        )
      }
    </SafeAreaView>
  )
}
