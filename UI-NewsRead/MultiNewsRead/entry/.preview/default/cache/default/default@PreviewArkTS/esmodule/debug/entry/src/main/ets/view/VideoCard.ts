interface VideoCard_Params {
    news?: News;
}
import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import type { News } from '../viewmodel/ImageAndTextViewModel';
export default class VideoCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__news = new SynchedPropertyObjectOneWayPU(params.news, this, "news");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: VideoCard_Params) {
    }
    updateStateVars(params: VideoCard_Params) {
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
            Column.debugLine("entry/src/main/ets/view/VideoCard.ets(24:5)");
            Column.width(Constants.FULL_WIDTH);
            Column.height({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            RelativeContainer.create();
            RelativeContainer.debugLine("entry/src/main/ets/view/VideoCard.ets(25:7)");
        }, RelativeContainer);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.news.getFirstImage());
            Image.debugLine("entry/src/main/ets/view/VideoCard.ets(26:9)");
            Image.width(Constants.FULL_WIDTH);
            Image.borderRadius({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.alignRules({
                top: { anchor: "__container__", align: VerticalAlign.Top },
                left: { anchor: "__container__", align: HorizontalAlign.Start }
            });
            Image.id("backgroundImg");
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/VideoCard.ets(35:9)");
            Row.alignRules({
                middle: { anchor: "__container__", align: HorizontalAlign.Center },
                center: { anchor: "__container__", align: VerticalAlign.Center }
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
            Image.debugLine("entry/src/main/ets/view/VideoCard.ets(36:11)");
            Image.width({ "id": 16777303, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.height({ "id": 16777301, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/VideoCard.ets(53:9)");
            Column.alignItems(HorizontalAlign.Start);
            Column.alignRules({
                bottom: { anchor: "__container__", align: VerticalAlign.Bottom }
            });
            Column.padding({
                left: { "id": 16777322, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
                bottom: { "id": 16777322, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
            });
            Column.id("newsInfo");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/VideoCard.ets(54:11)");
            Row.width({ "id": 16777325, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.height({ "id": 16777324, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getTitle());
            Text.debugLine("entry/src/main/ets/view/VideoCard.ets(55:13)");
            Text.opacity(Constants.OPACITY[2]);
            Text.fontFamily({ "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontSize({ "id": 16777300, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.letterSpacing(Constants.LETTER_SPACE);
            Text.textAlign(TextAlign.JUSTIFY);
            Text.fontWeight(Constants.FONT_WEIGHT[1]);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/VideoCard.ets(68:11)");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width({ "id": 16777323, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.height({ "id": 16777321, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getPublisher() + " " + this.news.getTimeToNow());
            Text.debugLine("entry/src/main/ets/view/VideoCard.ets(69:13)");
            Text.opacity(Constants.OPACITY[0]);
            Text.fontFamily({ "id": 16777245, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontSize({ "id": 16777313, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.fontWeight(Constants.FONT_WEIGHT[0]);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777256, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/VideoCard.ets(75:13)");
            Image.width({ "id": 16777288, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.height({ "id": 16777288, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Image);
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/VideoCard.ets(94:9)");
            Row.width({ "id": 16777281, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.height({ "id": 16777279, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.justifyContent(FlexAlign.Start);
            Row.alignItems(VerticalAlign.Top);
            Row.opacity(Constants.OPACITY[1]);
            Row.alignRules({
                right: { anchor: "__container__", align: HorizontalAlign.End },
                bottom: { anchor: "__container__", align: VerticalAlign.Bottom }
            });
            Row.id("duration");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getDuration());
            Text.debugLine("entry/src/main/ets/view/VideoCard.ets(95:11)");
            Text.width({ "id": 16777283, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.height({ "id": 16777282, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontFamily({ "id": 16777245, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontSize({ "id": 16777316, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.lineHeight({ "id": 16777314, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontWeight(Constants.FONT_WEIGHT[0]);
            Text.backgroundColor(Color.Black);
            Text.borderRadius({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        RelativeContainer.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
