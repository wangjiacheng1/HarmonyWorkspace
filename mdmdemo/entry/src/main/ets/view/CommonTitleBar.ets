import router from '@ohos.router'

@Preview
@Component
export default struct CommonTitleBar{

  @State title: string | Resource = "TrustSpace"
  @State isShowBackBtn: boolean = true
  @State isShowExitBtn: boolean = true

  build() {
    RelativeContainer(){
      Image($r('app.media.home_back'))
        .id('back')
        .width(20)
        .height(20)
        .fitOriginalSize(true)
        .alignRules({
          center:{anchor: '__container__', align: VerticalAlign.Center},
          left:{anchor: '__container__', align: HorizontalAlign.Start}
        })
        .margin({
          left:20
        })
        .visibility(this.isShowBackBtn ? Visibility.Visible : Visibility.Hidden)
        .onClick(() => {
          this.onLeftBack()
        })
      Text(this.title)
        .alignRules({
          center:{anchor: '__container__', align: VerticalAlign.Center},
          middle:{anchor: '__container__', align: HorizontalAlign.Center}
        })
        .id('title_name')
      Image($r('app.media.byod_exit'))
        .id('title_btn_exit')
        .width(20)
        .height(20)
        .fitOriginalSize(true)
        .visibility(this.isShowExitBtn ? Visibility.Visible : Visibility.Hidden)
        .alignRules({
          center:{anchor:'__container__', align: VerticalAlign.Center},
          right:{anchor:'__container__', align: HorizontalAlign.End}
        })
        .margin({
          right:20
        })
        .onClick(() => {
          this.onRightBack()
        })
    }
    .id('title_')
    .height(50)
    .width('100%')
    //.backgroundColor($r('app.color.qax_blue'))
  }

  onLeftBack(){
    router.back()
  }

  onRightBack(){
    router.back()
  }
}