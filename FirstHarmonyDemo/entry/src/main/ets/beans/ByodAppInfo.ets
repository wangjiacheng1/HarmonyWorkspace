
import { ByodAppStatus } from '../constants/Enums';
export default class ByodAppInfo{

  appName:string;

  icon:Resource = $r('app.media.ic_launcher_trans_bg');

  downloadTimes:number = 0;

  status:ByodAppStatus = ByodAppStatus.DOWNLOAD;

  constructor(appName:string, icon:Resource) {
    this.appName = appName;
    this.icon = icon;
  }

}
