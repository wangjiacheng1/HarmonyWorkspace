
import common from '@ohos.app.ability.common'
import promptAction from '@ohos.promptAction'
import router from '@ohos.router'
import LoginUser from '../beans/LoginUser'
import CommonConstants from '../constants/CommonConstants'
import { TextUtils } from '../utils/TextUtils'

/**
 * 输入框统一样式
 */
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

/**
 * 输入框下的横线统一样式
 */
@Extend(Line)
function lineStyle(){
  .width('100%')
  .height($r('app.float.line_height'))
  .backgroundColor($r('app.color.line_color'))
}

/**
 * 蓝色字体统一样式
 */
@Extend(Text)
function blueTextStyle(){
  .fontColor($r('app.color.login_blue_text_color'))
  .fontSize($r('app.float.small_text_size'))
}

@Entry
@Component
struct LoginUserEditPage {
  private context = getContext(this) as common.UIAbilityContext;
  @State username:string = ''
  @State password:string = ''
  @State isContentComplete:boolean = false;
  @State isRememberPassword:boolean = false;
  @State isShowLoginProgress:boolean = false;
  timeoutId:number = -1;

  build() {
    Column(){
      //icon
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
        //用户名输入
        TextInput({placeholder: $r('app.string.input_username_text')})
          .inputStyle()
          .onChange((value: string) => {
            this.username = value
            this.checkInputContent()
          })
        Line().lineStyle()

        //密码输入
        TextInput({placeholder: $r('app.string.input_password_text')})
          .type(InputType.Password)
          .inputStyle()
          .onChange((value: string) => {
            this.password = value
            this.checkInputContent()
          })
        Line().lineStyle()

        Row(){
          Row(){
            //记住密码
            Checkbox()
              .id('checkbox_remember_pwd')
              .alignRules({
                left:{anchor:'__container__', align:HorizontalAlign.Start}
              })
              .onChange((value:boolean) => {
                this.isRememberPassword = value;
              })
            Text($r('app.string.remember_pwd_text'))
              .id('text_remember_pwd')
              .alignRules({
                left:{anchor:'checkbox_remember_pwd', align:HorizontalAlign.End},
              })
              .blueTextStyle()
          }

          //忘记密码
          Text($r('app.string.forget_pwd_text'))
            .id('text_forget_pwd')
            .alignRules({
              right:{anchor:'__container__', align:HorizontalAlign.End},
            })
            .blueTextStyle()
            .onClick(() => {

            })
        }
        .width('100%')
        .height(30)
        .justifyContent(FlexAlign.SpaceBetween)
        .padding({
          top:$r('app.float.login_page_min_margin'),
          left:$r('app.float.login_page_max_margin'),
          right:$r('app.float.login_page_max_margin')
        })
      }
      .width('95%')
      .margin({
        top:$r('app.float.login_page_content_margin_top'),
        //bottom:$r('app.float.login_page_content_margin_top')
      })

      Row(){
        if (this.isShowLoginProgress){
          LoadingProgress()
            .width($r('app.float.login_page_loading_size'))
            .height($r('app.float.login_page_loading_size'))
        }
      }
      .width(50)
      .height(60)
      .margin($r('app.float.login_page_max_margin'))

      //登录按钮
      Button($r('app.string.login_btn_msg'),
        {type: ButtonType.Capsule,
          stateEffect: this.isContentComplete})
        .width('65%')
        .onClick(() => {
          this.prepareLogin()
        })
    }
    .height('100%')
    .width('100%')
    .backgroundColor($r('app.color.app_bg_color'))
  }

 /**
 * 检查输入内容完整性
 */
  checkInputContent(){
    if (TextUtils.isEmpty(this.username)
      || TextUtils.isEmpty(this.password)) {
      this.isContentComplete = false;
    }else {
      this.isContentComplete = true;
    }
  }

/**
 * 准备登录信息
 */
  prepareLogin(){
    if (TextUtils.isEmpty(this.username) || TextUtils.isEmpty(this.password)) {
      promptAction.showToast({
        message: $r('app.string.login_empty_tips')
      })
    }else {
      this.isShowLoginProgress = true;
      let loginUser = new LoginUser(this.username, this.password, this.isRememberPassword)
      //延时两秒
      this.timeoutId = setTimeout(this.startLogin, 2 * 1000, loginUser)
    }
  }


/**
 * 执行登录，
 */
  startLogin(loginUser: LoginUser){
    // this.context.eventHub.emit('prepareLogin', loginUser)
    router.replaceUrl({
      url:CommonConstants.APP_STORE_MAIN_PAGE_URL
    })
  }
}