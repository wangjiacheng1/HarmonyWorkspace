import Constants from "@bundle:com.example.myapplication/entry/ets/common/Constants";
export default class HotListViewModel {
    private hotList: string[] = [];
    constructor() {
        this.hotList.push(Constants.HOT_LIST[0]);
        this.hotList.push(Constants.HOT_LIST[1]);
        this.hotList.push(Constants.HOT_LIST[2]);
        this.hotList.push(Constants.HOT_LIST[3]);
        this.hotList.push(Constants.HOT_LIST[4]);
        this.hotList.push(Constants.HOT_LIST[5]);
    }
    public getHotList() {
        return this.hotList;
    }
}
