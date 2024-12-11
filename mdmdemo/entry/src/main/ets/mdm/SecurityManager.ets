import { MDMResponse } from "../entity/MDMResponse";
import LogUtils from "../utils/LogUtils";
import { ResponseUtils } from "../utils/ResponseUtils";
import TextUtils from "../utils/TextUtils";
import { HarmonyController } from "./HarmonyController";
import { securityManager } from "@kit.MDMKit";
import { adminWant } from "../common/MDMConstants";
import { PreferenceManager } from "../data/PreferenceManager";

/**
 * 设置设备口令策略
 */
export class DevicePasswordController implements HarmonyController {

  private TAG: string = "DevicePasswordController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    let response: MDMResponse
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "paramValue is empty")
      response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let paramObj: DevicePasswordParam = JSON.parse(paramValue) as DevicePasswordParam
    let passwordPolicy: securityManager.PasswordPolicy = this.transParamToPasswordPolicy(paramObj)
    try {
      securityManager.setPasswordPolicy(adminWant, passwordPolicy)
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
      let passwordPolicy = securityManager.getPasswordPolicy(adminWant)
      msg = JSON.stringify(passwordPolicy)
      isSuccess = true
    }catch (err){
      msg = "getStatus catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      isSuccess = false
    }

    return isSuccess ? Promise.resolve(msg) : Promise.reject(msg)
  }

  reset(): void {
    let param = new DevicePasswordParam()
    this.control(JSON.stringify(param), (isSuccess, msg) => {
      LogUtils.info(this.TAG, "reset result = " + isSuccess + ", msg = " + msg)
    })
  }

  transParamToPasswordPolicy(param: DevicePasswordParam): securityManager.PasswordPolicy {
    let policy: securityManager.PasswordPolicy = {
      complexityRegex: param ? param.complexityRegex : "",
      validityPeriod: param ? param.validityPeriod : undefined,
      additionalDescription: param ? param.additionalDescription : ""
    }
    return policy
  }

}

/**
 * 设置应用剪切板策略
 */
export class AppClipboardController implements HarmonyController {

  private TAG: string = "AppClipboardController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    let response: MDMResponse
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "param is empty")
      response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let paramObj: AppClipboardParam = JSON.parse(paramValue) as AppClipboardParam
    if (!this.isParamValid(paramObj)) {
      LogUtils.warn(this.TAG, "param is incalid")
      response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    try {
      let length = paramObj.tokenIds.length
      for (let index = 0; index < length; index++) {
        let tokenId = paramObj.tokenIds[index]
        securityManager.setAppClipboardPolicy(adminWant, tokenId, paramObj.clipboardPolicy)
      }
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
      this.saveAppTokens(paramObj.tokenIds)
    }catch (err){
      let msg = "control catch err, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  getStatus(): Promise<string> {
    let tokenIds = this.getAppTokens()
    if (!tokenIds || tokenIds.length == 0) {
      return Promise.resolve("[]")
    }
    let length = tokenIds.length
    let result: number[] = []
    try{
      for (let index = 0; index < length; index++) {
        let tokenId = tokenIds[index]
        let policy = securityManager.getAppClipboardPolicy(adminWant, tokenId)
        result.push(Number(policy))
      }
      return Promise.resolve(JSON.stringify(result))
    }catch (err){
      let msg = "getStatus catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      return Promise.reject(msg)
    }
  }

  reset(): void {
    let tokens: number[] = this.getAppTokens()
    if (!tokens || tokens.length == 0) {
      return
    }
    let param = new AppClipboardParam()
    param.tokenIds = tokens
    param.clipboardPolicy = 0
    this.control(JSON.stringify(param), (isSuccess, msg) => {
      LogUtils.info(this.TAG, "reset result = " + isSuccess + ", msg = " + msg)
    })
  }

  isParamValid(param: AppClipboardParam): boolean {
    if (!param) {
      return false
    }
    if (param.tokenIds.length > 100) {
      return false
    }
    if (param.clipboardPolicy < 0 || param.clipboardPolicy > 3) {
      return false
    }
    return true
  }

  saveAppTokens(tokenIds: number[]){
    let json = JSON.stringify(tokenIds)
    PreferenceManager.getInstance().setStringSync("clipboard_policy_app_tokens", json)
  }

  getAppTokens(): number[] {
    let json = PreferenceManager.getInstance().getStringSync("clipboard_policy_app_tokens")
    if (TextUtils.isEmpty(json)) {
      return []
    }
    return JSON.parse(json) as number[]
  }

}

export class DevicePasswordParam {

  //口令复杂度正则表达式。
  complexityRegex: string = ""
  //密码有效期（单位：毫秒）。
  validityPeriod: number | undefined = undefined
  //描述文本。
  additionalDescription: string = ""
}

export class AppClipboardParam {

  //目标应用的身份标识。可通过应用的ApplicationInfo获得。当前只支持最多100个tokenId被保存策略。
  tokenIds: number[] = []
  //剪切板策略
  // 0: 默认
  // 1: 剪贴板可在同一应用使用。
  // 2: 剪贴板可在同一设备使用。
  // 3: 剪贴板可跨设备使用。
  clipboardPolicy: number = 0
}