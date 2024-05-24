// TSCPrinterModuleBridge.m
#import <React/RCTBridgeModule.h>

#if !TARGET_OS_SIMULATOR
@interface RCT_EXTERN_MODULE(TSCPrinterModule, NSObject)

RCT_EXTERN_METHOD(initiatePrinting:(NSString *)ip labels:(NSArray *)labels callback:(RCTResponseSenderBlock)callback)

//RCT_EXTERN_METHOD(printLabel:(NSDictionary *)data callback:(RCTResponseSenderBlock)callback)


@end
#endif
