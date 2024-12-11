import hilog from '@ohos.hilog';

export default class LogUtils {
  private static domain: number = 0;

  static debug(tag:string, msg:string, ...args:object[]){
    hilog.debug(LogUtils.domain, tag, msg, args)
  }

  static info(tag:string, msg:string, ...args:object[]){
    hilog.info(LogUtils.domain, tag, msg, args)
  }

  static warn(tag:string, msg:string, ...args:object[]){
    hilog.warn(LogUtils.domain, tag, msg, args)
  }

  static error(tag:string, msg:string, ...args:object[]){
    hilog.error(LogUtils.domain, tag, msg, args)
  }

  static fatal(tag:string, msg:string, ...args:object[]){
    hilog.fatal(LogUtils.domain, tag, msg, args)
  }
}