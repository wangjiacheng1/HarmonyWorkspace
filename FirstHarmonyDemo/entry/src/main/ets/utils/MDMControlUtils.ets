
import Want from '@ohos.app.ability.Want'
// import adminManager from '@ohos.enterprise.adminManager';

export default class MDMControlUtils{

  static readonly MDM_BUNDLE_NAME: string = "com.example.firstharmonydemo"
  static readonly MDM_ABILITY_NAME: string = "EntryAbility"

  static wantTemp: Want = {
    bundleName:MDMControlUtils.MDM_BUNDLE_NAME,
    abilityName:MDMControlUtils.MDM_ABILITY_NAME
  };

  // static enableAdmin(){
  //   adminManager
  // }
}