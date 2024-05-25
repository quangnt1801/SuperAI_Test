import { useState } from "react";
import { listBill } from "./type";
import { getPathTextFont, insertLineBreaks, isTextLengthExceedingLimit } from "./UtilsPrinter";
import TSCPrinter from 'rn-tsc-printer';

const usePrinterAndroid = (listBill: listBill[]) => {
    const [isPrinting, setIsPrinting] = useState(false);

    const xdefault = 0;

    const verticalDash = (numberOfLines: number) => {
        let content = "|";
        for (let i = 1; i < numberOfLines; i++) {
            content += "\n|";
        }
        return content
    }

    const horizontalDash = (numberDashes: number) => {
        let dashLine = '-'.repeat(numberDashes);
        return dashLine;
    }


    const narrowBarcode = (carrierAlias: String) => {

        switch (carrierAlias) {
            case "BEST":
                return 3.99

            case "GHN":
                return 3.99

            case "VTP":
                return 2.9

            case "NJV":
                return 3

            case "SPX":
                return 2.9

            default:
                return 2;
        }
    }

    const paddingWidthBarcode = (carrierAlias: String) => {
        switch (carrierAlias) {
            case "BEST":
                return 50 * 1.3 + xdefault

            case "GHN":
                return 50 + xdefault

            case "VTP":
                return 50 * 1.6 + xdefault

            case "NJV":
                return 50 / 1.4 + xdefault

            case "SPX":
                return 50 * 1.3 + xdefault

            default:
                return 50 + xdefault;
        }
    }

    const paddingWidthTxtBarCode = (carrierAlias: String) => {
        switch (carrierAlias) {
            case "BEST":
                return 50 * 1.8 + xdefault

            case "GHN":
                return 50 * 2.4 + xdefault

            case "VTP":
                return 50 * 2.1 + xdefault

            case "NJV":
                return 50 * 2.2 + xdefault

            case "SPX":
                return 50 * 1.4 + xdefault

            default:
                return 85 + xdefault;
        }
    }

    const printerWithAndroid = async () => {

        setIsPrinting(true);
        const fontArial = await getPathTextFont('ArialCEMTBlack');
        const fontArialBold = await getPathTextFont('ArialCEMTBlack')

        let printerConfig: TSCPrinter;

        const leftDash = verticalDash(27);
        const rightDash = verticalDash(27);
        const qrDash = verticalDash(11);

        const topDash = horizontalDash(57);
        const bottomDash = horizontalDash(57);
        const classificationDash = horizontalDash(44);
        const addressDash = horizontalDash(57);

        const FONT_SIZE = 21;
        let countPrint = 0;



        printerConfig = new TSCPrinter({
            ip: "192.168.1.100",
            port: 9100,
            width: 90,
            height: 50,
        });

        await printerConfig.open()
        await printerConfig.clear()
        await printerConfig.setup()

        // await printerConfig.pausePrint()

        await printerConfig.print(1, 1)
        await printerConfig.clear()

        for (let index = 0; index < listBill.length; index++) {
            const item = listBill[index];
            countPrint++
            await printerConfig.windowsFont({
                x: 14 + xdefault,
                y: index === 0 ? 21 : 24,
                size: 12,
                path: fontArial,
                text: leftDash,
                underLine: 0,
                bold: 1
            })

            await printerConfig.windowsFont({
                x: 584 + xdefault,
                y: index === 0 ? 21 : 24,
                size: 12,
                path: fontArial,
                text: rightDash,
                underLine: 0,
                bold: 0
            })

            await printerConfig.windowsFont({
                x: 450 + xdefault,
                y: index === 0 ? 21 : 24,
                size: 12,
                path: fontArial,
                text: qrDash,
                underLine: 0,
                bold: 0
            })

            //3 cột này cần khởi tạo đầu tiên vì Border của nó có thể che content 

            await printerConfig.barcode({
                x: paddingWidthBarcode(item.carrier_alias),
                y: 30,
                height: 60,
                narrow: narrowBarcode(item.carrier_alias),
                wide: 1,
                printText: false,
                rotation: 0,
                type: '128',
                code: item.barCode
            })
            await printerConfig.windowsFont({
                x: paddingWidthTxtBarCode(item.carrier_alias),
                y: 95,
                size: 26,
                path: fontArial,
                text: `${item.carrier_alias} | ${item.barCode}`,
                underLine: 0,
                bold: 1
            })

            const qrCodeCommand = `
                SIZE 5,2
                QRCODE ${475 + xdefault},50,L,4,A,0,"${item.qrCode}"
            `;
            await printerConfig.cmd(qrCodeCommand)

            await printerConfig.windowsFont({
                x: 470 + xdefault,
                y: 148,
                size: 18,
                path: fontArial,
                text: item.qrCode,
                underLine: 0,
                bold: 1
            })

            await printerConfig.windowsFont({
                x: 120 + xdefault,
                y: 136,
                size: 28,
                path: fontArialBold,
                text: item.classificationCode,
                underLine: 0,
                bold: 1
            })

            let addressExceeds = isTextLengthExceedingLimit(item.location)
            await printerConfig.windowsFont({
                x: 30 + xdefault,
                y: 185,
                size: FONT_SIZE,
                path: fontArial,
                text: insertLineBreaks(item.location),
                underLine: 0,
                bold: 0
            })

            await printerConfig.windowsFont({
                x: 30 + xdefault,
                y: addressExceeds ? 238 : 205,
                size: FONT_SIZE,
                path: fontArial,
                text: insertLineBreaks(`${item.phoneUser}${item.recipientName}- ĐH của shop ${item.shopName}`),
                underLine: 1,
                bold: 1
            })

            let contactExceeds = isTextLengthExceedingLimit("KHÔNG GIAO ĐƯỢC, GỌI NGAY 0902644227. CẢM ƠN AE SHIPPER.", 440)
            await printerConfig.windowsFont({
                x: 30 + xdefault,
                y: contactExceeds ? 290 : 305,
                size: 18,
                path: fontArial,
                text: `SP Cần Giao: ${item.productType}`,
                underLine: 0,
                bold: 0
            })

            await printerConfig.windowsFont({
                x: 30 + xdefault,
                y: contactExceeds ? 315 : 330,
                size: 18,
                path: fontArial,
                text: insertLineBreaks('KHÔNG GIAO ĐƯỢC, GỌI NGAY 0902644227. CẢM ƠN AE SHIPPER.', 400),
                underLine: 0,
                bold: 1
            })

            await printerConfig.windowsFont({
                x: 30 + xdefault,
                y: 355,
                size: 18,
                path: fontArial,
                text: insertLineBreaks(item.note ?? "", 360),
                underLine: 0,
                bold: 0
            })

            await printerConfig.text({
                font: "1",
                rotation: 0,
                text: topDash,
                x: 14 + xdefault,
                y: 20,
                zoomX: 1,
                zoomY: 1
            })

            await printerConfig.text({
                font: "1",
                rotation: 0,
                text: bottomDash,
                x: 14 + xdefault,
                y: 394,
                zoomX: 1,
                zoomY: 1
            })

            await printerConfig.text({
                font: "1",
                rotation: 0,
                text: classificationDash,
                x: 14 + xdefault,
                y: 126,
                zoomX: 1,
                zoomY: 1
            })

            await printerConfig.text({
                font: "1",
                rotation: 0,
                text: addressDash,
                x: 14 + xdefault,
                y: 170,
                zoomX: 1,
                zoomY: 1
            })

            await printerConfig.print(1, 1)
            await printerConfig.clear()

        }

        await printerConfig.clear()
        await printerConfig.close()

        if (countPrint === listBill.length) {
            printerConfig = new TSCPrinter({
                ip: "192.168.1.100",
                port: 9100,
                width: 90,
                height: 12,
            });


            await printerConfig.open()
            await printerConfig.clear()
            await printerConfig.setup()

            await printerConfig.print(1, 1)
            await printerConfig.close()
        }

        setIsPrinting(false);
    }
    return { printerWithAndroid, isPrinting };
}

export default usePrinterAndroid