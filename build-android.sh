#!/bin/sh

npx jetify

# cd android && chmod +x gradlew && cd ..
# npx react-native bundle --platform android --dev false --entry-file ./index.js --bundle-output ./android/app/src/main/assets/index.bundle --sourcemap-output ./android/app/src/main/assets/index.map --assets-dest ./android/app/src/main/res/
# cd android && ./gradlew assembleRelease


npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/ && rm -rf android/app/src/main/res/drawable-* && rm -rf android/app/src/main/res/raw/* && cd android && ./gradlew assembleRelease && cd ..