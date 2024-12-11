
export default class ResourceUtils{
  static getString(resource: Resource, context?: Context): string{
    if (!context) {
      context = getContext()
    }
    const value: string = context.resourceManager.getStringSync(resource)
    return value;
  }
}