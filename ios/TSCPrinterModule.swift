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
//        wireless.closeport(4)
        // print("Failed to open connection after 15 attempts.")
        completion(false)
    }

    // Setup printer configurations
    func setupPrinter() {
        wireless.sendcommand("DIRECTION 1\r\n")
        wireless.sendcommand("SIZE 90 mm, 50 mm\r\n")
        wireless.sendcommand("SPEED 12\r\n")
        wireless.sendcommand("DENSITY 10\r\n")
        wireless.sendcommand("GAP 2 mm, 0 mm\r\n")
        wireless.clearBuffer()
    }
  
  func horizontalDash(numberDashes: Int, x: Int, y: Int) {
    let numberOfDashes = numberDashes // Số lượng dấu gạch ngang, điều chỉnh theo nhu cầu của bạn
    let dashLine = String(repeating: "-", count: numberOfDashes)
    wireless.windowsfont(x, y: y, height: 22, rotation: 0, style: 4, withUnderline: 0, fontName: "Arial", content: dashLine)
  }
  
  func verticalDash(numberOfLines: Int) -> String {
    let yIncrement: Int = 10 // Khoảng cách Y giữa mỗi dấu |
    var content: String = "|"
    for i in 1..<numberOfLines {
            content += "\n|"
        }
    return content
  }
  
  func isTextLengthExceedingLimit(text: String) -> Bool {
    let characterWidth: Int = 7;
    let maxLength: Int = 380;
    
    let totalLength = text.count * characterWidth
    return totalLength > maxLength
  }
 
    // Function to print a label with text and barcode
    func printLabel(data: [String: Any]) {
        setupPrinter() // Setup printer settings
        let barcode = data["barcode"] as? String ?? ""
        let labelBarcode = data["labelBarcode"] as? String ?? ""
        let qrcode = data["qrcode"] as? String ?? ""
        let labelQrcode = data["labelQrcode"] as? String ?? ""
        let carrier_route = data["carrier_route"] as? String ?? ""
        let classificationCode = data["classificationCode"] as? String ?? ""
        let address = data["address"] as? String ?? ""
        let infoShipping = data["infoShipping"] as? String ?? ""
        let infoProduct = data["infoProduct"] as? String ?? ""
        let contact = data["contact"] as? String ?? ""
      
      
        var PADDING_LEFT = 30;
        var FONT_SIZE = 19;
        var SIZE_BOLD = 19;
      
        var leftDash = verticalDash(numberOfLines: 33)
        var rightDash = verticalDash(numberOfLines: 33)
        var qrDash = verticalDash(numberOfLines: 14)
      
        printQRCode(qrcode, label: labelQrcode)

         // Print Barcode
         printBarcode(barcode, label: labelBarcode)

         // Print Classification Code
         wireless.windowsfont(120, y: 146, height: 28, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: classificationCode)

         // Print Address
         wireless.windowsfont(PADDING_LEFT, y: 195, height: FONT_SIZE, rotation: 0, style: 0, withUnderline: 0, fontName: "Arial", content: address)

         // Print Info Shipping
         let addressExceeds = isTextLengthExceedingLimit(text: address)
         wireless.windowsfont(PADDING_LEFT, y: addressExceeds ? 244 : 224, height: SIZE_BOLD, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: infoShipping)

         // Print Dashes
      printDashes(left: leftDash, right: rightDash, qrDash: qrDash)

         // Print Info Product
        let contactExceeds = isTextLengthExceedingLimit(text: contact)
        wireless.windowsfont(PADDING_LEFT, y: contactExceeds ? 300 : 316, height: FONT_SIZE, rotation: 0, style: 0, withUnderline: 0, fontName: "Arial", content: infoProduct)

         // Print Contact
         
        wireless.windowsfont(PADDING_LEFT, y: contactExceeds ? 324 : 340, height: SIZE_BOLD, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: contact)

         // Print "Cho Thử Hàng"
         wireless.windowsfont(PADDING_LEFT, y: 364, height: FONT_SIZE, rotation: 0, style: 0, withUnderline: 0, fontName: "Arial", content: "Cho Thử Hàng")

         // Print Label
         wireless.printlabel(1, copies: 1)
    }
  
  
    func printQRCode(_ qrcode: String, label: String) {
        let qrCommand = "QRCODE 475,50,L,4,A,0,\"\(qrcode)\"\r\n"
        wireless.sendcommand(qrCommand)
        wireless.windowsfont(473, y: 150, height: 18, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: label)
    }

    func printBarcode(_ barcode: String, label: String) {
        wireless.barcode("125", y: "33", barcodeType: "128", height: "60", readable: "0", rotation: "0", narrow: "2", wide: "1", code: barcode)
        wireless.windowsfont(75, y: 95, height: 28, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: label)
    }

  func printDashes(left: String, right: String, qrDash: String) {
        horizontalDash(numberDashes: 78, x: 14, y: 10) // Top dash
        horizontalDash(numberDashes: 78, x: 14, y: 377) // Bottom dash
        horizontalDash(numberDashes: 60, x: 14, y: 126) // Dash classification
        horizontalDash(numberDashes: 78, x: 14, y: 170) // Dash address
      wireless.windowsfont(12, y: 20, height: 10, rotation: 0, style: 10, withUnderline: 0, fontName: "Arial", content: left)
      wireless.windowsfont(584, y: 20, height: 10, rotation: 0, style: 10, withUnderline: 0, fontName: "Arial", content: right)
      wireless.windowsfont(450, y: 20, height: 10, rotation: 0, style: 10, withUnderline: 0, fontName: "Arial", content: qrDash)
    }

    func isTextLengthExceedingLimit(text: String, characterWidth: Int = 7, maxLength: Int = 380) -> Bool {
        let totalLength = text.count * characterWidth
        return totalLength > maxLength
    }


    @objc(initiatePrinting:labels:callback:) 
    func initiatePrinting(ip: String, labels: [[String: Any]], callback: @escaping RCTResponseSenderBlock) {
      openConnection(ip: ip) { success in
          if success {
              for labelData in labels {
                  self.printLabel(data: labelData)
              }
              self.wireless.closeport(1)
              callback(["Quá trình in hoàn tất thành công, đã in \(labels.count) nhãn."])
          } else {
              callback(["Kết nối với máy in thất bại. Quá trình in không được khởi động."])
          }
      }
    }
}
