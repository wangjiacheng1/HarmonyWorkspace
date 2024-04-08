import router from '@ohos.router'
import { TextUtils } from '../utils/TextUtils'
import promptAction from '@ohos.promptAction'
import CommonConstants from '../constants/CommonConstants'

@Extend(TextInput)
function inputStyle(){
  .placeholderColor($r('app.color.placeholder_color'))
  .height($r('app.float.login_input_height'))
  .fontSize($r('app.float.big_text_size'))
  .backgroundColor($r('app.color.input_bg_color'))
  .width("100%")
  .padding({
    left:0
  })
  .margin({
    top:$r('app.float.login_input_margin_top'),
    left:$r('app.float.login_input_margin_left'),
    right:$r("app.float.login_input_margin_right")
  })
}

@Extend(Line)
function lineStyle(){
  .width('100%')
  .height($r('app.float.line_height'))
  .backgroundColor($r('app.color.line_color'))
}

@Entry
@Component
struct LoginUrlEdit {
  @State inputUrl: string = ''
  @State inputPort: string = ''
  @State isMessageComplete: boolean = false

  build() {
    Column(){
      Row({space:10}){
        Image($r('app.media.ic_launcher_trans_bg'))
          .width($r('app.float.main_page_icon_size'))
          .height($r('app.float.main_page_icon_size'))
        Text($r('app.string.app_name'))
          .fontSize($r('app.float.login_page_title_size'))
          .fontWeight(500)
      }
      .width('100%')
      .margin({
        top:$r('app.float.login_page_icon_margin_top'),
        left:$r('app.float.login_page_icon_margin_left')
      })
      .justifyContent(FlexAlign.Start)

      Column(){
        //地址输入
        TextInput({placeholder: $r('app.string.input_server_url')})
          .inputStyle()
          .onChange((value: string) => {
            this.inputUrl = value
            this.checkInputContent()
          })
        Line().lineStyle()

        //端口输入
        TextInput({placeholder: $r('app.string.input_server_port')})
          .type(InputType.Number)
          .inputStyle()
          .onChange((value: string) => {
            this.inputPort = value
            this.checkInputContent()
          })
        Line().lineStyle()
      }
      .width('95%')
      .margin({
        top:$r('app.float.login_page_content_margin_top'),
        bottom:$r('app.float.login_page_content_margin_top')
      })

      Button($r('app.string.next_btn_text'),
        {type: ButtonType.Capsule,
          stateEffect: this.isMessageComplete})
        .width('65%')
        .onClick(() => {
          this.goToUserEditView()
        })
    }
    .height('100%')
    .width('100%')
    .backgroundColor($r('app.color.app_bg_color'))
  }
  
  checkInputContent(){
    if (TextUtils.isEmpty(this.inputUrl)
        || TextUtils.isEmpty(this.inputPort)) {
      this.isMessageComplete = false;
    }else {
      this.isMessageComplete = true;
    }
  }

  goToUserEditView(){
    var error:Resource = null;
    if (TextUtils.isEmpty(this.inputUrl)) {
      error = $r('app.string.url_empty_error_msg')
    }else if (TextUtils.isEmpty(this.inputPort)) {
      error = $r('app.string.port_empty_error_msg')
    }

    if (error != null) {
      promptAction.showToast({
        message: error
      })
      return;
    }
    router.replaceUrl({
      url:CommonConstants.LOGIN_USER_EDIT_VIEW_URL,
      params:{
        url:this.inputUrl,
        port:this.inputPort
      }
    })
  }
}