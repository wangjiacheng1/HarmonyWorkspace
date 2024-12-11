import { HarmonyController } from './HarmonyController';
import bundleManager from '@ohos.enterprise.bundleManager';
import MDMConstants, { adminWant } from '../common/MDMConstants';
import LogUtils from '../utils/LogUtils';
import TextUtils from '../utils/TextUtils';
import { ResponseUtils } from '../utils/ResponseUtils';

/**
 * 应用安装黑名单
 */
export class AppInstallListController implements HarmonyController {

  TAG: string = "AppInstallBlackListController"

  //黑白名单类型，0为黑名单，1为白名单
  type: number = -1

  constructor(type: number) {
    this.type = type
  }

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "control, type = " + this.type + ", paramValue = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    let paramObj: BundleControlParam = JSON.parse(paramValue)
    if (!isParamValid(paramObj)){
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    try{
      //先查询上一次下发的黑名单
      let lastBlackList = bundleManager.getDisallowedInstallBundlesSync(adminWant)
      let lastWhiteList = bundleManager.getAllowedInstallBundlesSync(adminWant)
      //查询成功后如果列表不为空清空上次列表
      if (lastBlackList && lastBlackList.length > 0) {
        bundleManager.removeDisallowedInstallBundlesSync(adminWant, lastBlackList)
      }
      if (lastWhiteList && lastWhiteList.length > 0) {
        bundleManager.removeAllowedInstallBundlesSync(adminWant, lastWhiteList)
      }
      //执行新列表
      switch (this.type){
        case MDMConstants.LIST_TYPE_BLACK:
          this.addDisallowInstallApp(paramObj, callback)
          return
        case MDMConstants.LIST_TYPE_WHITE:
          this.addAllowedInstallApp(paramObj, callback)
          return
      }

    }catch (err){
      let msg = "control catch err, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  async getStatus(): Promise<string> {
    let isSuccess: boolean = false
    let msg: string = ""
    try{
      let lastList: Array<string> = bundleManager.getDisallowedInstallBundlesSync(adminWant)
      msg = lastList.join(",")
      isSuccess = true
    }catch (err){
      msg = "getStatus catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      isSuccess = false
    }

    return isSuccess ? Promise.resolve(msg) : Promise.reject(msg)
  }

  reset(): void {
    this.control("", (isSuccess, message) => {
      LogUtils.info(this.TAG, "reset result = " + isSuccess + ", message = " + message)
    })
  }

  /**
   * 添加应用安装黑名单
   * @param params
   * @param callback
   */
  addDisallowInstallApp(param: BundleControlParam, callback: (isSuccess: boolean, message: string) => void){
    //let appIdList: Array<string> = params.split(",")
    let appIdList = param.appIds ? param.appIds : []
    LogUtils.info(this.TAG, "addDisabledApp, appIdList = " + appIdList.toString())
    try{
      bundleManager.addDisallowedInstallBundlesSync(adminWant, appIdList)
      let msg = "addDisallowInstallApp success"
      LogUtils.info(this.TAG, msg)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    }catch (err){
      let msg = "addDisallowInstallApp catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }
  /**
   * 添加应用安装白名单
   * @param params
   * @param callback
   */
  addAllowedInstallApp(param: BundleControlParam, callback: (isSuccess: boolean, message: string) => void){
    //let appIdList: Array<string> = params.split(",")
    let appIdList = param.appIds ? param.appIds : []
    LogUtils.info(this.TAG, "addAllowedInstallApp, appIdList = " + appIdList.toString())
    try{
      bundleManager.addAllowedInstallBundlesSync(adminWant, appIdList)
      let msg = "addAllowedInstallApp success"
      LogUtils.info(this.TAG, msg)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    }catch (err){
      let msg = "addAllowedInstallApp catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

}

/**
 * 应用防卸载名单
 */
export class AppDisallowUninstallListController implements HarmonyController {

  TAG: string = "UninstallAppListController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "control, paramValue = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    let paramObj: BundleControlParam = JSON.parse(paramValue)
    if (!isParamValid(paramObj)){
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    let newList = paramObj.appIds
    try{
      //先查询上一次下发的白名单
      let lastList = bundleManager.getDisallowedUninstallBundlesSync(adminWant)
      //查询成功后如果列表不为空清空上次列表
      if (lastList && lastList.length > 0) {
        bundleManager.removeDisallowedUninstallBundlesSync(adminWant, lastList)
      }
      //执行新列表
      if (newList != undefined && newList.length > 0) {
        bundleManager.addDisallowedUninstallBundlesSync(adminWant, newList)
      } else {
        //下发防卸载列表为空则清除黑名单(无防卸载列表)
        const currentList = bundleManager.getDisallowedUninstallBundlesSync(adminWant)
        if (currentList && currentList.length > 0) {
          bundleManager.removeDisallowedUninstallBundlesSync(adminWant, currentList)
        }
      }

      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))

    }catch (err){
      let msg = "control catch err, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  getStatus(): Promise<string> {
    let isSuccess: boolean = false
    let msg: string = ""
    try{
      let lastList: string[] = bundleManager.getDisallowedUninstallBundlesSync(adminWant)
      msg = lastList.join(",")
      isSuccess = true
    }catch (err){
      msg = "getStatus catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      isSuccess = false
    }

    return isSuccess ? Promise.resolve(msg) : Promise.reject(msg)
  }

  reset(): void {
    this.control("", (isSuccess, message) => {
      LogUtils.info(this.TAG, "reset result = " + isSuccess + ", message = " + message)
    })
  }

}

export class BundleControlParam {
  //应用ID数组。为空表示取消管控
  appIds: string[] = []

  //用户ID，取值范围：大于等于0。
  // - 调用接口时，若传入accountId，表示指定用户。
  // - 调用接口时，若未传入accountId，表示当前用户。
  accountId?: number
}

function isParamValid(paramObj?: BundleControlParam): boolean {
  if (!paramObj) {
    return false
  }
  if (paramObj.appIds == undefined) {
    return false
  }
  if (paramObj.accountId && paramObj.accountId < 0) {
    return false
  }
  return true
}