import { View, Text, StyleSheet, TextInput, TouchableNativeFeedback, Keyboard, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Input from '../../../components/inputMW/Input';
import { Colors } from '../../../services/utils/Colors';
import { getProvince } from '../../../services/clouds/CloudServices';
// var axios = require("axios");
// var MockAdapter = require("axios-mock-adapter");

const LoginScreen = () => {

    const [dataLogin, setDataLogin] = useState({
        email: '',
        password: ''
    })

    // var mock = new MockAdapter(axios);

    const handleOnchangeText = (value: string, key: string) => {
        setDataLogin({ ...dataLogin, [key]: value })
    }

    const onDismissKeyboard = () => {
        Keyboard.dismiss();
    }

    const onLogin = () => {
        // mock.onPost("/auth/login").reply(function ())
        const param = {
            code: 71,
            name: ''
        }
        getProvince().then((reponse) => {
            console.log("Get Province: ", reponse);

        }).catch((error: any) => {
            console.log("Get Province error: ", error);

        })
    }

    return (
        <TouchableNativeFeedback
            onPress={onDismissKeyboard}
        >
            <View style={styles.flexView}>
                <View style={styles.container}>
                    <View style={styles.viewInput}>
                        <Input
                            value={''}
                            placeholder={'Số điện thoại / Email'}
                            onChange={(text: string) => handleOnchangeText(text, 'email')}
                            iconInput={''}
                        />
                        <Input
                            value={''}
                            placeholder={'Mật khẩu'}
                            onChange={(text: string) => handleOnchangeText(text, 'password')}
                            iconInput={''}
                            style={{ borderWidth: 1, borderColor: 'blue' }}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.btnForgot}
                    >
                        <Text style={styles.txtForgot}>Quên mật khẩu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={onLogin}
                    >
                        <Text style={styles.txtLogin}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnRegister}
                    >
                        <Text style={styles.txtRegister}>ĐĂNG KÝ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    flexView: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewInput: {
        paddingHorizontal: 16
    },
    btnLogin: {
        width: '90%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: Colors.border
    },
    txtLogin: {
        fontSize: 18,
        fontWeight: '700'
    },
    btnForgot: {
        paddingVertical: 4,
        marginTop: 20,
        marginBottom: 30

    },
    btnRegister: {
        width: '90%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: Colors.colorBtn
    },
    txtRegister: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white'
    },
    txtForgot: {

    }
});

export default LoginScreen