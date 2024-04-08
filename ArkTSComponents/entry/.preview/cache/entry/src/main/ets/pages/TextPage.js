import router from '@ohos:router';
function __TextInput__inputStyle() {
    TextInput.placeholderColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    TextInput.height({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    TextInput.fontSize({ "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    TextInput.backgroundColor({ "id": 16777220, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    TextInput.width('100%');
    TextInput.padding({ left: 0 });
    TextInput.margin({ top: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
}
function __Line__lineStyle() {
    Line.width('100%');
    Line.height({ "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    Line.backgroundColor({ "id": 16777222, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
}
class LoginUrlEdit extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__message = new ObservedPropertySimplePU('Hello World', this, "message");
        this.__inputUrl = new ObservedPropertySimplePU('', this, "inputUrl");
        this.__inputPort = new ObservedPropertySimplePU('', this, "inputPort");
        this.__isMessageComplete = new ObservedPropertySimplePU(false, this, "isMessageComplete");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.inputUrl !== undefined) {
            this.inputUrl = params.inputUrl;
        }
        if (params.inputPort !== undefined) {
            this.inputPort = params.inputPort;
        }
        if (params.isMessageComplete !== undefined) {
            this.isMessageComplete = params.isMessageComplete;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__inputUrl.purgeDependencyOnElmtId(rmElmtId);
        this.__inputPort.purgeDependencyOnElmtId(rmElmtId);
        this.__isMessageComplete.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__inputUrl.aboutToBeDeleted();
        this.__inputPort.aboutToBeDeleted();
        this.__isMessageComplete.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get message() {
        return this.__message.get();
    }
    set message(newValue) {
        this.__message.set(newValue);
    }
    get inputUrl() {
        return this.__inputUrl.get();
    }
    set inputUrl(newValue) {
        this.__inputUrl.set(newValue);
    }
    get inputPort() {
        return this.__inputPort.get();
    }
    set inputPort(newValue) {
        this.__inputPort.set(newValue);
    }
    get isMessageComplete() {
        return this.__isMessageComplete.get();
    }
    set isMessageComplete(newValue) {
        this.__isMessageComplete.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: 150 });
            Column.debugLine("pages/TextPage.ets(30:5)");
            Column.height('100%');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // Row({space:10}){
            //   Image($r('app.media.ic_launcher_trans_bg'))
            //     .width($r('app.float.main_page_icon_size'))
            //     .height($r('app.float.main_page_icon_size'))
            //   Text($r('app.string.app_name'))
            //     .fontSize(20)
            //     .fontWeight(500)
            // }
            // .width('100%')
            // .margin({
            //   top:$r('app.float.login_page_icon_margin_top'),
            //   left:$r('app.float.login_page_icon_margin_left')
            // })
            // .justifyContent(FlexAlign.Start)
            Column.create();
            Column.debugLine("pages/TextPage.ets(46:7)");
            if (!isInitialRender) {
                // Row({space:10}){
                //   Image($r('app.media.ic_launcher_trans_bg'))
                //     .width($r('app.float.main_page_icon_size'))
                //     .height($r('app.float.main_page_icon_size'))
                //   Text($r('app.string.app_name'))
                //     .fontSize(20)
                //     .fontWeight(500)
                // }
                // .width('100%')
                // .margin({
                //   top:$r('app.float.login_page_icon_margin_top'),
                //   left:$r('app.float.login_page_icon_margin_left')
                // })
                // .justifyContent(FlexAlign.Start)
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //地址输入
            TextInput.create({ placeholder: { "id": 16777321, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            TextInput.debugLine("pages/TextPage.ets(49:9)");
            __TextInput__inputStyle();
            //地址输入
            TextInput.onChange((value) => {
                this.inputUrl = value;
                this.checkInputContent();
            });
            if (!isInitialRender) {
                //地址输入
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Line.create();
            Line.debugLine("pages/TextPage.ets(55:9)");
            __Line__lineStyle();
            if (!isInitialRender) {
                Line.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //端口输入
            TextInput.create({ placeholder: { "id": 16777355, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            TextInput.debugLine("pages/TextPage.ets(58:9)");
            //端口输入
            TextInput.type(InputType.Number);
            __TextInput__inputStyle();
            //端口输入
            TextInput.onChange((value) => {
                this.inputPort = value;
                this.checkInputContent();
            });
            if (!isInitialRender) {
                //端口输入
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Line.create();
            Line.debugLine("pages/TextPage.ets(65:9)");
            __Line__lineStyle();
            if (!isInitialRender) {
                Line.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // Row({space:10}){
        //   Image($r('app.media.ic_launcher_trans_bg'))
        //     .width($r('app.float.main_page_icon_size'))
        //     .height($r('app.float.main_page_icon_size'))
        //   Text($r('app.string.app_name'))
        //     .fontSize(20)
        //     .fontWeight(500)
        // }
        // .width('100%')
        // .margin({
        //   top:$r('app.float.login_page_icon_margin_top'),
        //   left:$r('app.float.login_page_icon_margin_left')
        // })
        // .justifyContent(FlexAlign.Start)
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel({ "id": 16777332, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { type: ButtonType.Capsule,
                stateEffect: this.isMessageComplete });
            Button.debugLine("pages/TextPage.ets(68:7)");
            Button.width('65%');
            Button.onClick(() => {
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Column.pop();
    }
    checkInputContent() {
    }
    goToUserEditView() {
        router.pushUrl({
            url: 'CommonConstants.LOGIN_USER_EDIT_VIEW_URL'
        });
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new LoginUrlEdit(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=TextPage.js.map