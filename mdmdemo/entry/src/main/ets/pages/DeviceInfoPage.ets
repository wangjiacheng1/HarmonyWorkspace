import MDMConstants from "../common/MDMConstants"
import { DeviceInfoParam } from "../mdm/DeviceControlManager"
import { HarmonyControlFactory } from "../mdm/HarmonyControlFactory"
import { NetworkEntity, NetworkInfo } from "../mdm/NetworkManager"
import LogUtils from "../utils/LogUtils"
import CommonTitleBar from "../view/CommonTitleBar"
import { BusinessError } from "@kit.BasicServicesKit"
import { plainToClassFromExist } from "class-transformer"


const TAG: string = "DeviceInfoPage"

@Entry
@Component
export struct DeviceInfoPage {

  mControlFactory?: HarmonyControlFactory

  @State deviceName: string = ""
  @State deviceSerial: string = ""
  @State disk: string = ""
  @State memory: string = ""
  @State simInfo: string = ""
  @State networkInfo: NetworkInfo = new NetworkInfo()

  aboutToAppear(): void {
    this.initData()
  }

  build() {

    Column(){
      CommonTitleBar({title: "设备信息", isShowBackBtn: true, isShowExitBtn: false})
        .margin({
          right:10
        })

      Column(){
        Row(){
          Text('设备名称：')
            .fontWeight(500)
          Text(this.deviceName)
            .fontSize(14)
        }
        .width('100%')
        .margin({
          top: 10,
          bottom: 10
        })

        Divider()
          .vertical(false)
          .strokeWidth(2)

        Row(){
          Text('设备序列号：')
            .fontWeight(500)
          Text(this.deviceSerial)
            .fontSize(14)
        }
        .width('100%')
        .margin({
          top: 10,
          bottom: 10
        })

        Divider()
          .vertical(false)
          .strokeWidth(2)

        Column(){
          Text('硬盘信息：')
            .fontWeight(500)
          Text(this.disk)
            .fontSize(14)
            .margin({
              top: 10
            })
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)
        .margin({
          top: 10,
          bottom: 10
        })

        Divider()
          .vertical(false)
          .strokeWidth(2)

        Column(){
          Text('内存信息：')
            .fontWeight(500)
          Text(this.memory)
            .fontSize(14)
            .margin({
              top: 10
            })
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)
        .margin({
          top: 10,
          bottom: 10
        })

        Divider()
          .vertical(false)
          .strokeWidth(2)

        Column(){
          Text('Sim信息：')
            .fontWeight(500)
          Text(this.simInfo)
            .fontSize(14)
            .margin({
              top: 10
            })
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)
        .margin({
          top: 10,
          bottom: 10
        })

        Divider()
          .vertical(false)
          .strokeWidth(2)

        Column(){
          Text('网络信息：')
            .fontWeight(500)
          ForEach(this.networkInfo.networkArray, (value: NetworkEntity, index) => {
            Column(){
              Row(){
                Text('网络接口名：')
                  .fontSize(14)
                Text(value.interface)
                  .fontSize(14)
              }
              .width('100%')
              Row(){
                Text('IpAddress：')
                  .fontSize(14)
                Text(value.ipAddress)
                  .fontSize(14)
              }
              .width('100%')
              Row(){
                Text('Mac：')
                  .fontSize(14)
                Text(value.mac)
                  .fontSize(14)
              }
              .width('100%')
            }
            .width('100%')
            .alignItems(HorizontalAlign.Start)
            .margin({
              top: 10
            })
          })
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)
        .margin({
          top: 10
        })
      }
      .width('100%')
      .height('100%')
      .padding({
        left:10,
        right:10
      })
    }
    .width('100%')
    .height('100%')
  }

  initData(){
    if (!this.mControlFactory) {
      this.mControlFactory = HarmonyControlFactory.getInstance()
    }
    this.mControlFactory.getMDMStatus(MDMConstants.GET_DEVICE_INFO)
      .then((value) => {
        let obj: DeviceInfoParam = JSON.parse(value) as DeviceInfoParam
        if (!obj) {
          LogUtils.info(TAG, "initData, getDeviceInfo result is invalid")
          return
        }
        this.deviceName = obj.deviceName
        this.deviceSerial = obj.deviceSerial
        this.disk = obj.disk
        this.memory = obj.memory
        this.simInfo = obj.simInfo
      })
      .catch((error: BusinessError) => {
        LogUtils.info(TAG, "initData, getDeviceInfo error: " + error)
      })

    this.mControlFactory.getMDMStatus(MDMConstants.GET_NETWORK_INFO)
      .then((value) => {
        let obj = plainToClassFromExist(new NetworkInfo(), JSON.parse(value))
        if (!obj) {
          LogUtils.info(TAG, "initData, getNetworkInfo result is invalid")
          return
        }
        this.networkInfo = obj
        LogUtils.info(TAG, "initData, networkInfo: " + JSON.stringify(this.networkInfo))
      })
      .catch((error: BusinessError) => {
        LogUtils.info(TAG, "initData, getNetworkInfo error: " + error)
      })
  }

}