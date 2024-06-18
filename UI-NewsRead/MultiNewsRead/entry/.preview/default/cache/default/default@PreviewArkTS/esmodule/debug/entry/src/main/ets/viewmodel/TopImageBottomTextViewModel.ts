import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import { News } from "@bundle:com.example.myapplication/entry/ets/viewmodel/ImageAndTextViewModel";
export default class TopImageBottomTextViewModel {
    private newsList: News[] = [];
    constructor() {
        this.newsList.push(new News(Constants.NEWS_ID_LIST[0], Constants.NEWS_TITLE[11], [{ "id": 16777266, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[1]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[1], Constants.NEWS_TITLE[12], [{ "id": 16777222, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[2], Constants.NEWS_TITLE[13], [{ "id": 16777224, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
    }
    getNewsList() {
        return this.newsList;
    }
}
