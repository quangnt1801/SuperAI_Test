import { View, Text, StyleSheet, TouchableOpacity, Platform, FlatList } from 'react-native';
import React, { useState } from 'react'
import { Colors } from '../../services/utils/Colors';
import TSCPrinter from 'rn-tsc-printer';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';
import { listBill } from './type';
import usePrinterIOS from './usePrinterIOS';
import usePrinterAndroid from './usePrinterAndroid';

const PrinterThermalScreen = () => {

    const [listBill, setListBill] = useState<listBill[]>([
        {
            barCode: "84857620496799",
            qrCode: "813464520",
            location: "32 Than Nhan Trung, Phường Láng Hạ, Quận Đống Đa, Thành phố Hà Nội",
            classificationCode: "SG071-00-003-02",
            phoneUser: '032****775',
            recipientName: 'Ng. Nhận: Hằng',
            shopName: 'THẢO HƯƠNG SPAI',
            productType: "QUẦN ÁO, MỸ PHẨM",
            carrier_alias: "BEST",
            note: "CHO KHÁCH XEM HÀNG KHÔNG CHO THỬ, KHÁCH KHÔNG NHẬN HÀNG THU 30K HOÀN ĐƠN"
        },
        {
            barCode: "G8DQN3BM",
            qrCode: "813464520",
            location: "24 Nguyễn Chánh Sắt, P.13, Q. Tân Bình, Hcm, Phường 13, Quận Tân Bình, Hồ Chí Minh",
            classificationCode: "SG071-00-003-02",
            phoneUser: '032****775',
            recipientName: 'Ng. Nhận: Hằng',
            shopName: 'THẢO HƯƠNG SPAI',
            productType: "QUẦN ÁO, MỸ PHẨM",
            carrier_alias: "GHN",
            note: "Không giao được thu phí 35K"
        },
        {
            barCode: "SPSP220069770",
            qrCode: "813106845",
            location: "32 Thân Nhân Trung An Giang, Phường Đông Xuyên, Thành phố Long Xuyên, An Giang",
            classificationCode: "CT176-00-034-02",
            phoneUser: '091****796',
            recipientName: 'Ng. Nhận: Thảo',
            shopName: 'THẢO HƯƠNG SPAI',
            productType: "QUẦN ÁO, MỸ PHẨM",
            carrier_alias: "VTP",
            note: "CHO KHÁCH XEM HÀNG KHÔNG CHO THỬ, KHÁCH KHÔNG NHẬN HÀNG THU 30K HOÀN ĐƠN"
        },
        {
            barCode: "SSP813335479",
            qrCode: "813106845",
            location: "32 Thân Nhân Trung An Giang, Phường Đông Xuyên, Thành phố Long Xuyên, An Giang",
            classificationCode: "CT176-00-034-02",
            phoneUser: '091****796',
            recipientName: 'Ng. Nhận: Thảo',
            shopName: 'THẢO HƯƠNG SPAI',
            productType: "QUẦN ÁO, MỸ PHẨM",
            carrier_alias: "NJV",
            note: "Vui lòng kiểm tra hàng, nếu khách không nhận vui lòng gọi về cho shop để giải quyết đơn. Cảm ơn!"
        },
        {
            barCode: "SPXVN048144786792",
            qrCode: "813106845",
            location: "32 Thân Nhân Trung An Giang, Phường Đông Xuyên, Thành phố Long Xuyên, An Giang",
            classificationCode: "CT176-00-034-02",
            phoneUser: '091****796',
            recipientName: 'Ng. Nhận: Thảo',
            shopName: 'THẢO HƯƠNG SPAI',
            productType: "QUẦN ÁO, MỸ PHẨM",
            carrier_alias: "SPX",
            note: "Không giao được thu phí 35K"
        },
    ]);

    const printer = new TSCPrinter({
        ip: "192.168.1.100",
        port: 9100,
        width: 90,
        height: 50,
    });

    const { printerWithAndroid, isPrinting } = usePrinterAndroid(listBill, printer);
    const { printerWithIOS } = usePrinterIOS(listBill, printer)

    const print = async () => {
        if (Platform.OS === 'ios') {
            await printerWithIOS();
        } else if (Platform.OS === 'android') {
            await printerWithAndroid();
        }
    };

    const renderItem = ({ item, index }: { item: listBill, index: number }) => {
        return (
            <View style={{ width: '100%', marginBottom: 20, padding: 12, backgroundColor: "#DCDCDC", borderRadius: 12 }}>
                <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                    <Text style={styles.textBill}>{item.recipientName}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                    <Text style={styles.titleTxtBill}>phoneUser: </Text>
                    <Text style={styles.textBill}>{item.phoneUser}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                    <Text style={styles.titleTxtBill}>Shop: </Text>
                    <Text style={styles.textBill}>{item.shopName}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                    <Text style={styles.titleTxtBill}>San pham: </Text>
                    <Text style={styles.textBill}>{item.productType}</Text>
                </View>
                <View style={{ marginBottom: 2 }}>
                    <Text style={styles.titleTxtBill}>Địa chỉ: </Text>
                    <Text style={styles.textBill}>{item.location}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.flexView}>
            <Text style={[styles.titleTxtBill, { marginTop: 20, marginBottom: 20, fontSize: 22 }]}>Thông tin hoá đơn 1231</Text>

            <FlatList
                data={listBill}
                keyExtractor={(item: listBill) => item.carrier_alias}
                renderItem={renderItem}
            />
            <TouchableOpacity
                style={styles.btnPrinter}
                onPress={print}
            >
                <Icon name='clipboard' size={22} color={'white'} />
                <Text style={styles.txtBtPrinter}>In hoá đơn</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    flexView: {
        paddingHorizontal: 20,
        flex: 1,
    },
    btnPrinter: {
        width: 80,
        height: 80,
        position: 'absolute',
        bottom: 50,
        backgroundColor: Colors.error,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    txtBtPrinter: {
        fontSize: 14,
        maxWidth: '80%',
        textAlign: 'center',
        color: 'white',
        fontWeight: '700', marginTop: 4
    },
    titleTxtBill: {
        fontSize: 16,
        color: Colors.blackText,
        fontWeight: '700'
    },
    textBill: {
        fontSize: 16,
        color: Colors.blackText,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        margin: 10,
        padding: 10,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
    },
});

export default PrinterThermalScreen