// textUtils.ts

/**
 * Inserts line breaks into the text to ensure no line exceeds the specified maximum length.
 * @param {string} text - The text to format.
 * @param {number} [numberLine=350] - The maximum length of a line.
 * @returns {string} The formatted text with line breaks.
 */

import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

export const insertLineBreaks = (text: string, numberLine: number = 350): string => {
    const charLength = 7;
    let currentLength = 0;
    let lastSpaceIndex = -1;
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        currentLength += charLength;

        if (char === ' ') {
            lastSpaceIndex = i;
        }

        if (currentLength > numberLine) {
            if (lastSpaceIndex !== -1) {
                result = result.substring(0, lastSpaceIndex) + '\n' + result.substring(lastSpaceIndex + 1);
                currentLength = (i - lastSpaceIndex) * charLength;
                lastSpaceIndex = -1;
            } else {
                result += '\n';
                currentLength = charLength;
            }
        }

        result += char;
    }

    return result;
};

export const isTextLengthExceedingLimit = (text: String, maxLine?: number) => {
    const characterWidth = 7;
    const maxLength = maxLine ?? 380;

    let totalLength = text.length * characterWidth
    return totalLength > maxLength
}

export const getPathTextFont = async (fontName: string): Promise<string> => {
    let downloadDir = RNFS.DownloadDirectoryPath;
    let pathFont: String = ''

    if (Platform.OS === 'ios') {
        downloadDir = RNFS.LibraryDirectoryPath + '/Download';
    }

    const fontFilePath = `${downloadDir}/${fontName}.ttf`;
    const isExists = await RNFS.exists(fontFilePath);
    if (isExists) {
        console.log('Get path file fonts: ', fontFilePath);
        return fontFilePath
    } else {
        console.log('File font not exists.');
        return pathFont = ''

    }
}