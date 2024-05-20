// TSCPrinterModuleBridge.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TSCPrinterModule, NSObject)

RCT_EXTERN_METHOD(initiatePrinting:(NSString *)ip labels:(NSArray *)labels callback:(RCTResponseSenderBlock)callback)

@end
