import { View, StyleSheet, TextInput, ViewStyle, TouchableOpacity } from 'react-native'
import React from 'react'
// import { FontFamilies } from '../../utils/FontFamilies';
import { SvgXml } from 'react-native-svg';
import { iconEye, iconOffEye } from './svg';
import { KeyboardType } from './type';
import { Colors } from '../../services/utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

interface InputProps {
    value: string,
    placeholder: string,
    secureTextEntry?: boolean,
    onChange: (text: string) => void,
    iconInput: string,
    isPassword?: boolean,
    isSelect?: boolean,
    iconSelect?: string,
    isShowIconSelect?: boolean,
    onHidePass?: () => void,
    onSelect?: () => void,
    style?: ViewStyle,
    editable?: boolean,
    keyboardType?: KeyboardType | any,
    maxLength?: number,
}

const Input = (props: InputProps) => {

    const { value, style, placeholder, secureTextEntry, onChange, isPassword,
        isSelect, onHidePass, iconInput, iconSelect, editable, onSelect,
        isShowIconSelect, keyboardType, maxLength } = props;

    return (
        !isSelect ?
            <View
                style={[styles.inputView, { ...style }]}
            >
                <View style={styles.iconView}>
                    <SvgXml xml={iconInput} width={22} height={22} />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    editable={editable}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry ? secureTextEntry : false}
                    placeholderTextColor={Colors.placeholder}
                    onChangeText={onChange}
                    maxLength={maxLength}
                />
                {
                    isPassword !== undefined &&
                    <TouchableOpacity
                        style={styles.btnEye}
                        onPress={onHidePass}
                    >
                        <SvgXml xml={isPassword ? iconEye : iconOffEye} />
                    </TouchableOpacity>
                }

            </View>
            :
            <TouchableOpacity
                style={[styles.inputView, { ...style }]}
                onPress={onSelect}
            >
                <View style={styles.iconView}>
                    {/* <Icon name="user" size={30} /> */}
                </View>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    editable={editable}
                    secureTextEntry={secureTextEntry ? secureTextEntry : false}
                    placeholderTextColor={Colors.placeholder}
                    onChangeText={onChange}
                    keyboardType={keyboardType ? keyboardType : 'decimal-pad'}
                />
                {
                    isPassword !== undefined &&
                    <TouchableOpacity
                        style={styles.btnEye}
                        onPress={onHidePass}
                    >
                        <SvgXml xml={isPassword ? iconEye : iconOffEye} />
                    </TouchableOpacity>
                }
                {
                    isShowIconSelect ?
                        <View
                            style={styles.btnEye}
                        >
                            <SvgXml xml={iconSelect ? iconSelect : null} />
                        </View>
                        : null
                }
            </TouchableOpacity>


    )
}

const styles = StyleSheet.create({
    inputView: {
        width: '100%',
        height: 58,
        paddingHorizontal: '2%',
        justifyContent: 'center',
        borderRadius: 18,
        flexDirection: 'row',
        marginBottom: '5.2%',
        backgroundColor: 'white'
    },
    iconView: {
        width: '14%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '86%',
        paddingRight: '8%',
        fontSize: 18,
        color: Colors.blackText,
        // fontFamily: FontFamilies.MediumFont,
    },
    btnEye: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 55,
        position: 'absolute',
        right: 10,
        top: 1
    }
});

export default Input