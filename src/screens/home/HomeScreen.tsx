import { View, Text, StyleSheet, Dimensions, TouchableOpacity, BackHandler, StatusBar, Image, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../services/utils/Colors';
import { NavigationConstants } from '../../services/navigation/NavigationConstants';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

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

    const onPrinterTharmal = () => {
        navigation.navigate(NavigationConstants.PRINTER_THARMAL)
    }


    return (
        <View style={styles.flexView}>
            <StatusBar backgroundColor={Colors.error} />
            <SafeAreaView style={styles.container}>
                <View style={styles.headerView}>
                    <View style={styles.topView}>
                        <Image source={require('../../assets/images/Logo.png')}
                            style={{ width: 170, height: 50 }}
                        />
                        <View style={styles.rightTopView}>
                            <TouchableOpacity
                                style={styles.btnRightTop}
                                activeOpacity={0.1}
                            >
                                <Icon name='settings-outline' size={28} color={'white'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnRightTop}
                            >
                                <Icon name='notifications-outline' size={28} color={'white'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnRightTop}
                            >
                                <Icon name='cog' size={28} color={'white'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputSearchView}>
                        <TextInput
                            style={styles.inputSearch}
                            placeholder='Tra cứu đơn hàng...'
                        />
                        <Icon name='search' size={30} style={styles.iconSearch} />
                    </View>

                    <View style={styles.btnTopFeatureView}>

                        <TouchableOpacity style={styles.itemBtn}
                            onPress={onCreateOrder}
                        >
                            <Image source={require('../../assets/images/Frame.png')}
                                style={styles.iconBtn}
                            />
                            <Text style={styles.txtItemBtn}>Tạo đơn</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.itemBtn}
                            onPress={onPrinterTharmal}
                        >
                            <Image source={require('../../assets/images/Order.png')}
                                style={styles.iconBtn} />
                            <Text style={styles.txtItemBtn}>In Hoá Đơn</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itemBtn}>
                            <Image source={require('../../assets/images/CastOrder.png')}
                                style={styles.iconBtn} />
                            <Text style={styles.txtItemBtn}>Tạo đơn</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itemBtn}>
                            <Image source={require('../../assets/images/Manager.png')}
                                style={styles.iconBtn} />
                            <Text style={styles.txtItemBtn}>Tạo đơn</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={styles.buttonView}>

                </View>

            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    flexView: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: Colors.error
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
    },
    headerView: {
        width: '100%',
        height: 284,
    },
    topView: {
        width: '100%',
        height: 70,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rightTopView: {
        width: '60%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'flex-end'
    },
    btnRightTop: {
        width: 40, height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        marginLeft: 12,
        backgroundColor: 'rgba(230, 230, 230, 0.3)'
    },
    inputSearch: {
        width: '100%',
        height: 55,
        paddingLeft: 54,
        borderRadius: 60,
        fontSize: 18,
        backgroundColor: 'white',
        marginTop: 20
    },
    inputSearchView: {
        width: '90%',
        height: 55,
        alignSelf: 'center',
    },
    iconSearch: {
        position: 'absolute',
        top: 32, left: 16
    },
    btnTopFeatureView: {
        width: "100%",
        height: 100,
        marginTop: 46,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    itemBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8
    },
    txtItemBtn: {
        color: 'white',
        fontSize: 16,
        marginTop: 8
    },
    iconBtn: {
        width: 66, height: 66
    },
    buttonView: {
        flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    }
});

export default HomeScreen