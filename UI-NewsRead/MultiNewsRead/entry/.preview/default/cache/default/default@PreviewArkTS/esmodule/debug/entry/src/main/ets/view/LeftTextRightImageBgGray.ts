interface LeftTextRightImageBgGray_Params {
    curBp?: string;
    news?: News;
}
import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import type { News } from '../viewmodel/ImageAndTextViewModel';
export default class LeftTextRightImageBgGray extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__curBp = this.createStorageProp('currentBreakpoint', '', "curBp");
        this.__news = new SynchedPropertyObjectOneWayPU(params.news, this, "news");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: LeftTextRightImageBgGray_Params) {
    }
    updateStateVars(params: LeftTextRightImageBgGray_Params) {
        this.__news.reset(params.news);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__curBp.purgeDependencyOnElmtId(rmElmtId);
        this.__news.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__curBp.aboutToBeDeleted();
        this.__news.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __curBp: ObservedPropertyAbstractPU<string>;
    get curBp() {
        return this.__curBp.get();
    }
    set curBp(newValue: string) {
        this.__curBp.set(newValue);
    }
    private __news: SynchedPropertySimpleOneWayPU<News>;
    get news() {
        return this.__news.get();
    }
    set news(newValue: News) {
        this.__news.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                direction: FlexDirection.Column,
                justifyContent: FlexAlign.SpaceBetween,
                alignItems: ItemAlign.Center
            });
            Flex.debugLine("entry/src/main/ets/view/LeftTextRightImageBgGray.ets(25:5)");
            Flex.width(Constants.FULL_WIDTH);
            Flex.height({ "id": 16777291, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Flex.padding({
                left: { "id": 16777292, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
                right: { "id": 16777292, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
                top: { "id": 16777292, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
                bottom: { "id": 16777290, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
            });
            Flex.backgroundColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Flex.borderRadius({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/LeftTextRightImageBgGray.ets(30:7)");
            Row.width(Constants.FULL_WIDTH);
            Row.margin({ right: { "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" } });
            Row.flexGrow(1);
            Row.flexShrink(1);
            Row.height({ "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getTitle());
            Text.debugLine("entry/src/main/ets/view/LeftTextRightImageBgGray.ets(31:9)");
            Text.fontSize({ "id": 16777300, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.layoutWeight(Constants.LAYOUT_WEIGHT);
            Text.margin({ right: { "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.news.getFirstImage());
            Image.debugLine("entry/src/main/ets/view/LeftTextRightImageBgGray.ets(36:9)");
            Image.height({ "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width({ "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.borderRadius({ "id": 16777289, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.objectFit(ImageFit.Cover);
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/LeftTextRightImageBgGray.ets(51:7)");
            Row.width(Constants.FULL_WIDTH);
            Row.height({ "id": 16777304, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/LeftTextRightImageBgGray.ets(52:9)");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getPublisher() + ' ' + this.news.getTimeToNow());
            Text.debugLine("entry/src/main/ets/view/LeftTextRightImageBgGray.ets(53:11)");
            Text.fontSize({ "id": 16777313, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.opacity(Constants.OPACITY[0]);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/view/LeftTextRightImageBgGray.ets(58:9)");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/LeftTextRightImageBgGray.ets(59:9)");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777256, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/LeftTextRightImageBgGray.ets(60:11)");
            Image.width({ "id": 16777288, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.height({ "id": 16777288, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Image);
        Row.pop();
        Row.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
