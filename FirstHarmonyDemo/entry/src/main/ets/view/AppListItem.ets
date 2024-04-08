
import ByodAppInfo from '../beans/ByodAppInfo'
@Component
export default struct AppListItem{
  @State appInfo:ByodAppInfo = null;

  build(){
    Row(){
      Image(this.appInfo.icon)
        .width($r('app.float.app_store_list_item_icon_size'))
        .width($r('app.float.app_store_list_item_icon_size'))

      Text(this.appInfo.appName)
        .fontSize($r('app.float.app_store_list_item_app_name_size'))

      Button("下载")
        .backgroundColor($r('app.color.qax_blue'))
    }
    .width('100%')
  }
}
