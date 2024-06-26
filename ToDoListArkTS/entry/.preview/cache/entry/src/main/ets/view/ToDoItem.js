/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import CommonConstants from '@bundle:com.huawei.todolist/entry/ets/common/constant/CommonConstant';
export default class ToDoItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.content = undefined;
        this.__isComplete = new ObservedPropertySimplePU(false, this, "isComplete");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.isComplete !== undefined) {
            this.isComplete = params.isComplete;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isComplete.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isComplete.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get isComplete() {
        return this.__isComplete.get();
    }
    set isComplete(newValue) {
        this.__isComplete.set(newValue);
    }
    labelIcon(icon, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(icon);
            Image.debugLine("view/ToDoItem.ets(24:5)");
            Image.objectFit(ImageFit.Contain);
            Image.width({ "id": 16777222, "type": 10002, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
            Image.height({ "id": 16777222, "type": 10002, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
            Image.margin({ "id": 16777221, "type": 10002, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/ToDoItem.ets(32:5)");
            Row.borderRadius(CommonConstants.BORDER_RADIUS);
            Row.backgroundColor({ "id": 16777220, "type": 10001, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
            Row.width(CommonConstants.LIST_DEFAULT_WIDTH);
            Row.height({ "id": 16777224, "type": 10002, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
            Row.onClick(() => {
                this.isComplete = !this.isComplete;
            });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.isComplete) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.labelIcon.bind(this)({ "id": 16777235, "type": 20000, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.labelIcon.bind(this)({ "id": 16777218, "type": 20000, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
                });
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.content);
            Text.debugLine("view/ToDoItem.ets(39:7)");
            Text.fontSize({ "id": 16777223, "type": 10002, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
            Text.fontWeight(CommonConstants.FONT_WEIGHT);
            Text.opacity(this.isComplete ? CommonConstants.OPACITY_COMPLETED : CommonConstants.OPACITY_DEFAULT);
            Text.decoration({ type: this.isComplete ? TextDecorationType.LineThrough : TextDecorationType.None });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=ToDoItem.js.map