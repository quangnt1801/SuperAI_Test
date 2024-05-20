import { View, Text, StyleSheet, TouchableOpacity, Platform, FlatList, NativeEventEmitter, NativeModules, Alert } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../services/utils/Colors';
import TSCPrinter from 'rn-tsc-printer';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';
import TcpSocket from 'react-native-tcp-socket';

interface listBill {
    barCode: string,
    qrCode: string,
    location: string,
    productType: string,
    classificationCode: string,
    phoneUser: string,
    recipientName: string,
    shopName: string | any,
}

const PrinterThermalScreen = () => {

    const { TSCPrinterModule } = NativeModules;

    const [listBill, setListBill] = useState<listBill[]>([
        {
            barCode: "BEST | 84857627495046",
            qrCode: "813464520",
            location: "24 Nguyễn Chánh Sắt, P.13, Q. Tân Bình, Hcm, Phường 13, Quận Tân Bình, Hồ Chí Minh",
            classificationCode: "SG071-00-003-02",
            phoneUser: '032****775',
            recipientName: 'Ng. Nhận: Hằng',
            shopName: 'THẢO HƯƠNG SPAI',
            productType: "QUẦN ÁO, MỸ PHẨM"
        },
        {
            barCode: "BEST | 84857512884224",
            qrCode: "813106845",
            location: "32 Thân Nhân Trung An Giang, Phường Đông Xuyên, Thành phố Long Xuyên, An Giang",
            classificationCode: "CT176-00-034-02",
            phoneUser: '091****796',
            recipientName: 'Ng. Nhận: Thảo',
            shopName: 'THẢO HƯƠNG SPAI',
            productType: "QUẦN ÁO, MỸ PHẨM"
        },
    ]);

    const getPathTextFont = async (fontName: string): Promise<string> => {
        let downloadDir = RNFS.DownloadDirectoryPath;
        let pathFont: String = ''

        if (Platform.OS === 'ios') {
            downloadDir = RNFS.LibraryDirectoryPath + '/Download';
        }

        const fontFilePath = `${downloadDir}/${fontName}.ttf`;
        const isExists = await RNFS.exists(fontFilePath);
        if (isExists) {
            console.log('File jahdjasjdasdas.', fontFilePath);
            return fontFilePath
        } else {
            console.log('File font not exists.');
            return pathFont = ''

        }
    }

    const printer = new TSCPrinter({
        ip: "192.168.1.100",
        port: 9100,
        width: 90,
        height: 50,
    });

    const printerWithIOS = async () => {
        console.log("dsahdsadsada");

        TSCPrinterModule.initiatePrinting("192.168.1.100", [{ barcode: 'SuperAI' }], (response: string) => {
            Alert.alert('Thông báo', response);
            // setLoading(false);
        });

    }

    const insertLineBreaks = (text: string) => {

        const maxLength = 380;
        const charLength = 7;
        let currentLength = 0;
        let lastSpaceIndex = -1;
        let result = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            currentLength += charLength;

            if (char === ' ') {
                lastSpaceIndex = i;
            }

            if (currentLength > maxLength) {
                if (lastSpaceIndex !== -1) {
                    result = result.substring(0, lastSpaceIndex) + '\n' + result.substring(lastSpaceIndex + 1);
                    currentLength = (i - lastSpaceIndex) * charLength;
                    lastSpaceIndex = -1;
                } else {
                    result += '\n';
                    currentLength = charLength;
                }
            }

            result += char;
        }

        return result;
    };

    const printerWithAndroid = async () => {
        const fontArial = await getPathTextFont('Arial');
        const fontArialBold = await getPathTextFont('arialceb')

        await printer.open()
        await printer.clear()
        await printer.setup()


        for (const item of listBill) {
            await printer.barcode({
                x: 25,
                y: 40,
                height: 60,
                narrow: 2,
                wide: 1,
                printText: true,
                rotation: 0,
                type: '128',
                code: item.barCode
            })
            const qrCodeCommand = `
                SIZE 5,2
                QRCODE 450,80,L,3,A,0,"${item.qrCode}"
            `;
            await printer.cmd(qrCodeCommand)

            await printer.windowfont({
                x: 440,
                y: 155,
                size: 18,
                path: fontArial,
                text: item.qrCode
            })

            await printer.windowfont({
                x: 120,
                y: 155,
                size: 28,
                path: fontArialBold,
                text: item.classificationCode
            })

            await printer.windowfont({
                x: 14,
                y: 220,
                size: 18,
                path: fontArial,
                text: insertLineBreaks(item.location)
            })
            18
            const textLines = [
                { text: `${item.phoneUser} - `, font: fontArial, bold: false },
                { text: item.recipientName, font: fontArialBold, bold: true },
                { text: '- ĐH của shop ', font: fontArial, bold: false },
                { text: item.shopName, font: fontArialBold, bold: true },
            ];

            let currentX = 14;
            for (const line of textLines) {
                await printer.windowfont({
                    x: currentX,
                    y: 280,
                    size: 18,
                    path: line.font,
                    text: line.text
                });

                currentX += line.text.length * 9;
            }


            await printer.windowfont({
                x: 14,
                y: 320,
                size: 18,
                path: fontArial,
                text: `SP Cần Giao: ${item.productType}`
            })

            await printer.windowfont({
                x: 14,
                y: 346,
                size: 18,
                path: fontArialBold,
                text: `KHÔNG GIAO ĐƯỢC, GỌI NGAY 0902644227. CẢM ƠN AE SHIPPER.`
            })

            await printer.windowfont({
                x: 14,
                y: 372,
                size: 18,
                path: fontArial,
                text: `Cho Thử Hàng`
            })

            await printer.print(1, 1)
            await printer.clear()

        }

        await printer.close()
    }


    const onPrinterThermal = async () => {
        printerWithIOS();
        // if (Platform.OS === 'ios') {
        // } else {
        //     printerWithAndroid();
        // }
    }

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
                keyExtractor={(item: any) => item.qrCode}
                renderItem={renderItem}
            />
            <TouchableOpacity
                style={styles.btnPrinter}
                onPress={onPrinterThermal}
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