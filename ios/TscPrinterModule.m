//
//  TscPrinterModule.m
//  SuperAI_Test
//
//  Created by Nguyễn Thành Quang on 14/05/2024.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TscPrinterModule, NSObject)

RCT_EXTERN_METHOD(connectToPrinter:(NSString *)ipAddress resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(printText:(NSString *)text resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(closeConnection:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end

