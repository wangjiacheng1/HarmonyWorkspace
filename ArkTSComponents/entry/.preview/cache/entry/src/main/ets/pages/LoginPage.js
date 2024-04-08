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
import prompt from '@ohos:promptAction';
import router from '@ohos:router';
import CommonConstants from '@bundle:com.example.component/entry/ets/common/constants/CommonConstants';
function __TextInput__inputStyle() {
    TextInput.placeholderColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    TextInput.height({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    TextInput.fontSize({ "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    TextInput.backgroundColor({ "id": 16777220, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    TextInput.width(CommonConstants.FULL_PARENT);
    TextInput.padding({ left: CommonConstants.INPUT_PADDING_LEFT });
    TextInput.margin({ top: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
}
function __Line__lineStyle() {
    Line.width(CommonConstants.FULL_PARENT);
    Line.height({ "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    Line.backgroundColor({ "id": 16777222, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
}
function __Text__blueTextStyle() {
    Text.fontColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    Text.fontSize({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    Text.fontWeight(FontWeight.Medium);
}
class LoginPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__account = new ObservedPropertySimplePU('', this, "account");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__isShowProgress = new ObservedPropertySimplePU(false, this, "isShowProgress");
        this.timeOutId = -1;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.account !== undefined) {
            this.account = params.account;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.isShowProgress !== undefined) {
            this.isShowProgress = params.isShowProgress;
        }
        if (params.timeOutId !== undefined) {
            this.timeOutId = params.timeOutId;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__account.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowProgress.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__account.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__isShowProgress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get account() {
        return this.__account.get();
    }
    set account(newValue) {
        this.__account.set(newValue);
    }
    get password() {
        return this.__password.get();
    }
    set password(newValue) {
        this.__password.set(newValue);
    }
    get isShowProgress() {
        return this.__isShowProgress.get();
    }
    set isShowProgress(newValue) {
        this.__isShowProgress.set(newValue);
    }
    imageButton(src, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
            Button.debugLine("pages/LoginPage.ets(58:5)");
            Button.height({ "id": 16777281, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.width({ "id": 16777281, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777220, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(src);
            Image.debugLine("pages/LoginPage.ets(59:7)");
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
    }
    login() {
        if (this.account === '' || this.password === '') {
            prompt.showToast({
                message: { "id": 16777331, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }
            });
        }
        else {
            this.isShowProgress = true;
            if (this.timeOutId === -1) {
                this.timeOutId = setTimeout(() => {
                    this.isShowProgress = false;
                    this.timeOutId = -1;
                    router.replaceUrl({ url: 'pages/MainPage' });
                }, CommonConstants.LOGIN_DELAY_TIME);
            }
        }
    }
    aboutToDisappear() {
        clearTimeout(this.timeOutId);
        this.timeOutId = -1;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/LoginPage.ets(89:5)");
            Column.backgroundColor({ "id": 16777220, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Column.height(CommonConstants.FULL_PARENT);
            Column.width(CommonConstants.FULL_PARENT);
            Column.padding({
                left: { "id": 16777284, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
                right: { "id": 16777284, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
                bottom: { "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }
            });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777311, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Image.debugLine("pages/LoginPage.ets(90:7)");
            Image.width({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Image.height({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Image.margin({ top: { "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, bottom: { "id": 16777270, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777334, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.debugLine("pages/LoginPage.ets(94:7)");
            Text.fontSize({ "id": 16777285, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777333, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.debugLine("pages/LoginPage.ets(98:7)");
            Text.fontSize({ "id": 16777280, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontColor({ "id": 16777226, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.margin({ bottom: { "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, top: { "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({ placeholder: { "id": 16777321, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            TextInput.debugLine("pages/LoginPage.ets(103:7)");
            TextInput.maxLength(CommonConstants.INPUT_ACCOUNT_LENGTH);
            TextInput.type(InputType.Number);
            __TextInput__inputStyle();
            TextInput.onChange((value) => {
                this.account = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Line.create();
            Line.debugLine("pages/LoginPage.ets(110:7)");
            __Line__lineStyle();
            if (!isInitialRender) {
                Line.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({ placeholder: { "id": 16777355, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            TextInput.debugLine("pages/LoginPage.ets(112:7)");
            TextInput.maxLength(CommonConstants.INPUT_PASSWORD_LENGTH);
            TextInput.type(InputType.Password);
            __TextInput__inputStyle();
            TextInput.onChange((value) => {
                this.password = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Line.create();
            Line.debugLine("pages/LoginPage.ets(119:7)");
            __Line__lineStyle();
            if (!isInitialRender) {
                Line.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/LoginPage.ets(121:7)");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width(CommonConstants.FULL_PARENT);
            Row.margin({ top: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777348, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.debugLine("pages/LoginPage.ets(122:9)");
            __Text__blueTextStyle();
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777327, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.debugLine("pages/LoginPage.ets(123:9)");
            __Text__blueTextStyle();
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel({ "id": 16777332, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { type: ButtonType.Capsule });
            Button.debugLine("pages/LoginPage.ets(129:7)");
            Button.width(CommonConstants.BUTTON_WIDTH);
            Button.height({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.fontSize({ "id": 16777280, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.fontWeight(FontWeight.Medium);
            Button.backgroundColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.margin({ top: { "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, bottom: { "id": 16777261, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            Button.onClick(() => {
                this.login();
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777359, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.debugLine("pages/LoginPage.ets(139:7)");
            Text.fontColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontSize({ "id": 16777280, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.isShowProgress) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        LoadingProgress.create();
                        LoadingProgress.debugLine("pages/LoginPage.ets(145:9)");
                        LoadingProgress.color({ "id": 16777223, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                        LoadingProgress.width({ "id": 16777268, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                        LoadingProgress.height({ "id": 16777268, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                        LoadingProgress.margin({ top: { "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
                        if (!isInitialRender) {
                            LoadingProgress.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
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
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/LoginPage.ets(152:7)");
            if (!isInitialRender) {
                Blank.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Blank.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777354, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.debugLine("pages/LoginPage.ets(153:7)");
            Text.fontColor({ "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontSize({ "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ top: { "id": 16777283, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, bottom: { "id": 16777282, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create({ space: CommonConstants.LOGIN_METHODS_SPACE });
            Row.debugLine("pages/LoginPage.ets(158:7)");
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.imageButton.bind(this)({ "id": 16777378, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        this.imageButton.bind(this)({ "id": 16777377, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        this.imageButton.bind(this)({ "id": 16777384, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new LoginPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=LoginPage.js.map