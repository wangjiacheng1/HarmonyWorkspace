@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  @State buttonMsg: string = '+1'

  build() {
    Column() {
      Image($r('app.media.icon'))
        .width($r('app.float.main_page_icon_size'))
        .height($r('app.float.main_page_icon_size'))

      Text(this.message)
        .fontSize(50)
        .fontWeight(FontWeight.Bold)

      Button($r('app.string.login_btn_msg'),
        {type:ButtonType.Capsule, stateEffect:true})
        .id("login_btn")
        .width('70%')
        .height(40)
        .fontSize(16)
        .fontWeight(600)
        .backgroundColor($r('app.color.qax_blue'))
        .onClick(() =>{
          this.onLogin()
        })

      LoadingProgress()
        .id("login_progress")
        .color($r('app.color.qax_blue'))
        .height(60)
        .width(60)
        .visibility(Visibility.Hidden)
    }
    .justifyContent(FlexAlign.SpaceEvenly)
    .width('100%')
    .height('100%')
  }

  onLogin(){

  }
}