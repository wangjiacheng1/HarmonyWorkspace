import { MDMResponseError } from './MDMResponseError'

export class MDMResponse {

  code: number = -1

  data: string | boolean = ""

  error: MDMResponseError = new MDMResponseError()
}