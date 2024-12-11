import MDMConstants, { adminWant } from '../common/MDMConstants';
import { HarmonyController } from './HarmonyController';
import deviceControl from '@ohos.enterprise.deviceControl';
import TextUtils from '../utils/TextUtils';
import LogUtils from '../utils/LogUtils';
import { ResponseUtils } from '../utils/ResponseUtils';
import { deviceInfo } from '@kit.MDMKit';


const FLAG_DEVICE_OPERATE_DEFAULT_CONTROL = "default"
const FLAG_DEVICE_OPERATE_RESET_CONTROL = "resetFactory"
const FLAG_DEVICE_OPERATE_REBOOT_CONTROL = "reboot"
const FLAG_DEVICE_OPERATE_SHUT_DOWN_CONTROL = "shutDown"
const FLAG_DEVICE_OPERATE_LOCK_SCREEN_CONTROL = "lockScreen"
const FLAG_DEVICE_OPERATE_LOCK_DEVICE_CONTROL = "lockDevice"
const FLAG_DEVICE_OPERATE_UNLOCK_DEVICE_CONTROL = "unlockDevice"

export class DeviceOperationManager implements HarmonyController{

  private TAG: string = "DeviceControlManager"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "control, paramValue is null")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let paramObj: DeviceControlParam = JSON.parse(paramValue) as DeviceControlParam
    if (!this.isParamValid(paramObj)){
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let operate: string = paramObj.operate

    switch (operate){
      case MDMConstants.FLAG_DEVICE_OPERATE_LOCK_SCREEN:
      case FLAG_DEVICE_OPERATE_LOCK_SCREEN_CONTROL:
        this.executeDeviceLockScreen(callback)
        break;
      case MDMConstants.FLAG_DEVICE_OPERATE_SHUT_DOWN:
      case FLAG_DEVICE_OPERATE_SHUT_DOWN_CONTROL:
        this.executeDeviceShutDown(callback)
        break;
      case MDMConstants.FLAG_DEVICE_OPERATE_REBOOT:
      case FLAG_DEVICE_OPERATE_REBOOT_CONTROL:
        this.executeDeviceReboot(callback)
        break;
      case MDMConstants.FLAG_DEVICE_OPERATE_RESET:
      case FLAG_DEVICE_OPERATE_RESET_CONTROL:
        this.executeDeviceReset(callback)
        break;
      case MDMConstants.FLAG_DEVICE_OPERATE_LOCK_DEVICE:
      case FLAG_DEVICE_OPERATE_LOCK_DEVICE_CONTROL:
        this.executeLockDevice(callback)
        break;
      case MDMConstants.FLAG_DEVICE_OPERATE_UNLOCK_DEVICE:
      case FLAG_DEVICE_OPERATE_UNLOCK_DEVICE_CONTROL:
        this.executeUnLockDevice(callback)
        break
      default:
        LogUtils.warn(this.TAG, "control invalid flag: " + operate)
        let response = ResponseUtils.constInvalidParamResponse()
        callback(false, JSON.stringify(response))
    }
  }

  getStatus(): Promise<string> {
    return Promise.resolve(MDMConstants.FLAG_DEVICE_OPERATE_DEFAULT)
  }

  reset(): void {
  }

  executeDeviceLockScreen(callback: (isSuccess: boolean, message: string) => void){
    try {
      this.operateDevice(FLAG_DEVICE_OPERATE_LOCK_SCREEN_CONTROL)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch(err){
      let message = "executeDeviceLockScreen err, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, message)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  executeDeviceShutDown(callback: (isSuccess: boolean, message: string) => void){
    try {
      this.operateDevice(FLAG_DEVICE_OPERATE_SHUT_DOWN_CONTROL)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch(err){
      let message = "executeDeviceShutDown err, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, message)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  executeDeviceReboot(callback: (isSuccess: boolean, message: string) => void){
    try {
      this.operateDevice(FLAG_DEVICE_OPERATE_REBOOT_CONTROL)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch(err){
      let message = "executeDeviceReboot err, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, message)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  executeDeviceReset(callback: (isSuccess: boolean, message: string) => void){
    try {
      this.operateDevice(FLAG_DEVICE_OPERATE_RESET_CONTROL)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch(err){
      let message = "executeDeviceReset err, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, message)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  executeLockDevice(callback: (isSuccess: boolean, message: string) => void){
    try {
      this.operateDevice(FLAG_DEVICE_OPERATE_LOCK_DEVICE_CONTROL)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch(err){
      let message = "executeLockDevice err, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, message)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  executeUnLockDevice(callback: (isSuccess: boolean, message: string) => void){
    try {
      this.operateDevice(FLAG_DEVICE_OPERATE_UNLOCK_DEVICE_CONTROL)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch(err){
      let message = "executeUnLockDevice err, " + err.code + " : " + err.message
      LogUtils.error(this.TAG, message)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  operateDevice(flag: string){
    deviceControl.operateDevice(adminWant, flag)
  }

  /**
   * 参数是否合法
   * @param paramObj
   * @returns
   */
  isParamValid(paramObj?: DeviceControlParam): boolean {
    if (!paramObj) {
      return false
    }
    if (TextUtils.isEmpty(paramObj.operate)) {
      return false
    }
    return true
  }

}

export class DeviceInfoController implements HarmonyController {

  private TAG: string = "DeviceInfoController"

  private deviceInfo: DeviceInfoParam = new DeviceInfoParam()

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    try{
      let result = this.getDeviceInfo()
      let response = ResponseUtils.constSuccessResponse(result)
      callback(true, JSON.stringify(response))
    }catch (err){
      if (String(err.code) === "9200007") {
        let result = JSON.stringify(this.deviceInfo)
        let response = ResponseUtils.constSuccessResponse(result)
        callback(true, JSON.stringify(response))
        return
      }
      let msg = "control catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  getStatus(): Promise<string> {
    try{
      let result = this.getDeviceInfo()
      return Promise.resolve(result)
    }catch (err){
      if (String(err.code) === "9200007") {
        let result = JSON.stringify(this.deviceInfo)
        return Promise.resolve(result)
      }
      let msg = "getStatus catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      return Promise.reject(msg)
    }
  }

  reset(): void {
    //ignore
  }

  getDeviceInfo(): string {
    let deviceName: string = deviceInfo.getDeviceInfo(adminWant, "deviceName")
    this.deviceInfo.deviceName = deviceName
    LogUtils.debug(this.TAG, "getDeviceInfo, deviceName = " + deviceName)
    let deviceSerial: string = deviceInfo.getDeviceInfo(adminWant, "deviceSerial")
    this.deviceInfo.deviceSerial = deviceSerial
    let simInfo: string = deviceInfo.getDeviceInfo(adminWant, "simInfo")
    this.deviceInfo.simInfo = simInfo
    let disk: string = deviceInfo.getDeviceInfo(adminWant, "disk")
    this.deviceInfo.disk = disk
    let memory: string = deviceInfo.getDeviceInfo(adminWant, "memory")
    this.deviceInfo.memory = memory
    let result = JSON.stringify(this.deviceInfo)
    LogUtils.info(this.TAG, "getDeviceInfo: " + result)
    return result
  }

}

export class DeviceControlParam {
  //要执行的操作。
  operate: string = ""

  //执行时附加参数。目前无需传入。
  addition?: string = ""
}

export class DeviceInfoParam {

  //设备名称
  deviceName: string = ""
  //设备序列号
  deviceSerial: string = ""
  //SIM卡信息
  simInfo: string = ""
  //磁盘信息
  disk: string = ""
  //内存信息
  memory: string = ""

}