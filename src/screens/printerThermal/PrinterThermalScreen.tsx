import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, Platform } from 'react-native';
import ThermalPrinterModule from 'react-native-thermal-printer';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../services/utils/Colors';
import TSCPrinter from 'rn-tsc-printer';
import Icon from 'react-native-vector-icons/FontAwesome';

const PrinterThermalScreen = () => {

    const printer = new TSCPrinter({
        ip: "192.168.1.100",
        port: 9100,
        width: 80,
        height: 50,
    });

    const onPrinterThermal = async () => {
        await printer.open()
        await printer.clear()
        await printer.setup()
        await printer.barcode({
            x: 20,
            y: 20,
            height: 80,
            narrow: 1,
            wide: 1,
            printText: true,
            rotation: 0,
            type: 'EAN128',
            code: 'SuperAi | HDGS983262LM810002885'
        })
        await printer.text({
            x: 20,
            y: 140,
            font: '1',
            rotation: 0,
            text: 'Dia chi: Quan Binh Thanh, Tp Ho Chi Minh',
            zoomX: 1,
            zoomY: 1
        })
        await printer.text({
            x: 20,
            y: 160,
            font: '1',
            rotation: 0,
            text: '350.000 VND, 089****801 - Quang',
            zoomX: 1,
            zoomY: 1
        })

        await printer.text({
            x: 20,
            y: 180,
            font: '1',
            rotation: 0,
            text: 'DH cua shop: SuperAI',
            zoomX: 1,
            zoomY: 1
        })
        await printer.text({
            x: 20,
            y: 200,
            font: '1',
            rotation: 0,
            text: 'Macbook Pro',
            zoomX: 1,
            zoomY: 1
        })
        await printer.qrcode({
            cell: '1',
            content: 'SuperAi | HDGS983262LM810002885',
            ecc: 'L',
            mask: '0',
            mode: '1',
            model: '2',
            rotation: '0',
            x: 20,
            y: 220
        })
        await printer.print(1, 1)
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
    }
});

export default PrinterThermalScreen