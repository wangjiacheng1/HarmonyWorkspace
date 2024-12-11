
export interface HarmonyController{
  control(paramValue:string, callback: (isSuccess: boolean, message: string) => void):void

  getStatus(): Promise<string>

  reset(): void
}