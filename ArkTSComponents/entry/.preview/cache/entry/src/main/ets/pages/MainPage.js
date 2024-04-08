/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import CommonConstants from '@bundle:com.example.component/entry/ets/common/constants/CommonConstants';
import Home from '@bundle:com.example.component/entry/ets/view/Home';
import Setting from '@bundle:com.example.component/entry/ets/view/Setting';
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__currentIndex = new ObservedPropertySimplePU(CommonConstants.HOME_TAB_INDEX, this, "currentIndex");
        this.tabsController = new TabsController();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.tabsController !== undefined) {
            this.tabsController = params.tabsController;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue) {
        this.__currentIndex.set(newValue);
    }
    TabBuilder(title, index, selectedImg, normalImg, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/MainPage.ets(30:5)");
            Column.justifyContent(FlexAlign.Center);
            Column.height({ "id": 16777272, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Column.width(CommonConstants.FULL_PARENT);
            Column.onClick(() => {
                this.currentIndex = index;
                this.tabsController.changeIndex(this.currentIndex);
            });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(this.currentIndex === index ? selectedImg : normalImg);
            Image.debugLine("pages/MainPage.ets(31:7)");
            Image.width({ "id": 16777274, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Image.height({ "id": 16777274, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(title);
            Text.debugLine("pages/MainPage.ets(34:7)");
            Text.margin({ top: { "id": 16777275, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            Text.fontSize({ "id": 16777279, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontColor(this.currentIndex === index ? { "id": 16777229, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" } : { "id": 16777228, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Tabs.create({
                barPosition: BarPosition.End,
                controller: this.tabsController
            });
            Tabs.debugLine("pages/MainPage.ets(49:5)");
            Tabs.width(CommonConstants.FULL_PARENT);
            Tabs.backgroundColor(Color.White);
            Tabs.barHeight({ "id": 16777272, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Tabs.barMode(BarMode.Fixed);
            Tabs.onChange((index) => {
                this.currentIndex = index;
            });
            if (!isInitialRender) {
                Tabs.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new Home(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
            });
            TabContent.padding({ left: { "id": 16777276, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, right: { "id": 16777276, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            TabContent.backgroundColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, CommonConstants.HOME_TITLE, CommonConstants.HOME_TAB_INDEX, { "id": 16777383, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777396, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                } });
            TabContent.debugLine("pages/MainPage.ets(53:7)");
            if (!isInitialRender) {
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new Setting(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
            });
            TabContent.padding({ left: { "id": 16777276, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, right: { "id": 16777276, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            TabContent.backgroundColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, CommonConstants.MINE_TITLE, CommonConstants.MINE_TAB_INDEX, { "id": 16777374, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777310, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                } });
            TabContent.debugLine("pages/MainPage.ets(61:7)");
            if (!isInitialRender) {
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        Tabs.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new MainPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=MainPage.js.map