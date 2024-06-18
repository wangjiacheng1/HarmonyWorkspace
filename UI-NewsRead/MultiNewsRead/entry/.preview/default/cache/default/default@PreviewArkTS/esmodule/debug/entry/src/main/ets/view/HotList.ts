interface HotList_Params {
    hotList?: string[];
}
import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
export default class HotList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__hotList = new SynchedPropertyObjectOneWayPU(params.hotList, this, "hotList");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: HotList_Params) {
    }
    updateStateVars(params: HotList_Params) {
        this.__hotList.reset(params.hotList);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__hotList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__hotList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __hotList: SynchedPropertySimpleOneWayPU<string[]>;
    get hotList() {
        return this.__hotList.get();
    }
    set hotList(newValue: string[]) {
        this.__hotList.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/HotList.ets(23:5)");
            Column.width(Constants.FULL_WIDTH);
            Column.height({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Column.padding({ "id": 16777309, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Column.backgroundColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/HotList.ets(24:7)");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width(Constants.FULL_WIDTH);
            Row.margin({ bottom: Constants.LIST_GUTTER });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/HotList.ets(25:9)");
            Text.fontFamily({ "id": 16777244, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontSize({ "id": 16777287, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.textAlign(TextAlign.Start);
            Text.lineHeight({ "id": 16777273, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontWeight(Constants.FONT_WEIGHT[2]);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777225, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/HotList.ets(32:9)");
            Image.height({ "id": 16777274, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width({ "id": 16777274, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/view/HotList.ets(40:7)");
            List.width(Constants.FULL_WIDTH);
            List.height(Constants.FULL_HEIGHT);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.debugLine("entry/src/main/ets/view/HotList.ets(42:11)");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/view/HotList.ets(43:13)");
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/view/HotList.ets(44:15)");
                            Row.justifyContent(FlexAlign.Center);
                            Row.alignItems(VerticalAlign.Center);
                            Row.width({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                            Row.height({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                            Row.borderRadius({ "id": 16777306, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                            Row.backgroundColor(Constants.HOT_LIST_BACKGROUND_COLORS[index]);
                            Row.margin({ right: { "id": 16777310, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" } });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(index + 1 + '');
                            Text.debugLine("entry/src/main/ets/view/HotList.ets(45:17)");
                            Text.fontColor(Color.White);
                            Text.fontFamily("HarmonyHeiTi");
                            Text.fontSize({ "id": 16777313, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                            Text.textAlign(TextAlign.Center);
                            Text.lineHeight({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                            Text.fontWeight(Constants.FONT_WEIGHT[0]);
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item);
                            Text.debugLine("entry/src/main/ets/view/HotList.ets(61:15)");
                            Text.fontFamily({ "id": 16777245, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                            Text.fontSize({ "id": 16777300, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                            Text.fontColor(Color.Black);
                            Text.textAlign(TextAlign.Start);
                            Text.lineHeight({ "id": 16777308, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                            Text.fontWeight(Constants.FONT_WEIGHT[0]);
                        }, Text);
                        Text.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.hotList, forEachItemGenFunction, (item: string) => item, true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
