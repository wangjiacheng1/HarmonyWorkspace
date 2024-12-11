import { HarmonyController } from './HarmonyController';
import adminManager from '@ohos.enterprise.adminManager';
import MDMConstants, { adminWant } from '../common/MDMConstants';
import { BusinessError } from '@ohos.base';
import LogUtils from '../utils/LogUtils';
import TextUtils from '../utils/TextUtils';
import TypeUtils from '../utils/TypeUtils';
import { PreferenceManager } from '../data/PreferenceManager';
import { BaseConstants } from '../common/BaseConstants';
import { ResponseUtils } from '../utils/ResponseUtils';

const events: Array<adminManager.ManagedEvent> = [adminManager.ManagedEvent.MANAGED_EVENT_BUNDLE_ADDED,
  adminManager.ManagedEvent.MANAGED_EVENT_BUNDLE_REMOVED,
  adminManager.ManagedEvent.MANAGED_EVENT_APP_START,
  adminManager.ManagedEvent.MANAGED_EVENT_APP_STOP,
  adminManager.ManagedEvent.MANAGED_EVENT_SYSTEM_UPDATE];

export default class DeviceAdminController implements HarmonyController{

  TAG:string = "DeviceAdminController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "paramValue = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    //let isEnable: boolean = TypeUtils.parseBoolean(paramValue)
    let param: DeviceAdminControlParam = JSON.parse(paramValue) as DeviceAdminControlParam
    if (!this.isParamValid(param)) {
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let isEnable: boolean = param.isEnable
    let userId = param.userId
    if (isEnable) {
      let msg = "启用失败，请使用hdc命令启用设备管理器"
      let response = ResponseUtils.constFunctionRefusedResponse(msg)
      callback(false, JSON.stringify(response))
    }else {
      this.disableAdmin(callback, userId)
    }
  }

  async getStatus(): Promise<string> {
    let isSuccess: boolean = false
    let flag: string = ""
    try{
      let result = PreferenceManager.getInstance().getValueSync(BaseConstants.IS_MDM_ADMIN_ENABLED, false) as boolean
      flag = result ? MDMConstants.FLAG_FORCE_OPEN : MDMConstants.FLAG_DEFAULT
      isSuccess = true
    } catch (error){
      LogUtils.error(this.TAG, "getStatus catch error, " + JSON.parse(JSON.stringify(error)))
      isSuccess = false
    }

    return isSuccess ? Promise.resolve(flag) : Promise.reject(flag)
  }

  reset(): void {
    adminManager.disableAdmin(adminWant).then(() => {
      LogUtils.info(this.TAG, "reset success")
    }).catch((error: BusinessError) => {
      LogUtils.warn(this.TAG, "reset err: " + JSON.stringify(error))
    })
  }

  disableAdmin(callback: (isSuccess: boolean, message: string) => void, userId?: number){
    unsubscribeManagedEvent()
    if (userId != undefined) {
      adminManager.disableAdmin(adminWant, userId).then(() => {
        LogUtils.info(this.TAG, "disableAdmin success")
        let response = ResponseUtils.constSuccessResponse("")
        callback(true, JSON.stringify(response))
      }).catch((error: BusinessError) => {
        let msg = "disableAdmin error : " + error.code + ", " + error.message
        LogUtils.warn(this.TAG, msg)
        let response = ResponseUtils.constErrorResponse(error.code ? error.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, error)
        callback(false, JSON.stringify(response))
      })
    }else {
      adminManager.disableAdmin(adminWant).then(() => {
        LogUtils.info(this.TAG, "disableAdmin success")
        let response = ResponseUtils.constSuccessResponse("")
        callback(true, JSON.stringify(response))
      }).catch((error: BusinessError) => {
        let msg = "disableAdmin error : " + error.code + ", " + error.message
        LogUtils.warn(this.TAG, msg)
        let response = ResponseUtils.constErrorResponse(error.code ? error.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, error)
        callback(false, JSON.stringify(response))
      })
    }
  }

  /**
   * 参数是否合法
   * @param paramObj
   * @returns
   */
  isParamValid(paramObj?: DeviceAdminControlParam): boolean {
    if (!paramObj) {
      return false
    }
    if (paramObj.isEnable == undefined) {
      return false
    }
    return true
  }

}

export class DeviceAdminControlParam {

  //是否启用设备管理器，true为启用，false为禁用
  isEnable: boolean = true

  userId?: number
}

export function subscribeManagedEvent(){
  try{
    adminManager.subscribeManagedEventSync(adminWant, events)
    LogUtils.info("DeviceAdminController", "subscribeManagedEvent success")
  } catch (error){
    LogUtils.error("DeviceAdminController", "subscribeManagedEvent catch error, " + JSON.stringify(error))
  }
}

export function unsubscribeManagedEvent(){
  try{
    adminManager.unsubscribeManagedEventSync(adminWant, events)
    LogUtils.info("DeviceAdminController", "unsubscribeManagedEvent success")
  } catch (error){
    LogUtils.error("DeviceAdminController", "unsubscribeManagedEvent catch error, " + JSON.stringify(error))
  }
}