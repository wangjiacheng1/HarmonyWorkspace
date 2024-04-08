import ClassifyModel from '@bundle:com.huawei.animaterefresh/entry/ets/viewmodel/AnimationModel';
import CardModel from '@bundle:com.huawei.animaterefresh/entry/ets/viewmodel/CardModel';
import { GlobalContext } from '@bundle:com.huawei.animaterefresh/entry/ets/common/utils/GlobalContext';
let deviceDisplay = GlobalContext.getContext().getObject('display');
/**
 * constant about common feature
 */
export default class CommonConstants {
}
/**
 * common full length
 */
CommonConstants.FULL_LENGTH = '100%';
/**
 * refresh header item width
 */
CommonConstants.REFRESH_HEADER_ITEM_DEFAULT_WIDTH = 30;
/**
 * refresh header item scale width
 */
CommonConstants.REFRESH_HEADER_ITEM_SCALE_WIDTH = 80;
/**
 * refresh default time out
 */
CommonConstants.REFRESH_DEFAULT_TIMEOUT = 6000;
/**
 * refresh header item animation duration
 */
CommonConstants.REFRESH_HEADER_ITEM_ANIM_DURATION = 2000;
/**
 * refresh header item animation temp
 */
CommonConstants.REFRESH_HEADER_ITEM_ANIM_TEMPO = 3.0;
/**
 * refresh header item animation ITERATIONS
 */
CommonConstants.REFRESH_HEADER_ITEM_ANIM_ITERATIONS = -1;
/**
 * refresh header item feature
 */
CommonConstants.REFRESH_HEADER_FEATURE = [
    new ClassifyModel({ "id": 16777249, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, (px2vp(deviceDisplay.width) / 2 - CommonConstants.REFRESH_HEADER_ITEM_DEFAULT_WIDTH / 2) - 100, 400),
    new ClassifyModel({ "id": 16777219, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, (px2vp(deviceDisplay.width) / 2 - CommonConstants.REFRESH_HEADER_ITEM_DEFAULT_WIDTH / 2) - 50, 800),
    new ClassifyModel({ "id": 16777235, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, px2vp(deviceDisplay.width) / 2 - CommonConstants.REFRESH_HEADER_ITEM_DEFAULT_WIDTH / 2, 1200),
    new ClassifyModel({ "id": 16777220, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, (px2vp(deviceDisplay.width) / 2 - CommonConstants.REFRESH_HEADER_ITEM_DEFAULT_WIDTH / 2) + 50, 1600),
    new ClassifyModel({ "id": 16777221, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, (px2vp(deviceDisplay.width) / 2 - CommonConstants.REFRESH_HEADER_ITEM_DEFAULT_WIDTH / 2) + 100, 2000)
];
/**
 * refresh header item width
 */
CommonConstants.FILE_MANAGER_Z_INDEX = 1;
/**
 * index default select
 */
CommonConstants.INDEX_DEFAULT_SELECT = 1;
/**
 * index tab item feature
 */
CommonConstants.INDEX_TAB = [
    new CardModel({ "id": 16777255, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, { "id": 16777252, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, '首页'),
    new CardModel({ "id": 16777254, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, { "id": 16777250, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, '文件'),
    new CardModel({ "id": 16777248, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, { "id": 16777218, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, '云村'),
    new CardModel({ "id": 16777233, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, { "id": 16777234, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, '备份'),
    new CardModel({ "id": 16777237, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, { "id": 16777251, "type": 20000, params: [], "bundleName": "com.huawei.animaterefresh", "moduleName": "entry" }, '我的')
];
//# sourceMappingURL=CommonConstants.js.map