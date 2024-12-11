import ResourceUtils from '../utils/ResourceUtils'

/**
 * 有输入框的dialog
 */
@CustomDialog
export struct CustomInputDialog{

  controller: CustomDialogController
  cancel: () => void = () => {}
  confirm: (text: string) => void = () => {}

  title: ResourceStr = "标题"
  hint: ResourceStr = "请输入内容"

  @State textValue: string = ""

  build() {
    Column(){
      Text(this.title)
        .fontSize(20)
        .margin({
          top: 20,
          bottom: 20
        })
      TextInput({placeholder: this.hint})
        .height(40)
        .width('90%')
        .onChange((value) => {
          this.textValue = value
        })
      Flex({justifyContent: FlexAlign.SpaceAround}){
        Button($r('app.string.cancel'))
          .fontColor(Color.Black)
          .backgroundColor('#ffffff')
          .onClick(() => {
            this.cancel()
            this.controller.close()
          })
        Button($r('app.string.confirm'))
          .fontColor(Color.Red)
          .backgroundColor('#ffffff')
          .onClick(() => {
            this.confirm(this.textValue)
            this.controller.close()
          })
      }
      .margin({
        top:20,
        bottom:20
      })
    }
  }

  toString(): string{
    return "CustomDialog"
  }
}

@CustomDialog
export struct CustomMultiInputDialog {

  controller: CustomDialogController
  cancel: () => void = () => {}
  confirm: (textArray: string[]) => void = () => {}

  title: ResourceStr = "标题"
  hintArray: ResourceStr[] = ["请输入内容"]
  inputLength: number = 1

  @State textValueArray: string[] = new Array<string>(this.inputLength).fill("")

  build() {
    Column(){
      Text(this.title)
        .fontSize(20)
        .margin({
          top: 20,
          bottom: 20
        })
      ForEach(this.hintArray, (hint: ResourceStr, index: number) => {
        TextInput({placeholder: hint})
          .height(40)
          .width('90%')
          .onChange((value) => {
            this.textValueArray[index] = value
          })
          .margin({
            bottom: index == this.hintArray.length - 1 ? 0 : 10
          })
      })

      Flex({justifyContent: FlexAlign.SpaceAround}){
        Button($r('app.string.cancel'))
          .fontColor(Color.Black)
          .backgroundColor('#ffffff')
          .onClick(() => {
            this.cancel()
            this.controller.close()
          })
        Button($r('app.string.confirm'))
          .fontColor(Color.Red)
          .backgroundColor('#ffffff')
          .onClick(() => {
            this.confirm(this.textValueArray)
            this.controller.close()
          })
      }
      .margin({
        top:20,
        bottom:20
      })
    }
  }
}

/**
 * 提示dialog
 * 可配置确定按钮延迟时间
 */
@CustomDialog
export struct CustomAlertDialog{

  controller: CustomDialogController
  cancelTextColor: Color | Resource = Color.Blue
  confirmTextColor: Color | Resource = Color.Red

  isDelayConfirm: boolean = false
  @State delayTimeSecond: number = 3
  cancel: () => void = () => {}
  confirm: () => void = () => {}

  @State title: ResourceStr = "标题"
  @State text: ResourceStr = "文本内容"
  @State confirmText: string | Resource = $r('app.string.confirm')
  @State cancelText: string | Resource = $r('app.string.cancel')

  @State isConfirmEnable: boolean = true
  @State mDelayInterval: number = 0

  build() {

    Column(){
      Text(this.title)
        .fontSize(20)
        .margin({
          top: 10,
          bottom: 10
        })
      Text(this.text)
        .fontSize(23)

      Flex({justifyContent: FlexAlign.SpaceAround}){
        Button(this.cancelText)
          .fontColor(this.cancelTextColor)
          .backgroundColor('#ffffff')
          .onClick(() => {
            this.cancel()
            this.controller.close()
          })
        Button(this.confirmText)
          .fontColor(this.confirmTextColor)
          .enabled(this.isConfirmEnable)
          .backgroundColor('#ffffff')
          .onClick(() => {
            this.confirm()
            this.controller.close()
          })
      }
      .margin({
        top:10,
        bottom:10
      })
    }
    .padding({
      left: 10,
      right: 10
    })
  }

  aboutToAppear(): void {
    if (this.isDelayConfirm) {
      this.isConfirmEnable = false
      this.confirmText = ResourceUtils.getString($r('app.string.confirm')) + "（" + this.delayTimeSecond + "秒）"
      this.mDelayInterval = setInterval(() => {
        this.delayTimeSecond --
        this.confirmText = ResourceUtils.getString($r('app.string.confirm')) + "（" + this.delayTimeSecond + "秒）"

        if (this.delayTimeSecond <= 0) {
          this.confirmText = $r('app.string.confirm')
          this.isConfirmEnable = true
          clearInterval(this.mDelayInterval)
        }
      }, 1000)
    }
  }

  aboutToDisappear(): void {
    clearInterval(this.mDelayInterval)
  }
}

@CustomDialog
export struct CustomLoadingDialog {

  controller: CustomDialogController

  @State isShow: boolean = false
  @State content: string | Resource = $r('app.string.default_loading_text')

  build() {

    Column(){
      LoadingProgress()
        .width(100)
        .height(100)

      Text(this.content)
        .fontSize(16)
        .fontColor(Color.Black)
        .margin({
          bottom: 30
        })
    }
    .width(150)
    .height(150)
  }
}