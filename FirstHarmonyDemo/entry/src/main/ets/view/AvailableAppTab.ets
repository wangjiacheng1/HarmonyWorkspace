
import ByodAppInfo from '../beans/ByodAppInfo'
@Entry
@Component
export default struct AvailableAppTab{
  @Builder appListItem(appInfo:ByodAppInfo){
    Row(){
      Image(appInfo.icon)
        .width($r('app.float.app_store_list_item_icon_size'))
        .width($r('app.float.app_store_list_item_icon_size'))

      Text(appInfo.appName)
        .fontSize($r('app.float.app_store_list_item_app_name_size'))

      Button("下载")
        .backgroundColor($r('app.color.qax_blue'))
    }
    .width('100%')
  }


  build(){
    Column(){
      Scroll(){
        List(){
          ForEach(this.getAllAppList(), (app:ByodAppInfo) => {
            ListItem(){
              this.appListItem(app)
            }
            .height('48vp')
          }, (app:ByodAppInfo) => JSON.stringify(app))
        }
        .width('100%')
        Row(){
          Text($r('app.string.app_store_all_loaded_text'))
            .fontColor($r('app.color.app_store_all_loaded_text_color'))
        }
        .width('100%')
        .justifyContent(FlexAlign.Center)
      }
    }
    .height('100%')
  }

  getAllAppList():Array<ByodAppInfo>{
    const appList:Array<ByodAppInfo> = new Array();

    let appInfo1:ByodAppInfo = new ByodAppInfo("百度",
      $r('app.media.app_icon1'));
    let appInfo2:ByodAppInfo = new ByodAppInfo("Google",
      $r('app.media.app_icon2'))

    appList.push(appInfo1);
    appList.push(appInfo2);
    return appList;
  }
}