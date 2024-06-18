interface Index_Params {
    controller?: TabsController;
    index?: number;
}
import { WorkerTab } from "@bundle:com.samples.concurrentmodule/entry/ets/component/WorkerTab";
import { TaskPoolTab } from "@bundle:com.samples.concurrentmodule/entry/ets/component/TaskPoolTab";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = new TabsController();
        this.__index = new ObservedPropertySimplePU(0, this, "index");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__index.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller: TabsController;
    private __index: ObservedPropertySimplePU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    tabJsWorker(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StrSort.ets(27:5)");
            Column.id("tabJsWorker");
            Column.width("100%");
            Column.height("100%");
            Column.position({ x: "65%", y: "0vp" });
            Column.onClick(() => {
                this.index = 0;
                this.controller.changeIndex(this.index);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("Worker");
            Text.debugLine("entry/src/main/ets/pages/StrSort.ets(28:7)");
            Text.width("57vp");
            Text.height("22vp");
            Text.position({ x: "0vp", y: "17vp" });
            Text.fontFamily("HarmonyHeiTi-Medium");
            Text.fontSize(16);
            Text.fontColor(this.index === 0 ? "#007DFF" : "#182431");
            Text.textAlign(TextAlign.Center);
            Text.lineHeight(22);
            Text.fontWeight(this.index === 0 ? 500 : 400);
            Text.opacity(this.index === 0 ? 1 : 0.6);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Line.create();
            Line.debugLine("entry/src/main/ets/pages/StrSort.ets(39:7)");
            Line.width("57vp");
            Line.height("2vp");
            Line.position({ x: "0", y: "46vp" });
            Line.backgroundColor(this.index === 0 ? "#007DFF" : "linear-gradient(269deg,rgba(0,0,0,0.00)%,#FFFFFF 10%)");
        }, Line);
        Column.pop();
    }
    tabTaskPool(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StrSort.ets(57:5)");
            Column.id("tabTaskPool");
            Column.height("100%");
            Column.width("100%");
            Column.position({ x: "4%", y: "0" });
            Column.onClick(() => {
                this.index = 1;
                this.controller.changeIndex(this.index);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("TaskPool");
            Text.debugLine("entry/src/main/ets/pages/StrSort.ets(58:7)");
            Text.width("68vp");
            Text.height("22vp");
            Text.position({ x: "10vp", y: "17vp" });
            Text.fontFamily("HarmonyHeiTi-Medium");
            Text.fontSize(16);
            Text.fontColor(this.index === 1 ? "#007DFF" : "#182431");
            Text.textAlign(TextAlign.Center);
            Text.lineHeight(22);
            Text.fontWeight(this.index === 1 ? 500 : 400);
            Text.opacity(this.index === 1 ? 1 : 0.6);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Line.create();
            Line.debugLine("entry/src/main/ets/pages/StrSort.ets(69:7)");
            Line.width("68vp");
            Line.height("2vp");
            Line.position({ x: "10vp", y: "46vp" });
            Line.backgroundColor(this.index === 1 ? "#007DFF" : "linear-gradient(269deg,rgba(0,0,0,0.00)%,#FFFFFF 10%)");
        }, Line);
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/StrSort.ets(86:5)");
            Row.width("100%");
            Row.height("100%");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StrSort.ets(87:7)");
            Column.backgroundColor("#f1f3f5");
            Column.width("100%");
            Column.height("100%");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("ConcurrentModule");
            Text.debugLine("entry/src/main/ets/pages/StrSort.ets(88:9)");
            Text.width("100%");
            Text.height("41vp");
            Text.position({ x: "7%", y: "31vp" });
            Text.fontColor("#182431");
            Text.fontSize("30fp");
            Text.fontFamily("HarmonyHeiTi-Bold");
            Text.lineHeight(41);
            Text.fontWeight(700);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({
                barPosition: BarPosition.Start,
                controller: this.controller
            });
            Tabs.debugLine("entry/src/main/ets/pages/StrSort.ets(99:9)");
            Tabs.width("100%");
            Tabs.height("696vp");
            Tabs.barWidth("100%");
            Tabs.barHeight("56vp");
            Tabs.position({ x: "0vp", y: "80vp" });
            Tabs.padding({ bottom: "24vp" });
            Tabs.backgroundImage("linear-gradient(269deg,rgba(0,0,0,0.00)%,#FFFFFF 10%)");
            Tabs.barMode(BarMode.Fixed);
            Tabs.onChange((index: number) => {
                this.index = index;
            });
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new WorkerTab(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/StrSort.ets", line: 104 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "WorkerTab" });
                }
            });
            TabContent.width("100%");
            TabContent.height("100%");
            TabContent.tabBar({ builder: this.tabJsWorker.bind(this) });
            TabContent.debugLine("entry/src/main/ets/pages/StrSort.ets(103:11)");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new TaskPoolTab(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/StrSort.ets", line: 111 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "TaskPoolTab" });
                }
            });
            TabContent.width("100%");
            TabContent.height("100%");
            TabContent.tabBar({ builder: this.tabTaskPool.bind(this) });
            TabContent.debugLine("entry/src/main/ets/pages/StrSort.ets(110:11)");
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.samples.concurrentmodule", moduleName: "entry", pagePath: "pages/StrSort" });
