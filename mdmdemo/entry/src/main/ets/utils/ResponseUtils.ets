import { MDMResponse } from '../entity/MDMResponse';
import { MDMResponseError } from '../entity/MDMResponseError';
import TextUtils from './TextUtils';

export class ResponseUtils {

  //成功错误码
  static readonly RESPONSE_CODE_SUCCESS = 1000
  //参数不合法错误码
  static readonly RESPONSE_CODE_INVALID_PARAM = 1001
  //请求被拒绝错误码
  static readonly RESPONSE_CODE_REFUSED = 1002
  //其他错误错误码
  static readonly RESPONSE_CODE_FUNCTION_REFUSED = 1003
  //未知错误错误码
  static readonly RESPONSE_CODE_UNKNOWN = 9999

  static constSuccessResponse(data: string | boolean): MDMResponse {
    let response = new MDMResponse()
    response.code = ResponseUtils.RESPONSE_CODE_SUCCESS
    response.data = data

    return response
  }

  static constErrorResponse(errCode: number, error?:Error): MDMResponse{
    let response = new MDMResponse()
    response.code = errCode

    let err = new MDMResponseError()
    err.name = error?.name ? error.name : "调用出错"
    err.message = error?.message ? error.message : ""
    err.stack = error?.stack ? error.stack : ""
    response.error = err

    return response
  }

  static constFailedResponse(errCode: number, errName: string, errMsg: string, errStack?: string){
    let response = new MDMResponse()
    response.code = errCode

    let err = new MDMResponseError()
    err.name = errName
    err.message = errMsg
    err.stack = errStack ? errStack : ""
    response.error = err

    return response
  }

  static constInvalidParamResponse(): MDMResponse {
    let code = ResponseUtils.RESPONSE_CODE_INVALID_PARAM
    let errName = "参数不合法"
    let errMsg = "Request param is invalid."
    let response = ResponseUtils.constFailedResponse(code, errName, errMsg)

    return response
  }

  static constRefusedResponse(msg?: string): MDMResponse {
    let code = ResponseUtils.RESPONSE_CODE_REFUSED
    let errName = "请求被拒绝"
    let errMsg = TextUtils.isEmpty(msg) ? "The request was rejected." : msg!
    let response = ResponseUtils.constFailedResponse(code, errName, errMsg)

    return response
  }

  static constFunctionRefusedResponse(msg: string): MDMResponse {
    let code = ResponseUtils.RESPONSE_CODE_FUNCTION_REFUSED
    let errName = "其他错误"
    let errMsg = msg
    let response = ResponseUtils.constFailedResponse(code, errName, errMsg)

    return response
  }
}