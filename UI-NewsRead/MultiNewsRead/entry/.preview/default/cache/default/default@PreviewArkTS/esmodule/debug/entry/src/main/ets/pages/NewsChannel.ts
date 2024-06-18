interface NewsChannel_Params {
    curBp?: string;
    imageAndTextViewModel?;
    newsList?: News[];
}
import ImageAndTextViewModel from "@bundle:com.example.myapplication/entry/ets/viewmodel/ImageAndTextViewModelForNewsChannel";
import LeftTextRightImageBgWhite from "@bundle:com.example.myapplication/entry/ets/view/LeftTextRightImageBgWhite";
import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import type { News } from '../viewmodel/ImageAndTextViewModel';
import Header from "@bundle:com.example.myapplication/entry/ets/view/Header";
class NewsChannel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__curBp = this.createStorageProp('currentBreakpoint', '', "curBp");
        this.imageAndTextViewModel = new ImageAndTextViewModel();
        this.__newsList = new ObservedPropertyObjectPU(this.imageAndTextViewModel.getNewsListByBreakpoint(this.curBp), this, "newsList");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: NewsChannel_Params) {
        if (params.imageAndTextViewModel !== undefined) {
            this.imageAndTextViewModel = params.imageAndTextViewModel;
        }
        if (params.newsList !== undefined) {
            this.newsList = params.newsList;
        }
    }
    updateStateVars(params: NewsChannel_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__curBp.purgeDependencyOnElmtId(rmElmtId);
        this.__newsList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__curBp.aboutToBeDeleted();
        this.__newsList.aboutToBeDeleted();
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
    private imageAndTextViewModel;
    private __newsList: ObservedPropertyObjectPU<News[]>;
    get newsList() {
        return this.__newsList.get();
    }
    set newsList(newValue: News[]) {
        this.__newsList.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NewsChannel.ets(30:5)");
            Column.width(Constants.FULL_WIDTH);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new Header(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsChannel.ets", line: 31 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "Header" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({
                gutter: {
                    x: { md: Constants.GRID_HORIZONTAL_GUTTER[0], lg: Constants.GRID_HORIZONTAL_GUTTER[1] },
                    y: { sm: Constants.GRID_VERTICAL_GUTTER[0], md: Constants.GRID_VERTICAL_GUTTER[1] }
                }
            });
            GridRow.debugLine("entry/src/main/ets/pages/NewsChannel.ets(32:7)");
            GridRow.onBreakpointChange((breakPoints: string) => {
                this.curBp = breakPoints;
                this.newsList = this.imageAndTextViewModel.getNewsListByBreakpoint(breakPoints);
            });
            GridRow.width(Constants.CONTENT_WIDTH);
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const news = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    GridCol.create({
                        span: {
                            sm: Constants.GRID_COL_SPAN[5],
                            md: Constants.GRID_COL_SPAN[4]
                        }
                    });
                    GridCol.debugLine("entry/src/main/ets/pages/NewsChannel.ets(39:11)");
                }, GridCol);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new LeftTextRightImageBgWhite(this, { news }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsChannel.ets", line: 45 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    news
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                news
                            });
                        }
                    }, { name: "LeftTextRightImageBgWhite" });
                }
                GridCol.pop();
            };
            this.forEachUpdateFunction(elmtId, this.newsList, forEachItemGenFunction, (news: News) => news.getNewsID(), false, false);
        }, ForEach);
        ForEach.pop();
        GridRow.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "NewsChannel";
    }
}
registerNamedRoute(() => new NewsChannel(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/NewsChannel" });
