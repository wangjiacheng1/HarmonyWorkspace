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
import RefreshDefaultHeader from '@bundle:com.huawei.animaterefresh/entry/ets/view/RefreshDefaultHeader';
import RefreshAnimHeader from '@bundle:com.huawei.animaterefresh/entry/ets/view/RefreshAnimHeader';
import { RefreshConstants, RefreshState, RefreshHeaderStyle } from '@bundle:com.huawei.animaterefresh/entry/ets/common/constants/RefreshConstants';
export default class RefreshComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.headerStyle = RefreshHeaderStyle.DEFAULT;
        this.displayHeight = 0;
        this.listController = new Scroller();
        this.onRefresh = undefined;
        this.__headerOffset = new ObservedPropertySimplePU(0, this, "headerOffset");
        this.__state = this.initializeConsume("state", "state");
        this.itemLayout = undefined;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("state", this.onStateChanged);
    }
    setInitiallyProvidedValue(params) {
        if (params.headerStyle !== undefined) {
            this.headerStyle = params.headerStyle;
        }
        if (params.displayHeight !== undefined) {
            this.displayHeight = params.displayHeight;
        }
        if (params.listController !== undefined) {
            this.listController = params.listController;
        }
        if (params.onRefresh !== undefined) {
            this.onRefresh = params.onRefresh;
        }
        if (params.headerOffset !== undefined) {
            this.headerOffset = params.headerOffset;
        }
        if (params.itemLayout !== undefined) {
            this.itemLayout = params.itemLayout;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__headerOffset.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__headerOffset.aboutToBeDeleted();
        this.__state.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get headerOffset() {
        return this.__headerOffset.get();
    }
    set headerOffset(newValue) {
        this.__headerOffset.set(newValue);
    }
    get state() {
        return this.__state.get();
    }
    set state(newValue) {
        this.__state.set(newValue);
    }
    onStateChanged() {
        switch (this.state) {
            case RefreshState.REFRESHING:
                if (this.onRefresh !== undefined) {
                    this.onRefresh();
                }
                break;
            case RefreshState.COMPLETE:
                this.headerOffset = -RefreshConstants.REFRESH_HEADER_HEIGHT;
                break;
        }
    }
    aboutToAppear() {
        if (this.state === RefreshState.REFRESHING) {
            this.headerOffset = 0;
            this.onStateChanged();
        }
        else {
            this.state = RefreshState.IDLE;
            this.headerOffset = -RefreshConstants.REFRESH_HEADER_HEIGHT;
        }
        this.displayHeight = RefreshConstants.REFRESH_HEADER_HEIGHT + Number(this.displayHeight);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create({ scroller: this.listController });
            List.debugLine("view/RefreshComponent.ets(56:5)");
            Context.animation({
                curve: Curve.Smooth,
                duration: RefreshConstants.REFRESH_HEADER_ANIM_DURATION,
                playMode: PlayMode.Normal,
                onFinish: () => {
                    if (this.headerOffset === -RefreshConstants.REFRESH_HEADER_HEIGHT) {
                        this.state = RefreshState.IDLE;
                    }
                }
            });
            List.edgeEffect(EdgeEffect.Spring);
            List.width(CommonConstants.FULL_LENGTH);
            List.height(this.displayHeight);
            List.listDirection(Axis.Vertical);
            List.offset({ y: this.headerOffset });
            Context.animation(null);
            List.onTouch((event) => {
                if (!event) {
                    return;
                }
                switch (event.type) {
                    case TouchType.Down:
                        if (this.state === RefreshState.IDLE) {
                            this.state = RefreshState.DRAGGING;
                        }
                        break;
                    case TouchType.Move:
                        if (this.state === RefreshState.DRAGGING
                            && this.listController.currentOffset().yOffset <= -RefreshConstants.REFRESH_EFFECTIVE_HEIGHT) {
                            this.state = RefreshState.DRAGGING_REFRESHABLE;
                        }
                        break;
                    case TouchType.Up:
                        if (this.state === RefreshState.DRAGGING_REFRESHABLE) {
                            this.headerOffset = 0;
                            this.state = RefreshState.REFRESHING;
                        }
                        break;
                    default:
                        break;
                }
            });
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.debugLine("view/RefreshComponent.ets(57:7)");
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const observedShallowRender = () => {
                this.observeComponentCreation(itemCreation);
                ListItem.pop();
            };
            const observedDeepRender = () => {
                this.observeComponentCreation(itemCreation);
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("view/RefreshComponent.ets(58:9)");
                    Column.width(CommonConstants.FULL_LENGTH);
                    Column.height(Number(this.displayHeight) + RefreshConstants.REFRESH_LAYOUT_EXTRA_HEIGHT);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    If.create();
                    if (this.headerStyle === RefreshHeaderStyle.DEFAULT) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                __Common__.create();
                                __Common__.height(RefreshConstants.REFRESH_HEADER_HEIGHT);
                                if (!isInitialRender) {
                                    __Common__.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    if (isInitialRender) {
                                        ViewPU.create(new RefreshDefaultHeader(this, {}, undefined, elmtId));
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                            }
                            __Common__.pop();
                        });
                    }
                    else if (this.headerStyle === RefreshHeaderStyle.CLOUD) {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                __Common__.create();
                                __Common__.height(RefreshConstants.REFRESH_HEADER_HEIGHT);
                                if (!isInitialRender) {
                                    __Common__.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    if (isInitialRender) {
                                        ViewPU.create(new RefreshAnimHeader(this, {}, undefined, elmtId));
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                            }
                            __Common__.pop();
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
                    If.create();
                    if (this.itemLayout !== undefined) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.itemLayout.bind(this)();
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
                Column.pop();
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("view/RefreshComponent.ets(58:9)");
                    Column.width(CommonConstants.FULL_LENGTH);
                    Column.height(Number(this.displayHeight) + RefreshConstants.REFRESH_LAYOUT_EXTRA_HEIGHT);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    If.create();
                    if (this.headerStyle === RefreshHeaderStyle.DEFAULT) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                __Common__.create();
                                __Common__.height(RefreshConstants.REFRESH_HEADER_HEIGHT);
                                if (!isInitialRender) {
                                    __Common__.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    if (isInitialRender) {
                                        ViewPU.create(new RefreshDefaultHeader(this, {}, undefined, elmtId));
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                            }
                            __Common__.pop();
                        });
                    }
                    else if (this.headerStyle === RefreshHeaderStyle.CLOUD) {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                __Common__.create();
                                __Common__.height(RefreshConstants.REFRESH_HEADER_HEIGHT);
                                if (!isInitialRender) {
                                    __Common__.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    if (isInitialRender) {
                                        ViewPU.create(new RefreshAnimHeader(this, {}, undefined, elmtId));
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                            }
                            __Common__.pop();
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
                    If.create();
                    if (this.itemLayout !== undefined) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.itemLayout.bind(this)();
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
                Column.pop();
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=RefreshComponent.js.map