import RefreshComponent from '@bundle:com.huawei.animaterefresh/entry/ets/view/RefreshComponent';
import { RefreshHeaderStyle, RefreshState, RefreshConstants } from '@bundle:com.huawei.animaterefresh/entry/ets/common/constants/RefreshConstants';
import CommonConstants from '@bundle:com.huawei.animaterefresh/entry/ets/common/constants/CommonConstants';
import DimensionUtil from '@bundle:com.huawei.animaterefresh/entry/ets/common/utils/DimensionUtil';
import { GlobalContext } from '@bundle:com.huawei.animaterefresh/entry/ets/common/utils/GlobalContext';
export default class FileManagerIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__state = new ObservedPropertySimplePU(RefreshState.REFRESHING, this, "state");
        this.addProvidedVar("state", this.__state);
        this.deviceDisplay = GlobalContext.getContext().getObject('display');
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.deviceDisplay !== undefined) {
            this.deviceDisplay = params.deviceDisplay;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get state() {
        return this.__state.get();
    }
    set state(newValue) {
        this.__state.set(newValue);
    }
    ContentBody(parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777236, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" });
            Image.debugLine("pages/FileManagerIndex.ets(33:5)");
            Image.width(CommonConstants.FULL_LENGTH);
            Image.height(DimensionUtil.getVp({ "id": 16777222, "type": 10002, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }));
            Image.objectFit(ImageFit.Fill);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Stack.create({ alignContent: Alignment.Top });
            Stack.debugLine("pages/FileManagerIndex.ets(40:5)");
            Stack.height(CommonConstants.FULL_LENGTH);
            if (!isInitialRender) {
                Stack.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777243, "type": 10003, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" });
            Text.debugLine("pages/FileManagerIndex.ets(41:7)");
            Text.backgroundColor(Color.White);
            Text.width(CommonConstants.FULL_LENGTH);
            Text.height(DimensionUtil.getVp({ "id": 16777225, "type": 10002, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }));
            Text.fontSize(DimensionUtil.getFp({ "id": 16777227, "type": 10002, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }));
            Text.fontWeight(FontWeight.Regular);
            Text.padding({ left: DimensionUtil.getVp({ "id": 16777226, "type": 10002, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }) });
            Text.zIndex(CommonConstants.FILE_MANAGER_Z_INDEX);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            __Common__.create();
            __Common__.width(CommonConstants.FULL_LENGTH);
            __Common__.margin({ top: DimensionUtil.getVp({ "id": 16777225, "type": 10002, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }) });
            if (!isInitialRender) {
                __Common__.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new RefreshComponent(this, {
                        headerStyle: RefreshHeaderStyle.CLOUD,
                        itemLayout: () => this.ContentBody(),
                        displayHeight: (px2vp(this.deviceDisplay.height) - DimensionUtil.getVp({ "id": 16777225, "type": 10002, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" })),
                        onRefresh: () => {
                            setTimeout(() => {
                                this.state = RefreshState.COMPLETE;
                            }, CommonConstants.REFRESH_DEFAULT_TIMEOUT);
                        }
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        __Common__.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=FileManagerIndex.js.map