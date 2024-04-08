import EnterpriseAdminExtensionAbility from '@ohos.enterprise.EnterpriseAdminExtensionAbility';
import enterpriseDeviceManager from '@ohos.enterpriseDeviceManager';
import MDMConstants from '../constants.MDMConstants';

export default class EnterpriseAdminAbility extends EnterpriseAdminExtensionAbility{

  onAdminEnabled(){
    console.log("onAdminEnabled")
  }

  onAdminDisabled(){
    console.log("onAdminDisabled")
  }

  subscribeManagedEventCallback(){
    enterpriseDeviceManager.enableAdmin(MDMConstants.wantTemp, MDMConstants.enterpriseInfo, enterpriseDeviceManager.AdminType.ADMIN_TYPE_NORMAL, )
  }
}