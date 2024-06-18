import util from "@ohos:util";
import Logger from "@bundle:com.samples.concurrentmodule/entry/ets/common/Logger";
const INDEX: number = 2;
const SLEEP_TIME: number = 10;
const RADIX: number = 16;
export function strToUtf8Bytes(content: string): Array<number> {
    const code = encodeURIComponent(content);
    let bytes: number[] = [];
    for (let i = 0; i < code.length; i++) {
        const char = code.charAt(i);
        if (char === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + INDEX);
            const hexValue = Number.parseInt(hex, RADIX);
            bytes.push(hexValue);
            i += INDEX;
        }
        else {
            bytes.push(char.charCodeAt(0));
        }
    }
    return bytes;
}
export function strToArrayBuffer(text: string): ArrayBuffer {
    const bytes = strToUtf8Bytes(text);
    const buffer = new ArrayBuffer(bytes.length);
    const bufView = new DataView(buffer);
    for (let i = 0; i < bytes.length; i++) {
        bufView.setUint8(i, bytes[i]);
    }
    return buffer;
}
export async function sleep(times: number): Promise<void> {
    if (!times) {
        times = SLEEP_TIME;
    }
    await new Promise<void>((res) => setTimeout(res, times));
}
export function randomString(num: number, chars: string): string {
    let len = num;
    let maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
export function bufferToString(buffer: ArrayBuffer): string {
    let textDecoder = util.TextDecoder.create('utf-8', {
        ignoreBOM: true
    });
    let resultPut = textDecoder.decodeWithStream(new Uint8Array(buffer), {
        stream: true
    });
    return resultPut;
}
export function stringToBuffer(content: string): Uint8Array {
    let textEncoder = new util.TextEncoder('utf-8');
    let resultBuf = textEncoder.encodeInto(content);
    return resultBuf;
}
export { Logger };
