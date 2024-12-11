import AbilityConstant from '@ohos.app.ability.AbilityConstant';
import hilog from '@ohos.hilog';
import UIAbility from '@ohos.app.ability.UIAbility';
import Want from '@ohos.app.ability.Want';
import window from '@ohos.window';
import { BusinessError, commonEventManager } from '@kit.BasicServicesKit';
import EventConstants from '../common/EventConstants';
import { BaseConstants } from '../common/BaseConstants';
import LogUtils from '../utils/LogUtils';
import { PreferenceManager } from '../data/PreferenceManager';
import { HarmonyControlFactory } from '../mdm/HarmonyControlFactory';

const TAG: string = "EntryAbility"
export default class EntryAbility extends UIAbility {

  // 用于保存创建成功的订阅者对象，后续使用其完成订阅及退订的动作
  subscriber: commonEventManager.CommonEventSubscriber | null = null
  // 订阅者信息，其中的event字段需要替换为实际的事件名称。
  subscribeInfo: commonEventManager.CommonEventSubscribeInfo = {
    events: [EventConstants.CUSTOM_EVENT_ADMIN_STATUS_CHANGED,
      EventConstants.CUSTOM_EVENT_MANAGED_EVENT], // 订阅事件
    publisherBundleName: BaseConstants.APP_BUNDLE_NAME,
    priority: 1000
  };
  eventCallback = (err: BusinessError, data: commonEventManager.CommonEventData) => {
    if (err) {
      LogUtils.error(TAG, "eventCallback error, " + err.code + " : " + err.message)
      return
    }
    this.handleEventReceive(data)
  }

  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    this.createSubscriber()
  }

  onDestroy(): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    // Main window is created, set main page for this ability
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');

    windowStage.loadContent('pages/MDMPage', (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
    });
  }

  onWindowStageDestroy(): void {
    // Main window is destroyed, release UI related resources
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground(): void {
    // Ability has brought to foreground
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
  }

  onBackground(): void {
    // Ability has back to background
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
  }

  /**
   * 创建订阅者
   */
  createSubscriber(){
    commonEventManager.createSubscriber(this.subscribeInfo, (err: BusinessError, data: commonEventManager.CommonEventSubscriber) => {
      if (err) {
        LogUtils.error(TAG, "createSubscriber error, " + err.code + " : " + err.message)
        return
      }
      LogUtils.info(TAG, "createSubscriber success")
      this.subscriber = data
      this.subscribeEvent()
    })
  }

  /**
   * 启动事件订阅
   */
  subscribeEvent(){
    if (this.subscriber == null) {
      LogUtils.info(TAG, "subscribeEvent, subscriber is null")
      return
    }
    commonEventManager.subscribe(this.subscriber, this.eventCallback)
  }


  /**
   * 事件回调监听处理
   * @param data
   */
  handleEventReceive(data: commonEventManager.CommonEventData){
    let eventTag = data.event
    let param = data.parameters
    LogUtils.debug(TAG, "handleEventReceive, event = " + eventTag + ", param = " + JSON.stringify(param))
    switch (eventTag){
      case EventConstants.CUSTOM_EVENT_ADMIN_STATUS_CHANGED:
        //收到开启设备管理器的公共事件广播
        this.handleAdminStatusEventReceived(data)
        break
      case EventConstants.CUSTOM_EVENT_MANAGED_EVENT:
        //收到设备管理器注册的事件回调
        this.handleManagedEventReceived(data)
        break
      default:
        LogUtils.info(TAG, "handleEventReceive invalid tag: " + eventTag)
    }
  }

  /**
   * 收到开启设备管理器的公共事件广播
   * @param data
   */
  handleAdminStatusEventReceived(data: commonEventManager.CommonEventData){
    let param = data.parameters
    if (param == undefined) {
      LogUtils.info(TAG, "handleEventReceive-adminEvent,  param is undefined")
      PreferenceManager.getInstance().setValueSync(BaseConstants.IS_MDM_ADMIN_ENABLED, false)
      return
    }
    let adminEnable = param!.adminStatus as boolean
    if (adminEnable == undefined){
      LogUtils.info(TAG, "handleEventReceive-adminEvent,  adminEnable is undefined")
      PreferenceManager.getInstance().setValueSync(BaseConstants.IS_MDM_ADMIN_ENABLED, false)
      return
    }
    LogUtils.info(TAG, "handleEventReceive-adminEvent: " + adminEnable)
    PreferenceManager.getInstance().setValueSync(BaseConstants.IS_MDM_ADMIN_ENABLED, adminEnable)
    HarmonyControlFactory.getInstance().isDeviceAdminEnabled = adminEnable
  }

  /**
   * 收到设备管理器注册的事件回调
   * @param data
   */
  handleManagedEventReceived(data: commonEventManager.CommonEventData){
    let param = data.parameters
    if (param == undefined) {
      LogUtils.info(TAG, "handleEventReceive-managedEvent,  param is undefined")
      return
    }
    let methodName: string = param.method as string
    LogUtils.info(TAG, "handleEventReceive-managedEvent, methodName = " + methodName + ", param = " + JSON.stringify(param))
    let bundleName: string = param.who as string
    let versionName: string = param.versionName as string
    let controlFactory = HarmonyControlFactory.getInstance()
    let msg: string = ""
    switch (methodName){
    case EventConstants.MANAGED_EVENT_METHOD_BUNDLE_ADDED:
        msg = "事件通知，新应用安装：" + bundleName
        HarmonyControlFactory.getInstance().updateLogArr(msg)
        break
      case EventConstants.MANAGED_EVENT_METHOD_BUNDLE_REMOVED:
        msg = "事件通知，应用被卸载：" + bundleName
        HarmonyControlFactory.updateLog(controlFactory, msg)
        break
      case EventConstants.MANAGED_EVENT_METHOD_APP_START:
        msg = "事件通知，应用启动：" + bundleName
        HarmonyControlFactory.getInstance().updateLogArr(msg)
        break
      case EventConstants.MANAGED_EVENT_METHOD_APP_STOP:
        msg = "事件通知，应用退出：" + bundleName
        HarmonyControlFactory.getInstance().updateLogArr(msg)
        break
      case EventConstants.MANAGED_EVENT_METHOD_SYSTEM_UPDATE:
        msg = "事件通知，系统更新：" + versionName
        HarmonyControlFactory.updateLog(controlFactory, msg)
        break
      default:
        LogUtils.warn(TAG, "handleEventReceive-managedEvent, invalid method: " + methodName)
    }
  }
}
