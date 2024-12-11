import LogUtils from "../utils/LogUtils";
import { ResponseUtils } from "../utils/ResponseUtils";
import TextUtils from "../utils/TextUtils";
import { HarmonyController } from "./HarmonyController";
import { deviceSettings } from "@kit.MDMKit";
import { adminWant } from "../common/MDMConstants";

const screenOffPolicy: string = "screenOff"
const dateTimePolicy: string = "dateTime"
const powerPolicy: string = "powerPolicy"

export class DeviceSettingController implements HarmonyController {

  private TAG: string = "DeviceSettingController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    let paramObj: DeviceSettingControlParam = JSON.parse(paramValue) as DeviceSettingControlParam
    if (!this.isParamValid(paramObj)) {
      LogUtils.warn(this.TAG, "control, param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    try {
      let item = paramObj.item
      deviceSettings.setValue(adminWant, item, paramObj.value)
      let response = ResponseUtils.constSuccessResponse("success")
      callback(true, JSON.stringify(response))
    }catch (err) {
      let msg = "control catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  getStatus(): Promise<string> {
    try{
      let screenOff: string = deviceSettings.getValue(adminWant, screenOffPolicy)
      let dateTime: string = deviceSettings.getValue(adminWant, dateTimePolicy)
      let power: string = deviceSettings.getValue(adminWant, powerPolicy)
      let result = new DeviceSettingResult()
      result.screenOf = screenOff
      result.dateTime = dateTime
      result.powerPolicy = power
      return Promise.resolve(JSON.stringify(result))
    }catch (err) {
      let msg = "getStatus catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      return Promise.reject(msg)
    }
  }

  reset(): void {
    //ignore
  }

  isParamValid(param: DeviceSettingControlParam): boolean {
    if (!param || TextUtils.isEmpty(param.item)) {
      return false
    }
    if (!TextUtils.equals(param.item, screenOffPolicy) &&
        !TextUtils.equals(param.item, dateTimePolicy) &&
        !TextUtils.equals(param.item, powerPolicy)) {
      return false
    }
    return true
  }
}

export class DeviceSettingControlParam {

  /**
   * 设备设置策略类型
   * screenOff：设备息屏策略
   * dateTime：设置系统时间
   * powerPolicy：设备电源策略
   */
  item: string = ""

  value: string = ""
}

export class DeviceSettingResult {
  //设备息屏时间（单位：毫秒）
  screenOf: string = ""
  //设置的系统时间（单位：毫秒）
  dateTime: string = ""
  /**
   * 电源策略
   * powerScene为电源策略场景；delayTime为延迟时间（单位：毫秒），不支持设置为30000毫秒；powerPolicyAction为休眠策略。
   * 电源策略场景：
   * - 0：超时场景。
   * 休眠策略：
   - 0：不执行动作。
   - 1：自动进入睡眠。
   - 2：强制进入睡眠。
   - 3：进入休眠。（当前电源子系统暂不支持）
   - 4：关机。
   */
  powerPolicy: string = ""
}