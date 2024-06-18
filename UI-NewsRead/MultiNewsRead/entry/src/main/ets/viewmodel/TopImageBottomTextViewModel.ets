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

export default class TopImageBottomTextViewModel {
  private newsList: News[] = [];

  constructor() {
    this.newsList.push(new News(Constants.NEWS_ID_LIST[0], Constants.NEWS_TITLE[11],
      [$r("app.media.top_image_bottom_text_3")], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[1]
    ));
    this.newsList.push(new News(Constants.NEWS_ID_LIST[1], Constants.NEWS_TITLE[12],
      [$r("app.media.top_image_bottom_text_1")], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]
    ));
    this.newsList.push(new News(Constants.NEWS_ID_LIST[2], Constants.NEWS_TITLE[13],
      [$r("app.media.top_image_bottom_text_2")], Constants.NEWS_PUBLISHER[1], Constants.NEWS_TIME_TO_NOW[0]
    ));
  }

  getNewsList() {
    return this.newsList;
  }
}