/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import FileManagerIndex from '@bundle:com.huawei.animaterefresh/entry/ets/pages/FileManagerIndex';
import CommonConstants from '@bundle:com.huawei.animaterefresh/entry/ets/common/constants/CommonConstants';
import DimensionUtil from '@bundle:com.huawei.animaterefresh/entry/ets/common/utils/DimensionUtil';
class TabIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__currentPage = new ObservedPropertySimplePU(CommonConstants.INDEX_DEFAULT_SELECT, this, "currentPage");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.currentPage !== undefined) {
            this.currentPage = params.currentPage;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue) {
        this.__currentPage.set(newValue);
    }
    TabBuilder(item, index, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/TabIndex.ets(30:5)");
            Column.justifyContent(FlexAlign.Center);
            Column.width(CommonConstants.FULL_LENGTH);
            Column.height(CommonConstants.FULL_LENGTH);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(this.currentPage === index ? item.selectedIcon : item.defaultIcon);
            Image.debugLine("pages/TabIndex.ets(31:7)");
            Image.width(DimensionUtil.getVp({ "id": 16777231, "type": 10002, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }));
            Image.height(DimensionUtil.getVp({ "id": 16777231, "type": 10002, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }));
            Image.objectFit(ImageFit.Contain);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(item.content);
            Text.debugLine("pages/TabIndex.ets(35:7)");
            Text.fontColor(this.currentPage === index ? { "id": 16777238, "type": 10001, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" } : Color.Black);
            Text.fontSize(DimensionUtil.getFp({ "id": 16777230, "type": 10002, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }));
            Text.margin({ top: DimensionUtil.getVp({ "id": 16777232, "type": 10002, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }) });
            Text.opacity(this.currentPage === index
                ? { "id": 16777229, "type": 10002, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" } : { "id": 16777228, "type": 10002, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" });
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
            Tabs.create({ barPosition: BarPosition.End, index: this.currentPage });
            Tabs.debugLine("pages/TabIndex.ets(49:5)");
            Tabs.width(CommonConstants.FULL_LENGTH);
            Tabs.height(CommonConstants.FULL_LENGTH);
            Tabs.barMode(BarMode.Fixed);
            Tabs.onChange((index) => {
                this.currentPage = index;
            });
            if (!isInitialRender) {
                Tabs.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
                const item = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    TabContent.create(() => {
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            If.create();
                            if (index === CommonConstants.INDEX_DEFAULT_SELECT) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    {
                                        this.observeComponentCreation((elmtId, isInitialRender) => {
                                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                            if (isInitialRender) {
                                                ViewPU.create(new FileManagerIndex(this, {}, undefined, elmtId));
                                            }
                                            else {
                                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                                            }
                                            ViewStackProcessor.StopGetAccessRecording();
                                        });
                                    }
                                });
                            }
                            else {
                                If.branchId(1);
                            }
                            if (!isInitialRender) {
                                If.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        If.pop();
                    });
                    TabContent.tabBar({ builder: () => {
                            this.TabBuilder.call(this, item, index);
                        } });
                    TabContent.debugLine("pages/TabIndex.ets(51:9)");
                    if (!isInitialRender) {
                        TabContent.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                TabContent.pop();
            };
            this.forEachUpdateFunction(elmtId, CommonConstants.INDEX_TAB, forEachItemGenFunction, (item) => JSON.stringify(item), true, false);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        Tabs.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new TabIndex(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=TabIndex.js.map