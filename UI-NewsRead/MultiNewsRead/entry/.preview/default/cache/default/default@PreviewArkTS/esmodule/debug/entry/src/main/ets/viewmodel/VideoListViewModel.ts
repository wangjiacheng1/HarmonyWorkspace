import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import { News } from "@bundle:com.example.myapplication/entry/ets/viewmodel/ImageAndTextViewModel";
export default class VideoListViewModel {
    private videoList: News[] = [];
    constructor() {
        this.videoList.push(new News(Constants.NEWS_ID_LIST[0], Constants.NEWS_TITLE[14], [{ "id": 16777220, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0], Constants.EMPTY_STRING, Constants.VIDEO_DURATION));
        this.videoList.push(new News(Constants.NEWS_ID_LIST[1], Constants.NEWS_TITLE[15], [{ "id": 16777219, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0], Constants.EMPTY_STRING, Constants.VIDEO_DURATION));
    }
    public getVideoList(): News[] {
        return this.videoList;
    }
}
