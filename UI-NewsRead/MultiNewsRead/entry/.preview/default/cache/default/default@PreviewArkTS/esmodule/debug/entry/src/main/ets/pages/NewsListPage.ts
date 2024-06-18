interface NewsListPage_Params {
    curBp?: string;
    scroller?: Scroller;
    imageAndTextViewModel?;
    multiImageList?: News[];
    newsList?: News[];
    videoList?: News[];
    hotList?: string[];
    topImageBottomTextList?: News[];
}
import HotList from "@bundle:com.example.myapplication/entry/ets/view/HotList";
import LeftTextRightImageBgWhite from "@bundle:com.example.myapplication/entry/ets/view/LeftTextRightImageBgWhite";
import LeftTextRightImageBgGray from "@bundle:com.example.myapplication/entry/ets/view/LeftTextRightImageBgGray";
import NewsWithThreeImage from "@bundle:com.example.myapplication/entry/ets/view/NewsWithImages";
import TopImageBottomText from "@bundle:com.example.myapplication/entry/ets/view/TopImageBottomText";
import TopTextBottomVideo from "@bundle:com.example.myapplication/entry/ets/view/TopTextBottomVideo";
import VideoCard from "@bundle:com.example.myapplication/entry/ets/view/VideoCard";
import Header from "@bundle:com.example.myapplication/entry/ets/view/Header";
import MultiImageViewModel from "@bundle:com.example.myapplication/entry/ets/viewmodel/MultiImageViewModel";
import ImageAndTextViewModel from "@bundle:com.example.myapplication/entry/ets/viewmodel/ImageAndTextViewModel";
import type { News } from "@bundle:com.example.myapplication/entry/ets/viewmodel/ImageAndTextViewModel";
import VideoListViewModel from "@bundle:com.example.myapplication/entry/ets/viewmodel/VideoListViewModel";
import HotListViewModel from "@bundle:com.example.myapplication/entry/ets/viewmodel/HotListViewModel";
import TopImageBottomTextViewModel from "@bundle:com.example.myapplication/entry/ets/viewmodel/TopImageBottomTextViewModel";
import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
class NewsListPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__curBp = this.createStorageProp('currentBreakpoint', '', "curBp");
        this.scroller = new Scroller();
        this.imageAndTextViewModel = new ImageAndTextViewModel();
        this.multiImageList = new MultiImageViewModel().getMultiImageList();
        this.newsList = this.imageAndTextViewModel.getNewsList();
        this.videoList = new VideoListViewModel().getVideoList();
        this.hotList = new HotListViewModel().getHotList();
        this.topImageBottomTextList = new TopImageBottomTextViewModel().getNewsList();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: NewsListPage_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.imageAndTextViewModel !== undefined) {
            this.imageAndTextViewModel = params.imageAndTextViewModel;
        }
        if (params.multiImageList !== undefined) {
            this.multiImageList = params.multiImageList;
        }
        if (params.newsList !== undefined) {
            this.newsList = params.newsList;
        }
        if (params.videoList !== undefined) {
            this.videoList = params.videoList;
        }
        if (params.hotList !== undefined) {
            this.hotList = params.hotList;
        }
        if (params.topImageBottomTextList !== undefined) {
            this.topImageBottomTextList = params.topImageBottomTextList;
        }
    }
    updateStateVars(params: NewsListPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__curBp.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__curBp.aboutToBeDeleted();
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
    private scroller: Scroller;
    private imageAndTextViewModel;
    private multiImageList: News[];
    private newsList: News[];
    private videoList: News[];
    private hotList: string[];
    private topImageBottomTextList: News[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.debugLine("entry/src/main/ets/pages/NewsListPage.ets(44:5)");
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.scrollBar(BarState.On);
            Scroll.scrollBarColor(Color.Gray);
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NewsListPage.ets(45:7)");
            Column.backgroundColor(Color.White);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new Header(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 46 });
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
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NewsListPage.ets(47:9)");
            Column.padding({ "id": 16777278, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Column.width(Constants.FULL_WIDTH);
            Column.backgroundColor(Color.White);
            Column.justifyContent(FlexAlign.Start);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NewsListPage.ets(48:11)");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.curBp === 'xs' || this.curBp === 'sm') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create({
                            space: Constants.LIST_GUTTER
                        });
                        List.debugLine("entry/src/main/ets/pages/NewsListPage.ets(50:15)");
                        List.width(Constants.CONTENT_WIDTH);
                    }, List);
                    {
                        const itemCreation = (elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            itemCreation2(elmtId, isInitialRender);
                            if (!isInitialRender) {
                                ListItem.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        };
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            ListItem.create(deepRenderFunction, true);
                            ListItem.debugLine("entry/src/main/ets/pages/NewsListPage.ets(53:17)");
                        };
                        const deepRenderFunction = (elmtId, isInitialRender) => {
                            itemCreation(elmtId, isInitialRender);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new HotList(this, { hotList: this.hotList }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 54 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                hotList: this.hotList
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            hotList: this.hotList
                                        });
                                    }
                                }, { name: "HotList" });
                            }
                            ListItem.pop();
                        };
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        ListItem.pop();
                    }
                    {
                        const itemCreation = (elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            itemCreation2(elmtId, isInitialRender);
                            if (!isInitialRender) {
                                ListItem.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        };
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            ListItem.create(deepRenderFunction, true);
                            ListItem.debugLine("entry/src/main/ets/pages/NewsListPage.ets(57:17)");
                        };
                        const deepRenderFunction = (elmtId, isInitialRender) => {
                            itemCreation(elmtId, isInitialRender);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new NewsWithThreeImage(this, { news: this.multiImageList[2] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 58 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                news: this.multiImageList[2]
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            news: this.multiImageList[2]
                                        });
                                    }
                                }, { name: "NewsWithThreeImage" });
                            }
                            ListItem.pop();
                        };
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        ListItem.pop();
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const news = _item;
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    itemCreation2(elmtId, isInitialRender);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                    ListItem.debugLine("entry/src/main/ets/pages/NewsListPage.ets(62:19)");
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            if (isInitialRender) {
                                                let componentCall = new LeftTextRightImageBgWhite(this, { news }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 63 });
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
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.imageAndTextViewModel.getNewsListGroup(0), forEachItemGenFunction, (news: News) => news.getNewsID(), false, false);
                    }, ForEach);
                    ForEach.pop();
                    {
                        const itemCreation = (elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            itemCreation2(elmtId, isInitialRender);
                            if (!isInitialRender) {
                                ListItem.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        };
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            ListItem.create(deepRenderFunction, true);
                            ListItem.debugLine("entry/src/main/ets/pages/NewsListPage.ets(68:17)");
                        };
                        const deepRenderFunction = (elmtId, isInitialRender) => {
                            itemCreation(elmtId, isInitialRender);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new TopTextBottomVideo(this, { news: this.videoList[0] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 69 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                news: this.videoList[0]
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            news: this.videoList[0]
                                        });
                                    }
                                }, { name: "TopTextBottomVideo" });
                            }
                            ListItem.pop();
                        };
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        ListItem.pop();
                    }
                    {
                        const itemCreation = (elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            itemCreation2(elmtId, isInitialRender);
                            if (!isInitialRender) {
                                ListItem.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        };
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            ListItem.create(deepRenderFunction, true);
                            ListItem.debugLine("entry/src/main/ets/pages/NewsListPage.ets(72:17)");
                        };
                        const deepRenderFunction = (elmtId, isInitialRender) => {
                            itemCreation(elmtId, isInitialRender);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new NewsWithThreeImage(this, { news: this.multiImageList[3] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 73 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                news: this.multiImageList[3]
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            news: this.multiImageList[3]
                                        });
                                    }
                                }, { name: "NewsWithThreeImage" });
                            }
                            ListItem.pop();
                        };
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        ListItem.pop();
                    }
                    {
                        const itemCreation = (elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            itemCreation2(elmtId, isInitialRender);
                            if (!isInitialRender) {
                                ListItem.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        };
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            ListItem.create(deepRenderFunction, true);
                            ListItem.debugLine("entry/src/main/ets/pages/NewsListPage.ets(76:17)");
                        };
                        const deepRenderFunction = (elmtId, isInitialRender) => {
                            itemCreation(elmtId, isInitialRender);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new NewsWithThreeImage(this, { news: this.multiImageList[4] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 77 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                news: this.multiImageList[4]
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            news: this.multiImageList[4]
                                        });
                                    }
                                }, { name: "NewsWithThreeImage" });
                            }
                            ListItem.pop();
                        };
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        ListItem.pop();
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const news = _item;
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    itemCreation2(elmtId, isInitialRender);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                    ListItem.debugLine("entry/src/main/ets/pages/NewsListPage.ets(81:19)");
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            if (isInitialRender) {
                                                let componentCall = new LeftTextRightImageBgWhite(this, { news }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 82 });
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
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.imageAndTextViewModel.getNewsListGroup(1), forEachItemGenFunction, (news: News) => news.getNewsID(), false, false);
                    }, ForEach);
                    ForEach.pop();
                    {
                        const itemCreation = (elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            itemCreation2(elmtId, isInitialRender);
                            if (!isInitialRender) {
                                ListItem.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        };
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            ListItem.create(deepRenderFunction, true);
                            ListItem.debugLine("entry/src/main/ets/pages/NewsListPage.ets(87:17)");
                        };
                        const deepRenderFunction = (elmtId, isInitialRender) => {
                            itemCreation(elmtId, isInitialRender);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new TopTextBottomVideo(this, { news: this.videoList[1] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 88 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                news: this.videoList[1]
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            news: this.videoList[1]
                                        });
                                    }
                                }, { name: "TopTextBottomVideo" });
                            }
                            ListItem.pop();
                        };
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        ListItem.pop();
                    }
                    List.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridRow.create({
                            columns: {
                                md: Constants.GRID_ROW_COLUMNS[1],
                                lg: Constants.GRID_ROW_COLUMNS[2]
                            },
                            gutter: { "id": 16777297, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
                        });
                        GridRow.debugLine("entry/src/main/ets/pages/NewsListPage.ets(94:15)");
                    }, GridRow);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create();
                        GridCol.debugLine("entry/src/main/ets/pages/NewsListPage.ets(101:17)");
                    }, GridCol);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new HotList(this, { hotList: this.hotList }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 102 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        hotList: this.hotList
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    hotList: this.hotList
                                });
                            }
                        }, { name: "HotList" });
                    }
                    GridCol.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create();
                        GridCol.debugLine("entry/src/main/ets/pages/NewsListPage.ets(105:17)");
                    }, GridCol);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TopImageBottomText(this, { news: this.topImageBottomTextList[0] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 106 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        news: this.topImageBottomTextList[0]
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    news: this.topImageBottomTextList[0]
                                });
                            }
                        }, { name: "TopImageBottomText" });
                    }
                    GridCol.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create();
                        GridCol.debugLine("entry/src/main/ets/pages/NewsListPage.ets(109:17)");
                    }, GridCol);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/NewsListPage.ets(110:19)");
                        Column.height({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Column.justifyContent(FlexAlign.SpaceBetween);
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LeftTextRightImageBgGray(this, { news: this.newsList[0] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 111 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        news: this.newsList[0]
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    news: this.newsList[0]
                                });
                            }
                        }, { name: "LeftTextRightImageBgGray" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LeftTextRightImageBgGray(this, { news: this.newsList[1] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 112 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        news: this.newsList[1]
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    news: this.newsList[1]
                                });
                            }
                        }, { name: "LeftTextRightImageBgGray" });
                    }
                    Column.pop();
                    GridCol.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create();
                        GridCol.debugLine("entry/src/main/ets/pages/NewsListPage.ets(118:17)");
                    }, GridCol);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/NewsListPage.ets(119:19)");
                        Column.height({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Column.justifyContent(FlexAlign.SpaceBetween);
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LeftTextRightImageBgGray(this, { news: this.newsList[2] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 120 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        news: this.newsList[2]
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    news: this.newsList[2]
                                });
                            }
                        }, { name: "LeftTextRightImageBgGray" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LeftTextRightImageBgGray(this, { news: this.newsList[3] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 121 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        news: this.newsList[3]
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    news: this.newsList[3]
                                });
                            }
                        }, { name: "LeftTextRightImageBgGray" });
                    }
                    Column.pop();
                    GridCol.pop();
                    GridRow.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridRow.create({
                            columns: Constants.GRID_ALL_COLUMNS,
                            gutter: { "id": 16777284, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
                        });
                        GridRow.debugLine("entry/src/main/ets/pages/NewsListPage.ets(129:15)");
                        GridRow.margin({ top: { "id": 16777284, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" } });
                    }, GridRow);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create({
                            span: {
                                md: Constants.GRID_COLUMN_SPAN[2],
                                lg: Constants.GRID_COLUMN_SPAN[1]
                            }
                        });
                        GridCol.debugLine("entry/src/main/ets/pages/NewsListPage.ets(133:17)");
                    }, GridCol);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new VideoCard(this, { news: this.videoList[0] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 139 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        news: this.videoList[0]
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    news: this.videoList[0]
                                });
                            }
                        }, { name: "VideoCard" });
                    }
                    GridCol.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create({
                            span: {
                                md: Constants.GRID_COLUMN_SPAN[1],
                                lg: Constants.GRID_COLUMN_SPAN[0]
                            }
                        });
                        GridCol.debugLine("entry/src/main/ets/pages/NewsListPage.ets(142:17)");
                    }, GridCol);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TopImageBottomText(this, { news: this.topImageBottomTextList[1] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 148 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        news: this.topImageBottomTextList[1]
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    news: this.topImageBottomTextList[1]
                                });
                            }
                        }, { name: "TopImageBottomText" });
                    }
                    GridCol.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create({
                            span: {
                                md: Constants.GRID_COLUMN_SPAN[1],
                                lg: Constants.GRID_COLUMN_SPAN[0]
                            }
                        });
                        GridCol.debugLine("entry/src/main/ets/pages/NewsListPage.ets(152:17)");
                    }, GridCol);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TopImageBottomText(this, { news: this.topImageBottomTextList[2] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 158 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        news: this.topImageBottomTextList[2]
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    news: this.topImageBottomTextList[2]
                                });
                            }
                        }, { name: "TopImageBottomText" });
                    }
                    GridCol.pop();
                    GridRow.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridRow.create({
                            columns: Constants.GRID_ALL_COLUMNS,
                            gutter: { "id": 16777284, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
                        });
                        GridRow.debugLine("entry/src/main/ets/pages/NewsListPage.ets(163:15)");
                        GridRow.margin({ top: { "id": 16777284, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" } });
                    }, GridRow);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create({
                            span: {
                                md: Constants.GRID_COLUMN_SPAN[1],
                                lg: Constants.GRID_COLUMN_SPAN[0]
                            }
                        });
                        GridCol.debugLine("entry/src/main/ets/pages/NewsListPage.ets(167:17)");
                    }, GridCol);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/NewsListPage.ets(173:19)");
                        Column.height({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Column.justifyContent(FlexAlign.SpaceBetween);
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LeftTextRightImageBgGray(this, { news: this.newsList[4] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 174 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        news: this.newsList[4]
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    news: this.newsList[4]
                                });
                            }
                        }, { name: "LeftTextRightImageBgGray" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LeftTextRightImageBgGray(this, { news: this.newsList[5] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 175 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        news: this.newsList[5]
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    news: this.newsList[5]
                                });
                            }
                        }, { name: "LeftTextRightImageBgGray" });
                    }
                    Column.pop();
                    GridCol.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create({
                            span: {
                                md: Constants.GRID_COLUMN_SPAN[1],
                                lg: Constants.GRID_COLUMN_SPAN[0]
                            }
                        });
                        GridCol.debugLine("entry/src/main/ets/pages/NewsListPage.ets(182:17)");
                    }, GridCol);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/NewsListPage.ets(188:19)");
                        Column.height({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Column.justifyContent(FlexAlign.SpaceBetween);
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LeftTextRightImageBgGray(this, { news: this.newsList[6] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 189 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        news: this.newsList[6]
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    news: this.newsList[6]
                                });
                            }
                        }, { name: "LeftTextRightImageBgGray" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LeftTextRightImageBgGray(this, { news: this.newsList[7] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 190 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        news: this.newsList[7]
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    news: this.newsList[7]
                                });
                            }
                        }, { name: "LeftTextRightImageBgGray" });
                    }
                    Column.pop();
                    GridCol.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create({
                            span: {
                                md: Constants.GRID_COLUMN_SPAN[2],
                                lg: Constants.GRID_COLUMN_SPAN[1]
                            }
                        });
                        GridCol.debugLine("entry/src/main/ets/pages/NewsListPage.ets(197:17)");
                    }, GridCol);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new VideoCard(this, { news: this.videoList[1] }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsListPage.ets", line: 203 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        news: this.videoList[1]
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    news: this.videoList[1]
                                });
                            }
                        }, { name: "VideoCard" });
                    }
                    GridCol.pop();
                    GridRow.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "NewsListPage";
    }
}
registerNamedRoute(() => new NewsListPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/NewsListPage" });
