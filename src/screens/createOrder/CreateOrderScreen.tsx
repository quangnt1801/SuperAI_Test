import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Dimensions } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { ParamArea, getDistrict, getProvince, getCommune } from '../../services/clouds/CloudServices';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import InputSearch from '../home/InputSearch';
import { TextInput } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;

const CreateOrderScreen = () => {

    const dataProvince = useRef<ParamArea[]>([]);
    const [data, setData] = useState<any>([])
    const [isVisibleProvince, setVisibleProvince] = useState(false);
    const [area, setArea] = useState({
        name: '',
        code: 0
    });
    const [stepArea, setStepArea] = useState('')
    const [searchProvince, setSearchProvince] = useState('');

    const fetchData = (getDataFunction: () => Promise<any>) => {
        getDataFunction()
            .then((response: any) => {
                dataProvince.current = response.results;
                setData(response.results);
            })
            .catch((error: any) => {
                console.log(`Get data error: ${error}`);
            });
    };

    const getProvinceCloud = () => fetchData(getProvince);
    const getDistrictCloud = (code: number) => fetchData(() => getDistrict(code));
    const getCommuneCloud = (code: number) => fetchData(() => getCommune(code));

    const selectArea = (item: ParamArea) => {
        switch (stepArea) {
            case 'province':
                getDistrictCloud(item.code);
                setArea({
                    name: `${item.name}`,
                    code: item.code
                })
                setStepArea('district')
                break;
            case 'district':
                getCommuneCloud(item.code)
                setStepArea('commune')
                setArea({
                    name: `${item.name} / ${item.province}`,
                    code: item.code
                })
                break;
            case 'commune':
                getCommuneCloud(item.code);
                setArea({
                    name: `${item.name} / ${item.district} / ${item.province}`,
                    code: item.code
                })
                setVisibleProvince(!isVisibleProvince)
                setStepArea('')
                break;

            default:
                getProvinceCloud()
                setStepArea('province')
                break;
        }
    }



    const renderItem = (item: any) => {
        const itemData = item.item;
        return (
            <TouchableOpacity
                style={styles.itemView}
                onPress={() => selectArea(itemData)}
            >
                <IconFont
                    name={area === itemData.name ? 'circle' : 'circle-o'}
                    size={30}
                />
                <Text style={styles.txtItemName}>{itemData.name}</Text>
            </TouchableOpacity>
        )
    }

    const onCloseProvince = () => {
        setVisibleProvince(!isVisibleProvince)

    }

    const handleSearch = (text: string) => {
        if (text.length === 0) {
            setData(dataProvince.current);
            setSearchProvince(text)
            return
        }

        setSearchProvince(text)
        const filteredData = dataProvince.current.filter((item: ParamArea) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setData(filteredData);
    };

    const resetSearch = () => {
        setSearchProvince('');
        setData(dataProvince.current);
    };

    const handleCancelOrBack = () => {
        if (stepArea === 'district') {
            setStepArea('province')
            getProvinceCloud()
        }
    }

    const renderTitleModal = () => {
        switch (stepArea) {
            case 'province':
                return "Chọn Tỉnh/Thành Phố";

            case 'district':
                return "Chọn Quận/Huyện";

            case 'commune':
                return "Chọn Phường/Xã";

            default:
                return "Chọn Tỉnh/Thành Phố";
        }
    }

    const renderModalProvince = useMemo(() => {
        return (
            <Modal
                animationType='none'
                transparent={true}
                visible={isVisibleProvince}
                statusBarTranslucent={true}
                onRequestClose={onCloseProvince}
            >
                <View style={styles.viewModal}>
                    <View style={styles.viewContainerModal}>
                        <View style={styles.viewHeadeModal}>
                            <Text style={styles.textHeaderModal}>{renderTitleModal()}</Text>
                            <TouchableOpacity
                                style={styles.btnCloseModal}
                                onPress={onCloseProvince}
                            >
                                <Icon name="close" size={30} color={Colors.blackText} />
                            </TouchableOpacity>
                        </View>
                        <InputSearch
                            value={searchProvince}
                            handleSearch={(text: string) => handleSearch(text)}
                            resetSearch={resetSearch}
                        />
                        <View style={styles.contentFlatlist}>
                            <FlatList
                                data={data}
                                keyExtractor={(item: any, index: any) => item.code}
                                renderItem={renderItem}
                            />
                        </View>
                        <TouchableOpacity
                            style={[styles.backSelectedArea, { backgroundColor: stepArea === 'province' ? Colors.border : "#EA4E13" }]}
                            onPress={handleCancelOrBack}
                        >
                            <Text style={styles.txtBack}>{stepArea === 'province' ? "Huỷ" : "Quay lại"}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        )
    }, [isVisibleProvince, selectArea, data, stepArea])

    const onSelectPrivince = () => {
        setVisibleProvince(true);
        selectArea(area);
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 14 }}>
            <TouchableOpacity
                onPress={onSelectPrivince}
            >
                <TextInput
                    value={area.name}
                    mode='outlined'
                    editable={false}
                    numberOfLines={2}
                    multiline

                    style={{
                        width: '100%',
                        height: area.name.length > 50 ? 80 : 60,
                        borderRadius: 16,
                        backgroundColor: area ? 'white' : Colors.border,
                        marginTop: 50,
                    }}
                    label="Khu vực"
                    activeOutlineColor={Colors.border}
                />
            </TouchableOpacity>
            {renderModalProvince}
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
    itemView: {
        width: '100%',
        height: 70,
        borderBottomWidth: 1,
        paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: Colors.border
    },
    contentFlatlist: {
        width: '100%',
        backgroundColor: 'white'
    },
    viewModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    viewContainerModal: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: '94%',
        width: '100%',
        backgroundColor: 'white'
    },
    viewHeadeModal: {
        height: 80,
        borderBottomWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textHeaderModal: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.blackText
    },
    btnCloseModal: {
        padding: 12,
        position: 'absolute',
        top: 14,
        right: 6
    },
    txtItemName: {
        fontSize: 18,
        marginLeft: 14,
        color: Colors.blackText
    },
    searchProvinceView: {
        width: '90%',
        borderWidth: 1,
        marginVertical: 12,
        borderRadius: 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputSearch: {
        width: '90%',
        height: 55,
        paddingHorizontal: 34,
        fontSize: 18,
        backgroundColor: 'white'
    },
    btnCleanSearch: {
        position: 'absolute',
        right: 8,
        padding: 10,
        zIndex: 999
    },
    backSelectedArea: {
        width: '80%',
        height: 55,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
    },
    txtBack: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white'
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

export default CreateOrderScreen