import { HarmonyController } from './HarmonyController';
import restrictions from '@ohos.enterprise.restrictions';
import MDMConstants, { adminWant } from '../common/MDMConstants';
import LogUtils from '../utils/LogUtils';
import TextUtils from '../utils/TextUtils';
import TypeUtils from '../utils/TypeUtils';
import { ResponseUtils } from '../utils/ResponseUtils';

/**
 * 麦克风禁用
 */
export class MicrophoneController implements HarmonyController{

  TAG: string = "MicrophoneController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "paramValue = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    //let isDisable = TypeUtils.parseBoolean(paramValue)
    let paramObj: RestrictionControlParam = JSON.parse(paramValue) as RestrictionControlParam
    if (!isParamValid(paramObj)) {
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let isDisable = paramObj.disallow
    try {
      restrictions.setDisallowedPolicy(adminWant, MDMConstants.FEATURE_MICROPHONE, isDisable)
      LogUtils.debug(this.TAG, "disableMicrophone success")
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch(err){
      let msg = "disableMicrophone err, errMsg = " + err.message
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  async getStatus(): Promise<string> {
    try {
      let result = restrictions.getDisallowedPolicy(adminWant, MDMConstants.FEATURE_MICROPHONE)
      LogUtils.debug(this.TAG, "getStatus: " + result)
      let flag = result ? MDMConstants.FLAG_FORCE_CLOSE : MDMConstants.FLAG_DEFAULT
      return Promise.resolve(flag)
    } catch(err) {
      let msg = "get Microphone Disabled Status error, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, msg)
      return Promise.reject(msg)
    }
  }

  reset(): void {
    try {
      restrictions.setDisallowedPolicy(adminWant, MDMConstants.FEATURE_MICROPHONE, false)
      LogUtils.debug(this.TAG, "reset success")
    } catch(err){
      LogUtils.error(this.TAG, "reset err: " + JSON.stringify(err))
    }
  }

}

/**
 * 禁用录像
 */
export class RecordController implements HarmonyController {

  TAG: string = "RecordController"
  feature: string = MDMConstants.FEATURE_SCREENRECORD

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "paramValue = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    //let isDisable = TypeUtils.parseBoolean(paramValue)
    let paramObj: RestrictionControlParam = JSON.parse(paramValue) as RestrictionControlParam
    if (!isParamValid(paramObj)) {
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let isDisable = paramObj.disallow
    try {
      restrictions.setDisallowedPolicy(adminWant, this.feature, isDisable)
      LogUtils.debug(this.TAG, "disableRecord success")
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch(err){
      let msg = "disableMicrophone err, errMsg = " + err.message
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  getStatus(): Promise<string> {
    try {
      let result = restrictions.getDisallowedPolicy(adminWant, this.feature)
      LogUtils.debug(this.TAG, "getStatus: " + result)
      let flag = result ? MDMConstants.FLAG_FORCE_CLOSE : MDMConstants.FLAG_DEFAULT
      return Promise.resolve(flag)
    } catch(err) {
      let msg = "get Record Disabled Status error, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, msg)
      return Promise.reject(msg)
    }
  }

  reset(): void {
    try {
      restrictions.setDisallowedPolicy(adminWant, this.feature, false)
      LogUtils.debug(this.TAG, "reset success")
    } catch(err){
      LogUtils.error(this.TAG, "reset err: " + JSON.stringify(err))
    }
  }
}

/**
 * 禁用截屏
 */
export class ScreenshotController implements HarmonyController {

  TAG: string = "ScreenshotController"
  feature: string = MDMConstants.FEATURE_SCREENSHOT

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "paramValue = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    //let isDisable = TypeUtils.parseBoolean(paramValue)
    let paramObj: RestrictionControlParam = JSON.parse(paramValue) as RestrictionControlParam
    if (!isParamValid(paramObj)) {
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let isDisable = paramObj.disallow
    try {
      restrictions.setDisallowedPolicy(adminWant, this.feature, isDisable)
      LogUtils.debug(this.TAG, "disableScreenshot success")
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch(err){
      let msg = "disableMicrophone err, errMsg = " + err.message
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  getStatus(): Promise<string> {
    try {
      let result = restrictions.getDisallowedPolicy(adminWant, this.feature)
      LogUtils.debug(this.TAG, "getStatus: " + result)
      let flag = result ? MDMConstants.FLAG_FORCE_CLOSE : MDMConstants.FLAG_DEFAULT
      return Promise.resolve(flag)
    } catch(err) {
      let msg = "get Screenshot Disabled Status error, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, msg)
      return Promise.reject(msg)
    }
  }

  reset(): void {
    try {
      restrictions.setDisallowedPolicy(adminWant, this.feature, false)
      LogUtils.debug(this.TAG, "reset success")
    } catch(err){
      LogUtils.error(this.TAG, "reset err: " + JSON.stringify(err))
    }
  }
}

/**
 * 禁用指纹识别
 */
export class FingerprintController implements HarmonyController {

  TAG: string = "FingerprintController"
  feature: string = MDMConstants.FEATURE_FINGERPRINT

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "paramValue = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    //let isDisable = TypeUtils.parseBoolean(paramValue)
    let paramObj: RestrictionControlParam = JSON.parse(paramValue) as RestrictionControlParam
    if (!isParamValid(paramObj)) {
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let isDisable = paramObj.disallow
    try {
      restrictions.setDisallowedPolicy(adminWant, this.feature, isDisable)
      LogUtils.debug(this.TAG, "controlFingerprint success")
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch(err){
      let msg = "disableMicrophone err, errMsg = " + err.message
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  getStatus(): Promise<string> {
    try {
      let result = restrictions.getDisallowedPolicy(adminWant, this.feature)
      LogUtils.debug(this.TAG, "getStatus: " + result)
      let flag = result ? MDMConstants.FLAG_FORCE_CLOSE : MDMConstants.FLAG_DEFAULT
      return Promise.resolve(flag)
    } catch(err) {
      let msg = "get fingerprint Disabled Status error, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, msg)
      return Promise.reject(msg)
    }
  }

  reset(): void {
    try {
      restrictions.setDisallowedPolicy(adminWant, this.feature, false)
      LogUtils.debug(this.TAG, "reset success")
    } catch(err){
      LogUtils.error(this.TAG, "reset err: " + JSON.stringify(err))
    }
  }
}

/**
 * 禁止修改系统事件
 */
export class DisallowModifyDateTimeController implements HarmonyController {

  TAG:string = "DisallowModifyDateTimeController"
  feature: string = MDMConstants.FEATURE_MODIFY_DATETIME

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "control, param = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "control, param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    //let isDisable = TypeUtils.parseBoolean(paramValue)
    let paramObj: RestrictionControlParam = JSON.parse(paramValue) as RestrictionControlParam
    if (!isParamValid(paramObj)) {
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let isDisable = paramObj.disallow
    try{
      restrictions.setDisallowedPolicy(adminWant, this.feature, isDisable)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    }catch(err){
      let msg: string = "set dateTimePolicy err, key = " + isDisable + err.code + " : " + err.message
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  async getStatus(): Promise<string> {
    try {
      let result = restrictions.getDisallowedPolicy(adminWant, this.feature)
      LogUtils.info(this.TAG, "getStatus : " + result)
      let flag = result ? MDMConstants.FLAG_FORCE_CLOSE : MDMConstants.FLAG_DEFAULT
      return Promise.resolve(flag)
    } catch(err){
      let msg = "ModifyDateTime Disabled Status error, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, msg)
      return Promise.reject(msg)
    }
  }

  reset(): void {
    try{
      restrictions.setDisallowedPolicy(adminWant, this.feature, false)
      LogUtils.info(this.TAG, "reset success")
    }catch(err){
      LogUtils.error(this.TAG, "reset catch err: " + JSON.stringify(err))
    }
  }

}

export class RestrictionControlParam {
  //true表示禁止使用，false表示允许使用。
  disallow: boolean = false
}

function isParamValid(paramObj?: RestrictionControlParam): boolean {
  if (!paramObj) {
    return false
  }
  if (paramObj.disallow == undefined) {
    return false
  }
  return true
}