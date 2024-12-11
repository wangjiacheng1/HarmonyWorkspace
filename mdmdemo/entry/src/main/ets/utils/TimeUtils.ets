import { systemDateTime } from '@kit.BasicServicesKit'

export class TimeUtils {

  public static getCurrentMilliseconds(): number {
    return TimeUtils.getCurrentTime(false)
  }

  public static getCurrentNanoseconds(): number {
    return TimeUtils.getCurrentTime(true)
  }

  private static getCurrentTime(isNano?: boolean): number {
    return systemDateTime.getTime(isNano)
  }
}