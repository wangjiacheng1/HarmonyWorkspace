import { HarmonyController } from './HarmonyController';
import accountManager from '@ohos.enterprise.accountManager';
import LogUtils from '../utils/LogUtils';
import TextUtils from '../utils/TextUtils';
import MDMConstants, { adminWant } from '../common/MDMConstants';
import { ResponseUtils } from '../utils/ResponseUtils';

/**
 * 用户管理
 */
export class AccountController implements HarmonyController{

  TAG: string = "AccountController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "paramValue = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    //let isDisable: boolean = TypeUtils.parseBoolean(paramValue)
    let param: AccountControlParam = JSON.parse(paramValue) as AccountControlParam
    if (!this.isParamValid(param)) {
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let isDisable: boolean = param.disallow
    let accountId: number | undefined = param.accountId
    try {
      accountManager.disallowOsAccountAddition(adminWant, isDisable, accountId)
      LogUtils.debug(this.TAG, "disallowAddLocalAccount success")
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch (err) {
      let msg = "disallowAddLocalAccount error, errMsg = " + err.message
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    };
  }

  async getStatus(): Promise<string> {
    try {
      let result = accountManager.isOsAccountAdditionDisallowed(adminWant)
      LogUtils.info(this.TAG, "getStatus : " + result)
      let flag = result ? MDMConstants.FLAG_FORCE_CLOSE : MDMConstants.FLAG_DEFAULT
      return Promise.resolve(flag)
    } catch(err){
      let msg = "getBluetooth Disabled Status error, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, msg)
      return Promise.reject(msg)
    }
  }

  reset(): void {
    try{
      accountManager.disallowOsAccountAddition(adminWant, false)
      LogUtils.info(this.TAG, "reset success")
    }catch (err) {
      LogUtils.error(this.TAG, "reset catch err: " + JSON.stringify(err))
    }
  }

  /**
   * 参数是否合法
   * @param paramObj
   * @returns
   */
  isParamValid(paramObj?: AccountControlParam): boolean {
    if (!paramObj) {
      return false
    }
    if (paramObj.disallow == undefined) {
      return false
    }
    return true
  }

}

export class AccountControlParam {

  //是否禁止创建本地用户，true表示禁止创建，false表示允许创建。
  disallow: boolean = false

  //用户ID，指定具体用户，取值范围：大于等于0。
  accountId?: number
}