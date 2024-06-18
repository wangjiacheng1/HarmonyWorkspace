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
import { News } from './ImageAndTextViewModel';

export default class ImageAndTextViewModelForNewsChannel {
  private newsList: News[] = [];

  constructor() {
    this.newsList.push(new News(Constants.NEWS_ID_LIST[0], Constants.NEWS_TITLE[0], [$r("app.media.list_to_grid_01")],
      Constants.NEWS_PUBLISHER[0], Constants.NEWS_TIME_TO_NOW[0], Constants.NEWS_BRIEF[0]));
    this.newsList.push(new News(Constants.NEWS_ID_LIST[1], Constants.NEWS_TITLE[7], [$r("app.media.list_to_grid_03")],
      Constants.NEWS_PUBLISHER[0], Constants.NEWS_TIME_TO_NOW[0], Constants.NEWS_BRIEF[1]));
    this.newsList.push(new News(Constants.NEWS_ID_LIST[2], Constants.NEWS_TITLE[1], [$r("app.media.list_to_grid_02")],
      Constants.NEWS_PUBLISHER[0], Constants.NEWS_TIME_TO_NOW[0], Constants.NEWS_BRIEF[2]));
    this.newsList.push(new News(Constants.NEWS_ID_LIST[3], Constants.NEWS_TITLE[8], [$r("app.media.list_to_grid_04")],
      Constants.NEWS_PUBLISHER[0], Constants.NEWS_TIME_TO_NOW[0], Constants.NEWS_BRIEF[3]));
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