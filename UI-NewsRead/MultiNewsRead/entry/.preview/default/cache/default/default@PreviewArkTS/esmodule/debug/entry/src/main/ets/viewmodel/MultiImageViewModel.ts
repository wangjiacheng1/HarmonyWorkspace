import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import { News } from "@bundle:com.example.myapplication/entry/ets/viewmodel/ImageAndTextViewModel";
export default class MultiImageViewModel {
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
        this.newsList.push(new News(Constants.NEWS_ID_LIST[2], Constants.NEWS_TITLE[11], [
            { "id": 16777271, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
            { "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
            { "id": 16777264, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
        ], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[1]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[3], Constants.NEWS_TITLE[12], [
            { "id": 16777218, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
            { "id": 16777265, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
            { "id": 16777232, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
        ], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[4], Constants.NEWS_TITLE[13], [
            { "id": 16777252, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
            { "id": 16777254, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
            { "id": 16777270, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
        ], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
    }
    public getMultiImageList(): News[] {
        return this.newsList;
    }
}
