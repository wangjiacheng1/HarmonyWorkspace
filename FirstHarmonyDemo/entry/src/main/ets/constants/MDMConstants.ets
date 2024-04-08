import Want from '@ohos.application.Want'
import enterpriseDeviceManager from '@ohos.enterpriseDeviceManager';
import CommonConstants from './CommonConstants';

export default class MDMConstants{

  static readonly wantTemp:Want = {
    bundleName: CommonConstants.APP_BUNDLE_NAME,
    abilityName: CommonConstants.ENTRY_ABILITY_NAME
  }

  static readonly enterpriseInfo:enterpriseDeviceManager.EnterpriseInfo = {
    name:"奇安信",
    description:"奇安信网神信息技术（北京）股份有限公司"
  }
}