import { Type } from "class-transformer";
import { HarmonyController } from "./HarmonyController";
import 'reflect-metadata'
import { networkManager } from "@kit.MDMKit";
import { adminWant } from "../common/MDMConstants";
import LogUtils from "../utils/LogUtils";
import { ResponseUtils } from "../utils/ResponseUtils";


export class GetNetworkInfoController implements HarmonyController {

  private TAG: string = "GetNetworkInfoController"

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    try {
      let networkInfo = this.getAllNetworkInfo()
      LogUtils.info(this.TAG, "control success: " + JSON.stringify(networkInfo))
      let response = ResponseUtils.constSuccessResponse(JSON.stringify(networkInfo))
      callback(true, JSON.stringify(response))
    }catch (err) {
      let msg = "control catch err, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      let response = ResponseUtils.constErrorResponse(err.code ? err.code : ResponseUtils.RESPONSE_CODE_UNKNOWN, err)
      callback(false, JSON.stringify(response))
    }
  }

  getStatus(): Promise<string> {
    try {
      let networkInfo = this.getAllNetworkInfo()
      return Promise.resolve(JSON.stringify(networkInfo))
    }catch (err) {
      let msg = "getStatus catch error, " + JSON.stringify(err)
      LogUtils.error(this.TAG, msg)
      return Promise.reject(msg)
    }
  }

  reset(): void {
    //ignore
  }

  getAllNetworkInfo(): NetworkInfo{
    let networkInfo: NetworkInfo = new NetworkInfo()
    networkInfo.networkArray = []
    let interfaceArray: string[] = networkManager.getAllNetworkInterfacesSync(adminWant)
    LogUtils.debug(this.TAG, "getAllNetworkInfo: " + JSON.stringify(interfaceArray))
    for(let item of interfaceArray){
      let ipAddress: string = networkManager.getIpAddressSync(adminWant, item)
      let mac: string = networkManager.getMacSync(adminWant, item)
      let networkEntity: NetworkEntity = new NetworkEntity()
      networkEntity.interface = item
      networkEntity.ipAddress = ipAddress
      networkEntity.mac = mac
      networkInfo.networkArray.push(networkEntity)
    }
    return networkInfo
  }

}

export class NetworkInfo {

  //网络信息数组
  @Type(() => NetworkEntity)
  networkArray: Array<NetworkEntity> = [new NetworkEntity()]
}

export class NetworkEntity {

  //网络接口名称
  interface: string = ""

  //ip地址
  ipAddress: string = ""

  //设备MAC地址
  mac: string = ""
}