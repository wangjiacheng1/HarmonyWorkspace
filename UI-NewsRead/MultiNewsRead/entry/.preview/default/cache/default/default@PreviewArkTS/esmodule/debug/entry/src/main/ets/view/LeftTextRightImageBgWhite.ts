interface LeftTextRightImageBgWhite_Params {
    curBp?: string;
    news?: News;
}
import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import type { News } from '../viewmodel/ImageAndTextViewModel';
export default class LeftTextRightImageBgWhite extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__curBp = this.createStorageProp('currentBreakpoint', '', "curBp");
        this.__news = new SynchedPropertyObjectOneWayPU(params.news, this, "news");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: LeftTextRightImageBgWhite_Params) {
    }
    updateStateVars(params: LeftTextRightImageBgWhite_Params) {
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
                justifyContent: FlexAlign.SpaceBetween,
                alignItems: ItemAlign.Center
            });
            Flex.debugLine("entry/src/main/ets/view/LeftTextRightImageBgWhite.ets(25:5)");
            Flex.width(Constants.FULL_WIDTH);
            Flex.height({ "id": 16777291, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Flex.padding({
                top: { "id": 16777292, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
                bottom: { "id": 16777290, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
            });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/LeftTextRightImageBgWhite.ets(29:7)");
            Column.margin({ right: { "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" } });
            Column.flexGrow(1);
            Column.flexShrink(1);
            Column.height(Constants.FULL_HEIGHT);
            Column.justifyContent(FlexAlign.SpaceAround);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getTitle());
            Text.debugLine("entry/src/main/ets/view/LeftTextRightImageBgWhite.ets(30:9)");
            Text.fontSize({ "id": 16777300, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.width(Constants.FULL_WIDTH);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getBrief());
            Text.debugLine("entry/src/main/ets/view/LeftTextRightImageBgWhite.ets(33:9)");
            Text.opacity(Constants.OPACITY[1]);
            Text.fontSize({ "id": 16777275, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.lineHeight({ "id": 16777276, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontWeight(Constants.FONT_WEIGHT[0]);
            Text.fontSize({ "id": 16777275, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.maxLines(Constants.MAX_LINES);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.visibility(this.curBp === 'lg' ? Visibility.Visible : Visibility.Hidden);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/LeftTextRightImageBgWhite.ets(43:9)");
            Row.width(Constants.FULL_WIDTH);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/LeftTextRightImageBgWhite.ets(44:11)");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.news.getPublisher() + ' ' + this.news.getTimeToNow());
            Text.debugLine("entry/src/main/ets/view/LeftTextRightImageBgWhite.ets(45:13)");
            Text.fontSize({ "id": 16777313, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.opacity(Constants.OPACITY[0]);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/view/LeftTextRightImageBgWhite.ets(50:11)");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/LeftTextRightImageBgWhite.ets(51:11)");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777256, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/LeftTextRightImageBgWhite.ets(52:13)");
            Image.width({ "id": 16777288, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.height({ "id": 16777288, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Image);
        Row.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/LeftTextRightImageBgWhite.ets(66:7)");
            Column.aspectRatio(Constants.ASPECT_RATIO);
            Column.justifyContent(FlexAlign.Center);
            Column.height(Constants.FULL_HEIGHT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.news.getFirstImage());
            Image.debugLine("entry/src/main/ets/view/LeftTextRightImageBgWhite.ets(67:9)");
            Image.height(Constants.FULL_HEIGHT);
            Image.borderRadius({ "id": 16777289, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Image);
        Column.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
