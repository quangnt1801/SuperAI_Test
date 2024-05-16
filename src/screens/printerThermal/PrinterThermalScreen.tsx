import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, Platform, Alert } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../services/utils/Colors';
import TSCPrinter from 'rn-tsc-printer';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';

const PrinterThermalScreen = () => {

    const [filePath, setFilePath] = useState('')

    useEffect(() => {
        test()

    }, [])


    const test = async () => {
        let downloadDir = RNFS.DownloadDirectoryPath;

        if (Platform.OS === 'ios') {
            downloadDir = RNFS.LibraryDirectoryPath + '/Download';
        }
        console.log('File font213123123.', downloadDir);
        const fontFilePath = `${downloadDir}/Arial.ttf`;
        const exists = await RNFS.exists(fontFilePath);
        if (exists) {
            console.log('File jahdjasjdasdas.', fontFilePath);
            setFilePath(fontFilePath)
            return;
        } else {
            console.log('File font không tồn tại.');
            return null;
        }
    }

    const printer = new TSCPrinter({
        ip: "192.168.1.100",
        port: 9100,
        width: 82,
        height: 50,
    });

    const onPrinterThermal = async () => {
        await printer.open()
        await printer.clear()
        await printer.cmd('CLS')
        await printer.setup()
        const qrCodeCommand = `
            SIZE 2,2
            QRCODE 20,70,L,3,A,0,"SuperAi | HDGS983262LM810002885"
        `;
        await printer.cmd(qrCodeCommand)
        await printer.barcode({
            x: 120,
            y: 70,
            height: 100,
            narrow: 1,
            wide: 1,
            printText: true,
            rotation: 0,
            type: 'EAN128',
            code: 'SuperAi | HDGS983262LM810002885'
        })

        await printer.windowfont({
            x: 20,
            y: 200,
            size: 20,
            path: filePath,
            text: 'Địa chỉ: Quận Bình Thạnh, TP Hồ Chí Minh'
        })

        await printer.windowfont({
            x: 20,
            y: 230,
            size: 20,
            path: filePath,
            text: '350.000 VNĐ, 089****801 - Quang'
        })

        await printer.windowfont({
            x: 20,
            y: 260,
            size: 20,
            path: filePath,
            text: 'ĐH của shop: SuperAI'
        })

        await printer.windowfont({
            x: 20,
            y: 290,
            size: 20,
            path: filePath,
            text: 'Sản phẩm: Macbook Pro'
        })

        // const ttf = await printer.ttf('Arial.ttf')
        // if (ttf) {
        //     console.log("@@@@@@@@@@@@@ttfttf", ttf);



        // }

        //         const command = `
        //     SIZE 1,1
        //     TEXT 100,100,"Arial Unicode MS",0,1,1,"Chào thế giới"
        //     PRINT 1,1
        //   `;

        //         printer.cmd(command)

        await printer.print(1, 1)
        await printer.close()
    }

    return (
        <View style={styles.flexView}>
            <Text style={[styles.titleTxtBill, { marginTop: 20, marginBottom: 20, fontSize: 22 }]}>Thông tin hoá đơn</Text>
            <View>
                <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                    <Text style={styles.titleTxtBill}>Dia Chi: </Text>
                    <Text style={styles.textBill}>Quan Binh Thanh, Tp Ho Chi Minh</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                    <Text style={styles.titleTxtBill}>Thong tin: </Text>
                    <Text style={styles.textBill}>350.000 VND 089****801 - Quang</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                    <Text style={styles.textBill}>DH cua shop SuperAI</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                    <Text style={styles.titleTxtBill}>San pham: </Text>
                    <Text style={styles.textBill}>Macbook Pro</Text>
                </View>
            </View>
            {/* <Text>{textPrint.text}</Text> */}
            <TouchableOpacity
                style={styles.btnPrinter}
                onPress={onPrinterThermal}
            >
                <Icon name='clipboard' size={22} color={'white'} />
                <Text style={styles.txtBtPrinter}>In hoá đơn</Text>
            </TouchableOpacity>
        </View>

        // <View style={styles.container}>
        //     {printers.map((printer: any) => (
        //         <TouchableOpacity
        //             key={printer.device_id}
        //             onPress={() => connectPrinter(printer.host, printer.port)}
        //             style={styles.button}
        //         >
        //             <Text>{`device_name: ${printer.device_name}, host: ${printer.host}, port: ${printer.port}`}</Text>
        //         </TouchableOpacity>
        //     ))}
        //     <TouchableOpacity onPress={printTextTest} style={styles.button}>
        //         <Text>Print Text</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity onPress={printBillTest} style={styles.button}>
        //         <Text>Print Bill Text</Text>
        //     </TouchableOpacity>
        // </View>

    )
}




const styles = StyleSheet.create({
    flexView: {
        paddingHorizontal: 20,
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    btnPrinter: {
        width: 80,
        height: 80,
        marginTop: 150,
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