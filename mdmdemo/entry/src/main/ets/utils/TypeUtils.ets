import TextUtils from './TextUtils'

export default class TypeUtils{

  /**
   * 字符串转布尔值
   * @param str
   * @returns
   */
  static parseBoolean(str: string | null | undefined): boolean{
    if (TextUtils.isEmpty(str)) {
      return false
    }
    return "true" === str?.toLowerCase()
  }

  /**
   * 布尔值转字符串
   * @param bool
   * @returns
   */
  static parseStringByBool(bool: boolean): string{
    return bool ? "true" : "false"
  }
}