import { HarmonyController } from './HarmonyController'
import restrictions from '@ohos.enterprise.restrictions';
import MDMConstants, { adminWant } from '../common/MDMConstants'
import LogUtils from '../utils/LogUtils';
import TextUtils from '../utils/TextUtils';
import { ResponseUtils } from '../utils/ResponseUtils';
import { plainToClassFromExist, Type } from 'class-transformer';
import 'reflect-metadata'
import { usbManager } from '@kit.MDMKit';


/**
 * 禁用usb
 */
export class UsbController implements HarmonyController{

  TAG:string = "UsbController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "control, paramValue = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "control, param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    //let isDisable = TypeUtils.parseBoolean(paramValue)
    let paramObj: UsbControlParam = JSON.parse(paramValue) as UsbControlParam
    if (!this.isParamValid(paramObj)) {
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let isDisable = paramObj.disallow
    try {
      restrictions.setDisallowedPolicy(adminWant, MDMConstants.FEATURE_USB, isDisable)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch (err) {
      LogUtils.error(this.TAG, "control error : " + err)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  async getStatus(): Promise<string> {
    let result = restrictions.getDisallowedPolicy(adminWant, MDMConstants.FEATURE_USB)
    LogUtils.info(this.TAG, "getStatus : " + result)
    let flag = result ? MDMConstants.FLAG_FORCE_CLOSE : MDMConstants.FLAG_DEFAULT
    return Promise.resolve(flag)
  }

  reset(): void {
    try {
      restrictions.setDisallowedPolicy(adminWant, MDMConstants.FEATURE_USB, false)
      LogUtils.debug(this.TAG, "reset success")
    } catch(err){
      LogUtils.error(this.TAG, "reset err: " + JSON.stringify(err))
    }
  }

  isParamValid(paramObj?: UsbControlParam): boolean {
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
 * USB设备白名单管控
 */
export class UsbWhiteListController implements HarmonyController {

  private TAG: string = "UsbWhiteListController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "control, param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    let paramObj: UsbWhiteListControlParam = plainToClassFromExist(new UsbWhiteListControlParam(), JSON.parse(paramValue))
    if (!this.isParamValid(paramObj)) {
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let newList = this.constUsbDeviceArray(paramObj)
    LogUtils.info(this.TAG, "control, paramValue = " + JSON.stringify(paramObj))
    try {
      //先查询上一次下发的白名单
      let lastWhiteList = usbManager.getAllowedUsbDevices(adminWant)
      //查询成功后如果列表不为空清空上次列表
      if (lastWhiteList && lastWhiteList.length > 0) {
        usbManager.removeAllowedUsbDevices(adminWant, lastWhiteList)
      }
      //执行新列表
      if (newList != undefined && newList.length > 0) {
        usbManager.addAllowedUsbDevices(adminWant, newList)
      }
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch (err) {
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
      let lastList = usbManager.getAllowedUsbDevices(adminWant)
      let usbWhiteListParam: UsbWhiteListControlParam = new UsbWhiteListControlParam()
      usbWhiteListParam.usbDeviceIds = []
      if (lastList && lastList.length > 0) {
        let usbDeviceArray: Array<UsbDeviceId> = []
        for (let i = 0; i < lastList.length; i++) {
          if (lastList[i].productId == 0) {
            continue
          }
          let usbDeviceId = new UsbDeviceId()
          usbDeviceId.vendorId = lastList[i].vendorId
          usbDeviceId.productId = lastList[i].productId
          usbDeviceArray.push(usbDeviceId)
        }
        usbWhiteListParam.usbDeviceIds = usbDeviceArray
      }
      msg = JSON.stringify(usbWhiteListParam)
      isSuccess = true
    }catch (err){
      msg = "getStatus catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      isSuccess = false
    }

    return isSuccess ? Promise.resolve(msg) : Promise.reject(msg)
  }

  reset(): void {
    let clearParam = new UsbWhiteListControlParam()
    clearParam.usbDeviceIds = []
    this.control(JSON.stringify(clearParam), (isSuccess, message) => {
      if (!isSuccess) {
        LogUtils.error(this.TAG, "reset error, " + message)
      }
    })
  }

  isParamValid(paramObj: UsbWhiteListControlParam): boolean {
    if (!paramObj || !paramObj.usbDeviceIds) {
      return false
    }
    let isValid = paramObj.usbDeviceIds.every(item => {
      return item.isValid()
    })
    return isValid
  }

  constUsbDeviceArray(paramObj: UsbWhiteListControlParam): usbManager.UsbDeviceId[] {
    let resultArray: usbManager.UsbDeviceId[] = []
    if (!paramObj || !paramObj.usbDeviceIds || paramObj.usbDeviceIds.length == 0) {
      return resultArray
    }
    for(let item of paramObj.usbDeviceIds) {
      let usbDeviceId: usbManager.UsbDeviceId = {
        vendorId: item.vendorId,
        productId: item.productId
      }
      resultArray.push(usbDeviceId)
    }
    return resultArray
  }

}


export class UsbControlParam {
  //true表示禁止使用，false表示允许使用。
  disallow: boolean = false
}

export class UsbWhiteListControlParam {

  //USB设备ID数组。添加后的数组长度上限为1000。
  @Type(() => UsbDeviceId)
  usbDeviceIds: Array<UsbDeviceId> = [new UsbDeviceId()]
}

export class UsbDeviceId {
  //厂商ID。
  vendorId: number = 0
  //产品ID。
  productId: number = 0

  isValid(): boolean {
    if (!this.vendorId) {
      return false
    }
    if (!this.productId) {
      return false
    }
    return true
  }
}