import { HarmonyController } from './HarmonyController';
import { systemManager } from '@kit.MDMKit';
import MDMConstants, { adminWant } from '../common/MDMConstants';
import LogUtils from '../utils/LogUtils';
import TextUtils from '../utils/TextUtils';
import TypeUtils from '../utils/TypeUtils';
import { PreferenceManager } from '../data/PreferenceManager';
import { ResponseUtils } from '../utils/ResponseUtils';

const TAG_LAST_SYSTEM_UPDATE_VERSION = "tag_last_system_update_version"

/**
 * 禁用系统升级
 */
export class SystemUpgradeController implements HarmonyController {

  TAG: string = "SystemUpgradeController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "paramValue = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    let paramObj: SystemUpgradeControlParam = JSON.parse(paramValue) as SystemUpgradeControlParam
    if (!this.isParamValid(paramObj)) {
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    let isDisable = paramObj.policyType === "1"
    try{
      this.saveLastUpdateConfig()
      let policy: systemManager.OtaUpdatePolicy
      if (isDisable) {
        policy = this.getDisableUpdateConfig()
      }else {
        policy = this.getDefaultUpdateConfig()
      }
      systemManager.setOtaUpdatePolicy(adminWant, policy)
      LogUtils.debug(this.TAG, "set system upgrade police success")
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    }catch (err){
      LogUtils.error(this.TAG, "SystemUpgradeController catch error, param = " + paramValue + ", err = " + JSON.stringify(err))
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  getStatus(): Promise<string> {
    let isDisabled = this.isDisabled()
    let result = isDisabled ? MDMConstants.FLAG_FORCE_CLOSE : MDMConstants.FLAG_DEFAULT
    return Promise.resolve(result)
  }

  reset(): void {
    try{
      let policy = this.getDefaultUpdateConfig()
      systemManager.setOtaUpdatePolicy(adminWant, policy)
      LogUtils.info(this.TAG, "reset success")
    }catch (err){
      LogUtils.error(this.TAG, "reset catch err: " + JSON.stringify(err))
    }
  }

  /**
   * 构建禁用系统升级的OtaUpdatePolicy对象
   * @returns
   */
  getDisableUpdateConfig(): systemManager.OtaUpdatePolicy {
    let prohibit: systemManager.OtaUpdatePolicy = {
      "policyType": systemManager.PolicyType.PROHIBIT,
      "version": this.getLastUpdateVersion(),
    };
    return prohibit
  }

  /**
   * 构建默认升级策略的OtaUpdatePolicy对象，用于恢复策略
   * @returns
   */
  getDefaultUpdateConfig(): systemManager.OtaUpdatePolicy {
    let defaultPolicy: systemManager.OtaUpdatePolicy = {
      "policyType": systemManager.PolicyType.DEFAULT,
      "version": this.getLastUpdateVersion(),
    };
    return defaultPolicy
  }

  /**
   * 保存上次的系统升级配置，用于禁用后恢复
   */
  saveLastUpdateConfig() {
    try {
      let lastPolicy = systemManager.getOtaUpdatePolicy(adminWant)
      let policyType = lastPolicy.policyType
      let lastVersion = lastPolicy.version
      if (policyType != systemManager.PolicyType.PROHIBIT) {
        //当上次系统升级配置不是禁止升级时，才保存原配置版本号，否则可能会被禁止升级策略影响
        PreferenceManager.getInstance().setStringSync(TAG_LAST_SYSTEM_UPDATE_VERSION, lastVersion)
      }
    }catch (err){
      LogUtils.error(this.TAG, "saveLastUpdateConfig catch err: " + JSON.stringify(err))
    }
  }

  /**
   * 获取保存的系统升级配置的版本号，用户禁用后恢复
   * @returns
   */
  getLastUpdateVersion(): string {
    let lastVersion = PreferenceManager.getInstance().getStringSync(TAG_LAST_SYSTEM_UPDATE_VERSION, "")
    return lastVersion
  }

  isDisabled(): boolean {
    try {
      let lastPolicy = systemManager.getOtaUpdatePolicy(adminWant)
      let policyType = lastPolicy.policyType
      return policyType === systemManager.PolicyType.PROHIBIT
    }catch (err){
      LogUtils.error(this.TAG, "isDisabled catch error: " + JSON.stringify(err))
    }
    return false
  }

  /**
   * 参数是否合法
   * @param paramObj
   * @returns
   */
  isParamValid(paramObj?: SystemUpgradeControlParam): boolean {
    if (paramObj == undefined) {
      return false
    }
    if (paramObj.policyType == undefined) {
      return false
    }
    if (paramObj.policyType !== "0" && paramObj.policyType !== "1") {
      return false
    }
    return true
  }

}

export class SystemUpgradeControlParam {

  //升级策略类型, 0:默认升级策略；1:禁止升级策略。
  policyType: string = "0"
}