import { useState } from "react";
import { Alert, NativeModules } from "react-native";
import { listBill } from "./type";
import { insertLineBreaks } from "./UtilsPrinter";

const usePrinterIOS = (listBill: listBill[], printer: any) => {

    const { TSCPrinterModule } = NativeModules;

    const [isPrinting, setIsPrinting] = useState(false);

    // Hàm chuyển đổi từng phần tử của listBill
    const customListBill = listBill.map(item => ({
        barcode: item.barCode,
        qrcode: item.qrCode,
        labelBarcode: `${item.carrier_alias} | ${item.barCode}`,
        labelQrcode: item.qrCode,
        classificationCode: item.classificationCode,
        address: insertLineBreaks(item.location),
        infoShipping: insertLineBreaks(`${item.phoneUser} + ${item.recipientName} - ĐH của shop ${item.shopName}`),
        infoProduct: `SP Cần Giao: ${item.productType}`,
        contact: insertLineBreaks("KHÔNG GIAO ĐƯỢC, GỌI NGAY 0902644227. CẢM ƠN AE SHIPPER."),
        note: insertLineBreaks(item.note ?? "", 310),
        carrierAlias: item.carrier_alias
    }));

    const printerWithIOS = async () => {
        setIsPrinting(true);

        // for (const item of listBill) {

        //     TSCPrinterModule.initiatePrinting("192.168.1.100", [{
        //         barcode: item.barCode,
        //         qrcode: item.qrCode,
        //         labelBarcode: `${item.carrier_alias} | ${item.barCode}`,
        //         labelQrcode: item.qrCode,
        //         classificationCode: item.classificationCode,
        //         address: insertLineBreaks(item.location),
        //         infoShipping: insertLineBreaks(`${item.phoneUser} + ${item.recipientName} - ĐH của shop ${item.shopName}`),
        //         infoProduct: `SP Cần Giao: ${item.productType}`,
        //         contact: insertLineBreaks("KHÔNG GIAO ĐƯỢC, GỌI NGAY 0902644227. CẢM ƠN AE SHIPPER."),
        //         note: insertLineBreaks(item.note ?? "", 259),
        //         carrierAlias: item.carrier_alias
        //     }], (response: string) => {
        //         Alert.alert('Thông báo', response);

        //     });
        // }

        TSCPrinterModule.initiatePrinting("192.168.1.100", customListBill, (response: string) => {
            Alert.alert('Thông báo', response);

        });
        setIsPrinting(false);
    }

    return { printerWithIOS, isPrinting };
}

export default usePrinterIOS