import promptAction from '@ohos.promptAction'
import LogUtils from '../utils/LogUtils'
import { HarmonyControlFactory } from '../mdm/HarmonyControlFactory'
import { CustomAlertDialog, CustomInputDialog, CustomMultiInputDialog } from '../view/CustomDialog'
import CommonTitleBar from '../view/CommonTitleBar'
import ResourceUtils from '../utils/ResourceUtils'
import MDMConstants from '../common/MDMConstants'
import TextUtils from '../utils/TextUtils'
import { PreferenceManager } from '../data/PreferenceManager'
import { BaseConstants } from '../common/BaseConstants'
import { TimeUtils } from '../utils/TimeUtils'
import PolicyUtils from '../utils/PolicyUtils'
import TypeUtils from '../utils/TypeUtils'
import { ApplicationControlParam, AppWantParam, AutoStartAppsControlParam } from '../mdm/ApplicationManager'
import { BundleControlParam } from '../mdm/BundleManager'
import { LocationControlParam } from '../mdm/LocationManager'
import { DeviceControlParam } from '../mdm/DeviceControlManager'
import { subscribeManagedEvent } from '../mdm/AdminManager'
import { DeviceSettingControlParam, DeviceSettingResult } from '../mdm/DeviceSettingControlManager'
import { plainToClassFromExist } from 'class-transformer'
import { DevicePasswordParam } from '../mdm/SecurityManager'
import { UsbDeviceId, UsbWhiteListControlParam } from '../mdm/UsbManager'
import { router } from '@kit.ArkUI'
import { WIFIProfileParam } from '../mdm/WIFIManager'

const TAG: string = "MDMStatusPage"

@Entry
@Component
struct MDMPage {

  @Prop mControlFactory: HarmonyControlFactory

  @State deviceOperateSelectedTag: string = "0"

  addAppRunningListDialog: CustomDialogController = new CustomDialogController({
    builder: CustomInputDialog({
      cancel: () => {
        this.handleAppRunningAddDialogCancel()
      },
      confirm: (value)=> {
        this.handleAppRunningAddDialogConfirm(value)
      },
      title: "添加禁止应用运行名单",
      hint: "请输入应用appId"
    })
  })
  addAppInstallListDialog: CustomDialogController = new CustomDialogController({
    builder: CustomInputDialog({
      cancel: () => {
        this.handleAppInstallAddDialogCancel()
      },
      confirm: (value)=> {
        this.handleAppInstallAddDialogConfirm(value)
      },
      title: "添加禁止应用安装名单",
      hint: "请输入应用appId"
    })
  })

  deviceOperateAlertDialog: CustomDialogController = new CustomDialogController({
    builder: CustomAlertDialog({
      cancel: () => {
        this.handleDeviceOperateDialogCancel()
      },
      confirm: () => {
        this.handleDeviceOperateDialogConfirm()
      },
      title: PolicyUtils.getMDMDeviceOperateTextResource(this.deviceOperateSelectedTag),
      text: "即将进行\t" + PolicyUtils.getMDMDeviceOperateTextString(this.deviceOperateSelectedTag) + "\t是否确认？",
      isDelayConfirm: true
    })
  })

  //添加子启动应用弹窗
  addAutoStartAppDialog: CustomDialogController = new CustomDialogController({
    builder: CustomMultiInputDialog({
      cancel: () => {
        this.handleAutoStartAppDialogCancel()
      },
      confirm: (value) => {
        this.handleAutoStartAppDialogConfirm(value)
      },
      title: "添加开机自启应用",
      inputLength: 2,
      hintArray: ['请输入应用bundleName', '请输入应用abilityName']
    })
  })

  passwordPolicyDialog: CustomDialogController = new CustomDialogController({
    builder: CustomMultiInputDialog({
      cancel: () => {
        this.handlePwdPolicyDialogCancel()
      },
      confirm: (value) => {
        this.handlePwdPolicyDialogConfirm(value)
      },
      title: "设置设备锁屏密码策略",
      inputLength: 3,
      hintArray: ['请输入密码正则', '请输入密码有效期', '请输入描述文本']
    })
  })

  usbWhiteListDialog: CustomDialogController = new CustomDialogController({
    builder: CustomMultiInputDialog({
      cancel: () => {
        this.handleUsbWhiteListDialogCancel()
      },
      confirm: (value) => {
        this.handleUsbWhiteListDialogConfirm(value)
      },
      title: "添加USB设备白名单",
      inputLength: 2,
      hintArray: ['请输入厂商ID', '请输入产品ID']
    })
  })

  wifiProfileDialog: CustomDialogController = new CustomDialogController({
    builder: CustomMultiInputDialog({
      cancel: () => {
        this.handleWIFIProfileDialogCancel()
      },
      confirm: (value) => {
        this.handleWIFIProfileDialogConfirm(value)
      },
      title: "配置WiFi",
      inputLength: 2,
      hintArray: ['ssid', 'password']
    })
  })

  aboutToAppear(): void {
    LogUtils.info(TAG, "aboutToAppear")
    this.initData()
  }

  build() {
    Column(){
      CommonTitleBar({title: ResourceUtils.getString($r('app.string.mdm_control_title')), isShowBackBtn: true, isShowExitBtn: false})
        .margin({
          //left:10,
          right:10
        })

      Scroll(){
        Column(){
          Row(){
            Text($r('app.string.title_admin_manager'))
            Toggle({ type: ToggleType.Switch, isOn: this.mControlFactory.isDeviceAdminEnabled})
              .enabled(this.mControlFactory.isDeviceAdminEnabled ? true : false)
              .onChange((isOn: boolean) => {
                this.handleSwitchChange(MDMConstants.ENABLE_DEVICE_ADMIN, isOn)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })

          Row(){
            Text($r('app.string.title_wifi_status'))
            Toggle({ type: ToggleType.Switch, isOn: this.mControlFactory.isWifiActive})
              .enabled(false)
              .onChange((isOn: boolean) => {
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })

          Row(){
            Text($r('app.string.title_disable_wifi'))
            Toggle({ type: ToggleType.Switch, isOn: this.mControlFactory.isWIFIDisabled})
              .onChange((isOn: boolean) => {
                this.handleSwitchChange(MDMConstants.DISALLOW_WIFI, isOn)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })

          Row(){
            Text('USB禁用')
            Toggle({ type: ToggleType.Switch, isOn: this.mControlFactory.isUsbDisabled})
              .onChange((isOn: boolean) => {
                this.handleSwitchChange(MDMConstants.DISALLOW_USB, isOn)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })
          .visibility(Visibility.None)

          Row(){
            Text($r('app.string.title_disable_bluetooth'))
            Toggle({ type: ToggleType.Switch, isOn: this.mControlFactory.isBluetoothDisabled})
              .onChange((isOn: boolean) => {
                this.handleSwitchChange(MDMConstants.DISALLOW_BLUETOOTH, isOn)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })

          Row(){
            Text($r('app.string.title_disable_modify_sys_date'))
            Toggle({ type: ToggleType.Switch, isOn: this.mControlFactory.isModifyDateTimeDisabled})
              .onChange((isOn: boolean) => {
                this.handleSwitchChange(MDMConstants.DISALLOW_MODIFY_DATE_TIME, isOn)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })
          .visibility(Visibility.Visible)

          Row(){
            Text($r('app.string.title_disallow_microphone'))
            Toggle({ type: ToggleType.Switch, isOn: this.mControlFactory.isMicrophoneDisabled})
              .onChange((isOn: boolean) => {
                this.handleSwitchChange(MDMConstants.DISALLOW_MICROPHONE, isOn)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })

          Row(){
            Text($r('app.string.title_disallow_add_system_user'))
            Toggle({ type: ToggleType.Switch, isOn: this.mControlFactory.isAddSystemUserDisabled})
              .onChange((isOn: boolean) => {
                this.handleSwitchChange(MDMConstants.DISALLOW_ADD_SYSTEM_USER, isOn)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })

          Row(){
            Text($r('app.string.title_disable_system_update'))
            Toggle({ type: ToggleType.Switch, isOn: this.mControlFactory.isSystemUpgradeDisabled})
              .onChange((isOn: boolean) => {
                this.handleSwitchChange(MDMConstants.DISALLOW_SYSTEM_UPGRADE, isOn)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })

          Row(){
            Text($r('app.string.title_disallow_screenshot'))
            Toggle({ type: ToggleType.Switch, isOn: this.mControlFactory.isScreenshotDisabled})
              .onChange((isOn: boolean) => {
                this.handleSwitchChange(MDMConstants.DISALLOW_SCREENSHOT, isOn)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })

          Row(){
            Text($r('app.string.title_disallow_screen_record'))
            Toggle({ type: ToggleType.Switch, isOn: this.mControlFactory.isRecordDisabled})
              .onChange((isOn: boolean) => {
                this.handleSwitchChange(MDMConstants.DISALLOW_SCREEN_RECORD, isOn)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })

          Row(){
            Text($r('app.string.title_disallow_fingerprint'))
            Toggle({ type: ToggleType.Switch, isOn: this.mControlFactory.isFingerprintDisabled})
              .onChange((isOn: boolean) => {
                this.handleSwitchChange(MDMConstants.DISALLOW_FINGER_PRINT, isOn)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })

          Row(){
            Text($r('app.string.title_control_gps'))
            Select([{value:$r('app.string.mdm_control_default')},
              {value: $r('app.string.mdm_control_force_close')},
              {value: $r('app.string.mdm_control_force_open')}])
              .selected(Number(this.mControlFactory.locationControlStatus))
              .value(PolicyUtils.getMDMControlStatusText(this.mControlFactory.locationControlStatus))
              .onSelect((index: number) => {
                this.handleSelectChanged(MDMConstants.LOCATION_CONTROL, index)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })

          Row(){
            Text($r("app.string.title_set_device_screen_off"))
            Select([{value:$r('app.string.device_screen_off_15s')},
              {value: $r('app.string.device_screen_off_30s')},
              {value: $r('app.string.device_screen_off_1m')},
              {value: $r('app.string.device_screen_off_2m')},
              {value: $r('app.string.device_screen_off_5m')},
              {value: $r('app.string.device_screen_off_10m')}])
              .selected(0)
              .value(PolicyUtils.getMDMScreenOffTextResource(this.mControlFactory.curScreenOffTag))
              .onSelect((index: number) => {
                this.handleScreenSelectChanged(index)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })

          Row(){
            Text($r('app.string.title_device_operate'))
            Select([{value:$r('app.string.select_device_operate_default')},
              {value: $r('app.string.select_device_operate_shutdown')},
              {value: $r('app.string.select_device_operate_reboot')},
              {value: $r('app.string.select_device_operate_reset')}])
              // {value: $r('app.string.select_device_operate_lock_screen')},
              .selected(Number(this.mControlFactory.deviceOperateTag))
              .value(PolicyUtils.getMDMDeviceOperateTextResource(this.deviceOperateSelectedTag))
              .onSelect((index: number) => {
                this.handleDeviceOperateSelectChanged(index)
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })

          Row(){
            Text($r('app.string.title_device_password_policy'))
            if (TextUtils.isEmpty(this.mControlFactory.curDevicePasswordPolicy.additionalDescription)){
              Text("默认策略")
                .fontColor(Color.Blue)
            }else {
              Text(this.mControlFactory.curDevicePasswordPolicy.additionalDescription)
                .fontColor(Color.Blue)
            }
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({
            top:10
          })
          .onClick(() => {
            this.handlePasswordPolicyClick()
          })

          Column(){
            Text($r('app.string.title_disallow_running_apps'))
            Column(){
              Scroll(){
                Column(){
                  ForEach(this.mControlFactory.disallowRunningApps, (bundleName: string) => {
                    Row(){
                      Text(bundleName)
                        .width('95%')
                      Image($r('app.media.safe_del'))
                        .fitOriginalSize(true)
                        .visibility(TextUtils.isEmpty(bundleName) ? Visibility.Hidden : Visibility.Visible)
                        .onClick(() => {
                          this.handleAppRunningListDel(bundleName)
                        })
                    }
                    .width('100%')
                    .justifyContent(FlexAlign.SpaceBetween)

                    if (this.mControlFactory.disallowInstallApps.length > 1) {
                      Divider()
                        .vertical(false)
                        .strokeWidth(2)
                    }
                  })
                  Button({type: ButtonType.Circle, stateEffect: true}){
                    Image($r('app.media.safe_add'))
                      .fitOriginalSize(true)
                  }
                  .backgroundColor(Color.White)
                  .onClick(() => {
                    this.handleAppRunningListAdd()
                  })
                  .margin({
                    top: 8
                  })
                }
              }
              .width('100%')
              .scrollBar(BarState.Off)
            }
            .width('100%')
            .height('20%')
            .backgroundColor($r('app.color.detail_background'))
            .margin({
              top:5
            })
            .padding({
              left: 5,
              right: 5
            })
          }
          .width('100%')
          .alignItems(HorizontalAlign.Start)
          .margin({
            top:15
          })

          Column(){
            Text($r('app.string.title_disallow_install_apps'))
            Column(){
              Scroll(){
                Column(){
                  ForEach(this.mControlFactory.disallowInstallApps, (bundleName: string) => {
                    Row(){
                      Text(bundleName)
                        .width('95%')
                      Image($r('app.media.safe_del'))
                        .fitOriginalSize(true)
                        .visibility(TextUtils.isEmpty(bundleName) ? Visibility.Hidden : Visibility.Visible)
                        .onClick(() => {
                          this.handleAppInstallListDel(bundleName)
                        })
                    }
                    .width('100%')
                    .justifyContent(FlexAlign.SpaceBetween)

                    if (this.mControlFactory.disallowInstallApps.length > 1) {
                      Divider()
                        .vertical(false)
                        .strokeWidth(2)
                    }
                  })
                  Button({type: ButtonType.Circle, stateEffect: true}){
                    Image($r('app.media.safe_add'))
                      .fitOriginalSize(true)
                  }
                  .backgroundColor(Color.White)
                  .onClick(() => {
                    this.handleAppInstallListAdd()
                  })
                  .margin({
                    top: 8
                  })
                }
              }
              .width('100%')
              .scrollBar(BarState.Off)
            }
            .width('100%')
            .height('20%')
            .backgroundColor($r('app.color.detail_background'))
            .margin({
              top:5
            })
            .padding({
              left: 5,
              right: 5
            })
          }
          .width('100%')
          .alignItems(HorizontalAlign.Start)
          .margin({
            top:15
          })

          Column(){
            Text($r('app.string.title_auto_start_app_list'))
            Column(){
              Scroll(){
                Column(){
                  ForEach(this.mControlFactory.autoStartAppList, (appWant: AppWantParam) => {
                    Row(){
                      Text(appWant.bundleName)
                        .width('95%')
                      Image($r('app.media.safe_del'))
                        .fitOriginalSize(true)
                        .visibility(TextUtils.isEmpty(appWant.bundleName) ? Visibility.Hidden : Visibility.Visible)
                        .onClick(() => {
                          this.handleAutoStartAppDel(appWant)
                        })
                    }
                    .width('100%')
                    .justifyContent(FlexAlign.SpaceBetween)

                    if (this.mControlFactory.autoStartAppList.length > 1) {
                      Divider()
                        .vertical(false)
                        .strokeWidth(2)
                    }
                  })
                  Button({type: ButtonType.Circle, stateEffect: true}){
                    Image($r('app.media.safe_add'))
                      .fitOriginalSize(true)
                  }
                  .backgroundColor(Color.White)
                  .onClick(() => {
                    this.handleAutoStartAppAdd()
                  })
                  .margin({
                    top: 8
                  })
                }
              }
              .width('100%')
              .scrollBar(BarState.Off)
            }
            .width('100%')
            .height('20%')
            .backgroundColor($r('app.color.detail_background'))
            .margin({
              top:5
            })
            .padding({
              left: 5,
              right: 5
            })
          }
          .width('100%')
          .alignItems(HorizontalAlign.Start)
          .margin({
            top:15
          })

          Column(){
            Text($r('app.string.title_usb_white_list_policy'))
            Column(){
              Scroll(){
                Column(){
                  ForEach(this.mControlFactory.curUsbWhiteDeviceList, (usbDevice: UsbDeviceId) => {
                    Row(){
                      Text(usbDevice.productId + "")
                        .width('95%')
                      Image($r('app.media.safe_del'))
                        .fitOriginalSize(true)
                        .visibility(usbDevice.productId != 0 ? Visibility.Visible : Visibility.Hidden)
                        .onClick(() => {
                          this.handleUsbWhiteListDel(usbDevice)
                        })
                    }
                    .width('100%')
                    .justifyContent(FlexAlign.SpaceBetween)

                    if (this.mControlFactory.autoStartAppList.length > 1) {
                      Divider()
                        .vertical(false)
                        .strokeWidth(2)
                    }
                  })
                  Button({type: ButtonType.Circle, stateEffect: true}){
                    Image($r('app.media.safe_add'))
                      .fitOriginalSize(true)
                  }
                  .backgroundColor(Color.White)
                  .onClick(() => {
                    this.handleUsbWhiteListAdd()
                  })
                  .margin({
                    top: 8
                  })
                }
              }
              .width('100%')
              .scrollBar(BarState.Off)
            }
            .width('100%')
            .height('20%')
            .backgroundColor($r('app.color.detail_background'))
            .margin({
              top:5
            })
            .padding({
              left: 5,
              right: 5
            })
          }
          .width('100%')
          .alignItems(HorizontalAlign.Start)
          .margin({
            top:15
          })

          Column(){
            Button("查询设备信息")
              .buttonStyle(ButtonStyleMode.NORMAL)
              .onClick(() => {
                this.jumpToDeviceInfoPage()
              })
          }
          .width('100%')
          .alignItems(HorizontalAlign.Start)
          .margin({
            top:15
          })

          Column(){
            Button("连接指定WIFI")
              .buttonStyle(ButtonStyleMode.NORMAL)
              .onClick(() => {
                this.handleConnectProfileWIFI()
              })
          }
          .width('100%')
          .alignItems(HorizontalAlign.Start)
          .margin({
            top:15
          })

          Column(){
            Scroll(){
              Column(){
                ForEach(this.mControlFactory.mLogcatStrArr, (log: string) => {
                  Text(log)
                    .fontSize(10)
                })
                Text('......')
                  .fontSize(10)
              }
              .width('100%')
              .alignItems(HorizontalAlign.Start)
            }
          }
          .width('100%')
          .height('30%')
          .backgroundColor($r('app.color.detail_background'))
          .alignItems(HorizontalAlign.Start)
          .margin({
            top:60
          })
          .padding({
            top:5,
            bottom:5,
            left:5,
            right:5
          })

        }
        .width('90%')
        .padding({
          top:10,
          bottom:10
        })
      }
      .width('100%')
      .scrollable(ScrollDirection.Vertical)
      .padding({
        left:10,
        right:10
      })
    }
    .width('100%')
    .height('100%')
  }

  aboutToDisappear(): void {
    LogUtils.info(TAG, "aboutToDisappear")
  }

  /**
   * 初始化管控状态
   */
  initData(){
    this.mControlFactory = HarmonyControlFactory.getInstance()

    let globalSettingVersion = PreferenceManager.getInstance().getNumberSync(BaseConstants.GLOBAL_SETTINGS_VERSION_KEY, -1)
    let lastGlobalSettingVersion = this.mControlFactory.globalSettingVersion
    if (globalSettingVersion > lastGlobalSettingVersion){
      this.updateLogcat("收到新策略，已执行管控项: " + TimeUtils.getCurrentMilliseconds())
    }

    PolicyUtils.getMDMStatusDisabled(MDMConstants.DISALLOW_WIFI, (result) => {
      this.mControlFactory.isWIFIDisabled = result
    })
    PolicyUtils.getMDMStatusDisabled(MDMConstants.DISALLOW_USB, (result) => {
      this.mControlFactory.isUsbDisabled = result
    })
    PolicyUtils.getMDMStatusDisabled(MDMConstants.DISALLOW_MODIFY_DATE_TIME, (result) => {
      this.mControlFactory.isModifyDateTimeDisabled = result
    })
    PolicyUtils.getMDMStatusDisabled(MDMConstants.DISALLOW_BLUETOOTH, (result) => {
      this.mControlFactory.isBluetoothDisabled = result
    })
    PolicyUtils.getMDMStatusDisabled(MDMConstants.DISALLOW_MICROPHONE, (result) => {
      this.mControlFactory.isMicrophoneDisabled = result
    })
    PolicyUtils.getMDMStatusDisabled(MDMConstants.DISALLOW_ADD_SYSTEM_USER, (result) => {
      this.mControlFactory.isAddSystemUserDisabled = result
    })
    PolicyUtils.getMDMStatusDisabled(MDMConstants.DISALLOW_SYSTEM_UPGRADE, (result) => {
      this.mControlFactory.isSystemUpgradeDisabled = result
    })
    PolicyUtils.getMDMStatusDisabled(MDMConstants.DISALLOW_SCREENSHOT, (result) => {
      this.mControlFactory.isSystemUpgradeDisabled = result
    })
    PolicyUtils.getMDMStatusDisabled(MDMConstants.DISALLOW_SCREEN_RECORD, (result) => {
      this.mControlFactory.isSystemUpgradeDisabled = result
    })
    PolicyUtils.getMDMStatusDisabled(MDMConstants.DISALLOW_FINGER_PRINT, (result) => {
      this.mControlFactory.isSystemUpgradeDisabled = result
    })
    PolicyUtils.getMDMStatusEnabled(MDMConstants.ENABLE_DEVICE_ADMIN, (result) => {
      this.mControlFactory.isDeviceAdminEnabled = result
      if (result) {
        subscribeManagedEvent()
      }
    })
    PolicyUtils.getMDMStatusList(MDMConstants.APP_RUNNING_BLACK_LIST, (result) => {
      if (result == null || result == undefined) {
        LogUtils.info(TAG, "get disallow running apps empty")
        this.mControlFactory.disallowRunningApps = []
      }else {
        this.mControlFactory.disallowRunningApps = result
      }
    })
    PolicyUtils.getMDMStatusList(MDMConstants.APP_INSTALL_BLACK_LIST, (result) => {
      if (result == null || result == undefined) {
        LogUtils.info(TAG, "get disallow install apps empty")
        this.mControlFactory.disallowInstallApps = []
      }else {
        this.mControlFactory.disallowInstallApps = result
      }
    })
    PolicyUtils.getMDMStatus(MDMConstants.LOCATION_CONTROL, (isSuccess, result) => {
      if (isSuccess) {
        this.mControlFactory.locationControlStatus = result
      }
    })
    PolicyUtils.getMDMStatus(MDMConstants.AUTO_START_APP_LIST, (isSuccess, result) => {
      LogUtils.info(TAG, "getAutoStartAppList, status: " + isSuccess + ", " + result)
      if (!isSuccess || TextUtils.isEmpty(result)) {
        LogUtils.info(TAG, "get auto start apps empty")
        this.mControlFactory.autoStartAppList = []
      }else {
        let param: AutoStartAppsControlParam = plainToClassFromExist(new AutoStartAppsControlParam(), JSON.parse(result))
        let wantArray: AppWantParam[] = param.autoStartApps
        this.mControlFactory.autoStartAppList = wantArray
      }
    })
    PolicyUtils.getMDMStatus(MDMConstants.SET_DEVICE_SETTINGS, (isSuccess, result) => {
      LogUtils.info(TAG, "getDeviceSettingsStatus: " + isSuccess + ", " + result)
      if (isSuccess) {
        let param: DeviceSettingResult = JSON.parse(result)
        this.mControlFactory.curScreenOffTag = PolicyUtils.getMDMScreenOfTag(Number(param.screenOf))
      }
    })
    PolicyUtils.getMDMStatusEnabled(MDMConstants.CHECK_WIFI_ACTIVE, (result) => {
      this.mControlFactory.isWifiActive = result
    })
    PolicyUtils.getMDMStatus(MDMConstants.USB_WHITE_LIST, (isSuccess, result) => {
      LogUtils.info(TAG, "getUsbWhiteList: " + isSuccess + ", " + result)
      if (isSuccess) {
        let param: UsbWhiteListControlParam = plainToClassFromExist(new UsbWhiteListControlParam(), JSON.parse(result))
        this.mControlFactory.curUsbWhiteDeviceList = param.usbDeviceIds
      }
    })
  }

  /**
   * 切换按钮变更事件
   * @param methodName
   * @param isChecked
   */
  handleSwitchChange(methodName: string, isChecked: boolean){
    LogUtils.info(TAG, "handleSwitchChange, method: " + methodName + ", isChecked : " + isChecked)
    let paramStr: string = PolicyUtils.constMDMControlParamStr(methodName, TypeUtils.parseStringByBool(isChecked))
    this.mControlFactory.executeControl(methodName, paramStr, (result, msg) => {
      let log = PolicyUtils.getMDMControlLogStr(methodName, isChecked, result, msg)
      this.updateLogcat(log)
    })
  }

  /**
   * 应用运行黑名单包名删除事件
   * @param bundleName
   */
  handleAppRunningListDel(bundleName: string){
    if (TextUtils.isEmpty(bundleName)) {
      LogUtils.warn(TAG, "handleAppRunningListDel, empty value")
      return
    }
    if (!this.mControlFactory.disallowRunningApps.includes(bundleName)) {
      LogUtils.warn(TAG, "handleAppRunningListDel, not include")
      return
    }
    let index = this.mControlFactory.disallowRunningApps.indexOf(bundleName)
    this.mControlFactory.disallowRunningApps.splice(index, 1)
    let newList = this.mControlFactory.disallowRunningApps
    let method = MDMConstants.APP_RUNNING_BLACK_LIST
    let param = new ApplicationControlParam()
    param.appIds = newList
    this.mControlFactory.executeControl(method, JSON.stringify(param), (result, msg) => {
      let log = PolicyUtils.getMDMControlLogStr(method, false, result, result ? bundleName : msg)
      this.updateLogcat(log)
    })
  }

  /**
   * 应用运行黑名单添加事件
   */
  handleAppRunningListAdd(){
    this.addAppRunningListDialog.open()
  }

  /**
   * 应用运行黑名单弹窗确认事件
   * @param value
   */
  handleAppRunningAddDialogConfirm(value: string){
    if (TextUtils.isEmpty(value)) {
      return
    }
    this.mControlFactory = HarmonyControlFactory.getInstance()
    LogUtils.info(TAG, "handleAppRunningAddDialogConfirm : " + value)
    if (this.mControlFactory.disallowRunningApps.includes(value)) {
      let msg = "添加应用失败，该应用已在名单中"
      promptAction.showToast({
        message: msg
      })
      this.updateLogcat(msg)
      return
    }

    this.mControlFactory.disallowRunningApps.push(value)
    let newList = this.mControlFactory.disallowRunningApps
    let method = MDMConstants.APP_RUNNING_BLACK_LIST
    let param = new ApplicationControlParam()
    param.appIds = newList
    this.mControlFactory.executeControl(method, JSON.stringify(param), (result, msg) => {
      let log = PolicyUtils.getMDMControlLogStr(method, true, result, result ? value : msg)
      this.updateLogcat(log)
    })
  }
  /**
   * 应用运行黑名单弹窗取消事件
   */
  handleAppRunningAddDialogCancel(){
    //ignore
  }

  /**
   * 应用安装黑名单删除事件
   * @param bundleName
   */
  handleAppInstallListDel(bundleName: string){
    if (TextUtils.isEmpty(bundleName)) {
      LogUtils.warn(TAG, "handleAppInstallListDel, empty value")
      return
    }
    if (!this.mControlFactory.disallowInstallApps.includes(bundleName)) {
      LogUtils.warn(TAG, "handleAppInstallListDel, not include")
      return
    }
    let index = this.mControlFactory.disallowInstallApps.indexOf(bundleName)
    this.mControlFactory.disallowInstallApps.splice(index, 1)
    let newList = this.mControlFactory.disallowInstallApps
    let method = MDMConstants.APP_INSTALL_BLACK_LIST
    let param = new BundleControlParam()
    param.appIds = newList
    this.mControlFactory.executeControl(method, JSON.stringify(param), (result, msg) => {
      let log = PolicyUtils.getMDMControlLogStr(method, false, result, result ? bundleName : msg)
      this.updateLogcat(log)
    })
  }

  /**
   * 应用安装黑名单添加事件
   */
  handleAppInstallListAdd(){
    this.addAppInstallListDialog.open()
  }

  /**
   * 应用安装黑名单弹窗确认事件
   */
  handleAppInstallAddDialogConfirm(value: string){
    if (TextUtils.isEmpty(value)) {
      return
    }
    this.mControlFactory = HarmonyControlFactory.getInstance()
    LogUtils.info(TAG, "handleAppInstallAddDialogConfirm : " + value)
    if (this.mControlFactory.disallowInstallApps.includes(value)) {
      let msg = "添加应用失败，该应用已在名单中"
      promptAction.showToast({
        message: msg
      })
      this.updateLogcat(msg)
      return
    }

    this.mControlFactory.disallowInstallApps.push(value)
    let newList = this.mControlFactory.disallowInstallApps
    let method = MDMConstants.APP_INSTALL_BLACK_LIST
    let param = new BundleControlParam()
    param.appIds = newList
    this.mControlFactory.executeControl(method, JSON.stringify(param), (result, msg) => {
      let log = PolicyUtils.getMDMControlLogStr(method, true, result, result ? value : msg)
      this.updateLogcat(log)
    })
  }

  /**
   * 应用安装黑名单弹窗取消事件
   */
  handleAppInstallAddDialogCancel(){
    //ignore
  }

  /**
   * 下拉选择事件
   * @param methodName
   * @param index
   */
  handleSelectChanged(methodName: string, index: number){
    let policy: string = String(index)
    let param = new LocationControlParam()
    param.policy = policy
    this.mControlFactory.executeControl(methodName, JSON.stringify(param), (result, msg) => {
      let log = PolicyUtils.getMDMControlLogStr(methodName, index > 0, result, msg)
      this.updateLogcat(log)
    })
  }

  /**
   * 设备操作选择事件
   * @param index
   */
  handleDeviceOperateSelectChanged(index: number){
    if (index <= 0) {
      return
    }
    this.deviceOperateSelectedTag = index + ""
    //启动弹窗确认
    this.deviceOperateAlertDialog.open()
  }

  /**
   * 设备操作弹窗确认事件
   */
  handleDeviceOperateDialogConfirm(){
    let param = new DeviceControlParam()
    param.operate = this.deviceOperateSelectedTag
    this.mControlFactory.executeControl(MDMConstants.DEVICE_OPERATION, JSON.stringify(param), (result, msg) => {
      LogUtils.info(TAG, "handleDeviceOperateDialogConfirm, result = " + result + ", msg = " + msg)
      let log = PolicyUtils.getMDMDeviceOperationLogStr(this.deviceOperateSelectedTag, result, msg)
      this.updateLogcat(log)
    })
    this.deviceOperateSelectedTag = "0"
  }

  /**
   * 设备操作弹框取消事件
   * 将下拉框恢复成”无操作“
   */
  handleDeviceOperateDialogCancel(){
    this.deviceOperateSelectedTag = "0"
  }

  /**
   * 修改锁屏时间下拉选择事件
   * @param index
   */
  handleScreenSelectChanged(index: number){
    let milliseconds: number = PolicyUtils.getMDMScreenOfMilliseconds(index)
    let param: DeviceSettingControlParam = new DeviceSettingControlParam()
    param.item = "screenOff"
    param.value = milliseconds + ""
    this.mControlFactory.executeControl(MDMConstants.SET_DEVICE_SETTINGS, JSON.stringify(param), (result, msg) => {
      LogUtils.info(TAG, "handleScreenSelectChanged, result = " + result + ", msg = " + msg)
      let log = PolicyUtils.getScreenOffControlLogStr(result, msg)
      this.updateLogcat(log)
      if (result) {
        this.mControlFactory.curScreenOffTag = index
      }
    })
  }

  /**
   * 添加开机自启应用点击事件
   */
  handleAutoStartAppAdd(){
    this.addAutoStartAppDialog.open()
  }

  handleAutoStartAppDialogCancel(){
    //ignore
  }

  /**
   * 开机自启应用添加弹框确认事件
   * @param inputValue
   */
  handleAutoStartAppDialogConfirm(inputValue: string[]){
    if (!inputValue) {
      LogUtils.warn(TAG, "handleAutoStartAppDialogConfirm, inputArray is invalid")
      return
    }
    let bundleName: string = inputValue[0]
    let abilityName: string = inputValue[1]
    if (TextUtils.isEmpty(bundleName) || TextUtils.isEmpty(abilityName)) {
      this.showToast("输入应用信息有误！")
      return
    }
    this.addAutoStartApp(bundleName, abilityName)
  }

  /**
   * 执行接口，添加开机自启应用
   * @param bundleName
   * @param abilityName
   */
  addAutoStartApp(bundleName: string, abilityName: string){
    let appWant: AppWantParam = new AppWantParam()
    appWant.bundleName = bundleName
    appWant.abilityName = abilityName
    if (this.mControlFactory.autoStartAppList.includes(appWant)) {
      this.showToast("该应用已在名单中")
      return
    }
    let autoStartParam = new AutoStartAppsControlParam()
    autoStartParam.autoStartApps = [appWant]

    let method = MDMConstants.AUTO_START_APP_LIST
    this.mControlFactory.executeControl(method, JSON.stringify(autoStartParam), (result, msg) => {
      let log = PolicyUtils.getMDMControlLogStr(method, true, result, result ? bundleName : msg)
      this.updateLogcat(log)
    })
  }

  /**
   * 删除开机自启应用
   * @param appWant
   */
  handleAutoStartAppDel(appWant: AppWantParam){
    if (!appWant.isValid()) {
      LogUtils.warn(TAG, "handleAutoStartAppDel, empty value")
      return
    }
    if (!this.mControlFactory.autoStartAppList.includes(appWant)) {
      LogUtils.warn(TAG, "handleAutoStartAppDel, not include")
      return
    }
    let index = this.mControlFactory.autoStartAppList.indexOf(appWant)
    this.mControlFactory.autoStartAppList.splice(index, 1)
    let newList = this.mControlFactory.autoStartAppList
    let method = MDMConstants.AUTO_START_APP_LIST
    let param = new AutoStartAppsControlParam()
    param.autoStartApps = newList
    this.mControlFactory.executeControl(method, JSON.stringify(param), (result, msg) => {
      let log = PolicyUtils.getMDMControlLogStr(method, false, result, result ? appWant.bundleName : msg)
      this.updateLogcat(log)
    })
  }

  /**
   * 密码策略点击事件
   */
  handlePasswordPolicyClick() {
    this.passwordPolicyDialog.open()
  }

  /**
   * 密码策略弹框取消
   */
  handlePwdPolicyDialogCancel() {
    //ignore
  }

  /**
   * 密码策略弹框确认
   * @param inputValue
   */
  handlePwdPolicyDialogConfirm(inputValue: string[]) {
    if (!inputValue) {
      this.showToast("输入内容有误")
      return
    }
    let regex: string = inputValue[0]
    let period: string = inputValue[1]
    let description: string = inputValue[2] ? inputValue[2] : ""
    let param: DevicePasswordParam = new DevicePasswordParam()
    param.complexityRegex = regex
    param.validityPeriod = TextUtils.isEmpty(period) ? 0 : Number(period)
    param.additionalDescription = description
    let method: string = MDMConstants.DEVICE_PASSWORD_POLICY
    this.mControlFactory.executeControl(method, JSON.stringify(param), (result, msg) => {
      let log = PolicyUtils.getMDMControlLogStr(method, true, result, msg)
      this.updateLogcat(log)
    })
  }

  /**
   * USB白名单添加事件
   */
  handleUsbWhiteListAdd(){
    this.usbWhiteListDialog.open()
  }

  handleUsbWhiteListDialogCancel(){
    //ignore
  }

  /**
   * usb白名单弹窗确认
   * @param inputValue
   */
  handleUsbWhiteListDialogConfirm(inputValue: string[]) {
    if (!inputValue) {
      LogUtils.warn(TAG, "handleUsbWhiteListDialogConfirm, inputArray is invalid")
      return
    }
    let vendorId: string = inputValue[0]
    let productId: string = inputValue[1]
    if (TextUtils.isEmpty(vendorId) || TextUtils.isEmpty(productId)) {
      this.showToast("输入应用信息有误！")
      return
    }
    this.addUsbWhiteDevice(Number(vendorId), Number(productId))
  }

  /**
   * 添加usb设备白名单
   * @param vendorId
   * @param productId
   */
  addUsbWhiteDevice(vendorId: number, productId: number) {
    let deviceId: UsbDeviceId = new UsbDeviceId()
    deviceId.vendorId = vendorId
    deviceId.productId = productId
    if (this.mControlFactory.curUsbWhiteDeviceList.includes(deviceId)) {
      this.showToast("该应用已在名单中")
      return
    }
    this.mControlFactory.curUsbWhiteDeviceList.push(deviceId)
    let param: UsbWhiteListControlParam = new UsbWhiteListControlParam()
    param.usbDeviceIds = this.mControlFactory.curUsbWhiteDeviceList
    let method: string = MDMConstants.USB_WHITE_LIST
    this.mControlFactory.executeControl(method, JSON.stringify(param), (result, msg) => {
      let log = PolicyUtils.getMDMControlLogStr(method, true, result, result ? productId + "" : msg)
      this.updateLogcat(log)
    })
  }

  /**
   * 删除usb白名单设备
   * @param usbDevice
   */
  handleUsbWhiteListDel(usbDevice: UsbDeviceId) {
    if (!usbDevice.isValid()) {
      LogUtils.warn(TAG, "handleUsbWhiteListDel, empty value")
      return
    }
    let lastList = this.mControlFactory.curUsbWhiteDeviceList
    for(let index = 0; index < lastList.length; index++){
      let item = lastList[index]
      if (item.vendorId == usbDevice.vendorId && item.productId == usbDevice.productId) {
        this.mControlFactory.curUsbWhiteDeviceList.splice(index, 1)
      }
    }
    let newList = this.mControlFactory.curUsbWhiteDeviceList
    let method = MDMConstants.USB_WHITE_LIST
    let param = new UsbWhiteListControlParam()
    param.usbDeviceIds = newList
    this.mControlFactory.executeControl(method, JSON.stringify(param), (result, msg) => {
      let log = PolicyUtils.getMDMControlLogStr(method, false, result, result ? usbDevice.productId + "" : msg)
      this.updateLogcat(log)
    })
  }

  handleConnectProfileWIFI() {
    this.wifiProfileDialog.open()
  }

  handleWIFIProfileDialogCancel() {
    //ignore
  }

  handleWIFIProfileDialogConfirm(inputValue: string[]) {
    if (!inputValue) {
      LogUtils.warn(TAG, "handleWIFIProfileDialogConfirm, inputArray is invalid")
      return
    }
    let ssid: string = inputValue[0]
    let password: string = inputValue[1] ? inputValue[1] : ""
    if (TextUtils.isEmpty(ssid)) {
      this.showToast("输入应用信息有误！")
      return
    }
    this.connectProfileWIFI(ssid, password)
  }

  connectProfileWIFI(ssid: string, password: string){
    let param: WIFIProfileParam = new WIFIProfileParam()
    param.ssid = ssid
    param.preSharedKey = password
    param.securityType = 1
    let method: string = MDMConstants.SET_WIFI_PROFILE
    this.mControlFactory.executeControl(method, JSON.stringify(param), (result, msg) => {
      let log = PolicyUtils.getMDMControlLogStr(method, true, result, result ? ssid : msg)
      this.updateLogcat(log)
    })
  }

  jumpToDeviceInfoPage() {
    router.pushUrl({
      url: "pages/DeviceInfoPage"
    })
  }

  /**
   * 更新Logcat显示
   * @param log
   */
  updateLogcat(log:string){
    this.mControlFactory.mLogcatStrArr.push(log)
  }

  toString(): string{
    return "MDMStatusPage"
  }

  showToast(msg: ResourceStr){
    promptAction.showToast({
      message: msg
    })
  }
}