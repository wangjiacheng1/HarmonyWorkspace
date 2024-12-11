import { HarmonyController } from "./HarmonyController";

export class BrowserManager implements HarmonyController {

  control(paramValue: string, callback: (isSuccess: boolean, message: string) => void): void {
    throw new Error("Method not implemented.");
  }

  getStatus(): Promise<string> {
    throw new Error("Method not implemented.");
  }

  reset(): void {
    throw new Error("Method not implemented.");
  }

}

export class BrowserControlParam {

  policyName: string = ""

  policyValue: BrowserParamPolicyValue = new BrowserParamPolicyValue()
}

export class BrowserParamPolicyValue {

  level: string = "mandatory"

  scope: string = "machine"

  source: string = "platform"

  value: boolean = false
}