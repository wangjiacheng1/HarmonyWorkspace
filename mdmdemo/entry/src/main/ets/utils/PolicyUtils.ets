import MDMConstants from '../common/MDMConstants'
import { DeviceAdminControlParam } from '../mdm/AdminManager'
import { HarmonyControlFactory } from '../mdm/HarmonyControlFactory'
import { RestrictionControlParam } from '../mdm/RestrictionManager'
import { UsbControlParam } from '../mdm/UsbManager'
import LogUtils from './LogUtils'
import ResourceUtils from './ResourceUtils'
import TextUtils from './TextUtils'
import TypeUtils from './TypeUtils'
import { usb } from '@kit.BasicServicesKit'
import { ApplicationControlParam } from '../mdm/ApplicationManager'
import { LocationControlParam } from '../mdm/LocationManager'
import { SystemUpgradeControlParam } from '../mdm/SystemManager'

const TAG: string = "PolicyUtils"

export default class PolicyUtils{

  /**
   * 查询指定管控功能的管控状态，通过回调一个布尔值反馈结果
   * 适合只有两种管控状态的接口查询
   * @param methodName
   * @param callback
   * 回调true管控为禁用，否则为false
   * @param methodName
   * @param callback
   * @param methodName
   * @param callback
   */
  static getMDMStatusDisabled(methodName: string, callback: (result: boolean) => void){
    HarmonyControlFactory.getInstance().getMDMStatus(methodName)
      .then((result) => {
        if (TextUtils.isEmpty(result)) {
          LogUtils.warn(TAG, "initData, result is empty : " + methodName)
          return
        }
        if (result === MDMConstants.FLAG_FORCE_CLOSE) {
          callback(true)
        }else {
          callback(false)
        }
      })
      .catch((message: string) => {
        LogUtils.warn(TAG, "getMDMStatus error, methodName = " + methodName + " : " + message)
        callback(false)
      })
  }
  static getMDMStatusEnabled(methodName: string, callback: (result: boolean) => void){
    HarmonyControlFactory.getInstance().getMDMStatus(methodName)
      .then((result) => {
        if (TextUtils.isEmpty(result)) {
          LogUtils.warn(TAG, "initData, result is empty : " + methodName)
          return
        }
        if (result === MDMConstants.FLAG_FORCE_OPEN) {
          callback(true)
        }else {
          callback(false)
        }
      })
      .catch((message: string) => {
        LogUtils.warn(TAG, "getMDMStatus error, methodName = " + methodName + " : " + message)
        callback(false)
      })
  }

  /**
   * 查询管控状态，返回字符串数组，适用于名单类管控项
   * @param methodName
   * @param callback
   */
  static getMDMStatusList(methodName: string, callback: (result: string[]) => void){
    HarmonyControlFactory.getInstance().getMDMStatus(methodName)
      .then((result) => {
        LogUtils.info(TAG, "getMDMStatusList success, methodName = " + methodName + ", result = " + result)
        let arr = TextUtils.isEmpty(result) ? [] : result.split(',')
        callback(arr)
      })
      .catch((message: string) => {
        LogUtils.warn(TAG, "getMDMStatusList error, methodName = " + methodName + " : " + message)
        callback([])
      })
  }

  /**
   * 查询管控状态，返回0：不管控；1：强制关；2强制开
   * @param methodName
   * @param callback
   */
  static getMDMStatus(methodName: string, callback: (isSuccess: boolean, result: string) => void){
    HarmonyControlFactory.getInstance().getMDMStatus(methodName)
      .then((result) => {
        LogUtils.info(TAG, "getMDMStatus success, methodName = " + methodName + ", result = " + result)
        callback(true, result)
      })
      .catch((message: string) => {
        LogUtils.warn(TAG, "getMDMStatusList error, methodName = " + methodName + " : " + message)
        callback(false, message)
      })
  }

  /**
   * 根据MDM管控状态字符串返回相对应的文本
   * @param status
   * @returns
   */
  static getMDMControlStatusText(status: string): Resource{
    if (TextUtils.isEmpty(status)) {
      return $r('app.string.mdm_control_default')
    }
    switch(status){
      case MDMConstants.FLAG_FORCE_CLOSE:
        return $r('app.string.mdm_control_force_close')
      case MDMConstants.FLAG_FORCE_OPEN:
        return $r('app.string.mdm_control_force_open')
      default:
        return $r('app.string.mdm_control_default')
    }
  }

  /**
   * 根据设备操作tag返回相应的文本
   * @param tag
   * @returns
   */
  static getMDMDeviceOperateTextResource(tag: string): Resource{
    if (TextUtils.isEmpty(tag)) {
      return $r('app.string.select_device_operate_default')
    }
    switch (tag) {
      case MDMConstants.FLAG_DEVICE_OPERATE_LOCK_SCREEN:
        return $r('app.string.select_device_operate_lock_screen')
      case MDMConstants.FLAG_DEVICE_OPERATE_SHUT_DOWN:
        return $r('app.string.select_device_operate_shutdown')
      case MDMConstants.FLAG_DEVICE_OPERATE_REBOOT:
        return $r('app.string.select_device_operate_reboot')
      case MDMConstants.FLAG_DEVICE_OPERATE_RESET:
        return $r('app.string.select_device_operate_reset')
      default:
        return $r('app.string.select_device_operate_default')
    }
  }

  /**
   * 设备操作文本
   * @param tag
   * @returns
   */
  static getMDMDeviceOperateTextString(tag: string): string{
    return ResourceUtils.getString(PolicyUtils.getMDMDeviceOperateTextResource(tag))
  }


  /**
   * 通过锁屏时间tag获取文本
   * @param tag
   * @returns
   */
  static getMDMScreenOffTextResource(tag: number): Resource {
    switch (tag){
      case 0:
        return $r('app.string.device_screen_off_15s')
      case 1:
        return $r('app.string.device_screen_off_30s')
      case 2:
        return $r('app.string.device_screen_off_1m')
      case 3:
        return $r('app.string.device_screen_off_2m')
      case 4:
        return $r('app.string.device_screen_off_5m')
      case 5:
        return $r('app.string.device_screen_off_10m')
      default:
        return $r('app.string.device_screen_off_15s')
    }
  }

  static getMDMScreenOfMilliseconds(tag: number): number {
    let second: number = 1000
    let minute: number = second * 60
    switch (tag){
      case 0:
        return second * 15
      case 1:
        return second * 30
      case 2:
        return minute
      case 3:
        return minute * 2
      case 4:
        return minute * 5
      case 5:
        return minute * 10
      default:
        return second * 15
    }
  }

  static getMDMScreenOfTag(milliseconds: number): number {
    let second: number = 1000
    let minute: number = second * 60
    switch (milliseconds){
      case second * 15:
        return 0
      case second * 30:
        return 1
      case minute:
        return 2
      case minute * 2:
        return 3
      case minute * 5:
        return 4
      case minute * 10:
        return 5
      default:
        return 0
    }
  }

  /**
   * 构造传入MDM控制器的参数
   * @param methodName
   * @param rawParam
   * @returns
   */
  static constMDMControlParamStr(methodName: string, rawParam: string): string {
    if (TextUtils.isEmpty(methodName)) {
      LogUtils.warn(TAG, "getMDMControlParamStr, methodName is empty")
      return ""
    }
    let result: string = ""
    switch (methodName){
      case MDMConstants.ENABLE_DEVICE_ADMIN:
        let adminParam = new DeviceAdminControlParam()
        adminParam.isEnable = TypeUtils.parseBoolean(rawParam)
        result = JSON.stringify(adminParam)
        break

      case MDMConstants.DISALLOW_WIFI:
        let wifiParam = new RestrictionControlParam()
        wifiParam.disallow = TypeUtils.parseBoolean(rawParam)
        result = JSON.stringify(wifiParam)
        break

      case MDMConstants.DISALLOW_USB:
        let usbParam = new UsbControlParam()
        usbParam.disallow = TypeUtils.parseBoolean(rawParam)
        result = JSON.stringify(usbParam)
        break

      case MDMConstants.DISALLOW_BLUETOOTH:
        let bluetoothParam = new RestrictionControlParam()
        bluetoothParam.disallow = TypeUtils.parseBoolean(rawParam)
        result = JSON.stringify(bluetoothParam)
        break

      case MDMConstants.DISALLOW_MODIFY_DATE_TIME:
        let timeParam = new RestrictionControlParam()
        timeParam.disallow = TypeUtils.parseBoolean(rawParam)
        result = JSON.stringify(timeParam)
        break

      case MDMConstants.APP_RUNNING_BLACK_LIST:
        let appRunningBlackListParam = new ApplicationControlParam()
        appRunningBlackListParam.appIds = TextUtils.isEmpty(rawParam) ? [] : rawParam.split(",")
        result = JSON.stringify(appRunningBlackListParam)
        break

      case MDMConstants.LOCATION_CONTROL:
        let locationParam = new LocationControlParam()
        locationParam.policy = rawParam
        result = JSON.stringify(locationParam)
        break

      case MDMConstants.DISALLOW_ADD_SYSTEM_USER:
        let systemUserParam = new RestrictionControlParam()
        systemUserParam.disallow = TypeUtils.parseBoolean(rawParam)
        result = JSON.stringify(systemUserParam)
        break

      case MDMConstants.DISALLOW_MICROPHONE:
        let micParam = new RestrictionControlParam()
        micParam.disallow = TypeUtils.parseBoolean(rawParam)
        result = JSON.stringify(micParam)
        break

      case MDMConstants.DISALLOW_SCREENSHOT:
        let screenshotParam = new RestrictionControlParam()
        screenshotParam.disallow = TypeUtils.parseBoolean(rawParam)
        result = JSON.stringify(screenshotParam)
        break

      case MDMConstants.DISALLOW_SCREEN_RECORD:
        let recordParam = new RestrictionControlParam()
        recordParam.disallow = TypeUtils.parseBoolean(rawParam)
        result = JSON.stringify(recordParam)
        break

      case MDMConstants.DISALLOW_FINGER_PRINT:
        let fingerprintParam = new RestrictionControlParam()
        fingerprintParam.disallow = TypeUtils.parseBoolean(rawParam)
        result = JSON.stringify(fingerprintParam)
        break

      case MDMConstants.DISALLOW_SYSTEM_UPGRADE:
        let systemUpgradeParam = new SystemUpgradeControlParam()
        systemUpgradeParam.policyType = TypeUtils.parseBoolean(rawParam) ? "1" : "0"
        result = JSON.stringify(systemUpgradeParam)
        break

      default:
        LogUtils.warn(TAG, "getMDMControlLogStr, invalid methodName : " + methodName)
      break
    }
    return result
  }

  /**
   * 获取输出日志
   * @param methodName
   * @param isControl
   * @param result
   * @param msg
   * @returns
   */
  static getMDMControlLogStr(methodName: string, isControl: boolean, result: boolean, msg?: string): string{
    if (MDMConstants.ENABLE_DEVICE_ADMIN !== methodName && !HarmonyControlFactory.getInstance().isDeviceAdminEnabled){
      return "管控失败，请先激活设备管理器"
    }
    switch(methodName){
      case MDMConstants.ENABLE_DEVICE_ADMIN:
        return PolicyUtils.getAdminMangerControlLogStr(isControl, result, msg)
      case MDMConstants.DISALLOW_WIFI:
        return PolicyUtils.getWIFIControlLogStr(isControl, result, msg)
      case MDMConstants.DISALLOW_USB:
        return PolicyUtils.getUSBControlLogStr(isControl, result, msg)
      case MDMConstants.DISALLOW_BLUETOOTH:
        return PolicyUtils.getBluetoothControlLogStr(isControl, result, msg)
      case MDMConstants.DISALLOW_MODIFY_DATE_TIME:
        return PolicyUtils.getModifyDateTimeControlLogStr(isControl, result, msg)
      case MDMConstants.APP_RUNNING_BLACK_LIST:
        return PolicyUtils.getAppRunBlackListControlLogStr(isControl, result, msg)
      case MDMConstants.LOCATION_CONTROL:
        return PolicyUtils.getGPSControlLogStr(isControl, result, msg)
      case MDMConstants.DISALLOW_ADD_SYSTEM_USER:
        return PolicyUtils.getAddSystemUserControlLogStr(isControl, result, msg)
      case MDMConstants.DISALLOW_MICROPHONE:
        return PolicyUtils.getMicrophoneControlLogStr(isControl, result, msg)
      case MDMConstants.DISALLOW_SCREENSHOT:
        return PolicyUtils.getScreenshotControlLogStr(isControl, result, msg)
      case MDMConstants.DISALLOW_SCREEN_RECORD:
        return PolicyUtils.getRecordControlLogStr(isControl, result, msg)
      case MDMConstants.DISALLOW_FINGER_PRINT:
        return PolicyUtils.getFingerprintControlLogStr(isControl, result, msg)
      case MDMConstants.DISALLOW_SYSTEM_UPGRADE:
        return PolicyUtils.getSystemUpgradeControlLogStr(isControl, result, msg)
      case MDMConstants.AUTO_START_APP_LIST:
        return PolicyUtils.getAutoStartAppControlLogStr(isControl, result, msg)
      case MDMConstants.DEVICE_PASSWORD_POLICY:
        return PolicyUtils.getDevicePasswordPolicyLogStr(isControl, result, msg)
      case MDMConstants.USB_WHITE_LIST:
        return PolicyUtils.getUsbWhiteListControlLogStr(isControl, result, msg)
      case MDMConstants.SET_WIFI_PROFILE:
        return PolicyUtils.getWIFIProfileControlLogStr(isControl, result, msg)
      default:
        LogUtils.warn(TAG, "getMDMControlLogStr, invalid methodName : " + methodName)
      return ""
    }
  }

  static getAdminMangerControlLogStr(isControl: boolean, result: boolean, msg?: string): string{
    if (isControl) {
      return result ? "设备管理器启用成功，可以继续执行管控！" : "设备管理器启用失败，请联系管理员：" + msg
    }else {
      return result ? "设备管理器取消成功，已回归个人模式！" : "设备管理器取消失败，请联系管理员： " + msg
    }
  }
  static getWIFIControlLogStr(isControl: boolean, result: boolean, msg?: string): string{
    if (isControl) {
      return result ? "WIFI禁用成功，当前设备已无法使用WiFi，可以在系统设置中查看效果！" : "WiFi禁用失败，请联系管理员：" + msg
    }else {
      return result ? "WiFi已解除禁用，您可以重新打开并连接WiFi！" : "WiFi解除禁用失败，请联系管理员： " + msg
    }
  }
  static getUSBControlLogStr(isControl: boolean, result: boolean, msg?: string): string{
    if (isControl) {
      return result ? "USB禁用成功，当前设备已无法使用USB，可以在系统设置中查看效果！" : "USB禁用失败，请联系管理员：" + msg
    }else {
      return result ? "USB已解除禁用，您可以重新使用USB连接" : "USB解除禁用失败，请联系管理员： " + msg
    }
  }
  static getBluetoothControlLogStr(isControl: boolean, result: boolean, msg?: string): string{
    if (isControl) {
      return result ? "蓝牙禁用成功，当前设备已无法使用蓝牙，可以在系统设置中查看效果！" : "蓝牙禁用失败，请联系管理员：" + msg
    }else {
      return result ? "蓝牙已解除禁用，您可以重新使用蓝牙连接" : "蓝牙解除禁用失败，请联系管理员： " + msg
    }
  }
  static getModifyDateTimeControlLogStr(isControl: boolean, result: boolean, msg?: string): string{
    if (isControl) {
      return result ? "修改系统时间禁用成功，当前设备已无法修改系统事件，可以在系统设置中查看效果" : "修改系统时间禁用失败，请联系管理员：" + msg
    }else {
      return result ? "修改系统时间已解除禁用，您可以重新调整系统时间" : "修改系统时间解除禁用失败，请联系管理员： " + msg
    }
  }
  static getAppRunBlackListControlLogStr(isControl: boolean, result: boolean, msg?: string): string{
    if (isControl) {
      return result ? msg+"应用禁止运行成功，该应用已禁止运行" : "应用禁止运行失败，请联系管理员：" + msg
    }else {
      return result ? msg+"应用已允许运行，您可以继续使用该应用" : "应用允许运行失败，请联系管理员： " + msg
    }
  }
  static getGPSControlLogStr(isControl: boolean, result: boolean, msg?: string): string {
    if (isControl) {
      return result ? "修改GPS管控方式成功，当前设备GPS已无法由用户修改，可以在系统设置-隐私和安全中查看效果" : "修改GPS管控方式失败，请联系管理员：" + msg
    }else {
      return result ? "GPS已解除管控，您可以重新调整GPS，可以在系统设置-隐私和安全中查看效果" : "GPS解除禁用失败，请联系管理员： " + msg
    }
  }

  static getMDMDeviceOperationLogStr(deviceOperationTag: string, result: boolean, msg?: string): string{
    if (!HarmonyControlFactory.getInstance().isDeviceAdminEnabled){
      return "管控失败，请先激活设备管理器"
    }

    if(result){
      return PolicyUtils.getMDMDeviceOperateTextString(deviceOperationTag) + "执行成功！"
    } else {
      return PolicyUtils.getMDMDeviceOperateTextString(deviceOperationTag) + "执行失败：" + msg
    }
  }

  static getAddSystemUserControlLogStr(isControl: boolean, result: boolean, msg?: string): string {
    if (isControl) {
      return result ? "添加用户禁用成功，当前设备已无法添加用户，可以在系统设置中查看效果" : "添加用户禁用失败，请联系管理员：" + msg
    }else {
      return result ? "添加用户已解除禁用，您可以重新添加用户" : "添加用户解除禁用失败，请联系管理员： " + msg
    }
  }

  static getMicrophoneControlLogStr(isControl: boolean, result: boolean, msg?: string): string {
    if (isControl) {
      return result ? "麦克风禁用成功，当前设备已无法使用麦克风" : "麦克风禁用失败，请联系管理员：" + msg
    }else {
      return result ? "麦克风已解除禁用，您可以重新使用麦克风" : "麦克风解除禁用失败，请联系管理员： " + msg
    }
  }

  static getScreenshotControlLogStr(isControl: boolean, result: boolean, msg?: string): string {
    if (isControl) {
      return result ? "截屏禁用成功，当前设备已无法截屏" : "截屏禁用失败，请联系管理员：" + msg
    }else {
      return result ? "截屏已解除禁用，您可以重新使用截屏" : "截屏解除禁用失败，请联系管理员： " + msg
    }
  }

  static getRecordControlLogStr(isControl: boolean, result: boolean, msg?: string): string {
    if (isControl) {
      return result ? "录屏禁用成功，当前设备已无法录屏" : "录屏禁用失败，请联系管理员：" + msg
    }else {
      return result ? "录屏已解除禁用，您可以重新使用录屏" : "录屏解除禁用失败，请联系管理员： " + msg
    }
  }

  static getFingerprintControlLogStr(isControl: boolean, result: boolean, msg?: string): string {
    if (isControl) {
      return result ? "指纹识别禁用成功，当前设备已无法指纹识别" : "指纹识别禁用失败，请联系管理员：" + msg
    }else {
      return result ? "指纹识别已解除禁用，您可以重新使用指纹识别" : "指纹识别解除禁用失败，请联系管理员： " + msg
    }
  }

  static getSystemUpgradeControlLogStr(isControl: boolean, result: boolean, msg?: string): string {
    if (isControl) {
      return result ? "系统升级禁用成功，当前设备已无法升级系统，可到系统设置中查看效果" : "系统升级禁用失败，请联系管理员：" + msg
    }else {
      return result ? "系统升级已解除禁用，您可以重新使用系统升级" : "系统升级解除禁用失败，请联系管理员： " + msg
    }
  }

  static getAutoStartAppControlLogStr(isControl: boolean, result: boolean, msg?: string): string {
    if (isControl) {
      return result ? "该应用已添加至开机自启：" + msg : "添加开机自启应用失败，请联系管理员：" + msg
    }else {
      return result ? "该应用已接触开机自启：" + msg : "接触开机自启失败，请联系管理员： " + msg
    }
  }

  static getScreenOffControlLogStr(result: boolean, msg?: string): string {
    if (result) {
      return "设置锁屏时间成功，可到系统设置中查看效果"
    }else {
      return "设置锁屏时间失败，请联系管理员：" + msg
    }
  }

  static getDevicePasswordPolicyLogStr(isControl: boolean, result: boolean, msg?: string): string {
    if (isControl) {
      return result ? "设置设备密码策略成功" : "设置设备密码策略失败，请联系管理员：" + msg
    }else {
      return result ? "清除设备密码策略成功：" + msg : "清除设备密码策略失败，请联系管理员： " + msg
    }
  }

  static getUsbWhiteListControlLogStr(isControl: boolean, result: boolean, msg?: string): string {
    if (isControl) {
      return result ? "该设备已添加至usb设备白名单：" + msg : "添加usb设备白名单失败，请联系管理员：" + msg
    }else {
      return result ? "该设备已从usb设备白名单中删除：" + msg : "删除usb设备白名单失败，请联系管理员： " + msg
    }
  }

  static getWIFIProfileControlLogStr(isControl: boolean, result: boolean, msg?: string): string {
    return result ? "连接WiFi成功：" + msg : "链接WiFi失败，请联系管理员：" + msg
  }


}