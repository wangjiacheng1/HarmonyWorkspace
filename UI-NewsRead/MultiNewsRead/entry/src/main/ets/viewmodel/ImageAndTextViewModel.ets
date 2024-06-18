/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Constants from '../common/Constants';

export default class ImageAndTextViewModel {
  private newsList: News[] = [];

  constructor() {
    this.newsList.push(new News(Constants.NEWS_ID_LIST[0], Constants.NEWS_TITLE[0], [$r("app.media.list_to_grid_01")],
      Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
    this.newsList.push(new News(Constants.NEWS_ID_LIST[1], Constants.NEWS_TITLE[1], [$r("app.media.list_to_grid_02")],
      Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
    this.newsList.push(new News(Constants.NEWS_ID_LIST[2], Constants.NEWS_TITLE[2], [$r("app.media.list_to_grid_05")],
      Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
    this.newsList.push(new News(Constants.NEWS_ID_LIST[3], Constants.NEWS_TITLE[3], [$r("app.media.list_to_grid_14")],
      Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
    this.newsList.push(new News(Constants.NEWS_ID_LIST[4], Constants.NEWS_TITLE[4], [$r("app.media.list_to_grid_09")],
      Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
    this.newsList.push(new News(Constants.NEWS_ID_LIST[5], Constants.NEWS_TITLE[5], [$r("app.media.list_to_grid_10")],
      Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
    this.newsList.push(new News(Constants.NEWS_ID_LIST[6], Constants.NEWS_TITLE[6], [$r("app.media.list_to_grid_11")],
      Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
    this.newsList.push(new News(Constants.NEWS_ID_LIST[7], Constants.NEWS_TITLE[7], [$r("app.media.list_to_grid_12")],
      Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]));
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

  constructor(id: string = "",
              title: string,
              image: Resource[],
              publisher: string,
              timeToNow: string,
              brief: string = "",
              duration: string = ""
  ) {
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