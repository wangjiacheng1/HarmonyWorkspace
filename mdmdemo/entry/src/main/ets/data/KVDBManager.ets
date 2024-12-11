import { distributedKVStore } from '@kit.ArkData'
import { BaseConstants } from '../common/BaseConstants'
import LogUtils from '../utils/LogUtils'
import { BusinessError } from '@kit.BasicServicesKit'

/**
 * 键值型数据库管理类
 * 用于管理键值型数据库，也可以直接存储数据到默认数据库中
 */
const TAG: string = "KVDBManager"
export default class KVDBManager{

  private context = getContext().getApplicationContext()
  private mKvManager?: distributedKVStore.KVManager
  private defaultStore?: distributedKVStore.SingleKVStore

  private static instance: KVDBManager

  kvManagerConfig: distributedKVStore.KVManagerConfig = {
    context: this.context,
    bundleName: BaseConstants.APP_BUNDLE_NAME
  }

  //数据库创建时的配置信息
  defaultOption: distributedKVStore.Options = {
    //不存在时自动创建
    createIfMissing: true,
    //加密
    encrypt: true,
    //自动备份
    backup: true,
    //跨设备不同步
    autoSync: false,
    //设备维度管理
    kvStoreType: distributedKVStore.KVStoreType.DEVICE_COLLABORATION,
    //安全级别：高
    securityLevel: distributedKVStore.SecurityLevel.S3
  }

  constructor() {
    this.initKVDBManager();
  }

  public static getInstance(): KVDBManager {
    if (KVDBManager.instance == undefined) {
      LogUtils.debug(TAG, "getInstance, init")
      KVDBManager.instance = new KVDBManager()
    }
    return KVDBManager.instance
  }

  private initKVDBManager(){
    try{
      this.mKvManager = distributedKVStore.createKVManager(this.kvManagerConfig)
      //创建默认数据库
      this.createDefaultStore()
    } catch (err){
      let busErr = err as BusinessError
      LogUtils.error(TAG, "initKVDBManager error, " + busErr.code + " : " + busErr.message)
    }
  }

  /**
   * 创建一个默认的数据库
   */
  public async createDefaultStore(){
    if (this.defaultStore) {
      return
    }
    this.defaultStore = await this.getOrCreateStore(BaseConstants.DEFAULT_KV_STORE_NAME)
  }

  /**
   * 获取数据库，没有则创建
   * @param storeName 数据库名称，只能包含字母数字下划线
   * @param option 数据库配置，不传则使用默认配置
   * @returns
   */
  public async getOrCreateStore(storeName: string, option?: distributedKVStore.Options): Promise<distributedKVStore.SingleKVStore | undefined>{
    if (!this.mKvManager) {
      this.initKVDBManager()
    }
    if (!this.mKvManager){
      LogUtils.warn(TAG, "getOrCreateStore, kvManager can not init")
      return undefined
    }
    if (!option) {
      option = this.defaultOption
    }
    try{
      let store = await this.mKvManager.getKVStore<distributedKVStore.SingleKVStore>(storeName, option)
      return store
    } catch (err) {
      LogUtils.error(TAG, "getOrCreateStore catch err, " + err.code + " : " + err.message)
    }

    return undefined
  }

  /**
   * 删除指定数据库
   * @param storeName
   */
  public deleteStore(storeName: string){
    if (!this.mKvManager) {
      this.initKVDBManager()
    }
    if (!this.mKvManager){
      LogUtils.warn(TAG, "deleteStore, kvManager can not init")
      return
    }
    try{
      this.mKvManager.deleteKVStore(BaseConstants.APP_BUNDLE_NAME, storeName).then(() => {
      }).catch((err: BusinessError) => {
        LogUtils.error(TAG, "deleteStore err, " + err.code + " : " + err.message)
      })
    }catch (err){
      LogUtils.error(TAG, "deleteStore catch err, " + err.code + " : " + err.message)
    }
  }

  /**
   * 获取所有数据库名称
   * @returns
   */
  public async getAllStoreName(): Promise<string[]> {
    let storeNameList: string[] = []
    if (!this.mKvManager) {
      this.initKVDBManager()
    }
    if (!this.mKvManager){
      LogUtils.warn(TAG, "getAllStoreName, kvManager can not init")
      return storeNameList
    }
    try{
      storeNameList = await this.mKvManager.getAllKVStoreId(BaseConstants.APP_BUNDLE_NAME)
    }catch (err){
      LogUtils.error(TAG, "getAllStoreName catch err, " + err.code + " : " + err.message)
    }

    return storeNameList
  }

  /**
   * 向默认数据库中存入数据
   * @param key
   * @param value
   */
  public async putData(key: string, value: Uint8Array | string | number | boolean){
    if (!this.defaultStore) {
      await this.createDefaultStore()
    }
    if (!this.defaultStore) {
      LogUtils.warn(TAG, "putData, defaultStore can not init")
      return
    }

    try{
      this.defaultStore.put(key, value)
    } catch(err) {
      LogUtils.error(TAG, "putData catch err, " + err.code + " : " + err.message)
    }
  }

  /**
   * 从默认数据库中获取数据
   * @param key
   * @param defaultValue
   * @returns
   */
  public async getData(key: string, defaultValue: Uint8Array | string | number | boolean): Promise<string | number | boolean | Uint8Array> {
    let value = defaultValue
    if (!this.defaultStore) {
      await this.createDefaultStore()
    }
    if (!this.defaultStore) {
      LogUtils.warn(TAG, "getData, defaultStore can not init")
      return value
    }

    try{
      value = await this.defaultStore.get(key)
    } catch(err) {
      LogUtils.error(TAG, "getData catch err, " + err.code + " : " + err.message)
    }

    return value
  }

  /**
   * 在默认数据库中删除指定数据
   * @param key
   */
  public async deleteData(key: string){
    if (!this.defaultStore) {
      await this.createDefaultStore()
    }
    if (!this.defaultStore) {
      LogUtils.warn(TAG, "deleteData, defaultStore can not init")
      return
    }

    try{
      this.defaultStore.delete(key)
    } catch(err) {
      LogUtils.error(TAG, "deleteData catch err, " + err.code + " : " + err.message)
    }
  }
}