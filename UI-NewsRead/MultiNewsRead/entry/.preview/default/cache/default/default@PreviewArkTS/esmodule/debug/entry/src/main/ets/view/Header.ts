interface Header_Params {
}
import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import router from "@ohos:router";
export default class Header extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: Header_Params) {
    }
    updateStateVars(params: Header_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/Header.ets(22:5)");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width(Constants.FULL_WIDTH);
            Row.height({ "id": 16777286, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Row.backgroundColor(Color.White);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777326, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/Header.ets(23:7)");
            Image.height(Constants.HALF_HEIGHT);
            Image.borderRadius({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777259, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/Header.ets(29:7)");
            Image.height(Constants.HALF_HEIGHT);
            Image.borderRadius({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Image);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
