import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
import { News } from "@bundle:com.example.myapplication/entry/ets/viewmodel/ImageAndTextViewModel";
export default class ImageAndTextViewModelForNewsChannel {
    private newsList: News[] = [];
    constructor() {
        this.newsList.push(new News(Constants.NEWS_ID_LIST[0], Constants.NEWS_TITLE[0], [{ "id": 16777233, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[0], Constants.NEWS_TIME_TO_NOW[0], Constants.NEWS_BRIEF[0]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[1], Constants.NEWS_TITLE[7], [{ "id": 16777253, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[0], Constants.NEWS_TIME_TO_NOW[0], Constants.NEWS_BRIEF[1]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[2], Constants.NEWS_TITLE[1], [{ "id": 16777257, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[0], Constants.NEWS_TIME_TO_NOW[0], Constants.NEWS_BRIEF[2]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[3], Constants.NEWS_TITLE[8], [{ "id": 16777234, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[0], Constants.NEWS_TIME_TO_NOW[0], Constants.NEWS_BRIEF[3]));
    }
    public getNewsListByBreakpoint(bp: string = 'sm'): News[] {
        if (bp == 'xs' || bp == 'sm') {
            return [this.newsList[0], this.newsList[2]];
        }
        return this.newsList;
    }
    public getNewsList(): News[] {
        return this.newsList;
    }
    public getNewsListGroup(group: number) {
        const start = 4 * group;
        const end = 4 * (group + 1) - 1;
        return this.newsList.slice(start, end);
    }
}
