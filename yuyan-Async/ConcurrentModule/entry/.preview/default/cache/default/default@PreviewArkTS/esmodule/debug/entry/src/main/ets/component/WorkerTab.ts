interface WorkerTab_Params {
    jsWorkerOutPutStr?: string;
    jsWorkerInPutStr?: string;
    jsWorkerInPutArr?: string[];
    isDone?: boolean;
    myWorker?: worker.ThreadWorker;
}
import worker from "@ohos:worker";
export class WorkerTab extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__jsWorkerOutPutStr = new ObservedPropertySimplePU('', this, "jsWorkerOutPutStr");
        this.__jsWorkerInPutStr = new ObservedPropertySimplePU('', this, "jsWorkerInPutStr");
        this.jsWorkerInPutArr = [];
        this.isDone = false;
        this.myWorker = new worker.ThreadWorker("entry/ets/model/Worker.ts");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: WorkerTab_Params) {
        if (params.jsWorkerOutPutStr !== undefined) {
            this.jsWorkerOutPutStr = params.jsWorkerOutPutStr;
        }
        if (params.jsWorkerInPutStr !== undefined) {
            this.jsWorkerInPutStr = params.jsWorkerInPutStr;
        }
        if (params.jsWorkerInPutArr !== undefined) {
            this.jsWorkerInPutArr = params.jsWorkerInPutArr;
        }
        if (params.isDone !== undefined) {
            this.isDone = params.isDone;
        }
        if (params.myWorker !== undefined) {
            this.myWorker = params.myWorker;
        }
    }
    updateStateVars(params: WorkerTab_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__jsWorkerOutPutStr.purgeDependencyOnElmtId(rmElmtId);
        this.__jsWorkerInPutStr.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__jsWorkerOutPutStr.aboutToBeDeleted();
        this.__jsWorkerInPutStr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __jsWorkerOutPutStr: ObservedPropertySimplePU<string>;
    get jsWorkerOutPutStr() {
        return this.__jsWorkerOutPutStr.get();
    }
    set jsWorkerOutPutStr(newValue: string) {
        this.__jsWorkerOutPutStr.set(newValue);
    }
    private __jsWorkerInPutStr: ObservedPropertySimplePU<string>;
    get jsWorkerInPutStr() {
        return this.__jsWorkerInPutStr.get();
    }
    set jsWorkerInPutStr(newValue: string) {
        this.__jsWorkerInPutStr.set(newValue);
    }
    private jsWorkerInPutArr: string[];
    private isDone: boolean;
    private myWorker: worker.ThreadWorker;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/component/WorkerTab.ets(27:5)");
            Column.width("100%");
            Column.height("100%");
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777229, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/component/WorkerTab.ets(28:7)");
            Text.width("100%");
            Text.height("48vp");
            Text.position({ x: "7%", y: "0vp" });
            Text.fontFamily("HarmonyHeiTi-Medium");
            Text.fontSize("16fp");
            Text.fontColor("#182431");
            Text.lineHeight(22);
            Text.fontWeight(500);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ text: this.jsWorkerInPutStr });
            TextArea.debugLine("entry/src/main/ets/component/WorkerTab.ets(38:7)");
            TextArea.id("jsWorkerInPutTextArea");
            TextArea.width("93.3%");
            TextArea.height("139vp");
            TextArea.position({ x: "3.3%", y: "48vp" });
            TextArea.textAlign(TextAlign.Start);
            TextArea.fontFamily("HarmonyHeiTi");
            TextArea.fontSize("16fp");
            TextArea.fontColor("#182431");
            TextArea.fontWeight(400);
            TextArea.padding({ top: "8vp", left: "16vp", right: "16vp", bottom: "21vp" });
            TextArea.borderRadius("24vp");
            TextArea.backgroundColor("#ffffff");
            TextArea.onChange((value: string) => {
                this.jsWorkerInPutStr = value;
                this.jsWorkerInPutArr = value.trim().split(',');
                this.jsWorkerOutPutStr = '';
            });
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777227, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/component/WorkerTab.ets(57:7)");
            Text.width("100%");
            Text.height("48");
            Text.position({ x: "7%", y: "187vp" });
            Text.fontFamily("HarmonyHeiTi-Medium");
            Text.fontSize("16fp");
            Text.fontColor("#182431");
            Text.lineHeight(22);
            Text.fontWeight(500);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/component/WorkerTab.ets(67:7)");
            Scroll.id("jsWorkerOutPutScroll");
            Scroll.width("93.3%");
            Scroll.height("139vp");
            Scroll.position({ x: "3.3%", y: "235vp" });
            Scroll.borderRadius("24vp");
            Scroll.backgroundColor("#ffffff");
            Scroll.align(Alignment.TopStart);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.jsWorkerOutPutStr);
            Text.debugLine("entry/src/main/ets/component/WorkerTab.ets(68:9)");
            Text.id("jsWorkerOutPutText");
            Text.fontFamily("HarmonyHeiTi");
            Text.fontSize("16fp");
            Text.fontColor("#182431");
            Text.fontWeight(400);
            Text.padding({ top: "8vp", left: "16vp", right: "16vp", bottom: "21vp" });
        }, Text);
        Text.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({ columns: 4,
                gutter: { x: 12, y: 12 },
                breakpoints: { value: ["360vp", "480vp"] },
                direction: GridRowDirection.Row });
            GridRow.debugLine("entry/src/main/ets/component/WorkerTab.ets(84:7)");
            GridRow.width("100%");
            GridRow.height("40vp");
            GridRow.position({ x: "0", y: "555vp" });
            GridRow.padding({ left: "24vp", right: "24vp" });
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({ span: 2, offset: 0 });
            GridCol.debugLine("entry/src/main/ets/component/WorkerTab.ets(88:9)");
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/component/WorkerTab.ets(89:11)");
            Button.id("workerClearButton");
            Button.height("40vp");
            Button.borderRadius("20vp");
            Button.backgroundColor("rgba(24,36,49,0.05)");
            Button.onClick(() => {
                this.jsWorkerInPutStr = '';
                this.jsWorkerOutPutStr = '';
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777221, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/component/WorkerTab.ets(90:13)");
            Text.width("100%");
            Text.height("22");
            Text.fontFamily("HarmonyHeiTi-Medium");
            Text.fontSize("16fp");
            Text.fontColor("#007DFF");
            Text.textAlign(TextAlign.Center);
            Text.lineHeight(22);
            Text.fontWeight(500);
        }, Text);
        Text.pop();
        Button.pop();
        GridCol.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({ span: 2, offset: 0 });
            GridCol.debugLine("entry/src/main/ets/component/WorkerTab.ets(110:9)");
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/component/WorkerTab.ets(111:11)");
            Button.id("workerStrSort");
            Button.height("40vp");
            Button.borderRadius("20vp");
            Button.backgroundColor("#007DFF");
            Button.onClick(() => {
                this.executeWorkerFunc(this.jsWorkerInPutArr);
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/component/WorkerTab.ets(112:13)");
            Text.width("100%");
            Text.height("22");
            Text.fontFamily("HarmonyHeiTi-Medium");
            Text.fontSize("16fp");
            Text.fontColor("#FFFFFF");
            Text.textAlign(TextAlign.Center);
            Text.lineHeight(22);
            Text.fontWeight(500);
        }, Text);
        Text.pop();
        Button.pop();
        GridCol.pop();
        GridRow.pop();
        Column.pop();
    }
    async executeWorkerFunc(inPutArr: string[]) {
        if (!this.jsWorkerInPutStr.length) {
            this.jsWorkerOutPutStr = "No input for the string to be sorted.\n";
            return;
        }
        this.myWorker.postMessage(inPutArr);
        let strFlag = false;
        let outPutStr = '';
        this.myWorker.onmessage = (e) => {
            outPutStr = e.data.toString();
            strFlag = true;
        };
        while (!strFlag) {
            await promiseCase();
        }
        this.jsWorkerOutPutStr = outPutStr;
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function promiseCase(): Promise<Object> {
    let p: Promise<number> = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 100);
    });
    return p;
}
