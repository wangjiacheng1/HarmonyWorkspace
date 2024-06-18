import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import { News } from "@bundle:com.example.myapplication/entry/ets/viewmodel/ImageAndTextViewModel";
export default class MultiImageViewModelForMediaNews {
    private newsList: News[] = [];
    constructor() {
        this.newsList.push(new News(Constants.NEWS_ID_LIST[0], Constants.NEWS_TITLE[9], [
            { "id": 16777230, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
            { "id": 16777231, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
            { "id": 16777268, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
        ], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[1]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[1], Constants.NEWS_TITLE[10], [
            { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
            { "id": 16777236, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
            { "id": 16777261, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
        ], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[1]));
    }
    public getNewsListByBreakpoint(bp: string = 'sm'): News[] {
        if (bp == 'xs' || bp == 'sm' || bp == 'md') {
            return [this.newsList[0]];
        }
        return this.newsList;
    }
    public getMultiImageList(): News[] {
        return this.newsList;
    }
}
