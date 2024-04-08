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
import { RefreshState, RefreshConstants } from '@bundle:com.huawei.animaterefresh/entry/ets/common/constants/RefreshConstants';
import CommonConstants from '@bundle:com.huawei.animaterefresh/entry/ets/common/constants/CommonConstants';
import DimensionUtil from '@bundle:com.huawei.animaterefresh/entry/ets/common/utils/DimensionUtil';
export default class RefreshAnimHeader extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__state = this.initializeConsume("state", "state");
        this.__iconWidth = new ObservedPropertySimplePU(CommonConstants.REFRESH_HEADER_ITEM_DEFAULT_WIDTH, this, "iconWidth");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("state", this.onStateCheck);
    }
    setInitiallyProvidedValue(params) {
        if (params.iconWidth !== undefined) {
            this.iconWidth = params.iconWidth;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__iconWidth.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__iconWidth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get state() {
        return this.__state.get();
    }
    set state(newValue) {
        this.__state.set(newValue);
    }
    get iconWidth() {
        return this.__iconWidth.get();
    }
    set iconWidth(newValue) {
        this.__iconWidth.set(newValue);
    }
    onStateCheck() {
        if (this.state === RefreshState.REFRESHING) {
            this.iconWidth = CommonConstants.REFRESH_HEADER_ITEM_SCALE_WIDTH;
        }
        else {
            this.iconWidth = CommonConstants.REFRESH_HEADER_ITEM_DEFAULT_WIDTH;
        }
    }
    AttrAnimIcons(iconItem, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(iconItem.imgRes);
            Image.debugLine("view/RefreshAnimHeader.ets(35:5)");
            Context.animation({
                duration: CommonConstants.REFRESH_HEADER_ITEM_ANIM_DURATION,
                tempo: CommonConstants.REFRESH_HEADER_ITEM_ANIM_TEMPO,
                delay: iconItem.delay,
                curve: Curve.Linear,
                playMode: PlayMode.Alternate,
                iterations: CommonConstants.REFRESH_HEADER_ITEM_ANIM_ITERATIONS
            });
            Image.width(px2vp(DimensionUtil.adaptDimension(this.iconWidth)));
            Image.position({ x: iconItem.posX });
            Image.objectFit(ImageFit.Contain);
            Context.animation(null);
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
            Row.debugLine("view/RefreshAnimHeader.ets(50:5)");
            Row.width(CommonConstants.FULL_LENGTH);
            Row.height(CommonConstants.FULL_LENGTH);
            Row.onAppear(() => {
                this.onStateCheck();
            });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.state !== RefreshState.IDLE) { // stop animation when idle state.
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const iconItem = _item;
                            this.AttrAnimIcons.bind(this)(iconItem);
                        };
                        this.forEachUpdateFunction(elmtId, CommonConstants.REFRESH_HEADER_FEATURE, forEachItemGenFunction, (item) => JSON.stringify(item), false, false);
                        if (!isInitialRender) {
                            ForEach.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    ForEach.pop();
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
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=RefreshAnimHeader.js.map