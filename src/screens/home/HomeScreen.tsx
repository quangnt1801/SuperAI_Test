import { View, Text, StyleSheet, Dimensions, TouchableOpacity, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../services/utils/Colors';
import { NavigationConstants } from '../../services/navigation/NavigationConstants';
import { Alert } from 'react-native';
import CreateOrderScreen from '../createOrder/CreateOrderScreen';


interface HomeProps {
    navigation: any
}

const screenWidth = Dimensions.get('window').width;

const HomeScreen = (props: HomeProps) => {

    const { navigation } = props;




    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', onPressBackEvent);
        navigation.addListener('beforeRemove', (e: any) => {
            navigation.dispatch(e.data.action)
            return
        })
        return () => {
            backHandler.remove();
            // backNavigation.
        }
    }, [])

    const onPressBackEvent = () => {
        console.log("onPressBackEvent");
        return true
    }

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