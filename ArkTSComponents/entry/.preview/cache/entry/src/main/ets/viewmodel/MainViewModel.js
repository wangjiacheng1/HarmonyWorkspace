/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import ItemData from '@bundle:com.example.component/entry/ets/viewmodel/ItemData';
/**
 * Binds data to components and provides interfaces.
 */
export class MainViewModel {
    /**
     * Get swiper image data.
     *
     * @return {Array<Resource>} swiperImages.
     */
    getSwiperImages() {
        let swiperImages = [
            { "id": 16777389, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
            { "id": 16777393, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
            { "id": 16777391, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
            { "id": 16777387, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }
        ];
        return swiperImages;
    }
    /**
     * Get data of the first grid.
     *
     * @return {Array<PageResource>} firstGridData.
     */
    getFirstGridData() {
        let firstGridData = [
            new ItemData({ "id": 16777352, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777398, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777329, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777316, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777347, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777394, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777370, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777399, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777351, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777314, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777328, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777379, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777325, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777392, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777358, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777373, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" })
        ];
        return firstGridData;
    }
    /**
     * Get data of the second grid.
     *
     * @return {Array<PageResource>} secondGridData.
     */
    getSecondGridData() {
        let secondGridData = [
            new ItemData({ "id": 16777345, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777312, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777344, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777338, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777380, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777343, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777336, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777382, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777341, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777337, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777375, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777342, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" })
        ];
        return secondGridData;
    }
    /**
     * Get data of the setting list.
     *
     * @return {Array<PageResource>} settingListData.
     */
    getSettingListData() {
        let settingListData = [
            new ItemData({ "id": 16777366, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777388, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777369, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777364, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777397, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777365, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777390, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777363, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777385, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777368, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777395, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777367, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777219, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" })
        ];
        return settingListData;
    }
}
export default new MainViewModel();
//# sourceMappingURL=MainViewModel.js.map