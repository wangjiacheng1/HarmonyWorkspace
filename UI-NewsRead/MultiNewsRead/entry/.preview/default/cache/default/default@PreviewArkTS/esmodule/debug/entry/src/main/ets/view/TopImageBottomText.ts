interface TopImageBottomText_Params {
    news?: News;
}
import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import type { News } from '../viewmodel/ImageAndTextViewModel';
export default class TopImageBottomText extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__news = new SynchedPropertyObjectOneWayPU(params.news, this, "news");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: TopImageBottomText_Params) {
    }
    updateStateVars(params: TopImageBottomText_Params) {
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
            Column.debugLine("entry/src/main/ets/view/TopImageBottomText.ets(24:5)");
            Column.width(Constants.FULL_WIDTH);
            Column.height({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Column.alignItems(HorizontalAlign.Center);
            Column.justifyContent(FlexAlign.SpaceBetween);
            Column.backgroundColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.news.getFirstImage());
            Image.debugLine("entry/src/main/ets/view/TopImageBottomText.ets(25:7)");
            Image.width(Constants.FULL_WIDTH);
            Image.borderRadius({
                topLeft: { "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
                topRight: { "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getTitle());
            Text.debugLine("entry/src/main/ets/view/TopImageBottomText.ets(31:7)");
            Text.fontSize({ "id": 16777300, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.fontFamily({ "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.opacity(Constants.OPACITY[2]);
            Text.textAlign(TextAlign.JUSTIFY);
            Text.fontWeight(Constants.FONT_WEIGHT[1]);
            Text.margin({
                left: { "id": 16777320, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
                right: { "id": 16777320, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/TopImageBottomText.ets(42:7)");
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
            Row.width(Constants.FULL_WIDTH);
            Row.height({ "id": 16777273, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.margin({ bottom: { "id": 16777305, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" } });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/TopImageBottomText.ets(43:9)");
            Row.width(Constants.CONTENT_WIDTH);
            Row.justifyContent(FlexAlign.SpaceAround);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getPublisher() + ' ' + this.news.getTimeToNow());
            Text.debugLine("entry/src/main/ets/view/TopImageBottomText.ets(44:11)");
            Text.fontSize({ "id": 16777313, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.fontWeight(Constants.FONT_WEIGHT[0]);
            Text.opacity(Constants.OPACITY[0]);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/view/TopImageBottomText.ets(49:11)");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777256, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/TopImageBottomText.ets(50:11)");
            Image.width({ "id": 16777288, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.height({ "id": 16777288, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Image);
        Row.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
