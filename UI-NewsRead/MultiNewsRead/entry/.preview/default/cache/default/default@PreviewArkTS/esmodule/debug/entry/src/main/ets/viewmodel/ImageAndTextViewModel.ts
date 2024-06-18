import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
export default class ImageAndTextViewModel {
    private newsList: News[] = [];
    constructor() {
        this.newsList.push(new News(Constants.NEWS_ID_LIST[0], Constants.NEWS_TITLE[0], [{ "id": 16777233, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[1], Constants.NEWS_TITLE[1], [{ "id": 16777257, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[2], Constants.NEWS_TITLE[2], [{ "id": 16777267, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[3], Constants.NEWS_TITLE[3], [{ "id": 16777269, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[4], Constants.NEWS_TITLE[4], [{ "id": 16777223, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[5], Constants.NEWS_TITLE[5], [{ "id": 16777262, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[6], Constants.NEWS_TITLE[6], [{ "id": 16777250, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
        this.newsList.push(new News(Constants.NEWS_ID_LIST[7], Constants.NEWS_TITLE[7], [{ "id": 16777260, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
    }
    public getNewsList(): News[] {
        return this.newsList;
    }
    public getNewsListGroup(group: number) {
        const start = 4 * group;
        const end = 4 * (group + 1);
        return this.newsList.slice(start, end);
    }
}
export class News {
    /**
     * News id
     */
    private id: string = "";
    /**
     * News title
     */
    private title: string = "";
    /**
     * News images
     */
    private image: Resource[] = [];
    /**
     * News brief
     */
    private brief: string = "";
    /**
     * News publisher
     */
    private publisher: string = "";
    /**
     * News timeToNow
     */
    private timeToNow: string = "";
    /**
     * News duration
     */
    private duration: string = "";
    constructor(id: string = "", title: string, image: Resource[], publisher: string, timeToNow: string, brief: string = "", duration: string = "") {
        this.id = id;
        this.title = title;
        this.image = image;
        this.publisher = publisher;
        this.timeToNow = timeToNow;
        this.brief = brief;
        this.duration = duration;
    }
    getNewsID(): string {
        return this.id;
    }
    getTitle(): string {
        return this.title;
    }
    getFirstImage(): Resource {
        return this.image[0];
    }
    getImages(): Resource[] {
        return this.image;
    }
    getBrief(): string {
        return this.brief;
    }
    getPublisher(): string {
        return this.publisher;
    }
    getTimeToNow(): string {
        return this.timeToNow;
    }
    getDuration(): string {
        return this.duration;
    }
}
