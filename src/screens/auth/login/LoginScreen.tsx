import { View, Text, StyleSheet, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../services/utils/Colors';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationConstants } from '../../../services/navigation/NavigationConstants';
import { navigateThenReset } from '../../../services/navigation/NavigationServices';

interface LoginProps {
    navigation: any
}

const LoginScreen = (props: LoginProps) => {

    const { navigation } = props;

    const [dataLogin, setDataLogin] = useState({
        email: '',
        password: ''
    })

    const [isShowPassword, setShowPassword] = useState(false);
    const [msgError, setMsgError] = useState('');

    // var mock = new MockAdapter(axios);

    const handleOnchangeText = (value: string, key: string) => {
        setDataLogin({ ...dataLogin, [key]: value })
    }

    const onDismissKeyboard = () => {
        Keyboard.dismiss();
    }

    const onLogin = () => {
        if (Object.values(dataLogin).filter((item: any) => item === "").length > 0) {
            setMsgError('Vui lòng điền đầy đủ thông tin!')
            return
        };

        if (dataLogin.password.length < 8) {
            setMsgError('Mật khẩu ít nhất 8 ký tự!')
            return
        }

        setMsgError('')

        navigateThenReset(navigation, NavigationConstants.HOME_SCREEN);
    }

    return (
        <TouchableWithoutFeedback
            onPress={onDismissKeyboard}
        >
            <View style={styles.flexView}>
                <View style={styles.container}>
                    <View style={styles.viewInput}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TextInput
                                value={dataLogin.email}
                                mode='outlined'
                                selectionColor={Colors.placeholder}
                                underlineColor={Colors.placeholder}
                                activeUnderlineColor={Colors.placeholder}
                                activeOutlineColor={Colors.bluePrimary}
                                style={{
                                    width: '100%',
                                    height: 60,
                                    borderRadius: 16,
                                    marginTop: 10,
                                    paddingLeft: 26
                                }}
                                label="Số điện thoại / Email"
                                onChangeText={(text: string) => handleOnchangeText(text, 'email')}
                            />
                            <Icon name='user' size={26} style={{ position: 'absolute', left: 14, top: 32, alignSelf: 'center' }} />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 60 }}>

                            <TextInput
                                value={dataLogin.password}
                                label={'Mật khẩu'}
                                mode='outlined'
                                selectionColor={Colors.placeholder}
                                underlineColor={Colors.placeholder}
                                activeUnderlineColor={Colors.placeholder}
                                activeOutlineColor={Colors.bluePrimary}
                                secureTextEntry={!isShowPassword}
                                style={{
                                    width: '100%',
                                    height: 60,
                                    borderRadius: 16,
                                    marginTop: 12,
                                    paddingLeft: 26
                                }}
                                onChangeText={(text: string) => handleOnchangeText(text, 'password')}
                            />
                            <Icon name='lock' size={26} style={{ position: 'absolute', left: 14, top: 26, alignSelf: 'center' }} />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!isShowPassword)}
                                style={{ position: 'absolute', right: 14, top: 24, alignSelf: 'center', zIndex: 9999 }}
                            >
                                <Icon name={isShowPassword ? 'eye-slash' : 'eye'} size={26} />
                            </TouchableOpacity>
                        </View>
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
                    <Text style={styles.txtError}>
                        {msgError}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    flexView: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50
    },
    viewInput: {
        width: '100%',
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

    },
    txtError: {
        fontSize: 12,
        color: Colors.error,
        marginTop: 20,
        marginLeft: 18,
        alignSelf: 'flex-start'
    }
});

export default LoginScreen