
import AvailableAppTab from '../view/AvailableAppTab';

@Entry
@Component
struct AppStoreMainPage{
  private tabsController:TabsController = new TabsController();
  @State pageTitle:Resource = $r('app.string.app_store_available_page_title');
  @State curIndex:number = 0;

  @Builder TabBuilder(title: string, index:number,
                      selectImg:Resource, normalImage:Resource){
    Column(){
      Image(this.curIndex == index ? selectImg : normalImage)
        .size({
          width:25,
          height:25
        })
      Text(title)
        .fontColor(this.curIndex == index ?
        $r('app.color.tabs_select_text_color') :
        $r('app.color.tabs_normal_text_color'))
    }
    .width('100%')
    .height(50)
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.curIndex = index;
      this.tabsController.changeIndex(index)
    })
  }

  build(){
    Column(){
      //title
      Row(){
        Text(this.pageTitle)
          .fontSize($r('app.float.app_store_page_title_size'))
          .fontWeight(400)

        Image($r('app.media.icon_file_exit'))
          .width('18vp')
          .height('18vp')
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
      .margin({
        top:$r('app.float.login_page_little_margin'),
        left:$r('app.float.login_page_little_margin'),
        right:$r('app.float.login_page_little_margin')
      })

      //搜索框
      Row(){
        Image($r('app.media.icon_search'))
          .width('18vp')
          .height('18vp')

        Text($r('app.string.app_store_search_hint'))
          .fontColor($r('app.color.placeholder_color'))
          .margin({
            left:$r('app.float.login_page_mid_margin')
          })
      }
      .width('100%')
      .height('30vp')
      .backgroundColor($r('app.color.search_view_bg_color'))
      .borderRadius('6vp')
      .margin({
        top:$r('app.float.login_page_max_margin')
      })
      .padding({
        left:$r('app.float.login_page_mid_margin')
      })

      Tabs({barPosition: BarPosition.End, controller: this.tabsController}){
        TabContent(){
          AvailableAppTab()
        }
      }


    }
    .width('100%')
    .height('100%')
    //.backgroundColor($r('app.color.qax_blue'))
    .margin($r('app.float.login_page_small_margin'))
  }

}