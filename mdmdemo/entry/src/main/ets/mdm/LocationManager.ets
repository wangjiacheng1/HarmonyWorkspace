import { HarmonyController } from './HarmonyController';
import locationManager from '@ohos.enterprise.locationManager';
import MDMConstants, { adminWant } from '../common/MDMConstants';
import LogUtils from '../utils/LogUtils';
import TextUtils from '../utils/TextUtils';
import { ResponseUtils } from '../utils/ResponseUtils';

export default class LocationController implements HarmonyController{

  TAG: string = "LocationController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "paramValue = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    //let policy: locationManager.LocationPolicy = this.parseToLocationPolicy(paramValue)
    let paramObj: LocationControlParam = JSON.parse(paramValue) as LocationControlParam
    if (!this.isParamValid(paramObj)){
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let policy = this.parseToLocationPolicy(paramObj.policy)
    try {
      locationManager.setLocationPolicy(adminWant, policy)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
      LogUtils.info(this.TAG, "setLocationPolicy success")
    } catch(err){
      let msg = "setLocationPolicy error, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  async getStatus(): Promise<string> {
    try {
      let result = locationManager.getLocationPolicy(adminWant)
      LogUtils.info(this.TAG, "getStatus : " + result)
      let flag = this.translateLocationPolicy(result)
      return Promise.resolve(flag)
    } catch(err){
      let msg = "get Location Policy error, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, msg)
      return Promise.reject(msg)
    }
  }

  reset(): void {
    try {
      locationManager.setLocationPolicy(adminWant, locationManager.LocationPolicy.DEFAULT_LOCATION_SERVICE)
      LogUtils.info(this.TAG, "reset success")
    } catch(err){
      LogUtils.error(this.TAG, "reset error, " + JSON.stringify(err))
    }
  }

  /**
   * 将本地状态值翻译成SDK接口中所需参数
   * @param param
   * @returns
   */
  parseToLocationPolicy(param: string): locationManager.LocationPolicy{
    if (TextUtils.isEmpty(param)) {
      return locationManager.LocationPolicy.DEFAULT_LOCATION_SERVICE
    }
    switch(param){
      case MDMConstants.FLAG_FORCE_CLOSE:
        return locationManager.LocationPolicy.DISALLOW_LOCATION_SERVICE
      case MDMConstants.FLAG_FORCE_OPEN:
        return locationManager.LocationPolicy.FORCE_OPEN_LOCATION_SERVICE
      default:
        return locationManager.LocationPolicy.DEFAULT_LOCATION_SERVICE
    }
  }

  /**
   * 将MDM接口中的参数翻译成本地状态值
   * @param param
   * @returns
   */
  translateLocationPolicy(param: locationManager.LocationPolicy): string{
    switch (param){
      case locationManager.LocationPolicy.DISALLOW_LOCATION_SERVICE:
        return MDMConstants.FLAG_FORCE_CLOSE
      case locationManager.LocationPolicy.FORCE_OPEN_LOCATION_SERVICE:
        return MDMConstants.FLAG_FORCE_OPEN
      default:
        return MDMConstants.FLAG_DEFAULT
    }
  }

  /**
   * 参数是否合法
   * @param paramObj
   * @returns
   */
  isParamValid(paramObj?: LocationControlParam): boolean {
    if (!paramObj) {
      return false
    }
    if (paramObj.policy == undefined) {
      return false
    }
    if (paramObj.policy !== MDMConstants.FLAG_DEFAULT &&
      paramObj.policy !== MDMConstants.FLAG_FORCE_CLOSE &&
      paramObj.policy !== MDMConstants.FLAG_FORCE_OPEN) {
      return false
    }
    return true
  }

}

export class LocationControlParam {
  //位置服务策略。
  // - 0：默认策略。
  // - 1：禁用。
  // - 2：强制启用。
  policy: string = ""
}