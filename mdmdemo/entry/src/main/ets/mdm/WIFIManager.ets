import { HarmonyController } from './HarmonyController';
import restrictions from '@ohos.enterprise.restrictions';
import MDMConstants, { adminWant } from '../common/MDMConstants';
import LogUtils from '../utils/LogUtils';
import TextUtils from '../utils/TextUtils';
import { ResponseUtils } from '../utils/ResponseUtils';
import { wifiManager } from '@kit.MDMKit';
import { plainToClassFromExist, Type } from 'class-transformer';
import 'reflect-metadata'

/**
 * WiFi禁用
 */
export class DisableWIFIController implements HarmonyController{

  TAG:string = "DisableWIFIController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    LogUtils.info(this.TAG, "paramValue = " + paramValue)
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }

    //let isDisable = TypeUtils.parseBoolean(paramValue)
    let paramObj: WIFIControlParam = JSON.parse(paramValue) as WIFIControlParam
    if (!this.isParamValid(paramObj)) {
      LogUtils.warn(this.TAG, "param is invalid")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    let isDisable = paramObj.disallow
    try {
      restrictions.setDisallowedPolicy(adminWant, MDMConstants.FEATURE_WIFI, isDisable)
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch (err) {
      LogUtils.error(this.TAG, "control error : " + err)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    };
  }

  async getStatus(): Promise<string> {
    let result = restrictions.getDisallowedPolicy(adminWant, MDMConstants.FEATURE_WIFI)
    LogUtils.info(this.TAG, "getStatus : " + result)
    let flag = result ? MDMConstants.FLAG_FORCE_CLOSE : MDMConstants.FLAG_DEFAULT
    return Promise.resolve(flag)
  }

  reset(): void {
    try {
      restrictions.setDisallowedPolicy(adminWant, MDMConstants.FEATURE_WIFI, false)
      LogUtils.debug(this.TAG, "reset success")
    } catch(err){
      LogUtils.error(this.TAG, "reset err: " + JSON.stringify(err))
    }
  }

  isParamValid(paramObj?: WIFIControlParam): boolean {
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
 * WIFI状态查询
 */
export class WIFIActiveController implements HarmonyController {

  private TAG: string = "WIFIActiveController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    try{
      let result = this.getWifiActiveStatus()
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
      let active = this.getWifiActiveStatus()
      let result: string = active ? MDMConstants.FLAG_FORCE_OPEN : MDMConstants.FLAG_FORCE_CLOSE
      return Promise.resolve(String(result))
    }catch (err){
      let msg = "getStatus catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      return Promise.reject(msg)
    }
  }

  reset(): void {
    //ignore
  }

  getWifiActiveStatus(): boolean {
    let result = wifiManager.isWifiActiveSync(adminWant)
    return result
  }

}

/**
 * wifi配置管理器
 */
export class WIFIProfileController implements HarmonyController {

  private TAG: string = "WIFIProfileController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    if (TextUtils.isEmpty(paramValue)) {
      LogUtils.warn(this.TAG, "control，param is empty")
      let response = ResponseUtils.constInvalidParamResponse()
      callback(false, JSON.stringify(response))
      return
    }
    try {
      let paramObj: WIFIProfileParam = plainToClassFromExist(new WIFIProfileParam(), JSON.parse(paramValue))
      if (!this.isParamValid(paramObj)){
        LogUtils.warn(this.TAG, "control，param is invalid")
        let response = ResponseUtils.constInvalidParamResponse()
        callback(false, JSON.stringify(response))
        return
      }
      let wifiProfile = this.constWifiProfile(paramObj)
      wifiManager.setWifiProfileSync(adminWant, wifiProfile)
      LogUtils.info(this.TAG, "success")
      let response = ResponseUtils.constSuccessResponse("")
      callback(true, JSON.stringify(response))
    } catch (err){
      let msg = "control catch err, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  getStatus(): Promise<string> {
    return Promise.resolve("")
  }

  reset(): void {
    //ignore
  }

  isParamValid(paramObj: WIFIProfileParam): boolean {
    if (!paramObj) {
      return false
    }
    if (TextUtils.isEmpty(paramObj.ssid)) {
      return false
    }
    return true
  }

  constWifiProfile(paramObj: WIFIProfileParam): wifiManager.WifiProfile {
    let staticIp: wifiManager.IpProfile | undefined = this.constIpProfile(paramObj.staticIp)
    let eapProfile: wifiManager.WifiEapProfile | undefined = this.constEapProfile(paramObj.eapProfile)
    let wifiProfile: wifiManager.WifiProfile = {
      "ssid": paramObj.ssid,
      "bssid": paramObj.bssid,
      "preSharedKey": paramObj.preSharedKey,
      "isHiddenSsid": paramObj.isHiddenSsid,
      "securityType": this.constWIFISecurityType(paramObj.securityType),
      "creatorUid": paramObj.creatorUid,
      "disableReason": paramObj.disableReason,
      "netId": paramObj.netId,
      "randomMacType": paramObj.randomMacType,
      "randomMacAddr": paramObj.randomMacAddr,
      "ipType": paramObj.ipType,
      "staticIp": staticIp,
      "eapProfile": eapProfile
    }
    return wifiProfile
  }

  constIpProfile(paramObj: IpProfile | undefined): wifiManager.IpProfile | undefined {
    if (!paramObj) {
      return undefined
    }
    let ipProfile: wifiManager.IpProfile = {
      "ipAddress": paramObj.ipAddress,
      "prefixLength": paramObj.prefixLength,
      "gateway": paramObj.gateway,
      "dnsServers": paramObj.dnsServers,
      "domains": paramObj.domains
    }
    return ipProfile
  }

  constEapProfile(paramObj: WifiEapProfile | undefined): wifiManager.WifiEapProfile | undefined {
    if (!paramObj) {
      return undefined
    }
    let eapProfile: wifiManager.WifiEapProfile = {
      "eapMethod": paramObj.eapMethod,
      "phase2Method": paramObj.phase2Method,
      "identity": paramObj.identity,
      "anonymousIdentity": paramObj.anonymousIdentity,
      "password": paramObj.password,
      "caCertAliases": paramObj.caCertAliases,
      "caPath": paramObj.caPath,
      "clientCertAliases": paramObj.clientCertAliases,
      "certEntry": paramObj.certEntry,
      "certPassword": paramObj.certPassword,
      "altSubjectMatch": paramObj.altSubjectMatch,
      "domainSuffixMatch": paramObj.domainSuffixMatch,
      "realm": paramObj.realm,
      "plmn": paramObj.plmn,
      "eapSubId": paramObj.eapSubId
    }
    return eapProfile
  }

  constWIFISecurityType(value: number): wifiManager.WifiSecurityType {
    let result = wifiManager.WifiSecurityType.WIFI_SEC_TYPE_INVALID
    switch (value){
      case 0:
        result = wifiManager.WifiSecurityType.WIFI_SEC_TYPE_INVALID
        break
      case 1:
        result = wifiManager.WifiSecurityType.WIFI_SEC_TYPE_OPEN
        break
      case 2:
        result = wifiManager.WifiSecurityType.WIFI_SEC_TYPE_WEP
        break
      case 3:
        result = wifiManager.WifiSecurityType.WIFI_SEC_TYPE_PSK
        break
      case 4:
        result = wifiManager.WifiSecurityType.WIFI_SEC_TYPE_SAE
        break
      case 5:
        result = wifiManager.WifiSecurityType.WIFI_SEC_TYPE_EAP
        break
      case 6:
        result = wifiManager.WifiSecurityType.WIFI_SEC_TYPE_EAP_SUITE_B
        break
      case 7:
        result = wifiManager.WifiSecurityType.WIFI_SEC_TYPE_OWE
        break
      case 8:
        result = wifiManager.WifiSecurityType.WIFI_SEC_TYPE_WAPI_CERT
        break
      case 9:
        result = wifiManager.WifiSecurityType.WIFI_SEC_TYPE_WAPI_PSK
        break
      default:
        LogUtils.warn(this.TAG, "constWIFISecurityType, invalid param: " + value)
    }
    return result
  }

}

export class WIFIControlParam {
  //true表示禁止使用，false表示允许使用。
  disallow: boolean = false
}

/**
 * WLan配置信息
 */
export class WIFIProfileParam {

  ssid: string = ""

  bssid: string | undefined = undefined

  //密码
  preSharedKey: string = ""

  //是否是隐藏网络。
  isHiddenSsid: boolean | undefined = undefined

  /**
   * 加密类型。
   * 0：无效加密类型。
   * 1：开放加密类型。
   * 2：Wired Equivalent Privacy (WEP)加密类型。
   * 3：Pre-shared key (PSK)加密类型。
   * 4：Simultaneous Authentication of Equals (SAE)加密类型。
   * 5：EAP加密类型。
   * 6：Suite-B 192位加密类型。
   * 7：机会性无线加密类型。
   * 8：WAPI-Cert加密类型。
   * 9：WAPI-PSK加密类型。
   */
  securityType: number = 0

  //创建用户的ID。
  creatorUid: number | undefined = undefined

  //禁用原因。
  disableReason: number | undefined = undefined

  //分配的网络ID。
  netId: number | undefined = undefined

  //随机MAC类型。
  randomMacType: number | undefined = undefined

  //随机MAC地址。
  randomMacAddr: string | undefined = undefined

  /**
   * 	IP地址类型。
   * 0：静态IP。
   * 1：通过DHCP获取。
   * 2：未指定。
   */
  ipType: number | undefined = undefined

  //静态IP配置信息。
  @Type(() => IpProfile)
  staticIp: IpProfile | undefined = undefined

  //可扩展身份验证协议配置。
  @Type(() => WifiEapProfile)
  eapProfile: WifiEapProfile | undefined = undefined
}

/**
 * IP配置信息。
 */
export class IpProfile {
  //IP地址。
  ipAddress: number = -1

  //掩码。
  prefixLength: number = -1

  //网关。
  gateway: number = -1

  //DNS服务器。
  dnsServers: number[] = []

  //域名信息。
  domains: string[] = []

}

/**
 * 可扩展身份验证协议配置信息。。
 */
export class WifiEapProfile {
  /**
   * 	AP认证方式。
   * 0: 不指定。
   * 1: PEAP类型。
   * 2: TLS类型。
   * 3: TTLS类型。
   * 4: PWD类型。
   * 5: SIM类型。
   * 6: AKA类型。
   * 7: AKA Prime类型。
   * 8: UNAUTH TLS类型。
   */
  eapMethod: number = 0

  /**
   * 	第二阶段认证方式。
   * 0: 不指定。
   * 1: PAP类型。
   * 2: MSCHAP类型。
   * 3: MSCHAPV2类型。
   * 4: GTC类型。
   * 5: SIM类型。
   * 6: AKA类型。
   * 7: AKA Prime类型。
   */
  phase2Method: number = 0

  //身份信息
  identity: string = ""

  //匿名身份。
  anonymousIdentity: string = ""

  //密码。
  password: string = ""

  //CA 证书别名。
  caCertAliases: string = ""

  //CA 证书路径。
  caPath: string = ""

  //客户端证书别名。
  clientCertAliases: string = ""

  //CA 证书内容。
  certEntry: Uint8Array = new Uint8Array

  //CA证书密码。
  certPassword: string = ""

  //替代主题匹配。
  altSubjectMatch: string = ""

  //域后缀匹配。
  domainSuffixMatch: string = ""

  //通行证凭证的领域。
  realm: string = ""

  //公共陆地移动网的直通凭证提供商。
  plmn: string = ""

  //SIM卡的子ID。
  eapSubId: number = 0
}