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
        while attempts < 3 {  // Retry up to 3 times
            let result = wireless.openport(ip, portnumber: UInt32(port))
            if result != 1 {
                attempts += 1
                usleep(500_000)  // Wait 0.5 second before retrying
            } else {
                isConnected = true // Update connection status
                completion(true)
                return
            }
        }
           print("Failed to open connection after 3 attempts.")
          completion(false)
        }

    // Setup printer configurations
    func setupPrinter() {
      let commands = [
              "DIRECTION 1\r\n",
              "SIZE 90 mm, 50 mm\r\n",
              "SPEED 12\r\n",
              "DENSITY 10\r\n",
              "GAP 2 mm, 0 mm\r\n"
          ]
          for command in commands {
              wireless.sendcommand(command)
          }
          wireless.clearBuffer()
    }
  
  let SIZE_PADDING: Double = 50;
  
  func narrowBarcode(carrierAlias: String) -> String {
    switch carrierAlias {
    case "BEST":
      return "3.8"
      
    case "GHN":
      return "3.8"

    case "VTP":
      return "2.9"

    case "NJV":
      return "3.4"

    case "SPX":
      return "2.9"
      
    default:
      return "2"

    }
  }
  
  func paddingWidthBarcode(carrier: String) -> String {
    switch carrier {
    case "BEST":
      return String(SIZE_PADDING * 1.2)
      
    case "GHN":
      return String(SIZE_PADDING)

    case "VTP":
      return String(SIZE_PADDING * 1.7)

    case "NJV":
      return String(SIZE_PADDING * 0.8)

    case "SPX":
      return String(SIZE_PADDING * 1.3)
      
    default:
      return String(SIZE_PADDING)
      
    }
  }
  
  func paddingWidthTxtBarCode(carrierAlias: String) -> Int {
    switch carrierAlias {
    case "BEST":
      return Int(SIZE_PADDING * 1.4)
      
    case "GHN":
      return Int(SIZE_PADDING * 2.3)

    case "VTP":
      return Int(SIZE_PADDING * 2)

    case "NJV":
      return Int(SIZE_PADDING * 2.1)

    case "SPX":
      return Int(SIZE_PADDING)
      
    default:
      return 85
      
    }
  }
  
    func horizontalDash(numberDashes: Int, x: Int, y: Int)-> String {
      let dashLine = String(repeating: "-", count: numberDashes)
      return dashLine
//      wireless.windowsfont(x, y: y, height: 22, rotation: 0, style: 4, withUnderline: 0, fontName: "Arial", content: dashLine)
    }
  
    func verticalDash(numberOfLines: Int) -> String {
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
        let note = data["note"] as? String ?? ""
        let carrierAlias = data["carrierAlias"] as? String ?? ""
      
        var PADDING_LEFT = 30;
        var FONT_SIZE = 19;
        var SIZE_BOLD = 19;
      
        var leftDash = verticalDash(numberOfLines: 33)
        var rightDash = verticalDash(numberOfLines: 33)
        var qrDash = verticalDash(numberOfLines: 14)
      
        let fontCommands = [
            (473, 150, 18, 0, 1, 0, "Arial", labelQrcode), //Label qrCode
            (paddingWidthTxtBarCode(carrierAlias: carrierAlias), 95, 28, 0, 1, 0, "Arial", labelBarcode), //Label BarCode
            (120, 146, 28, 0, 1, 0, "Arial", classificationCode), //Classification code
            (PADDING_LEFT, 190, FONT_SIZE, 0, 0, 0, "Arial", address), //Address
            (PADDING_LEFT, isTextLengthExceedingLimit(text: address) ? 235 : 215, SIZE_BOLD, 0, 1, 0, "Arial", infoShipping), //Info shipping
            (PADDING_LEFT, isTextLengthExceedingLimit(text: contact) ? 285 : 300, FONT_SIZE, 0, 0, 0, "Arial", infoProduct), //Info product
            (PADDING_LEFT, isTextLengthExceedingLimit(text: contact) ? 310 : 325, SIZE_BOLD, 0, 1, 0, "Arial", contact), //Contact
            (PADDING_LEFT, 350, FONT_SIZE, 0, 0, 0, "Arial", note),
            (14,10, 22, 0, 4, 0, "Arial", horizontalDash(numberDashes: 78, x: 14, y: 10)),
            (14,377, 22, 0, 4, 0, "Arial", horizontalDash(numberDashes: 78, x: 14, y: 377) ),
            (14,120, 22, 0, 4, 0, "Arial", horizontalDash(numberDashes: 60, x: 14, y: 120) ),
            (14,165, 22, 0, 4, 0, "Arial", horizontalDash(numberDashes: 78, x: 14, y: 165) ),
            (12, 20, 10, 0, 10, 0, "Arial", leftDash),
            (584, 20, 10, 0, 10, 0, "Arial", rightDash),
            (450, 20, 10, 0, 10, 0, "Arial", qrDash)
        ]
      
        printQRCode(qrcode, label: labelQrcode)
        printBarcode(barcode, label: labelBarcode, carrier: carrierAlias)
      
        for command in fontCommands {
              wireless.windowsfont(command.0, y: command.1, height: command.2, rotation: command.3, style: command.4, withUnderline: command.5, fontName: command.6, content: command.7)
        }

         wireless.printlabel(1, copies: 1)
    }
  
  
    func printQRCode(_ qrcode: String, label: String) {
        let qrCommand = "QRCODE 475,50,L,4,A,0,\"\(qrcode)\"\r\n"
        wireless.sendcommand(qrCommand)
    }

  func printBarcode(_ barcode: String, label: String, carrier: String) {
      wireless.barcode(
        paddingWidthBarcode(carrier: carrier),
        y: "33",
        barcodeType: "128",
        height: "60",
        readable: "0",
        rotation: "0",
        narrow: narrowBarcode(carrierAlias: carrier),
        wide: "1",
        code: barcode
      )
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
