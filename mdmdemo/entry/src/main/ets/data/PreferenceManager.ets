import preferences from '@ohos.data.preferences';
import { common } from '@kit.AbilityKit';
import LogUtils from '../utils/LogUtils';
import { BusinessError } from '@kit.BasicServicesKit';

const PREFERENCES_NAME: string = 'TrustSpaceStore';

const TAG = "PreferenceManager"

export class PreferenceManager {
  private preferences?: preferences.Preferences;
  private context = getContext(this) as common.UIAbilityContext;
  private static instance: PreferenceManager;

  constructor() {
    this.initPreference(PREFERENCES_NAME);
  }

  public static getInstance(): PreferenceManager {
    if (PreferenceManager.instance == undefined) {
      LogUtils.info(TAG, "getInstance, init")
      PreferenceManager.instance = new PreferenceManager();
    }
    return PreferenceManager.instance;
  }

  initPreference(storeName: string) {
    let option: preferences.Options = {name: storeName}
    this.preferences = preferences.getPreferencesSync(this.context, option)
  }

  setValueSync<T>(key: string, value: T) {
    if (this.preferences) {
      this.preferences.putSync(key, JSON.stringify(value))
      this.saveUserData()
    } else {
      this.initPreference(PREFERENCES_NAME)
      this.setValueSync<T>(key, value);
    }
  }

  async setValue<T>(key: string, value: T): Promise<void> {
    if (this.preferences) {
      this.preferences.put(key, JSON.stringify(value)).then(() => {
        this.saveUserData();
      })
    } else {
      this.initPreference(PREFERENCES_NAME)
      this.setValue<T>(key, value);
    }
  }

  setNumberSync(key: string, value: number) {
    this.setValueSync(key, value)
  }

  setStringSync(key: string, value: string) {
    this.setValueSync(key, value)
  }

  setBooleanSync(key: string, value: boolean) {
    this.setValueSync(key, value)
  }

  setUint8ArraySync(key: string, value: Uint8Array) {
    this.setValueSync(key, value)
  }

  getNumberSync(key: string, defaultValue?: number): number {
    const valueT = this.getValueSync<number>(key, defaultValue)
    if (valueT === null) {
      return defaultValue? defaultValue : -1
    }
    return valueT
  }

  getStringSync(key: string, defaultValue?: string): string {
    const valueT = this.getValueSync<string>(key, defaultValue)
    if (valueT === null) {
      return defaultValue? defaultValue : ''
    }
    return valueT
  }

  getBooleanSync(key: string, defaultValue?: boolean): boolean {
    const valueT = this.getValueSync<boolean>(key, defaultValue)
    if (valueT === null) {
      return defaultValue? defaultValue : false
    }
    return valueT
  }

  getUint8ArraySync(key: string, defaultValue?: Uint8Array): Uint8Array {
    const valueT = this.getValueSync<Uint8Array>(key, defaultValue)
    if (valueT === null) {
      return defaultValue? defaultValue : new Uint8Array()
    }
    return valueT
  }


  getValueSync<T>(key: string, defaultValue?:preferences.ValueType): T | null {
    if (this.preferences) {
      if (defaultValue == null || defaultValue == undefined){
        defaultValue = ''
      }
      const valueT = this.preferences.getSync(key, defaultValue)
      let value: T | null = null;
      if (valueT) {
        value = JSON.parse(valueT as string) as T;
      }
      return value;
    }
    return null
  }

  async getValue<T>(key: string, defaultValue?:preferences.ValueType): Promise<T | null> {
    if (this.preferences) {
      if (defaultValue == null || defaultValue == undefined){
        defaultValue = ''
      }
      return this.preferences.get(key, defaultValue).then((res: preferences.ValueType) => {
        let value: T | null = null;
        if (res) {
          value = JSON.parse(res as string) as T;
        }
        return value;
      });
    } else {
      this.initPreference(PREFERENCES_NAME)
      return this.getValue<T>(key, defaultValue);
    }
  }

  async hasValue(key: string): Promise<boolean> {
    if (this.preferences) {
      return this.preferences.has(key);
    } else {
      this.initPreference(PREFERENCES_NAME)
      return this.hasValue(key);
    }
  }

  async deleteValue(key: string): Promise<void> {
    if (this.preferences) {
      this.preferences.delete(key).then(() => {
        this.saveUserData();
      });
    } else {
      this.initPreference(PREFERENCES_NAME)
      this.deleteValue(key);
    }
  }

  async clearAll(){
    if (this.preferences) {
      try{
        let options: preferences.Options = {
          name: PREFERENCES_NAME
        }
        await preferences.deletePreferences(this.context, options)
        this.preferences == null
      }catch(err){
        LogUtils.error(TAG, "clearAll catch err: " + JSON.stringify(err))
      }
    } else {
      this.initPreference(PREFERENCES_NAME)
      this.clearAll();
    }
  }

  saveUserData() {
    this.preferences?.flush()
      .then(() => {
        //ignore
      })
      .catch((err: BusinessError) => {
        LogUtils.error(TAG, "flush err, " + err.code + " : " + err.message)
      })
  }
}