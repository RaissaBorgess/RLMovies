import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { StatusBar } from 'react-native'
import { Bars3BottomLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import React from 'react'
import { styles } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'

const ios = Platform.OS == 'ios';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ ios ? '-mb2' : 'mb-3'}>
        <StatusBar style='light'/>
        <View className="flex-row justify-between items-center mx-4 mt-2">
          <TouchableOpacity>
            <Bars3BottomLeftIcon size={30} strokeWidth={2} color='white'/>
          </TouchableOpacity>
          <Text className='text-white text-3xl font-bold'>
          <Text style={styles.text}>RL</Text>Movies
          </Text>
          <TouchableOpacity>
          <Bars3BottomLeftIcon size={30} strokeWidth={2} color='white'/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      
      <ScrollView
      showVerticalScrollIndicator={false}
      contentContainerStyles={{ paddingBottom: 10 }}
      >

      </ScrollView>
    </View>
  )
}