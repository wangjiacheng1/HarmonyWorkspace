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

import { router } from '@kit.ArkUI';
import Constants, { Route } from '../common/Constants';
import { BreakpointSystem } from '../common/BreakpointSystem';

@Entry
@Component
struct Index {
  @StorageProp('currentBreakpoint') curBp: string = Constants.BREAKPOINTS[1];
  private routes: Route[] = Constants.ROUTES;
  private breakpointSystem: BreakpointSystem = new BreakpointSystem();

  aboutToAppear() {
    this.breakpointSystem.register();
  }

  aboutToDisappear() {
    this.breakpointSystem.unregister();
  }

  build() {
    Column() {
      Text($r("app.string.project_name"))
        .fontSize($r("app.float.title_font_size"))
        .margin(Constants.ELEMENT_SPACE)
      List({ space: Constants.ELEMENT_SPACE }) {
        ForEach(this.routes, (item: Route) => {
          ListItem() {
            Button(item.text)
              .onClick(() => {
                router.pushUrl({
                  url: 'pages/' + item.to
                });
              })
              .width(Constants.FULL_WIDTH)
          }
        }, (item: Route) => JSON.stringify(item))
      }
      .width(Constants.CONTENT_WIDTH)
      .height(Constants.FULL_HEIGHT)

    }
    .width(Constants.FULL_WIDTH)
    .height(Constants.FULL_HEIGHT)
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Start)

  }
}

