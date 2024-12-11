import { HarmonyController } from './HarmonyController';
import applicationManager from '@ohos.enterprise.applicationManager';
import { adminWant } from '../common/MDMConstants';
import LogUtils from '../utils/LogUtils';
import TextUtils from '../utils/TextUtils';
import { ResponseUtils } from '../utils/ResponseUtils';
import Want from '@ohos.app.ability.Want';
import { plainToClassFromExist, Type } from 'class-transformer';
import 'reflect-metadata'

/**
 * 应用运行黑名单
 */
export default class AppRunningBlackListController implements HarmonyController{

  TAG: string = "AppRunningBlackListController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "control, paramValue = " + paramValue)

    let paramObj: ApplicationControlParam = JSON.parse(paramValue) as ApplicationControlParam
    if (!this.isParamValid(paramObj)) {
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    try {
      //先查询上一次下发的黑名单
      let lastList: Array<string> = applicationManager.getDisallowedRunningBundlesSync(adminWant)
      if (lastList && lastList.length > 0) {
        //查询成功后如果列表不为空清空上次列表
        applicationManager.removeDisallowedRunningBundlesSync(adminWant, lastList)
      }
      this.addDisabledApp(paramObj, callback)
    }catch (err){
      let msg = "control catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  async getStatus(): Promise<string> {
    let isSuccess: boolean = false
    let msg: string = ""
    try{
      let lastList: Array<string> = applicationManager.getDisallowedRunningBundlesSync(adminWant)
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
    let clearResponse = new ApplicationControlParam()
    this.control(JSON.stringify(clearResponse), (isSuccess, message) => {
      LogUtils.info(this.TAG, "reset result = " + isSuccess + ", message = " + message)
    })
  }

  /**
   * 添加禁止启动应用
   * @param paramObj
   * @param callback
   */
  addDisabledApp(paramObj: ApplicationControlParam, callback: (isSuccess: boolean, message: string) => void){
    //let appIdList: Array<string> = params.split(",")

    let appIdList = paramObj.appIds
    LogUtils.info(this.TAG, "addDisabledApp, appIdList = " + appIdList.toString())
    if (appIdList.length == 0) {
      callback(true, "clear disableApp success")
      return
    }

    try{
      applicationManager.addDisallowedRunningBundlesSync(adminWant, appIdList)
      let msg = "addDisabledApp success"
      LogUtils.info(this.TAG, msg)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    }catch (err){
      let msg = "addDisabledApp catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  /**
   * 参数是否合法
   * @param paramObj
   * @returns
   */
  isParamValid(paramObj?: ApplicationControlParam): boolean {
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

}

/**
 * 开机自启动应用管控
 */
export class AutoStartAppListController implements HarmonyController {

  private TAG: string = "AutoStartAppListController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "control, paramValue = " + paramValue)

    let paramObj: AutoStartAppsControlParam = plainToClassFromExist(new AutoStartAppsControlParam(), JSON.parse(paramValue))
    if (!this.isParamValid(paramObj)) {
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    try {
      //先查询上一次下发的自启名单
      let lastList: Array<Want> = applicationManager.getAutoStartApps(adminWant)
      if (lastList && lastList.length > 0) {
        //查询成功后如果列表不为空清空上次列表
        applicationManager.removeAutoStartApps(adminWant, lastList)
      }
      let wantList = this.constWantArray(paramObj)
      if (wantList.length == 0) {
        callback(true, "clear autoStartApp success")
        return
      }
      this.addAutoStartApps(wantList, callback)
    }catch (err){
      let msg = "control catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  getStatus(): Promise<string> {
    let isSuccess: boolean = false
    let autoStartAppParam: AutoStartAppsControlParam = new AutoStartAppsControlParam()
    let msg: string = ""
    try{
      let lastList: Array<Want> = applicationManager.getAutoStartApps(adminWant)
      if (lastList && lastList.length > 0) {
        let wantList: Array<AppWantParam> = []
        for (let i = 0; i < lastList.length; i++) {
          if (TextUtils.isEmpty(lastList[i].bundleName) || TextUtils.isEmpty(lastList[i].abilityName)) {
            continue;
          }
          let wantParam = new AppWantParam()
          wantParam.bundleName = lastList[i].bundleName!
          wantParam.abilityName = lastList[i].abilityName!
          wantList.push(wantParam)
        }
        autoStartAppParam.autoStartApps = wantList
      }
      msg = JSON.stringify(autoStartAppParam)
      isSuccess = true
    }catch (err){
      msg = "getStatus catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      isSuccess = false
    }

    return isSuccess ? Promise.resolve(msg) : Promise.reject(msg)
  }

  reset(): void {
    let clearParam = new AutoStartAppsControlParam()
    clearParam.autoStartApps = []
    this.control(JSON.stringify(clearParam), (isSuccess, message) => {
      LogUtils.info(this.TAG, "reset result = " + isSuccess + ", message = " + message)
    })
  }

  /**
   * 添加自启应用
   * @param wantArray
   * @param callback
   */
  addAutoStartApps(wantArray: Array<Want>, callback: (isSuccess: boolean, message: string) => void) {
    try {
      applicationManager.addAutoStartApps(adminWant, wantArray)
      LogUtils.info(this.TAG, "addAutoStartApps success")
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch (error) {
      LogUtils.error(this.TAG, "addAutoStartApps catch error: " + JSON.stringify(error))
      let response = ResponseUtils.constErrorResponse(error.code ? error.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, error)
      callback(false, JSON.stringify(response))
    }
  }

  isParamValid(paramObj: AutoStartAppsControlParam): boolean {
    if (!paramObj) {
      return true
    }
    let autoStartApps = paramObj.autoStartApps
    if (autoStartApps == undefined || autoStartApps.length == 0) {
      return true
    }
    for (let i = 0; i < autoStartApps.length; i++) {
      let wantParam: AppWantParam = autoStartApps[i]
      if (!wantParam.isValid()) {
        return false
      }
    }
    return true
  }

  /**
   * 将AutoStartAppsControlParam构造成want数组
   * @param paramObj
   * @returns
   */
  constWantArray(paramObj: AutoStartAppsControlParam): Array<Want> {
    if (!paramObj || paramObj.autoStartApps == undefined || paramObj.autoStartApps.length == 0) {
      return []
    }
    let wantArray: Array<Want> = []
    for (let i = 0; i < paramObj.autoStartApps.length; i++) {
      let want: Want = {
        bundleName: paramObj.autoStartApps[i].bundleName,
        abilityName: paramObj.autoStartApps[i].abilityName
      }
      // want.bundleName = paramObj.autoStartApps[i].bundleName
      // want.abilityName = paramObj.autoStartApps[i].abilityName
      wantArray.push(want)
    }
    return wantArray
  }

}

export class ApplicationControlParam {

  //应用ID数组，指定具体应用。为空时清空指定管控
  appIds: string[] = []

  //用户ID，取值范围：大于等于0。
  // - 调用接口时，若传入accountId，表示指定用户。
  // - 调用接口时，若未传入accountId，表示当前用户。
  accountId?: number
}

export class AutoStartAppsControlParam {

  @Type(() => AppWantParam)
  autoStartApps: AppWantParam[] = [new AppWantParam()]
}

export class AppWantParam {
  bundleName: string = ""

  abilityName: string = ""

  isValid(): boolean {
    if (TextUtils.isEmpty(this.bundleName)) {
      return false
    }
    if (TextUtils.isEmpty(this.abilityName)) {
      return false
    }
    return true
  }
}