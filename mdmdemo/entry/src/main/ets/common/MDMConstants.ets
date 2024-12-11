import adminManager from '@ohos.enterprise.adminManager'
import Want from '@ohos.app.ability.Want'

export const adminWant: Want = {
  bundleName: 'com.mobile.trustspace',
  abilityName: 'EnterPriseAbility'
}

export default class MDMConstants{

  static FLAG_DEFAULT = "0"
  static FLAG_FORCE_CLOSE = "1"
  static FLAG_FORCE_OPEN = "2"

  static LIST_TYPE_BLACK = 0
  static LIST_TYPE_WHITE = 1

  static FLAG_DEVICE_OPERATE_DEFAULT = "0"
  static FLAG_DEVICE_OPERATE_SHUT_DOWN = "1"
  static FLAG_DEVICE_OPERATE_REBOOT = "2"
  static FLAG_DEVICE_OPERATE_RESET = "3"
  static FLAG_DEVICE_OPERATE_LOCK_SCREEN = "4"
  static FLAG_DEVICE_OPERATE_LOCK_DEVICE = "5"
  static FLAG_DEVICE_OPERATE_UNLOCK_DEVICE = "6"

  static readonly FEATURE_BLUETOOTH = "bluetooth"
  static readonly FEATURE_MODIFY_DATETIME = "modifyDateTime"
  static readonly FEATURE_PRINTER = "printer"
  static readonly FEATURE_HDC = "hdc"
  static readonly FEATURE_MICROPHONE = "microphone"
  static readonly FEATURE_FINGERPRINT = "fingerprint"
  static readonly FEATURE_USB = "usb"
  static readonly FEATURE_WIFI = "wifi"
  static readonly FEATURE_SCREENSHOT = "screenshot"
  static readonly FEATURE_SCREENRECORD = "screenRecord"

  //激活设备管理器
  static ENABLE_DEVICE_ADMIN = "enableDeviceAdmin"
  //禁止设备修改系统时间
  static DISALLOW_MODIFY_DATE_TIME = "disallowModifyDateTime"
  //禁止系统升级
  static DISALLOW_SYSTEM_UPGRADE = "disallowSystemUpgrade"
  //禁止usb写入数据
  static DISALLOW_USB = "disallowUsb"
  //禁用WiFi
  static DISALLOW_WIFI = "disallowWIFI"
  //禁用蓝牙
  static DISALLOW_BLUETOOTH = "disallowBluetooth"
  //地理位置管控
  static LOCATION_CONTROL = "locationControl"
  //设备操作
  static DEVICE_OPERATION = "deviceOperation"
  //禁止添加用户
  static DISALLOW_ADD_SYSTEM_USER = "disallowAddSystemUser"
  //禁用麦克风
  static DISALLOW_MICROPHONE = "disallowMicrophone"
  //禁用截屏
  static DISALLOW_SCREENSHOT = "disallowScreenshot"
  //禁用录屏
  static DISALLOW_SCREEN_RECORD = "disallowScreenRecord"
  //禁用指纹识别
  static DISALLOW_FINGER_PRINT = "disallowFingerprint"
  //修改设备设置策略
  static SET_DEVICE_SETTINGS = "setDeviceSettings"
  //设备密码策略
  static DEVICE_PASSWORD_POLICY = "devicePasswordPolicy"
  //应剪切板策略
  static APP_CLIPBOARD_POLICY = "appClipboardPolicy"

  //应用运行黑名单
  static APP_RUNNING_BLACK_LIST = "appRunningBlackList"
  //应用安装黑名单
  static APP_INSTALL_BLACK_LIST = "appInstallBlackList"
  //应用安装白名单
  static APP_INSTALL_WHITE_LIST = "appInstallWhiteList"
  //应用禁止卸载名单
  static APP_DISALLOW_UNINSTALL_LIST = "appDisallowUninstallList"
  //蓝牙白名单
  static BLUETOOTH_WHITE_LIST = "bluetoothWhiteList"
  //开启自启应用名单
  static AUTO_START_APP_LIST = "autoStartAppList"
  //USB设备白名单
  static USB_WHITE_LIST = "usbWhiteList"

  //获取设备蓝牙信息
  static GET_BLUETOOTH_INFO = "getBluetoothInfo"
  //获取设备信息
  static GET_DEVICE_INFO = "getDeviceInfo"
  //WiFi开启状态
  static CHECK_WIFI_ACTIVE = "checkWifiActive"
  //WIFI配置
  static SET_WIFI_PROFILE = "setWifiProfile"
  //获取网络信息
  static GET_NETWORK_INFO = "getNetworkInfo"


  //所有MDM接口方法汇总，不能包含恢复设备管理器，否则后续接口无法调用
  static readonly ALL_MDM_METHOD: string[] = [MDMConstants.DISALLOW_BLUETOOTH, MDMConstants.DISALLOW_MODIFY_DATE_TIME,
    MDMConstants.DISALLOW_SYSTEM_UPGRADE, MDMConstants.DISALLOW_USB, MDMConstants.DISALLOW_WIFI, MDMConstants.LOCATION_CONTROL,
    MDMConstants.DEVICE_OPERATION, MDMConstants.DISALLOW_ADD_SYSTEM_USER, MDMConstants.DISALLOW_MICROPHONE,
    MDMConstants.DISALLOW_SCREENSHOT, MDMConstants.DISALLOW_SCREEN_RECORD, MDMConstants.DISALLOW_FINGER_PRINT,
    MDMConstants.APP_RUNNING_BLACK_LIST, MDMConstants.APP_INSTALL_BLACK_LIST, MDMConstants.APP_INSTALL_WHITE_LIST,
    MDMConstants.APP_DISALLOW_UNINSTALL_LIST, MDMConstants.BLUETOOTH_WHITE_LIST, MDMConstants.AUTO_START_APP_LIST,
    MDMConstants.SET_DEVICE_SETTINGS, MDMConstants.DEVICE_PASSWORD_POLICY, MDMConstants.APP_CLIPBOARD_POLICY,
    MDMConstants.USB_WHITE_LIST]

}