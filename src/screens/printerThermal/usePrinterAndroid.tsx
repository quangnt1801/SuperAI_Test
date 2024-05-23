import { useState } from "react";
import { listBill } from "./type";
import { getPathTextFont, insertLineBreaks, isTextLengthExceedingLimit } from "./UtilsPrinter";
import TSCPrinter from 'rn-tsc-printer';

const usePrinterAndroid = (listBill: listBill[], printer: TSCPrinter) => {
    const [isPrinting, setIsPrinting] = useState(false);

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
                return 50 * 1.3

            case "GHN":
                return 50

            case "VTP":
                return 50 * 1.6

            case "NJV":
                return 50 / 1.4

            case "SPX":
                return 50 * 1.3

            default:
                return 50;
        }
    }

    const paddingWidthTxtBarCode = (carrierAlias: String) => {
        switch (carrierAlias) {
            case "BEST":
                return 50 * 1.8

            case "GHN":
                return 50 * 2.4

            case "VTP":
                return 50 * 2.1

            case "NJV":
                return 50 * 2.2

            case "SPX":
                return 50 * 1.4

            default:
                return 85;
        }
    }

    const printerWithAndroid = async () => {
        setIsPrinting(true);
        const fontArial = await getPathTextFont('ArialCEMTBlack');
        const fontArialBold = await getPathTextFont('ArialCEMTBlack')

        const leftDash = verticalDash(27);
        const rightDash = verticalDash(27);
        const qrDash = verticalDash(11);

        const topDash = horizontalDash(57);
        const bottomDash = horizontalDash(57);
        const classificationDash = horizontalDash(44);
        const addressDash = horizontalDash(57);

        const FONT_SIZE = 21;

        await printer.open()
        await printer.clear()
        await printer.setup()

        for (const item of listBill) {

            await printer.ttf("Arial.ttf")
            await printer.windowfont({
                x: 14,
                y: 24,
                size: 12,
                path: fontArial,
                text: leftDash
            })

            await printer.windowfont({
                x: 584,
                y: 24,
                size: 12,
                path: fontArial,
                text: rightDash
            })

            await printer.windowfont({
                x: 450,
                y: 24,
                size: 12,
                path: fontArial,
                text: qrDash
            })

            //3 cột này cần khởi tạo đầu tiên vì Border của nó có thể che content 

            await printer.barcode({
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
            await printer.windowfont({
                x: paddingWidthTxtBarCode(item.carrier_alias),
                y: 92,
                size: 26,
                path: fontArial,
                text: `${item.carrier_alias} | ${item.barCode}`
            })

            const qrCodeCommand = `
                SIZE 5,2
                QRCODE 475,50,L,4,A,0,"${item.qrCode}"
            `;
            await printer.cmd(qrCodeCommand)

            await printer.windowfont({
                x: 470,
                y: 148,
                size: 18,
                path: fontArial,
                text: item.qrCode
            })

            await printer.windowfont({
                x: 120,
                y: 140,
                size: 28,
                path: fontArialBold,
                text: item.classificationCode
            })

            let addressExceeds = isTextLengthExceedingLimit(item.location)
            await printer.windowfont({
                x: 30,
                y: 185,
                size: FONT_SIZE,
                path: fontArial,
                text: insertLineBreaks(item.location)
            })

            await printer.windowfont({
                x: 30,
                y: addressExceeds ? 238 : 205,
                size: FONT_SIZE,
                path: fontArial,
                text: insertLineBreaks(`${item.phoneUser}${item.recipientName}- ĐH của shop ${item.shopName}`)
            })

            let contactExceeds = isTextLengthExceedingLimit("KHÔNG GIAO ĐƯỢC, GỌI NGAY 0902644227. CẢM ƠN AE SHIPPER.", 440)
            await printer.windowfont({
                x: 30,
                y: contactExceeds ? 290 : 305,
                size: 18,
                path: fontArial,
                text: `SP Cần Giao: ${item.productType}`
            })

            await printer.windowfont({
                x: 30,
                y: contactExceeds ? 315 : 330,
                size: 18,
                path: fontArial,
                text: insertLineBreaks('KHÔNG GIAO ĐƯỢC, GỌI NGAY 0902644227. CẢM ƠN AE SHIPPER.', 440)
            })

            await printer.windowfont({
                x: 30,
                y: 355,
                size: 18,
                path: fontArial,
                text: insertLineBreaks(item.note ?? "", 480)
            })

            await printer.text({
                font: "1",
                rotation: 0,
                text: topDash,
                x: 14,
                y: 20,
                zoomX: 1,
                zoomY: 1
            })

            await printer.text({
                font: "1",
                rotation: 0,
                text: bottomDash,
                x: 14,
                y: 394,
                zoomX: 1,
                zoomY: 1
            })

            await printer.text({
                font: "1",
                rotation: 0,
                text: classificationDash,
                x: 14,
                y: 126,
                zoomX: 1,
                zoomY: 1
            })

            await printer.text({
                font: "1",
                rotation: 0,
                text: addressDash,
                x: 14,
                y: 170,
                zoomX: 1,
                zoomY: 1
            })

            await printer.print(1, 1)
            await printer.clear()

        }

        await printer.close()
        setIsPrinting(false);
    }
    return { printerWithAndroid, isPrinting };
}

export default usePrinterAndroid