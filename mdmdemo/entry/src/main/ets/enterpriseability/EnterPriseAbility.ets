import { EnterpriseAdminExtensionAbility, systemManager } from '@kit.MDMKit';
import LogUtils from '../utils/LogUtils';
import { BusinessError, commonEventManager } from '@kit.BasicServicesKit';
import { BaseConstants } from '../common/BaseConstants';
import EventConstants from '../common/EventConstants';
import KVDBManager from '../data/KVDBManager';
import common from '@ohos.app.ability.common';

const TAG: string = "EnterPriseAbility"
export default class EnterPriseAbility extends EnterpriseAdminExtensionAbility{

  TAG:string = "EnterPriseAbility"

  onAdminEnabled(){
    LogUtils.info(this.TAG, "onAdminEnabled")
    this.sendAdminStatusEvent(true)
    //this.saveAdminStatus(true)
  }

  onAdminDisabled(){
    LogUtils.info(this.TAG, "onAdminEnabled")
    this.sendAdminStatusEvent(false)
    //this.saveAdminStatus(false)
  }

  onStart(): void {
    LogUtils.info(this.TAG, "onStart")
  }

  onBundleAdded(bundleName: string): void {
    LogUtils.info(TAG, "onBundleAdded: " + bundleName)
    this.sendAppManagedEvent(EventConstants.MANAGED_EVENT_METHOD_BUNDLE_ADDED, bundleName)
  }

  onBundleRemoved(bundleName: string): void {
    LogUtils.info(TAG, "onBundleRemoved: " + bundleName)
    this.sendAppManagedEvent(EventConstants.MANAGED_EVENT_METHOD_BUNDLE_REMOVED, bundleName)
  }

  onAppStart(bundleName: string): void {
    LogUtils.info(TAG, "onAppStart: " + bundleName)
    this.sendAppManagedEvent(EventConstants.MANAGED_EVENT_METHOD_APP_START, bundleName)
  }

  onAppStop(bundleName: string): void {
    LogUtils.info(TAG, "onAppStop: " + bundleName)
    this.sendAppManagedEvent(EventConstants.MANAGED_EVENT_METHOD_APP_STOP, bundleName)
  }

  onSystemUpdate(systemUpdateInfo: systemManager.SystemUpdateInfo): void {
    LogUtils.info(TAG, "onSystemUpdate: " + JSON.stringify(systemUpdateInfo))
    this.sendSystemUpdateEvent(systemUpdateInfo)
  }

  /**
   * 发送广播，通知设备管理器状态变化
   * @param isAdminEnable
   */
  sendAdminStatusEvent(isAdminEnable: boolean){
    let options: commonEventManager.CommonEventPublishData = {
      bundleName: BaseConstants.APP_BUNDLE_NAME,
      isOrdered: true,
      parameters:{
        adminStatus: isAdminEnable
      }
    }
    this.sendCustomEvent(EventConstants.CUSTOM_EVENT_ADMIN_STATUS_CHANGED, options)
  }

  /**
   * 发送应用相关的MDM事件通知
   * @param eventName
   * @param bundleName
   */
  sendAppManagedEvent(eventName: string, bundleName: string){
    let options: commonEventManager.CommonEventPublishData = {
      bundleName: BaseConstants.APP_BUNDLE_NAME,
      isOrdered: true,
      parameters:{
        method: eventName,
        who: bundleName
      }
    }
    this.sendCustomEvent(EventConstants.CUSTOM_EVENT_MANAGED_EVENT, options)
  }

  /**
   * 发送系统更新事件
   * @param updateInfo
   */
  sendSystemUpdateEvent(updateInfo: systemManager.SystemUpdateInfo){
    let options: commonEventManager.CommonEventPublishData = {
      bundleName: BaseConstants.APP_BUNDLE_NAME,
      isOrdered: true,
      parameters:{
        method: EventConstants.MANAGED_EVENT_METHOD_SYSTEM_UPDATE,
        versionName: updateInfo.versionName,
        firstReceivedTime: updateInfo.firstReceivedTime,
        packageType: updateInfo.packageType
      }
    }
    this.sendCustomEvent(EventConstants.CUSTOM_EVENT_MANAGED_EVENT, options)
  }

  /**
   * 发送公共事件广播
   * @param eventName
   * @param options
   */
  sendCustomEvent(eventName: string, options: commonEventManager.CommonEventPublishData) {
    commonEventManager.publish(eventName, options, (err: BusinessError) => {
      if (err) {
        LogUtils.error(this.TAG, "sendCustomEvent error, eventName = " + eventName + ", err = " + JSON.stringify(err))
      } else {
        LogUtils.info(this.TAG, "sendCustomEvent success")
      }
    })
  }

  saveAdminStatus(isAdminEnable: boolean){
    LogUtils.debug(TAG, "saveAdminStatus: " + isAdminEnable)
    KVDBManager.getInstance().putData(BaseConstants.IS_MDM_ADMIN_ENABLED, isAdminEnable)
  }
}