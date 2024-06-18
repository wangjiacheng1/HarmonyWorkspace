interface Index_Params {
    curBp?: string;
    routes?: Route[];
    breakpointSystem?: BreakpointSystem;
}
import router from "@ohos:router";
import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import type { Route } from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import { BreakpointSystem } from "@bundle:com.example.myapplication/entry/ets/common/BreakpointSystem";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__curBp = this.createStorageProp('currentBreakpoint', Constants.BREAKPOINTS[1], "curBp");
        this.routes = Constants.ROUTES;
        this.breakpointSystem = new BreakpointSystem();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.routes !== undefined) {
            this.routes = params.routes;
        }
        if (params.breakpointSystem !== undefined) {
            this.breakpointSystem = params.breakpointSystem;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__curBp.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__curBp.aboutToBeDeleted();
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
    private routes: Route[];
    private breakpointSystem: BreakpointSystem;
    aboutToAppear() {
        this.breakpointSystem.register();
    }
    aboutToDisappear() {
        this.breakpointSystem.unregister();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(36:5)");
            Column.width(Constants.FULL_WIDTH);
            Column.height(Constants.FULL_HEIGHT);
            Column.alignItems(HorizontalAlign.Center);
            Column.justifyContent(FlexAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777247, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/Index.ets(37:7)");
            Text.fontSize({ "id": 16777319, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.margin(Constants.ELEMENT_SPACE);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: Constants.ELEMENT_SPACE });
            List.debugLine("entry/src/main/ets/pages/Index.ets(40:7)");
            List.width(Constants.CONTENT_WIDTH);
            List.height(Constants.FULL_HEIGHT);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
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
                        ListItem.debugLine("entry/src/main/ets/pages/Index.ets(42:11)");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel(item.text);
                            Button.debugLine("entry/src/main/ets/pages/Index.ets(43:13)");
                            Button.onClick(() => {
                                router.pushUrl({
                                    url: 'pages/' + item.to
                                });
                            });
                            Button.width(Constants.FULL_WIDTH);
                        }, Button);
                        Button.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.routes, forEachItemGenFunction, (item: Route) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/Index" });
