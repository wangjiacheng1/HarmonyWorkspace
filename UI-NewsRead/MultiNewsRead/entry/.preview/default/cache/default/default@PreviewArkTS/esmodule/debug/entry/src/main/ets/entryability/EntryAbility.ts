import UIAbility from "@ohos:app.ability.UIAbility";
import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import type Want from "@ohos:app.ability.Want";
import display from "@ohos:display";
import type window from "@ohos:window";
import hilog from "@ohos:hilog";
export default class EntryAbility extends UIAbility {
    private windowObj?: window.Window;
    private curBp: string = '';
    private updateBreakpoint(windowWidth: number): void {
        let windowWidthVp = windowWidth / display.getDefaultDisplaySync().densityPixels;
        let newBp: string = '';
        if (windowWidthVp < 320) {
            newBp = 'xs';
        }
        else if (windowWidthVp < 600) {
            newBp = 'sm';
        }
        else if (windowWidthVp < 840) {
            newBp = 'md';
        }
        else {
            newBp = 'lg';
        }
        if (this.curBp !== newBp) {
            this.curBp = newBp;
            AppStorage.setOrCreate('currentBreakpoint', this.curBp);
        }
    }
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    }
    onDestroy(): void {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        windowStage.getMainWindow().then((windowObj) => {
            this.windowObj = windowObj;
            this.updateBreakpoint(windowObj.getWindowProperties().windowRect.width);
            windowObj.on('windowSizeChange', (windowSize) => {
                this.updateBreakpoint(windowSize.width);
            });
        });
        windowStage.loadContent('pages/Index', (err, data) => {
            if (err.code) {
                hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
        });
    }
    onWindowStageDestroy(): void {
        // Main window is destroyed, release UI related resources
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
        if (this.windowObj) {
            this.windowObj.off('windowSizeChange');
        }
    }
    onForeground(): void {
        // Ability has brought to foreground
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
    }
    onBackground(): void {
        // Ability has back to background
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
    }
}
