// TSCPrinterModule.swift

import UIKit
import tscswift

@objc(TSCPrinterModule)
class TSCPrinterModule: NSObject {
    var wireless = WiFi()
    var isConnected = false // Variable to track connection status

    // Function to open a connection to the printer
    func openConnection(ip: String, completion: @escaping (Bool) -> Void) {
        let ip = ip as CFString
        let port = 9100
        var attempts = 0
        while attempts < 15 {  // Retry up to 15 times
            let result = wireless.openport(ip, portnumber: UInt32(port))
            if result != 1 {
                // print("Attempt \(attempts+1): Failed to open port to printer.")
                attempts += 1
                sleep(1)  // Wait 1 second before retrying
            } else {
                // print("Connection to printer opened successfully.")
                isConnected = true // Update connection status
                completion(true)
                return
            }
        }
        wireless.closeport(4)
        // print("Failed to open connection after 15 attempts.")
        completion(false)
    }

    // Setup printer configurations
    func setupPrinter() {
        wireless.sendcommand("DIRECTION 1\r\n")
        wireless.sendcommand("SIZE 75 mm, 50 mm\r\n")
        wireless.sendcommand("SPEED 12\r\n")
        wireless.sendcommand("DENSITY 10\r\n")
        wireless.sendcommand("GAP 2 mm, 0 mm\r\n")
        wireless.clearBuffer()
    }

    // Function to print a label with text and barcode
    func printLabel(data: [String: Any]) {
        setupPrinter() // Setup printer settings
        let barcode = data["barcode"] as? String ?? ""
        let nameBarcode = data["nameBarcode"] as? String ?? ""
        let qrcode = data["qrcode"] as? String ?? ""
        let nameQrcode = data["nameQrcode"] as? String ?? ""
        let carrier_route = data["carrier_route"] as? String ?? ""
        let addressDetail = data["addressDetail"] as? String ?? ""
        let addressDetail2 = data["addressDetail2"] as? String ?? ""
        let address = data["address"] as? String ?? ""
        let address2 = data["address2"] as? String ?? ""
        let collectionPhoneName = data["collectionPhoneName"] as? String ?? ""
        let project = data["project"] as? String ?? ""
        let product = data["product"] as? String ?? ""
        let note = data["note"] as? String ?? ""
        let note2 = data["note2"] as? String ?? ""
        let config_name = data["config_name"] as? String ?? ""
        // Text and barcode printing commands
        let qrCommand = "QRCODE 480,30,M,3,A,0,\"\(qrcode)\"\r\n"
//        wireless.sendcommand(qrCommand);
        wireless.barcode("5", y: "30", barcodeType: "128", height: "75", readable: "0", rotation: "0", narrow: "2", wide: "3", code: barcode)
//        wireless.windowsfont(5, y: 105, height: 21, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: nameBarcode)
//        wireless.windowsfont(450, y: 105, height: 21, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: nameQrcode)
//        wireless.windowsfont(5, y: 125, height: 21, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: carrier_route)
//        wireless.windowsfont(5, y: 145, height: 21, rotation: 0, style: 0, withUnderline: 0, fontName: "Arial", content: addressDetail)
//        wireless.windowsfont(5, y: 165, height: 21, rotation: 0, style: 0, withUnderline: 0, fontName: "Arial", content: addressDetail2)
//        wireless.windowsfont(5, y: 195, height: 21, rotation: 0, style: 0, withUnderline: 0, fontName: "Arial", content: address)
//        wireless.windowsfont(5, y: 220, height: 21, rotation: 0, style: 0, withUnderline: 0, fontName: "Arial", content: address2)
//        wireless.windowsfont(5, y: 250, height: 21, rotation: 0, style: 0, withUnderline: 0, fontName: "Arial", content: collectionPhoneName)
//        wireless.windowsfont(5, y: 275, height: 21, rotation: 0, style: 0, withUnderline: 0, fontName: "Arial", content: project)
//        wireless.windowsfont(5, y: 300, height: 21, rotation: 0, style: 0, withUnderline: 0, fontName: "Arial", content: product)
//        wireless.windowsfont(5, y: 325, height: 21, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: note)
//        wireless.windowsfont(5, y: 350, height: 21, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: note2)
//        wireless.windowsfont(5, y: 375, height: 21, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: config_name)
        wireless.printlabel(1, copies: 1)
    }

    @objc(initiatePrinting:labels:callback:) // Expose a method to React Native to initiate printing
    func initiatePrinting(ip: String, labels: [[String: Any]], callback: @escaping RCTResponseSenderBlock) {
      openConnection(ip: ip) { success in
          if success {
              for labelData in labels {
                  self.printLabel(data: labelData)
              }
              self.wireless.closeport(4)
              callback(["Quá trình in hoàn tất thành công, đã in \(labels.count) nhãn."])
          } else {
              callback(["Kết nối với máy in thất bại. Quá trình in không được khởi động."])
          }
      }
    }
}
