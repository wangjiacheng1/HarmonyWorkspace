import hilog from "@ohos:hilog";
import UIAbility from "@ohos:app.ability.UIAbility";
import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import type Want from "@ohos:app.ability.Want";
import type window from "@ohos:window";
import type common from "@ohos:app.ability.common";
let myContext: common.UIAbilityContext | null = null;
export default class EntryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    }
    onDestroy() {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage) {
        // Main window is created, set main page for this ability
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
        let filesDir = this.context.filesDir;
        AppStorage.setOrCreate('sanBoxFileDir', filesDir);
        myContext = this.context;
        this.getResourceStr();
        windowStage.loadContent('pages/Index', (err, data) => {
            if (err.code) {
                hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
        });
    }
    getResourceStr(): void {
        try {
            if (myContext === null) {
                return;
            }
            myContext.resourceManager.getStringValue({ "id": 16777235, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" }.id)
                .then(value => {
                AppStorage.setOrCreate('copyFileLog1', value);
                hilog.info(0x0000, 'testTag', '%{public}s', 'getStringValue value' + value);
            })
                .catch((error: Error) => {
                hilog.error(0x0000, 'testTag', 'Failed to getStringValue. Cause: %{public}s', error ?? '');
            });
            myContext.resourceManager.getStringValue({ "id": 16777236, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" }.id)
                .then(value => {
                AppStorage.setOrCreate('copyFileLog2', value);
                hilog.info(0x0000, 'testTag', '%{public}s', 'getStringValue value' + value);
            })
                .catch((error: Error) => {
                hilog.error(0x0000, 'testTag', 'Failed to getStringValue. Cause: %{public}s', error ?? '');
            });
            myContext.resourceManager.getStringValue({ "id": 16777237, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" }.id)
                .then(value => {
                AppStorage.setOrCreate('copyFileLog3', value);
                hilog.info(0x0000, 'testTag', '%{public}s', 'getStringValue value' + value);
            })
                .catch((error: Error) => {
                hilog.error(0x0000, 'testTag', 'Failed to getStringValue. Cause: %{public}s', error ?? '');
            });
            myContext.resourceManager.getStringValue({ "id": 16777238, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" }.id)
                .then(value => {
                AppStorage.setOrCreate('copyFileLog4', value);
                hilog.info(0x0000, 'testTag', '%{public}s', 'getStringValue value' + value);
            })
                .catch((error: Error) => {
                hilog.error(0x0000, 'testTag', 'Failed to getStringValue. Cause: %{public}s', error ?? '');
            });
            myContext.resourceManager.getStringValue({ "id": 16777239, "type": 10003, params: [], "bundleName": "com.samples.concurrentmodule", "moduleName": "entry" }.id)
                .then(value => {
                AppStorage.setOrCreate('copyFileLog5', value);
                hilog.info(0x0000, 'testTag', '%{public}s', 'getStringValue value' + value);
            })
                .catch((error: Error) => {
                hilog.error(0x0000, 'testTag', 'Failed to getStringValue. Cause: %{public}s', error ?? '');
            });
        }
        catch (error) {
            hilog.error(0x0000, 'testTag', 'callback getStringValue failed. Cause: %{public}s', (error as Error).message ?? '');
        }
    }
    onWindowStageDestroy() {
        // Main window is destroyed, release UI related resources
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
    }
    onForeground() {
        // Ability has brought to foreground
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
    }
    onBackground() {
        // Ability has back to background
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
    }
}
