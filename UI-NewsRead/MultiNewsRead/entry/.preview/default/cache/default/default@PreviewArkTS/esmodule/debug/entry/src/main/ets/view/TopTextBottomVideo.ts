interface TopTextBottomVideo_Params {
    news?: News;
}
import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import type { News } from '../viewmodel/ImageAndTextViewModel';
export default class TopTextBottomVideo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__news = new SynchedPropertyObjectOneWayPU(params.news, this, "news");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: TopTextBottomVideo_Params) {
    }
    updateStateVars(params: TopTextBottomVideo_Params) {
        this.__news.reset(params.news);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__news.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__news.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
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
            Column.create();
            Column.debugLine("entry/src/main/ets/view/TopTextBottomVideo.ets(24:5)");
            Column.width(Constants.FULL_WIDTH);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getTitle());
            Text.debugLine("entry/src/main/ets/view/TopTextBottomVideo.ets(25:7)");
            Text.opacity(Constants.OPACITY[2]);
            Text.fontFamily({ "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontSize({ "id": 16777300, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.lineHeight({ "id": 16777295, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontWeight(Constants.FONT_WEIGHT[1]);
            Text.margin({ bottom: { "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" } });
            Text.width(Constants.FULL_WIDTH);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            RelativeContainer.create();
            RelativeContainer.debugLine("entry/src/main/ets/view/TopTextBottomVideo.ets(34:7)");
            RelativeContainer.width(Constants.FULL_WIDTH);
            RelativeContainer.height({ "id": 16777311, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, RelativeContainer);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.news.getFirstImage());
            Image.debugLine("entry/src/main/ets/view/TopTextBottomVideo.ets(35:9)");
            Image.width(Constants.FULL_WIDTH);
            Image.borderRadius({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.alignRules({
                top: { anchor: "__container__", align: VerticalAlign.Top },
                left: { anchor: "__container__", align: HorizontalAlign.Start }
            });
            Image.id("previewImg");
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/TopTextBottomVideo.ets(45:9)");
            Row.alignRules({
                middle: { anchor: "previewImg", align: HorizontalAlign.Center },
                center: { anchor: "previewImg", align: VerticalAlign.Center }
            });
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
            Row.backgroundColor(Color.Black);
            Row.opacity(Constants.OPACITY[0]);
            Row.borderRadius({ "id": 16777272, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.width({ "id": 16777302, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.height({ "id": 16777302, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.id("playBtn");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777255, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/TopTextBottomVideo.ets(46:11)");
            Image.width({ "id": 16777303, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.height({ "id": 16777301, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/TopTextBottomVideo.ets(63:9)");
            Row.borderRadius({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.width({ "id": 16777281, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.height({ "id": 16777279, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.padding({ "id": 16777280, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.opacity(Constants.OPACITY[1]);
            Row.justifyContent(FlexAlign.Start);
            Row.alignItems(VerticalAlign.Top);
            Row.alignRules({
                bottom: { anchor: "previewImg", align: VerticalAlign.Bottom },
                right: { anchor: "previewImg", align: HorizontalAlign.End }
            });
            Row.id("duration");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getDuration());
            Text.debugLine("entry/src/main/ets/view/TopTextBottomVideo.ets(64:11)");
            Text.fontFamily({ "id": 16777245, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontSize({ "id": 16777316, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.opacity(Constants.OPACITY[2]);
            Text.lineHeight({ "id": 16777282, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontWeight(Constants.FONT_WEIGHT[0]);
            Text.width({ "id": 16777283, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.height({ "id": 16777282, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.backgroundColor(Color.Black);
            Text.borderRadius({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        RelativeContainer.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/TopTextBottomVideo.ets(93:7)");
            Row.width(Constants.FULL_WIDTH);
            Row.height({ "id": 16777321, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getPublisher() + " " + this.news.getTimeToNow());
            Text.debugLine("entry/src/main/ets/view/TopTextBottomVideo.ets(94:9)");
            Text.opacity(Constants.OPACITY[0]);
            Text.fontFamily({ "id": 16777245, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontSize({ "id": 16777313, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.fontWeight(Constants.FONT_WEIGHT[0]);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777256, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/TopTextBottomVideo.ets(100:9)");
            Image.width({ "id": 16777288, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.height({ "id": 16777288, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Image);
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
