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
        wireless.sendcommand("SIZE 90 mm, 50 mm\r\n")
        wireless.sendcommand("SPEED 12\r\n")
        wireless.sendcommand("DENSITY 10\r\n")
        wireless.sendcommand("GAP 2 mm, 0 mm\r\n")
        wireless.clearBuffer()
    }
  
  
  func printDotTop(numberDashes: Int, x: Int, y: Int) {
    let numberOfDashes = numberDashes // Số lượng dấu gạch ngang, điều chỉnh theo nhu cầu của bạn
    let dashLine = String(repeating: "-", count: numberOfDashes)
    wireless.windowsfont(x, y: y, height: 22, rotation: 0, style: 4, withUnderline: 0, fontName: "Arial", content: dashLine)
  }
//  
//  func verticalDash(x: Int, y: Int, numberOfLines: Int) {
//    let xPosition: Int = 14 // Vị trí X cố định
//    let initialYPosition: Int = 14 // Vị trí Y ban đầu
//    let yIncrement: Int = 20 // Khoảng cách Y giữa mỗi dấu |
//    
//    wireless.windowsfont(xPosition, y: 14, height: 20, rotation: 0, style: 3, withUnderline: 0, fontName: "Arial", content: "|")
//    wireless.windowsfont(xPosition, y: 24, height: 20, rotation: 0, style: 3, withUnderline: 0, fontName: "Arial", content: "|")
//    wireless.windowsfont(xPosition, y: 44, height: 20, rotation: 0, style: 3, withUnderline: 0, fontName: "Arial", content: "|")
//    wireless.windowsfont(xPosition, y: 64, height: 20, rotation: 0, style: 3, withUnderline: 0, fontName: "Arial", content: "|")
//    wireless.windowsfont(xPosition, y: 84, height: 20, rotation: 0, style: 3, withUnderline: 0, fontName: "Arial", content: "|")
////    for i in 0..<numberOfLines {
////        let yPosition = initialYPosition + (i * yIncrement)
////        wireless.windowsfont(xPosition, y: yPosition, height: 20, rotation: 0, style: 3, withUnderline: 0, fontName: "Arial", content: "|")
////    }
//  }
  
  
  func verticalDash(x: Int, y: Int, numberOfLines: Int) {
    let xPosition: Int = x // Vị trí X cố định
    let initialYPosition: Int = y // Vị trí Y ban đầu
    let yIncrement: Int = 10 // Khoảng cách Y giữa mỗi dấu |

    let numberOfLines: Int = numberOfLines // Số lượng dấu |

    for i in 0..<numberOfLines {
        let yPosition = initialYPosition + (i * yIncrement)
        wireless.windowsfont(xPosition, y: yPosition, height: 4, rotation: 0, style: 10, withUnderline: 0, fontName: "Arial", content: "|")
    }
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
        var FONT_SIZE = 18;
      
      
        //Print QRcode
        let qrCommand = "QRCODE 470,60,L,4,A,0,\"\(qrcode)\"\r\n"
        var a = wireless.sendcommand(qrCommand);
        var b = wireless.windowsfont(464, y: 155, height: 18, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: labelQrcode)
          
          
            //Print Barcode
        var c = wireless.barcode("34", y: "38", barcodeType: "128", height: "60", readable: "0", rotation: "0", narrow: "2", wide: "1", code: barcode)
        var d = wireless.windowsfont(70, y: 105, height: 28, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: labelBarcode)
            

        var e = wireless.windowsfont(100, y: 155, height: 28, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: classificationCode)
          
        var f = wireless.windowsfont(PADDING_LEFT, y: 210, height: FONT_SIZE, rotation: 0, style: 1, withUnderline: 1, fontName: "Arial", content: address)
        var g = wireless.windowsfont(PADDING_LEFT, y: 260, height: FONT_SIZE, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: infoShipping)
          
        var q = printDotTop(numberDashes: 78, x: 14, y: 15)
        var w = printDotTop(numberDashes: 78, x: 14, y: 380)
      
      printDotTop(numberDashes: 60, x: 14, y: 136) //Dash classification
      printDotTop(numberDashes: 78, x: 14, y: 180) //Dash address
      
      verticalDash(x: 14, y: 28, numberOfLines: 49)
      verticalDash(x: 450, y: 28, numberOfLines: 16)
      verticalDash(x: 580, y: 28, numberOfLines: 49)

      
      var h = wireless.windowsfont(PADDING_LEFT, y: 305, height: FONT_SIZE, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: infoProduct)
      var j = wireless.windowsfont(PADDING_LEFT, y: 330, height: FONT_SIZE, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: contact)
      var k = wireless.windowsfont(PADDING_LEFT, y: 355, height: FONT_SIZE, rotation: 0, style: 1, withUnderline: 0, fontName: "Arial", content: "Cho Thử Hàng")
      var l = wireless.printlabel(1, copies: 1)
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
