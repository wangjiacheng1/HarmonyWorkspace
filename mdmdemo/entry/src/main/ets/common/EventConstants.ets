
export default class EventConstants {

  //设备管理器状态更新
  static readonly CUSTOM_EVENT_ADMIN_STATUS_CHANGED = "custom_event_admin_status_changed"

  //管控事件监听
  static readonly CUSTOM_EVENT_MANAGED_EVENT = "custom_event_managed_event"
  static readonly MANAGED_EVENT_METHOD_BUNDLE_ADDED = "managed_event_method_bundle_added"
  static readonly MANAGED_EVENT_METHOD_BUNDLE_REMOVED = "managed_event_method_bundle_removed"
  static readonly MANAGED_EVENT_METHOD_APP_START = "managed_event_method_app_start"
  static readonly MANAGED_EVENT_METHOD_APP_STOP = "managed_event_method_app_stop"
  static readonly MANAGED_EVENT_METHOD_SYSTEM_UPDATE = "managed_event_method_system_update"
}