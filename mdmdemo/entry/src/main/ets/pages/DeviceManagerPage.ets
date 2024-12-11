import adminManager from '@ohos.enterprise.adminManager'
import Want from '@ohos.app.ability.Want'
import LogUtils from '../utils/LogUtils'
import Prompt from '@system.prompt'
import wifiManager from '@ohos.wifiManager'

const TAG: string = 'DeviceManagerPage'

const adminWant: Want = {
  bundleName: 'com.mobile.emm.mdmdemo',
  abilityName: 'EnterpriseAdminAbility'
}

const adminType: number = 1

const managedEvents: Array<adminManager.ManagedEvent> = [
  adminManager.ManagedEvent.MANAGED_EVENT_BUNDLE_ADDED,
  adminManager.ManagedEvent.MANAGED_EVENT_BUNDLE_REMOVED
]

@Extend(Button)
function customButtonStyle(){
  .width(320)
  .height(38)
  .margin({
    top: 10,
    bottom: 10
  })
}

@Entry
@Component
struct DeviceManagerPage{

  scroller: Scroller = new Scroller()

  build(){
    Scroll(this.scroller){
      Column(){
        Text('hello world')
      }
      .width('100%')
    }
    .height('100%')
    .scrollable(ScrollDirection.Vertical)
    .scrollBar(BarState.On)
  }

}