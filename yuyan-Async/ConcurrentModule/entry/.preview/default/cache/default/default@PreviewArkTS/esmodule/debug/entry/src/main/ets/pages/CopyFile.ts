interface Watcher_Params {
    message?: Resource;
    myContext?: Context;
    filePathSize?: Array<number>;
    showFilePath?: Array<string>;
    eventFilePath?: Array<string>;
    fileListNames?: Array<string>;
    fileNum?: string;
    fileListName1?: string;
    fileListName2?: string;
    copyFileLog1?: string;
    copyFileLog2?: string;
    copyFileLog3?: string;
    copyFileLog4?: string;
    copyFileShowLog?: string;
    myWorker?: MyWorker;
    scroller?: Scroller;
    dirPath?: string;
    baseDir?: string;
}
import MyWorker from "@bundle:com.samples.concurrentmodule/entry/ets/model/MyWorker";
import type common from "@ohos:app.ability.common";
import fileIo from "@ohos:file.fs";
import router from "@ohos:router";
import { Logger } from "@bundle:com.samples.concurrentmodule/entry/ets/common/Common";
const TAG: string = '[ConcurrentModule].[CopyFile]';
class Watcher extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__message = new ObservedPropertyObjectPU({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" }, this, "message");
        this.__myContext = new ObservedPropertyObjectPU(getContext(this) as common.UIAbilityContext, this, "myContext");
        this.__filePathSize = new ObservedPropertyObjectPU([], this, "filePathSize");
        this.__showFilePath = new ObservedPropertyObjectPU([], this, "showFilePath");
        this.__eventFilePath = new ObservedPropertyObjectPU([], this, "eventFilePath");
        this.__fileListNames = new ObservedPropertyObjectPU([], this, "fileListNames");
        this.__fileNum = this.createStorageLink('fileNumber', '0', "fileNum");
        this.__fileListName1 = this.createStorageLink('fileListName1', ' ', "fileListName1");
        this.__fileListName2 = this.createStorageLink('fileListName2', '', "fileListName2");
        this.__copyFileLog1 = this.createStorageLink('copyFileLog1', '', "copyFileLog1");
        this.__copyFileLog2 = this.createStorageLink('copyFileLog2', '', "copyFileLog2");
        this.__copyFileLog3 = this.createStorageLink('copyFileLog3', '', "copyFileLog3");
        this.__copyFileLog4 = this.createStorageLink('copyFileLog4', '', "copyFileLog4");
        this.__copyFileShowLog = this.createStorageLink('copyFileShowLog', '', "copyFileShowLog");
        this.myWorker = new MyWorker();
        this.scroller = new Scroller();
        this.dirPath = '';
        this.baseDir = AppStorage.get('sanBoxFileDir') as string;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: Watcher_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.myContext !== undefined) {
            this.myContext = params.myContext;
        }
        if (params.filePathSize !== undefined) {
            this.filePathSize = params.filePathSize;
        }
        if (params.showFilePath !== undefined) {
            this.showFilePath = params.showFilePath;
        }
        if (params.eventFilePath !== undefined) {
            this.eventFilePath = params.eventFilePath;
        }
        if (params.fileListNames !== undefined) {
            this.fileListNames = params.fileListNames;
        }
        if (params.myWorker !== undefined) {
            this.myWorker = params.myWorker;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.dirPath !== undefined) {
            this.dirPath = params.dirPath;
        }
        if (params.baseDir !== undefined) {
            this.baseDir = params.baseDir;
        }
    }
    updateStateVars(params: Watcher_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__myContext.purgeDependencyOnElmtId(rmElmtId);
        this.__filePathSize.purgeDependencyOnElmtId(rmElmtId);
        this.__showFilePath.purgeDependencyOnElmtId(rmElmtId);
        this.__eventFilePath.purgeDependencyOnElmtId(rmElmtId);
        this.__fileListNames.purgeDependencyOnElmtId(rmElmtId);
        this.__fileNum.purgeDependencyOnElmtId(rmElmtId);
        this.__fileListName1.purgeDependencyOnElmtId(rmElmtId);
        this.__fileListName2.purgeDependencyOnElmtId(rmElmtId);
        this.__copyFileLog1.purgeDependencyOnElmtId(rmElmtId);
        this.__copyFileLog2.purgeDependencyOnElmtId(rmElmtId);
        this.__copyFileLog3.purgeDependencyOnElmtId(rmElmtId);
        this.__copyFileLog4.purgeDependencyOnElmtId(rmElmtId);
        this.__copyFileShowLog.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__myContext.aboutToBeDeleted();
        this.__filePathSize.aboutToBeDeleted();
        this.__showFilePath.aboutToBeDeleted();
        this.__eventFilePath.aboutToBeDeleted();
        this.__fileListNames.aboutToBeDeleted();
        this.__fileNum.aboutToBeDeleted();
        this.__fileListName1.aboutToBeDeleted();
        this.__fileListName2.aboutToBeDeleted();
        this.__copyFileLog1.aboutToBeDeleted();
        this.__copyFileLog2.aboutToBeDeleted();
        this.__copyFileLog3.aboutToBeDeleted();
        this.__copyFileLog4.aboutToBeDeleted();
        this.__copyFileShowLog.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __message: ObservedPropertyObjectPU<Resource>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: Resource) {
        this.__message.set(newValue);
    }
    private __myContext: ObservedPropertyObjectPU<Context>;
    get myContext() {
        return this.__myContext.get();
    }
    set myContext(newValue: Context) {
        this.__myContext.set(newValue);
    }
    private __filePathSize: ObservedPropertyObjectPU<Array<number>>;
    get filePathSize() {
        return this.__filePathSize.get();
    }
    set filePathSize(newValue: Array<number>) {
        this.__filePathSize.set(newValue);
    }
    private __showFilePath: ObservedPropertyObjectPU<Array<string>>;
    get showFilePath() {
        return this.__showFilePath.get();
    }
    set showFilePath(newValue: Array<string>) {
        this.__showFilePath.set(newValue);
    }
    private __eventFilePath: ObservedPropertyObjectPU<Array<string>>;
    get eventFilePath() {
        return this.__eventFilePath.get();
    }
    set eventFilePath(newValue: Array<string>) {
        this.__eventFilePath.set(newValue);
    }
    private __fileListNames: ObservedPropertyObjectPU<Array<string>>;
    get fileListNames() {
        return this.__fileListNames.get();
    }
    set fileListNames(newValue: Array<string>) {
        this.__fileListNames.set(newValue);
    }
    private __fileNum: ObservedPropertyAbstractPU<string>;
    get fileNum() {
        return this.__fileNum.get();
    }
    set fileNum(newValue: string) {
        this.__fileNum.set(newValue);
    }
    private __fileListName1: ObservedPropertyAbstractPU<string>;
    get fileListName1() {
        return this.__fileListName1.get();
    }
    set fileListName1(newValue: string) {
        this.__fileListName1.set(newValue);
    }
    private __fileListName2: ObservedPropertyAbstractPU<string>;
    get fileListName2() {
        return this.__fileListName2.get();
    }
    set fileListName2(newValue: string) {
        this.__fileListName2.set(newValue);
    }
    private __copyFileLog1: ObservedPropertyAbstractPU<string>;
    get copyFileLog1() {
        return this.__copyFileLog1.get();
    }
    set copyFileLog1(newValue: string) {
        this.__copyFileLog1.set(newValue);
    }
    private __copyFileLog2: ObservedPropertyAbstractPU<string>;
    get copyFileLog2() {
        return this.__copyFileLog2.get();
    }
    set copyFileLog2(newValue: string) {
        this.__copyFileLog2.set(newValue);
    }
    private __copyFileLog3: ObservedPropertyAbstractPU<string>;
    get copyFileLog3() {
        return this.__copyFileLog3.get();
    }
    set copyFileLog3(newValue: string) {
        this.__copyFileLog3.set(newValue);
    }
    private __copyFileLog4: ObservedPropertyAbstractPU<string>;
    get copyFileLog4() {
        return this.__copyFileLog4.get();
    }
    set copyFileLog4(newValue: string) {
        this.__copyFileLog4.set(newValue);
    }
    private __copyFileShowLog: ObservedPropertyAbstractPU<string>;
    get copyFileShowLog() {
        return this.__copyFileShowLog.get();
    }
    set copyFileShowLog(newValue: string) {
        this.__copyFileShowLog.set(newValue);
    }
    private myWorker: MyWorker;
    private scroller: Scroller;
    public dirPath: string;
    public baseDir: string;
    onPageShow() {
        this.myWorker.readyFilesToWorker();
        let filePathDir = this.baseDir + '/workerDir';
        let filenames = fileIo.listFileSync(filePathDir);
        Logger.info(TAG, 'listFile succeed');
        for (let i = 0; i < filenames.length; i++) {
            Logger.info(TAG, 'filename: %s', filenames[i]);
            this.showFilePath[i] = filenames[i];
            let filePath = filePathDir + '/' + filenames[i];
            this.filePathSize[i] = fileIo.statSync(filePath).size;
        }
        this.dirPath = this.baseDir + '/workerCopy';
        if (!fileIo.accessSync(this.dirPath)) {
            fileIo.mkdirSync(this.dirPath);
        }
    }
    onPageHide() {
        this.dirPath = this.baseDir + '/workerCopy';
        let isDirectory = fileIo.statSync(this.dirPath).isDirectory();
        if (isDirectory) {
            fileIo.rmdirSync(this.dirPath);
            AppStorage.setOrCreate('fileNumber', '0');
            AppStorage.setOrCreate('fileListName1', '');
            AppStorage.setOrCreate('fileListName2', '');
            AppStorage.setOrCreate('copyFileShowLog', '');
        }
        let filePathDir = this.baseDir + '/workerDir';
        let isDir = fileIo.statSync(filePathDir).isDirectory();
        if (isDir) {
            fileIo.rmdirSync(filePathDir);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.debugLine("entry/src/main/ets/pages/CopyFile.ets(80:5)");
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CopyFile.ets(81:7)");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CopyFile.ets(82:9)");
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CopyFile.ets(83:11)");
            Row.width('100%');
            Row.height(56);
            Row.backgroundColor('#f1f3f5');
            Row.align(Alignment.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777250, "type": 20000, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/CopyFile.ets(84:13)");
            Image.id('backIndex2');
            Image.width(20);
            Image.height(18);
            Image.align(Alignment.Start);
            Image.margin({ top: 13, bottom: 15, left: 26, right: 18 });
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.message);
            Text.debugLine("entry/src/main/ets/pages/CopyFile.ets(93:13)");
            Text.fontSize(20);
            Text.fontColor('#182431');
            Text.textAlign(TextAlign.Start);
            Text.lineHeight(28);
            Text.fontWeight(700);
            Text.margin({ top: 13, bottom: 15 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Column });
            Flex.debugLine("entry/src/main/ets/pages/CopyFile.ets(106:11)");
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CopyFile.ets(108:13)");
            Column.backgroundColor('#f1f3f5');
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CopyFile.ets(109:15)");
            Row.margin({ left: 24, right: 52 });
            Row.height(48);
            Row.backgroundColor('#f1f3f5');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CopyFile.ets(110:17)");
            Row.width('100%');
            Row.backgroundColor('#f1f3f5');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777241, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/CopyFile.ets(111:19)");
            Text.fontSize(14);
            Text.margin({ top: 19.5, bottom: 9.5 });
            Text.lineHeight(19);
            Text.width(176);
            Text.fontColor('#182431');
            Text.fontWeight(500);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CopyFile.ets(127:15)");
            Column.backgroundColor('#f1f3f5');
            Column.height(436);
            Column.align(Alignment.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 12, initialIndex: 0 });
            List.debugLine("entry/src/main/ets/pages/CopyFile.ets(128:17)");
            List.height('100%');
            List.width('100%');
            List.id('listWorkerFile');
            List.alignListItem(ListItemAlign.Center);
            List.scrollBar(BarState.Auto);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.id('listItem');
                        ListItem.debugLine("entry/src/main/ets/pages/CopyFile.ets(130:21)");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/CopyFile.ets(131:23)");
                            Row.borderRadius(20);
                            Row.margin({ left: 12, right: 12 });
                            Row.height(56);
                            Row.backgroundColor(0xFFFFFF);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item);
                            Text.debugLine("entry/src/main/ets/pages/CopyFile.ets(132:25)");
                            Text.fontSize(16);
                            Text.fontColor('#182431');
                            Text.width('86%');
                            Text.lineHeight(22);
                            Text.textAlign(TextAlign.Start);
                            Text.fontWeight(500);
                            Text.margin({ left: 12 });
                            Text.borderRadius(10);
                            Text.backgroundColor(0xFFFFFF);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/CopyFile.ets(142:25)");
                            Row.id('row' + index);
                            Row.width('9%');
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Checkbox.create();
                            Checkbox.debugLine("entry/src/main/ets/pages/CopyFile.ets(143:27)");
                            Checkbox.select(false);
                            Checkbox.id('checkbox' + index);
                            Checkbox.width(20);
                            Checkbox.height(20);
                            Checkbox.margin({ right: 12 });
                            Checkbox.selectedColor('#007DFF');
                            Checkbox.borderRadius(4);
                            Checkbox.onChange((value: boolean) => {
                                Logger.info(TAG, 'Checkbox1 change is' + value);
                                if (value) {
                                    Logger.info(TAG, 'Workerets Checkbox1 index ' + index + ' is true');
                                    this.eventFilePath.push(this.showFilePath[index]);
                                }
                                else {
                                    for (let i = 0; i < this.eventFilePath.length; i++) {
                                        if (this.eventFilePath[i] === this.showFilePath[index]) {
                                            this.eventFilePath[i] = 'deletedTag';
                                        }
                                    }
                                }
                            });
                        }, Checkbox);
                        Checkbox.pop();
                        Row.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.showFilePath, forEachItemGenFunction, (item: string) => item, true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CopyFile.ets(186:15)");
            Column.backgroundColor('#f1f3f5');
            Column.width('100%');
            Column.height(216);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CopyFile.ets(187:17)");
            Row.width('100%');
            Row.align(Alignment.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777232, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/CopyFile.ets(188:19)");
            Text.fontSize(14);
            Text.fontColor('#182431');
            Text.textAlign(TextAlign.Start);
            Text.lineHeight(19);
            Text.fontWeight(500);
            Text.margin({ top: 19.5, left: 24 });
            Text.width(176);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CopyFile.ets(200:17)");
            Column.borderRadius(20);
            Column.height(80);
            Column.margin({ top: 9.5, left: 16, right: 16 });
            Column.backgroundColor('#ffffff');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CopyFile.ets(201:19)");
            Column.margin({ top: 8, left: 12, right: 12, bottom: 8 });
            Column.height(64);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.copyFileLog1 + this.fileNum + this.copyFileLog2);
            Text.debugLine("entry/src/main/ets/pages/CopyFile.ets(202:21)");
            Text.fontSize(16);
            Text.fontColor('#182431');
            Text.fontWeight(400);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.copyFileShowLog);
            Text.debugLine("entry/src/main/ets/pages/CopyFile.ets(207:21)");
            Text.fontSize(16);
            Text.fontColor('#182431');
            Text.fontWeight(400);
            Text.width('100%');
        }, Text);
        Text.pop();
        Column.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 1 });
            Row.debugLine("entry/src/main/ets/pages/CopyFile.ets(221:17)");
            Row.align(Alignment.Center);
            Row.width('100%');
            Row.margin({ top: 24, left: 24, right: 24, bottom: 24 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CopyFile.ets(222:19)");
            Column.width('100%');
            Column.align(Alignment.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/pages/CopyFile.ets(223:21)");
            Button.fontSize(16);
            Button.width(312);
            Button.height(40);
            Button.fontColor('#FFFFFF');
            Button.fontWeight(500);
            Button.id('copyFile');
            Button.onClick(async () => {
                this.myWorker.deleteCopyFile(this.dirPath);
                await this.myWorker.workToCopyFiles(ObservedObject.GetRawObject(this.eventFilePath), this.dirPath);
            });
        }, Button);
        Button.pop();
        Column.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Flex.pop();
        Column.pop();
        Row.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Watcher";
    }
}
registerNamedRoute(() => new Watcher(undefined, {}), "", { bundleName: "com.samples.concurrentmodule", moduleName: "entry", pagePath: "pages/CopyFile" });
