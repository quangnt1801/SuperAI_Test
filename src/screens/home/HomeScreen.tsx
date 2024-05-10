import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { } from 'react'
import { Colors } from '../../services/utils/Colors';
import { NavigationConstants } from '../../services/navigation/NavigationConstants';


interface HomeProps {
    navigation: any
}


const screenWidth = Dimensions.get('window').width;

const HomeScreen = (props: HomeProps) => {

    const { navigation } = props;

    const onCreateOrder = () => {
        navigation.navigate(NavigationConstants.CREATE_ORDER)
    }


    return (
        <View style={styles.flexView}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.btnCreate}
                    onPress={onCreateOrder}
                >
                    <Text style={styles.txtCreate}>Tạo đơn hàng</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    flexView: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        width: screenWidth,
        justifyContent: 'center',
        paddingHorizontal: 12
    },

    btnCreate: {
        width: 140,
        height: 55,
        backgroundColor: Colors.error,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 50
    },
    txtCreate: {
        fontSize: 18,
        color: 'white'
    }
});

export default HomeScreen