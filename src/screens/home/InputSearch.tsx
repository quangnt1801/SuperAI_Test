import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome';

interface InputSearchProps {
    handleSearch: (text: string) => void;
    resetSearch: () => void;
    value: string;
}

const InputSearch = (props: InputSearchProps) => {

    const { handleSearch, resetSearch, value } = props;

    // const handleSearch = (text: string) => {
    //     if (text.length === 0) {
    //         setData(dataProvince.current);
    //         setSearchProvince(text)
    //         return
    //     }

    //     setSearchProvince(text)
    //     const filteredData = dataProvince.current.filter((item: ParamProvince) =>
    //         item.name.toLowerCase().includes(text.toLowerCase())
    //     );
    //     setData(filteredData);
    // };

    // const resetSearch = () => {
    //     setSearchProvince('');
    //     setData(dataProvince.current);
    // };


    return (
        <View style={styles.searchProvinceView}>
            <Icon name='search' size={30} style={{ position: 'absolute', left: 16 }} />
            <TextInput
                value={value}
                placeholder='tim kiem'
                style={styles.inputSearch}
                onChangeText={(text: string) => handleSearch(text)}
            />
            <TouchableOpacity
                style={styles.btnCleanSearch}
                onPress={resetSearch}
            >
                <Icon name='close' size={30} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    searchProvinceView: {
        width: '90%',
        height: 55,
        borderWidth: 1,
        marginVertical: 12,
        borderRadius: 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputSearch: {
        width: '90%',
        height: 50,
        paddingHorizontal: 34,
        paddingVertical: 2,
        fontSize: 18,
    },
    btnCleanSearch: {
        position: 'absolute',
        right: 8,
        padding: 10,
        zIndex: 999
    }
});

export default InputSearch