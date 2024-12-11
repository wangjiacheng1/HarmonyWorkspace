import { plainToClassFromExist } from 'class-transformer'
import MDMConstants from '../common/MDMConstants'
import LogUtils from '../utils/LogUtils'
import TextUtils from '../utils/TextUtils'
import TypeUtils from '../utils/TypeUtils'
import { AccountController } from './AccountManager'
import DeviceAdminController, { DeviceAdminControlParam } from './AdminManager'
import AppRunningBlackListController, { ApplicationControlParam,
  AppWantParam,
  AutoStartAppListController,
  AutoStartAppsControlParam} from './ApplicationManager'
import BlueToothController, { BluetoothControlParam,
  BluetoothInfoController,
  BluetoothListController,
  BluetoothListControlParam } from './BlueToothManager'
import { AppDisallowUninstallListController, AppInstallListController, BundleControlParam } from './BundleManager'
import { DeviceInfoController, DeviceOperationManager } from './DeviceControlManager'
import { DeviceSettingController } from './DeviceSettingControlManager'
import { HarmonyController } from './HarmonyController'
import LocationController, { LocationControlParam } from './LocationManager'
import { GetNetworkInfoController } from './NetworkManager'
import {
  DisallowModifyDateTimeController,
  FingerprintController,
  MicrophoneController, RecordController,
  RestrictionControlParam,
  ScreenshotController } from './RestrictionManager'
import { DevicePasswordController, DevicePasswordParam } from './SecurityManager'
import { SystemUpgradeController } from './SystemManager'
import { UsbController, UsbControlParam, UsbDeviceId,
  UsbWhiteListController,
  UsbWhiteListControlParam } from './UsbManager'
import { DisableWIFIController, WIFIActiveController, WIFIControlParam, WIFIProfileController } from './WIFIManager'

export interface MDMControlObserver{
  update(key:string, value:string | undefined | null):void
}

const TAG: string = "HarmonyControlFactory"

@Observed
export class HarmonyControlFactory{

  private static mInstance:HarmonyControlFactory | undefined = undefined
  //观察者列表
  private observers:MDMControlObserver[] = []

  mLogcatStrArr: string[] = []

  globalSettingVersion: number = -1

  isWIFIDisabled: boolean = false
  isUsbDisabled: boolean = false
  isModifyDateTimeDisabled: boolean = false
  isDeviceAdminEnabled: boolean = false
  isBluetoothDisabled: boolean = false
  isAddSystemUserDisabled: boolean = false
  isMicrophoneDisabled: boolean = false
  isRecordDisabled: boolean = false
  isScreenshotDisabled: boolean = false
  isFingerprintDisabled: boolean = false
  isSystemUpgradeDisabled: boolean = false
  isWifiActive: boolean = false
  disallowRunningApps: string[] = []
  disallowInstallApps: string[] = []
  allowedInstallApps: string[] = []
  allowedBluetoothList: string[] = []
  autoStartAppList: AppWantParam[] = []
  locationControlStatus: string = MDMConstants.FLAG_DEFAULT
  deviceOperateTag: string = MDMConstants.FLAG_DEVICE_OPERATE_DEFAULT
  curScreenOffTag: number = 0
  curDevicePasswordPolicy: DevicePasswordParam = new DevicePasswordParam()
  curUsbWhiteDeviceList: UsbDeviceId[] = []
  
  private constructor() {
  }

  public static getInstance():HarmonyControlFactory{
    if(HarmonyControlFactory.mInstance == undefined){
      HarmonyControlFactory.mInstance = new HarmonyControlFactory()
    }
    return HarmonyControlFactory.mInstance;
  }

  addObserver(observer:MDMControlObserver){
    this.observers.push(observer)
  }

  removeObserver(observer:MDMControlObserver){
    if (this.observers.length <= 0) {
      return
    }
    let index = this.observers.indexOf(observer)
    if (index >= 0) {
      this.observers.splice(index)
    }
  }

  /**
   * 通知观察者更新
   * @param key
   * @param value
   */
  notify(key:string, value:string | undefined | null){
    for(let observer of this.observers){
      observer.update(key, value)
    }
  }

  /**
   * 根据methodName获取对应的controller
   * @param methodName
   * @returns
   */
  create(methodName:string): HarmonyController | null{
    switch (methodName) {
      case MDMConstants.DISALLOW_MODIFY_DATE_TIME:
        return new DisallowModifyDateTimeController();

      case MDMConstants.DISALLOW_USB:
        return new UsbController();

      case MDMConstants.DISALLOW_WIFI:
        return new DisableWIFIController();

      case MDMConstants.ENABLE_DEVICE_ADMIN:
        return new DeviceAdminController();

      case MDMConstants.APP_RUNNING_BLACK_LIST:
        return new AppRunningBlackListController();

      case MDMConstants.DISALLOW_BLUETOOTH:
        return new BlueToothController()

      case MDMConstants.LOCATION_CONTROL:
        return new LocationController()

      case MDMConstants.DEVICE_OPERATION:
        return new DeviceOperationManager()

      case MDMConstants.DISALLOW_ADD_SYSTEM_USER:
        return new AccountController()

      case MDMConstants.DISALLOW_MICROPHONE:
        return new MicrophoneController()

      case MDMConstants.APP_INSTALL_BLACK_LIST:
        return new AppInstallListController(MDMConstants.LIST_TYPE_BLACK)

      case MDMConstants.APP_INSTALL_WHITE_LIST:
        return new AppInstallListController(MDMConstants.LIST_TYPE_WHITE)

      case MDMConstants.APP_DISALLOW_UNINSTALL_LIST:
        return new AppDisallowUninstallListController()

      case MDMConstants.DISALLOW_SCREEN_RECORD:
        return new RecordController()

      case MDMConstants.DISALLOW_SCREENSHOT:
        return new ScreenshotController()

      case MDMConstants.DISALLOW_FINGER_PRINT:
        return new FingerprintController()

      case MDMConstants.DISALLOW_SYSTEM_UPGRADE:
        return new SystemUpgradeController()

      case MDMConstants.BLUETOOTH_WHITE_LIST:
        return new BluetoothListController()

      case MDMConstants.AUTO_START_APP_LIST:
        return new AutoStartAppListController()

      case MDMConstants.GET_BLUETOOTH_INFO:
        return new BluetoothInfoController()

      case MDMConstants.GET_DEVICE_INFO:
        return new DeviceInfoController()

      case MDMConstants.SET_DEVICE_SETTINGS:
        return new DeviceSettingController()

      case MDMConstants.DEVICE_PASSWORD_POLICY:
        return new DevicePasswordController()

      case MDMConstants.CHECK_WIFI_ACTIVE:
        return new WIFIActiveController()

      case MDMConstants.SET_WIFI_PROFILE:
        return new WIFIProfileController()

      case MDMConstants.USB_WHITE_LIST:
        return new UsbWhiteListController()

      case MDMConstants.GET_NETWORK_INFO:
        return new GetNetworkInfoController

      default:
        LogUtils.warn(TAG, "methodName is error : " + methodName)
        return null;
    }
  }

  /**
   * 执行管控
   * @param methodName
   * @param paramValue
   */
  executeControl(methodName: string, paramValue: string, callback?: (result: boolean, msg: string) => void){
    let controller = this.create(methodName)
    if (controller == null) {
      LogUtils.warn(TAG, "executeControl, controller is null : " + methodName)
      if (callback) {
        callback(false, "controller is not implement: " + methodName)
      }
      return
    }
    controller.control(paramValue, (result: boolean, message: string) => {
      LogUtils.info(TAG, "executeControl, methodName = " + methodName + ", result = " + result + ", message = " + message)
      if (result) {
        this.updateLocalStatus(methodName, paramValue)
        this.notify(methodName, paramValue)
        if (callback) {
          callback(true, message)
        }
      } else {
        if (callback) {
          callback(false, message)
        }
      }
    })
  }

  /**
   * 查询指定接口的管控状态
   * @param methodName
   * @returns
   */
  async getMDMStatus(methodName: string): Promise<string>{
    let controller = this.create(methodName)
    if (controller == null) {
      LogUtils.warn(TAG, "getMDMStatus, controller is null : " + methodName)
      return Promise.reject("controller is null")
    }
    let result = controller.getStatus()
    return result
  }

  /**
   * 更新本地管控状态
   * @param methodName
   * @param param
   */
  updateLocalStatus(methodName: string, param: string){
    switch(methodName){
      case MDMConstants.DISALLOW_USB:
        let usbParamObj: UsbControlParam = JSON.parse(param) as UsbControlParam
        this.isUsbDisabled = usbParamObj.disallow
        break

      case MDMConstants.DISALLOW_WIFI:
        let wifiParamObj: WIFIControlParam = JSON.parse(param) as WIFIControlParam
        this.isWIFIDisabled = wifiParamObj.disallow
        break

      case MDMConstants.DISALLOW_MODIFY_DATE_TIME:
        let timeParamObj: RestrictionControlParam = JSON.parse(param) as RestrictionControlParam
        this.isModifyDateTimeDisabled = timeParamObj.disallow
        break

      case MDMConstants.ENABLE_DEVICE_ADMIN:
        let adminParamObj: DeviceAdminControlParam = JSON.parse(param) as DeviceAdminControlParam
        this.isDeviceAdminEnabled = adminParamObj.isEnable
        break

      case MDMConstants.DISALLOW_BLUETOOTH:
        let bluetoothParamObj: BluetoothControlParam = JSON.parse(param) as BluetoothControlParam
        this.isBluetoothDisabled = bluetoothParamObj.disallow
        break

      case MDMConstants.APP_RUNNING_BLACK_LIST:
        let appRunningBlackListParamObj: ApplicationControlParam = JSON.parse(param) as ApplicationControlParam
        this.disallowRunningApps = appRunningBlackListParamObj.appIds ? appRunningBlackListParamObj.appIds : []
        break

      case MDMConstants.LOCATION_CONTROL:
        let locationParamObj: LocationControlParam = JSON.parse(param) as LocationControlParam
        this.locationControlStatus = locationParamObj.policy
        break

      case MDMConstants.DISALLOW_ADD_SYSTEM_USER:
        let systemUserParamObj: RestrictionControlParam = JSON.parse(param) as RestrictionControlParam
        this.isAddSystemUserDisabled = systemUserParamObj.disallow
        break

      case MDMConstants.DISALLOW_MICROPHONE:
        let microphoneParamObj: RestrictionControlParam = JSON.parse(param) as RestrictionControlParam
        this.isMicrophoneDisabled = microphoneParamObj.disallow
        break

      case MDMConstants.DISALLOW_SCREEN_RECORD:
        let recordParamObj: RestrictionControlParam = JSON.parse(param) as RestrictionControlParam
        this.isRecordDisabled = recordParamObj.disallow
        break

      case MDMConstants.DISALLOW_SCREENSHOT:
        let screenshotParamObj: RestrictionControlParam = JSON.parse(param) as RestrictionControlParam
        this.isScreenshotDisabled = screenshotParamObj.disallow
        break

      case MDMConstants.DISALLOW_FINGER_PRINT:
        let fingerprintParamObj: RestrictionControlParam = JSON.parse(param) as RestrictionControlParam
        this.isFingerprintDisabled = fingerprintParamObj.disallow
        break

      case MDMConstants.DISALLOW_SYSTEM_UPGRADE:
        this.isSystemUpgradeDisabled = TypeUtils.parseBoolean(param)
        break

      case MDMConstants.APP_INSTALL_BLACK_LIST:
        let installBlackListParamObj: BundleControlParam = JSON.parse(param) as BundleControlParam
        this.disallowInstallApps = installBlackListParamObj.appIds ? installBlackListParamObj.appIds : []
        this.allowedInstallApps = []
        break

      case MDMConstants.APP_INSTALL_WHITE_LIST:
        let installWhiteListParamObj: BundleControlParam = JSON.parse(param) as BundleControlParam
        this.allowedInstallApps = installWhiteListParamObj.appIds ? installWhiteListParamObj.appIds : []
        this.disallowRunningApps = []
      break

      case MDMConstants.BLUETOOTH_WHITE_LIST:
        let bluetoothWhiteList: BluetoothListControlParam = JSON.parse(param) as BluetoothListControlParam
        this.allowedBluetoothList = bluetoothWhiteList.deviceIds ? bluetoothWhiteList.deviceIds : []
        break

      case MDMConstants.AUTO_START_APP_LIST:
        let autoStartAppListParam: AutoStartAppsControlParam = JSON.parse(param) as AutoStartAppsControlParam
        this.autoStartAppList = autoStartAppListParam.autoStartApps
        break

      case MDMConstants.DEVICE_PASSWORD_POLICY:
        let devicePasswordParam: DevicePasswordParam = JSON.parse(param) as DevicePasswordParam
        this.curDevicePasswordPolicy = devicePasswordParam
        break

      case MDMConstants.CHECK_WIFI_ACTIVE:
        this.getMDMStatus(methodName)
          .then((result) => {
            let active: boolean = result === MDMConstants.FLAG_FORCE_OPEN
            this.isWifiActive = active
          })
        break

      case MDMConstants.USB_WHITE_LIST:
        this.getMDMStatus(methodName)
          .then((result) => {
            let obj: UsbWhiteListControlParam = plainToClassFromExist(new UsbWhiteListControlParam(), JSON.parse(result))
            this.curUsbWhiteDeviceList = obj.usbDeviceIds
          })

      default:
        LogUtils.warn(TAG, "updateLocalStatus, invalid methodName: " + methodName)
    }
  }

  resetAll(){
    for(let method of MDMConstants.ALL_MDM_METHOD){
      let controller = this.create(method)
      if (controller == null) {
        LogUtils.warn(TAG, "resetAll, controller is null : " + method)
        continue
      }
      controller.reset()
    }

    this.resetAdminManager()
  }

  resetAdminManager(){
    let controller = this.create(MDMConstants.ENABLE_DEVICE_ADMIN)
    if (controller == null) {
      LogUtils.warn(TAG, "resetAdminManager, controller is null")
      return
    }
    controller.reset()
  }

  updateLogArr(msg: string) {
    this.mLogcatStrArr.push(msg)
  }

  static updateLog(controlFactory: HarmonyControlFactory, msg: string){
    controlFactory.updateLogArr(msg)
  }

}