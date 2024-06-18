interface Index_Params {
    scroller?: Scroller;
}
import router from "@ohos:router";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private scroller: Scroller;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.debugLine("entry/src/main/ets/pages/Index.ets(24:5)");
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(25:7)");
            Row.backgroundColor('#f1f3f5');
            Row.height('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(26:9)");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777234, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/pages/Index.ets(27:11)");
            Button.fontSize(16);
            Button.fontColor('#FFFFFF');
            Button.fontWeight(500);
            Button.padding(15);
            Button.margin(10);
            Button.width('300');
            Button.height('60');
            Button.id('strSort');
            Button.onClick(() => {
                router.pushUrl({
                    url: 'pages/StrSort',
                    params: {
                        data: 'message',
                    }
                }, router.RouterMode.Standard);
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/pages/Index.ets(45:11)");
            Button.fontSize(16);
            Button.fontColor('#FFFFFF');
            Button.fontWeight(500);
            Button.padding(15);
            Button.margin(10);
            Button.width('300');
            Button.height('60');
            Button.id('fileCopy');
            Button.onClick(() => {
                router.pushUrl({
                    url: 'pages/CopyFile',
                    params: {
                        data3: 'message',
                    }
                }, router.RouterMode.Standard);
            });
        }, Button);
        Button.pop();
        Column.pop();
        Row.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.samples.concurrentmodule", moduleName: "entry", pagePath: "pages/Index" });
