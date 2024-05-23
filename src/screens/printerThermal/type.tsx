export interface listBill {
    barCode: string,
    qrCode: string,
    location: string,
    productType: string,
    classificationCode: string,
    phoneUser: string,
    recipientName: string,
    shopName: string | any,
    carrier_alias: string,
    note?: string
}