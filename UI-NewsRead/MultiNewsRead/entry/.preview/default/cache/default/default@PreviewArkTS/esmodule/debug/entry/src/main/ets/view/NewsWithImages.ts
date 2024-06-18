interface NewsWithImages_Params {
    news?: News;
}
import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import type { News } from '../viewmodel/ImageAndTextViewModel';
export default class NewsWithImages extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__news = new SynchedPropertyObjectOneWayPU(params.news, this, "news");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: NewsWithImages_Params) {
    }
    updateStateVars(params: NewsWithImages_Params) {
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
            Column.debugLine("entry/src/main/ets/view/NewsWithImages.ets(24:5)");
            Column.width(Constants.FULL_WIDTH);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getTitle());
            Text.debugLine("entry/src/main/ets/view/NewsWithImages.ets(25:7)");
            Text.fontSize({ "id": 16777300, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.lineHeight({ "id": 16777295, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.opacity(Constants.OPACITY[2]);
            Text.fontColor(Color.Black);
            Text.fontWeight(Constants.FONT_WEIGHT[1]);
            Text.width(Constants.FULL_WIDTH);
            Text.margin({ bottom: { "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/NewsWithImages.ets(34:7)");
            Row.alignItems(VerticalAlign.Center);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width(Constants.FULL_WIDTH);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item);
                    Image.debugLine("entry/src/main/ets/view/NewsWithImages.ets(36:11)");
                    Image.width(Constants.ONE_THIRD_WIDTH);
                    Image.objectFit(ImageFit.Cover);
                }, Image);
            };
            this.forEachUpdateFunction(elmtId, this.news.getImages(), forEachItemGenFunction, (item: Resource) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/NewsWithImages.ets(45:7)");
            Row.width(Constants.FULL_WIDTH);
            Row.height({ "id": 16777273, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getPublisher() + " " + this.news.getTimeToNow());
            Text.debugLine("entry/src/main/ets/view/NewsWithImages.ets(46:9)");
            Text.opacity(Constants.OPACITY[0]);
            Text.fontFamily({ "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontSize({ "id": 16777313, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.fontWeight(Constants.FONT_WEIGHT[0]);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777256, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/NewsWithImages.ets(52:9)");
            Image.width({ "id": 16777315, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.height({ "id": 16777315, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Image);
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
