interface TaskPoolTab_Params {
    taskPoolOutPutStr?: string;
    taskPoolInPutStr?: string;
    taskPoolInPutArr?: string[];
    gStack?: Stack<taskpool.Task>;
}
import taskpool from "@ohos:taskpool";
import Stack from "@ohos:util.Stack";
export class TaskPoolTab extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__taskPoolOutPutStr = new ObservedPropertySimplePU('', this, "taskPoolOutPutStr");
        this.__taskPoolInPutStr = new ObservedPropertySimplePU('', this, "taskPoolInPutStr");
        this.taskPoolInPutArr = [];
        this.gStack = new Stack();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: TaskPoolTab_Params) {
        if (params.taskPoolOutPutStr !== undefined) {
            this.taskPoolOutPutStr = params.taskPoolOutPutStr;
        }
        if (params.taskPoolInPutStr !== undefined) {
            this.taskPoolInPutStr = params.taskPoolInPutStr;
        }
        if (params.taskPoolInPutArr !== undefined) {
            this.taskPoolInPutArr = params.taskPoolInPutArr;
        }
        if (params.gStack !== undefined) {
            this.gStack = params.gStack;
        }
    }
    updateStateVars(params: TaskPoolTab_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__taskPoolOutPutStr.purgeDependencyOnElmtId(rmElmtId);
        this.__taskPoolInPutStr.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__taskPoolOutPutStr.aboutToBeDeleted();
        this.__taskPoolInPutStr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __taskPoolOutPutStr: ObservedPropertySimplePU<string>;
    get taskPoolOutPutStr() {
        return this.__taskPoolOutPutStr.get();
    }
    set taskPoolOutPutStr(newValue: string) {
        this.__taskPoolOutPutStr.set(newValue);
    }
    private __taskPoolInPutStr: ObservedPropertySimplePU<string>;
    get taskPoolInPutStr() {
        return this.__taskPoolInPutStr.get();
    }
    set taskPoolInPutStr(newValue: string) {
        this.__taskPoolInPutStr.set(newValue);
    }
    private taskPoolInPutArr: string[];
    private gStack: Stack<taskpool.Task>;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(26:5)");
            Column.width("100%");
            Column.height("100%");
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777229, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(27:7)");
            Text.width("100%");
            Text.height("48vp");
            Text.position({ x: "7%", y: "0" });
            Text.fontFamily("HarmonyHeiTi-Medium");
            Text.fontSize("16fp");
            Text.fontColor("#182431");
            Text.lineHeight(22);
            Text.fontWeight(500);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ text: this.taskPoolInPutStr });
            TextArea.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(37:7)");
            TextArea.id("taskPoolInPutTextArea");
            TextArea.width("93.3%");
            TextArea.height("139vp");
            TextArea.position({ x: "3.3%", y: "48vp" });
            TextArea.textAlign(TextAlign.Start);
            TextArea.borderRadius("24vp");
            TextArea.backgroundColor("#ffffff");
            TextArea.fontFamily("HarmonyHeiTi");
            TextArea.fontSize("16fp");
            TextArea.fontColor("#182431");
            TextArea.fontWeight(400);
            TextArea.padding({ top: "8vp", left: "16vp", right: "16vp", bottom: "21vp" });
            TextArea.onChange((value: string) => {
                this.taskPoolInPutStr = value;
                this.taskPoolInPutArr = this.taskPoolInPutStr.trim().split(',');
                this.taskPoolOutPutStr = '';
            });
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777227, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(56:7)");
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
            Scroll.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(66:7)");
            Scroll.id("taskPoolOutPutScroll");
            Scroll.width("93.3%");
            Scroll.height("139vp");
            Scroll.position({ x: "3.3%", y: "235vp" });
            Scroll.borderRadius("24vp");
            Scroll.backgroundColor("#ffffff");
            Scroll.align(Alignment.TopStart);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.taskPoolOutPutStr);
            Text.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(67:9)");
            Text.id("taskPoolOutPutText");
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
            GridRow.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(83:7)");
            GridRow.width("100%");
            GridRow.height("168vp");
            GridRow.position({ x: "0", y: "451vp" });
            GridRow.padding({ left: "25vp", right: "25vp" });
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({ span: 2, offset: 0 });
            GridCol.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(87:9)");
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(88:11)");
            Button.id("exeDelayButton");
            Button.height("40vp");
            Button.borderRadius("20vp");
            Button.backgroundColor("rgba(24,36,49,0.05)");
            Button.onClick(() => {
                this.executeDelay();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(89:13)");
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
            GridCol.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(108:9)");
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(109:11)");
            Button.id("exeImmButton");
            Button.height("40vp");
            Button.borderRadius("20vp");
            Button.backgroundColor("#007DFF");
            Button.onClick(() => {
                this.executeImmediately();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777225, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(110:13)");
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({ span: 2, offset: 0 });
            GridCol.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(129:9)");
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(130:11)");
            Button.id("exeFunctionButton");
            Button.height("40vp");
            Button.borderRadius("20vp");
            Button.backgroundColor("rgba(24,36,49,0.05)");
            Button.onClick(() => {
                this.executeFunc();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777226, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(131:13)");
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
            GridCol.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(150:9)");
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(151:11)");
            Button.id("exeCancelButton");
            Button.height("40vp");
            Button.borderRadius("20vp");
            Button.backgroundColor("#007DFF");
            Button.onClick(() => {
                this.cancelTask();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(152:13)");
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({ span: 4, offset: 0 });
            GridCol.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(171:9)");
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(172:11)");
            Button.id("taskPoolClearButton");
            Button.height("40vp");
            Button.borderRadius("20vp");
            Button.backgroundColor("rgba(24,36,49,0.05)");
            Button.onClick(() => {
                this.taskPoolInPutStr = '';
                this.taskPoolInPutArr = this.taskPoolInPutStr.trim().split(',');
                this.taskPoolOutPutStr = '';
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777221, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/component/TaskPoolTab.ets(173:13)");
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
        GridRow.pop();
        Column.pop();
    }
    async executeImmediately() {
        if (!this.taskPoolInPutStr.length) {
            this.taskPoolOutPutStr = "No input for the string to be sorted.\n";
            return;
        }
        let task = new taskpool.Task(strSort, this.taskPoolInPutArr);
        this.gStack.push(task);
        await taskpool.execute(task).then((result) => {
            this.taskPoolOutPutStr += "Task executed successfully: " + result.toString() + "\n";
        }).catch((e: Error) => {
            this.taskPoolOutPutStr += "Task executed failed: " + e.toString() + "\n";
        });
        this.gStack.pop();
    }
    async executeDelay() {
        if (!this.taskPoolInPutStr.length) {
            this.taskPoolOutPutStr = "No input for the string to be sorted.\n";
            return;
        }
        let task = new taskpool.Task(strSortDelay, this.taskPoolInPutArr);
        this.gStack.push(task);
        await taskpool.execute(task).then((result) => {
            this.taskPoolOutPutStr += "Task executed successfully: " + result.toString() + "\n";
        }).catch((e: Error) => {
            this.taskPoolOutPutStr += "Task executed failed: " + this.taskPoolInPutStr + "\n";
        });
        this.gStack.pop();
    }
    async executeFunc() {
        if (!this.taskPoolInPutStr.length) {
            this.taskPoolOutPutStr = "No input for the string to be sorted.\n";
            return;
        }
        await taskpool.execute(strSort, this.taskPoolInPutArr).then((result) => {
            this.taskPoolOutPutStr += "Task executed successfully: " + result.toString() + "\n";
        }).catch((e: Error) => {
            this.taskPoolOutPutStr += "Task executed failed: " + e.toString() + "\n";
        });
    }
    async cancelTask() {
        if (this.gStack.isEmpty()) {
            this.taskPoolOutPutStr += "The current task queue has no cancellable tasks." + "\n";
        }
        else {
            let task: taskpool.Task = this.gStack.peek();
            try {
                taskpool.cancel(task);
                this.taskPoolOutPutStr += "Task canceled successfully." + "\n";
                this.gStack.pop();
            }
            catch (e) {
                this.taskPoolOutPutStr += "Task canceled failed: " + (e as Error).message + "\n";
            }
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function strSort(inPutArr: string[]): string[] {
    "use concurrent";
    let newArr = inPutArr.sort();
    return newArr;
}
function strSortDelay(inPutArr: string[]): string[] {
    "use concurrent";
    let start = new Date().getTime();
    while (new Date().getTime() - start < 3000) {
        continue;
    }
    let newArr = inPutArr.sort();
    return newArr;
}
