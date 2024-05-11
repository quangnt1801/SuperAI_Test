import { View, Text, StyleSheet, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Modal, Platform, StatusBar } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { Colors } from '../../../services/utils/Colors';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import { NavigationConstants } from '../../../services/navigation/NavigationConstants';
import { navigateThenReset } from '../../../services/navigation/NavigationServices';
import { login } from '../../../services/clouds/CloudServices';
import ReactNativeBiometrics, { BiometryTypes, Biometrics } from 'react-native-biometrics'
import { AUTHENTICATION_STATE } from '../../../services/store/sagas/type';
import AsyncStorageServices from '../../../services/asyncStorage/AsyncStorageServices';
import { StoreService } from '../../../services/store/StoreService';

interface LoginProps {
    navigation: any,
    updateAuthen: (config: AUTHENTICATION_STATE) => void,
    authen: AUTHENTICATION_STATE
}

const LoginScreen = (props: LoginProps) => {

    const { navigation, updateAuthen, authen } = props;

    const [dataLogin, setDataLogin] = useState<AUTHENTICATION_STATE>({
        email: '',
        password: ''
    })

    const [isShowPassword, setShowPassword] = useState(false);
    const [msgError, setMsgError] = useState('');

    const [isShowAlert, setShowAlert] = useState(true);
    const [msgAlert, setMsgAlert] = useState({
        title: '',
        content: ''
    })

    useEffect(() => {
        getAuthen();
    }, [])

    const getAuthen = () => {
        AsyncStorageServices.getAuthentication().then((authen: any) => {
            console.log("Loaded authentication.", authen);

            if (authen) {
                applyAuthen(authen)
            } else {
                console.log("Authentiation is empty or undefined.");
            }
        }).catch((error) => {
            console.error("Error loading authentication:", error);
        });
    }

    const applyAuthen = async (authen: AUTHENTICATION_STATE) => {
        if (Object.keys(authen).length > 0) {
            updateAuthen(authen)
        } else {
            console.log("Authentication is empty.");
        }
    }

    const handleOnchangeText = (value: string, key: string) => {
        setDataLogin({ ...dataLogin, [key]: value })
    }

    const onDismissKeyboard = () => {
        Keyboard.dismiss();
    }

    const checkSupportBiometric = () => {
        const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });
        rnBiometrics.isSensorAvailable().then((resultObject) => {
            const { available, biometryType } = resultObject;

            if (Platform.OS === 'ios') {
                if (available && biometryType === BiometryTypes.FaceID) {
                    console.log("handleLoginWithBiometric - FaceId: ", biometryType);
                } else if (available && biometryType === BiometryTypes.TouchID) {
                    console.log("handleLoginWithBiometric - TouchID: ", biometryType);
                }
            } else {
                if (available && biometryType === BiometryTypes.Biometrics) {
                    console.log("handleLoginWithBiometric - Biometrics: ", biometryType);
                    handleLoginWithBiometric()
                }
            }
        })
    }

    const handleLoginWithBiometric = async () => {
        const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });

        try {
            const { available, biometryType } = await rnBiometrics.isSensorAvailable();

            if (available) {
                const result = await rnBiometrics.simplePrompt({
                    promptMessage: 'Authenticate',
                });

                if (result.success) {
                    onLogin(authen)
                } else {
                    // Biometric authentication failed
                }
            } else {
                setShowAlert(true)
                setMsgAlert({
                    title: 'Xác thực vân tay',
                    content: 'Vui lòng kịch hoạt vân tay trong cài đặt'
                })
            }
        } catch (error) {
            console.error(error);
        }

    }

    const onLogin = (data: any) => {
        if (Object.values(data).filter((item: any) => item === "").length > 0) {
            setMsgError('Vui lòng điền đầy đủ thông tin!')
            return
        };

        if (data.password.length < 8) {
            setMsgError('Mật khẩu ít nhất 8 ký tự!')
            return
        }

        setMsgError('')

        login(data).then((response: any) => {

            if (response.status === "Success") {
                updateAuthen({
                    email: data.email,
                    password: data.password
                })
                navigateThenReset(navigation, NavigationConstants.HOME_SCREEN);
            } else {
                setMsgError('Thông tin đăng nhập không đúng!')
            }
        }).catch((error) => {
            console.log("Login error:", error);

        })
    }

    const ModalAlert = useMemo(() => {
        return (
            <Modal
                animationType='none'
                transparent={true}
                visible={isShowAlert}
                statusBarTranslucent={true}
            // onRequestClose={onCloseProvince}
            >
                <View style={styles.viewModal}>

                </View>
            </Modal>
        )
    }, [])

    return (
        <TouchableWithoutFeedback
            onPress={onDismissKeyboard}
        >
            <View style={styles.flexView}>
                <StatusBar
                    backgroundColor={'white'}
                />
                <View style={styles.container}>
                    <View style={styles.viewHeaderTitle}>
                        <Icon name='arrow-left'
                            size={24}
                            color={Colors.blackText}
                        />
                        <Text style={styles.txtTitleLogin}>Đăng nhập</Text>
                    </View>
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
                                    height: 50,
                                    borderRadius: 16,
                                    marginTop: 10,
                                    paddingLeft: 26,
                                    backgroundColor: 'white'
                                }}
                                label="Số điện thoại / Email"
                                onChangeText={(text: string) => handleOnchangeText(text, 'email')}
                            />
                            <Icon name='user' size={22} style={{ position: 'absolute', left: 14, top: 32, alignSelf: 'center' }} />
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
                                    height: 55,
                                    borderRadius: 16,
                                    marginTop: 12,
                                    paddingLeft: 26,
                                    backgroundColor: 'white'
                                }}
                                onChangeText={(text: string) => handleOnchangeText(text, 'password')}
                            />
                            <Icon name='lock' size={22} style={{ position: 'absolute', left: 14, top: 28, alignSelf: 'center' }} />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!isShowPassword)}
                                style={{ position: 'absolute', right: 14, top: 24, alignSelf: 'center', zIndex: 9999 }}
                            >
                                <Icon name={!isShowPassword ? 'eye-slash' : 'eye'} size={26} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.btnForgot}
                    >
                        <Text style={styles.txtForgot}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                    <View style={styles.viewButton}>
                        <TouchableOpacity
                            style={styles.btnLogin}
                            onPress={() => onLogin(dataLogin)}
                        >
                            <Text style={styles.txtLogin}>ĐĂNG NHẬP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnBiometric}
                            onPress={checkSupportBiometric}
                        >
                            <IconIon name='finger-print' size={30} />
                        </TouchableOpacity>
                    </View>
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
    },
    viewInput: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 22
    },
    btnLogin: {
        width: '80%',
        height: '100%',
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
    },
    viewButton: {
        width: '90%',
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnBiometric: {
        width: 55,
        height: '100%',
        backgroundColor: Colors.border,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    viewHeaderTitle: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    txtTitleLogin: {
        fontSize: 24,
        color: Colors.blackText,
        marginLeft: 20
    }
});

export default LoginScreen