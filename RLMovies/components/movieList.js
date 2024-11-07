import { 
    View, 
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
    Dimensions
} from 'react-native'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native'

var { width, height } = Dimensions.get('window')

export default function MovieList({ title, data }) {
    let movieName = "Joker: Folie à Deux";
    const navigation = useNavigation();
  return (
    <View className="mb-9 space-y-4">
        <View className="mx-4 flex-row justify-between items-center">
            <Text className="text-white text-xl">{title}</Text>
            <TouchableOpacity>
                <Text style={styles.text} className="text-lg">Ver Todos</Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}