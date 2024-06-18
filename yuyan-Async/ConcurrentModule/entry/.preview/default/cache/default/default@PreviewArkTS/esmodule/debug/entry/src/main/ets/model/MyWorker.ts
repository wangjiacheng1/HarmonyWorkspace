import worker from "@ohos:worker";
import fileIo from "@ohos:file.fs";
import { Logger, sleep } from "@bundle:com.samples.concurrentmodule/entry/ets/common/Common";
const CONTENT = 'hello world';
const TAG: string = '[ConcurrentModule].[MyWorker]';
const FILE_NUM: number = 200;
const FILE_NUMBER: number = 9;
const LIST_FILE_TWO: number = 2;
const SLEEP_TIME: number = 100;
let workerInstance: worker.ThreadWorker | null = null;
let fileFlag: boolean = false;
export default class MyFile {
    public baseDir: string = '';
    public filesCount: number = 0;
    private flag: boolean = false;
    public realFileNames: Array<string> = [];
    constructor() {
        this.baseDir = AppStorage.get('sanBoxFileDir') as string;
    }
    readyFileToFileFs(): void {
        let fileFsDir = this.baseDir + '/fileFs';
        try {
            if (!fileIo.accessSync(fileFsDir)) {
                fileIo.mkdirSync(fileFsDir);
            }
            Logger.info(TAG, 'readyFileToFileFs successful');
        }
        catch (e) {
            Logger.error(TAG, `readyFileToFileFs has failed for: {message: ${(e as Error).message}, ${e}}`);
        }
    }
    // worker file
    readyFilesToWorker(): void {
        let content = CONTENT + CONTENT + new Date() + '\n';
        let workerDir = this.baseDir + '/workerDir';
        try {
            if (!fileIo.accessSync(workerDir)) {
                fileIo.mkdirSync(workerDir);
            }
            Logger.info(TAG, 'readyFilesToWorker dpath = ' + workerDir);
            for (let i = 0; i < FILE_NUM; i++) {
                let myFile = '';
                if (i < FILE_NUMBER) {
                    myFile = workerDir + `/TestFile0${i + 1}.txt`;
                }
                else {
                    myFile = workerDir + `/TestFile${i + 1}.txt`;
                }
                Logger.info(TAG, 'readyFilesToWorker myFile = ' + myFile);
                let file = fileIo.openSync(myFile, fileIo.OpenMode.CREATE | fileIo.OpenMode.READ_WRITE);
                fileIo.writeSync(file.fd, content);
                fileIo.closeSync(file);
            }
            Logger.info(TAG, 'readyFilesToWorker successful');
        }
        catch (e) {
            Logger.error(TAG, `readyFilesToWorker has failed for: {message: ${(e as Error).message}, ${e}}`);
        }
    }
    async workToCopyFiles(files: Array<string>, filePath: string): Promise<void> {
        try {
            Logger.info(TAG, 'WorkCreator start to create worker');
            let destPath = filePath;
            Logger.info(TAG, 'Workerets destPath ' + destPath);
            if (!fileIo.accessSync(destPath)) {
                fileIo.mkdirSync(destPath);
            }
            if (fileIo.accessSync(destPath)) {
                fileIo.listFile(destPath).then((filenames) => {
                    Logger.info(TAG, 'listFile succeed');
                    for (let i = 0; i < filenames.length; i++) {
                        Logger.info(TAG, 'Workerets fileName: ' + filenames[i]);
                    }
                }).catch((err: Error) => {
                    Logger.info(TAG, 'list file failed with error message: ' + err.message + ', error: ' + err);
                });
            }
            if (files !== null) {
                this.realFileNames.length = 0;
                for (let i = 0; i < files.length; i++) {
                    if (files[i] === 'deletedTag') {
                        continue;
                    }
                    this.realFileNames.push(files[i]);
                }
            }
            let count = this.realFileNames.length;
            for (let j = 0; j < count; j++) {
                Logger.info(TAG, 'workToCopyFiles this.realFileNames = ' + this.realFileNames[j]);
            }
            workerInstance = new worker.ThreadWorker('entry/ets/model/WorkerCopy.ts');
            if (this.realFileNames !== null) {
                let srcPath = this.baseDir + '/workerDir';
                workerInstance.postMessage({
                    srcDir: srcPath,
                    destDir: destPath,
                    fileNames: this.realFileNames
                });
            }
            workerInstance.onexit = (code): void => {
                Logger.info(TAG, `workerInstance::onexit has been exit ${code}`);
            };
            workerInstance.onerror = (err): void => {
                Logger.info(TAG, `workerInstance::onerror has errors: ${JSON.stringify(err)}`);
            };
            workerInstance.onmessageerror = (event): void => {
                Logger.info(TAG, `workerInstance::onmessageerror has errors: ${JSON.stringify(event)}`);
            };
            workerInstance.onmessage = (message): void => {
                Logger.info(TAG, `workerInstance::onmessage receive data: ${JSON.stringify(message.data)}`);
                if (message.data.hasOwnProperty('count')) {
                    Logger.info(TAG, `workerInstance::onmessage receive data length = ${message.data.count}`);
                    this.filesCount = message.data.count;
                    fileFlag = message.data.strFlag;
                    this.flag = true;
                    let fileName1: string = '';
                    let fileName2: string = '';
                    for (let i = 0; i < message.data.listFileNames.length; i++) {
                        Logger.info(TAG, `Worker workerInstance::onmessage receive listFileNames: ${message.data.listFileNames[i]}`);
                    }
                    if (message.data.listFileNames[0] !== undefined && message.data.listFileNames[1] !== undefined && message.data.listFileNames[LIST_FILE_TWO] === undefined) {
                        fileName1 = message.data.listFileNames[0] + '、';
                        fileName2 = message.data.listFileNames[1];
                    }
                    else if (message.data.listFileNames[0] !== undefined && message.data.listFileNames[1] === undefined) {
                        fileName1 = message.data.listFileNames[0];
                        fileName2 = '';
                    }
                    else {
                        fileName1 = message.data.listFileNames[0] + '、';
                        let copyFileLog: string = AppStorage.get('copyFileLog5') as string;
                        fileName2 = message.data.listFileNames[1] + copyFileLog;
                    }
                    AppStorage.setOrCreate('fileListName1', fileName1);
                    AppStorage.setOrCreate('fileListName2', fileName2);
                    let copyFileLog3: string = AppStorage.get('copyFileLog3') as string;
                    let copyFileLog4: string = AppStorage.get('copyFileLog4') as string;
                    let copyFileLog = '2、' + fileName1 + fileName2 + copyFileLog3 + 'copy' + copyFileLog4;
                    if (fileName1 !== 'undefined、') {
                        AppStorage.setOrCreate('copyFileShowLog', copyFileLog);
                    }
                    else {
                        AppStorage.setOrCreate('copyFileShowLog', { "id": 16777240, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
                    }
                    Logger.info(TAG, `Worker workerInstance::onmessage receive count: ${JSON.stringify(this.filesCount)}`);
                }
                if (this.filesCount !== 0) {
                    AppStorage.setOrCreate('fileNumber', JSON.stringify(this.filesCount));
                }
                else {
                    AppStorage.setOrCreate('fileNumber', '0');
                    AppStorage.setOrCreate('fileListName1', '');
                    AppStorage.setOrCreate('fileListName2', '');
                }
                Logger.info(TAG, 'workerInstance::onmessage Finish to process data from WorkerCopy.ts');
                if (workerInstance !== null) {
                    workerInstance.terminate();
                }
            };
            while (!fileFlag) {
                await sleep(SLEEP_TIME);
            }
        }
        catch (e) {
            Logger.error(TAG, `Worker WorkCreator error package: message: ${(e as Error).message}, ${e}`);
        }
    }
    deleteCopyFile(filePath: string): void {
        Logger.info(TAG, 'deleteCopyFile destCopyFilePath = ' + filePath);
        try {
            if (fileIo.accessSync(filePath)) {
                let isDirectory = fileIo.statSync(filePath).isDirectory();
                if (isDirectory) {
                    fileIo.rmdirSync(filePath);
                    fileIo.mkdirSync(filePath);
                }
            }
        }
        catch (e) {
            Logger.error(TAG, `delete workerCopyFile error package: message: ${(e as Error).message}, ${e}`);
        }
    }
}
