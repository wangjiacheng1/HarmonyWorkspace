import { HarmonyController } from './HarmonyController';
import bluetoothManager from '@ohos.enterprise.bluetoothManager';
import MDMConstants, { adminWant } from '../common/MDMConstants';
import { restrictions } from '@kit.MDMKit';
import LogUtils from '../utils/LogUtils';
import TypeUtils from '../utils/TypeUtils';
import TextUtils from '../utils/TextUtils';
import { ResponseUtils } from '../utils/ResponseUtils';

/**
 * 禁用蓝牙
 */
export default class BlueToothController implements HarmonyController{

  TAG: string = "BlueToothController"
  feature: string = MDMConstants.FEATURE_BLUETOOTH

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "paramValue = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    //let isDisable: boolean = TypeUtils.parseBoolean(paramValue)
    let paramObj: BluetoothControlParam = JSON.parse(paramValue) as BluetoothControlParam
    if (!this.isParamValid(paramObj)){
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let isDisable = paramObj.disallow
    try {
      restrictions.setDisallowedPolicy(adminWant, this.feature, isDisable)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch (err) {
      let msg = "disable bluetooth error, errMsg = " + err.message
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    };
  }

  async getStatus(): Promise<string> {
    try {
      let result = restrictions.getDisallowedPolicy(adminWant, this.feature)
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
    try {
      restrictions.setDisallowedPolicy(adminWant, this.feature, false)
      LogUtils.info(this.TAG, "reset success")
    } catch (err) {
      LogUtils.error(this.TAG, "reset catch err: " + JSON.stringify(err))
    };
  }

  /**
   * 参数是否合法
   * @param paramObj
   * @returns
   */
  isParamValid(paramObj?: BluetoothControlParam): boolean {
    if (!paramObj) {
      return false
    }
    if (paramObj.disallow == undefined) {
      return false
    }
    return true
  }

}

/**
 * 蓝牙白名单
 */
export class BluetoothListController implements HarmonyController {

  TAG: string = "BluetoothListController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "control, paramValue = " + paramValue)

    let paramObj: BluetoothListControlParam = JSON.parse(paramValue) as BluetoothListControlParam
    if (!this.isParamValid(paramObj)) {
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let newList = paramObj.deviceIds
    try{
      //先查询上一次下发的白名单
      let lastWhiteList = bluetoothManager.getAllowedBluetoothDevices(adminWant)
      //查询成功后如果列表不为空清空上次列表
      if (lastWhiteList && lastWhiteList.length > 0) {
        bluetoothManager.removeAllowedBluetoothDevices(adminWant, lastWhiteList)
      }
      //执行新列表
      if (newList != undefined && newList.length > 0) {
        bluetoothManager.addAllowedBluetoothDevices(adminWant, newList)
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
      let lastList: string[] = bluetoothManager.getAllowedBluetoothDevices(adminWant)
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
   * 参数是否合法
   * @param paramObj
   * @returns
   */
  isParamValid(paramObj?: BluetoothListControlParam): boolean {
    if (!paramObj) {
      return false
    }
    if (paramObj.deviceIds == undefined) {
      return false
    }
    return true
  }

}

export class BluetoothInfoController implements HarmonyController{

  private TAG: string = "BluetoothInfoController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    try{
      let result = this.getBluetoothInfo()
      let response = ResponseUtils.constSuccessResponse(result)
      callback(true, JSON.stringify(response))
    }catch (err){
      let msg = "control catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  getStatus(): Promise<string> {
    try{
      let result = this.getBluetoothInfo()
      return Promise.resolve(result)
    }catch (err){
      let msg = "getStatus catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      return Promise.reject(msg)
    }
  }

  reset(): void {
    //ignore
  }

  getBluetoothInfo(): string {
    let info = bluetoothManager.getBluetoothInfo(adminWant)
    let infoParam = new BluetoothInfoParam()
    infoParam.name = info.name
    infoParam.state = info.state.valueOf()
    infoParam.connectionState = info.connectionState.valueOf()
    return JSON.stringify(infoParam)
  }

}

export class BluetoothControlParam {

  //是否禁用，true表示禁用，false表示启用
  disallow: boolean = false
}

export class BluetoothListControlParam {

  //蓝牙设备MAC地址的数组。数组为空表示清空管控
  deviceIds: string[] = []
}

export class BluetoothInfoParam {
  //蓝牙名称
  name: string = ""

  /**
   * 表示设备的蓝牙状态
   * 0表示蓝牙已关闭
   * 1表示蓝牙表示蓝牙正在打开
   * 2表示蓝牙已打开
   * 3表示蓝牙正在关闭
   * 4表示蓝牙正在打开LE-only模式
   * 5表示蓝牙正处于LE-only模式
   * 6表示蓝牙正在关闭LE-only模式
   */
  state: number = -1

  /**
   * 设备的蓝牙连接状态
   * 0表示profile已断连
   * 1表示表示profile正在连接
   * 2表示profile已连接
   * 3表示profile正在断连
   */
  connectionState: number = -1
}