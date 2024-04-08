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
import CommonConstants from '@bundle:com.huawei.animaterefresh/entry/ets/common/constants/CommonConstants';
import { RefreshConstants, RefreshState } from '@bundle:com.huawei.animaterefresh/entry/ets/common/constants/RefreshConstants';
import DimensionUtil from '@bundle:com.huawei.animaterefresh/entry/ets/common/utils/DimensionUtil';
export default class RefreshDefaultHeader extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__refreshTitle = new ObservedPropertyObjectPU({ "id": 16777245, "type": 10003, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, this, "refreshTitle");
        this.__state = this.initializeConsume("state", "state");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("state", this.onStateCheck);
    }
    setInitiallyProvidedValue(params) {
        if (params.refreshTitle !== undefined) {
            this.refreshTitle = params.refreshTitle;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__refreshTitle.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__refreshTitle.aboutToBeDeleted();
        this.__state.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get refreshTitle() {
        return this.__refreshTitle.get();
    }
    set refreshTitle(newValue) {
        this.__refreshTitle.set(newValue);
    }
    get state() {
        return this.__state.get();
    }
    set state(newValue) {
        this.__state.set(newValue);
    }
    onStateCheck() {
        switch (this.state) {
            case RefreshState.IDLE:
                this.refreshTitle = { "id": 16777245, "type": 10003, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" };
                break;
            case RefreshState.DRAGGING_REFRESHABLE:
                this.refreshTitle = { "id": 16777246, "type": 10003, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" };
                break;
            case RefreshState.REFRESHING:
                this.refreshTitle = { "id": 16777247, "type": 10003, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" };
                break;
        }
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.state !== RefreshState.IDLE) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Text.create(this.refreshTitle);
                        Text.debugLine("view/RefreshDefaultHeader.ets(41:7)");
                        Text.height(CommonConstants.FULL_LENGTH);
                        Text.width(CommonConstants.FULL_LENGTH);
                        Text.textAlign(TextAlign.Center);
                        Text.fontSize(DimensionUtil.getFp({ "id": 16777224, "type": 10002, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }));
                        Text.onAppear(() => {
                            this.onStateCheck();
                        });
                        if (!isInitialRender) {
                            Text.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Text.pop();
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
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=RefreshDefaultHeader.js.map