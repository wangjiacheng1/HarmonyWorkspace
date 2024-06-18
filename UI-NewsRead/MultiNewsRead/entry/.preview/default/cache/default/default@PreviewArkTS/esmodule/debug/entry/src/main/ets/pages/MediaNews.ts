interface MediaNews_Params {
    curBp?: string;
    multiImageViewModel?;
    newsList?: News[];
}
import NewsWithThreeImages from "@bundle:com.example.myapplication/entry/ets/view/NewsWithImages";
import MultiImageViewModel from "@bundle:com.example.myapplication/entry/ets/viewmodel/MultiImageViewModelForMediaNews";
import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import type { News } from '../viewmodel/ImageAndTextViewModel';
import Header from "@bundle:com.example.myapplication/entry/ets/view/Header";
class MediaNews extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__curBp = this.createStorageProp('currentBreakpoint', '', "curBp");
        this.multiImageViewModel = new MultiImageViewModel();
        this.__newsList = new ObservedPropertyObjectPU(this.multiImageViewModel.getNewsListByBreakpoint(this.curBp), this, "newsList");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: MediaNews_Params) {
        if (params.multiImageViewModel !== undefined) {
            this.multiImageViewModel = params.multiImageViewModel;
        }
        if (params.newsList !== undefined) {
            this.newsList = params.newsList;
        }
    }
    updateStateVars(params: MediaNews_Params) {
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
    private multiImageViewModel;
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
            Column.debugLine("entry/src/main/ets/pages/MediaNews.ets(30:5)");
            Column.width(Constants.FULL_WIDTH);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new Header(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MediaNews.ets", line: 31 });
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
                gutter: { "id": 16777285, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
            });
            GridRow.debugLine("entry/src/main/ets/pages/MediaNews.ets(32:7)");
            GridRow.onBreakpointChange((breakPoints: string) => {
                this.curBp = breakPoints;
                this.newsList = this.multiImageViewModel.getNewsListByBreakpoint(breakPoints);
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
                            lg: Constants.GRID_COL_SPAN[4]
                        }
                    });
                    GridCol.debugLine("entry/src/main/ets/pages/MediaNews.ets(36:11)");
                }, GridCol);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new NewsWithThreeImages(this, { news }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MediaNews.ets", line: 42 });
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
                    }, { name: "NewsWithThreeImages" });
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
        return "MediaNews";
    }
}
registerNamedRoute(() => new MediaNews(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/MediaNews" });
