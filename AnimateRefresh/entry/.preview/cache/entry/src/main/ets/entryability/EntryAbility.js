import display from '@ohos:display';
import Ability from '@ohos:app.ability.UIAbility';
import { GlobalContext } from '@bundle:com.huawei.animaterefresh/entry/ets/common/utils/GlobalContext';
export default class EntryAbility extends Ability {
    onCreate(want) {
        GlobalContext.getContext().setObject('abilityWant', want);
    }
    async onWindowStageCreate(windowStage) {
        GlobalContext.getContext().setObject('display', await display.getDefaultDisplaySync());
        windowStage.loadContent('pages/TabIndex');
    }
}
;
//# sourceMappingURL=EntryAbility.js.map