interface Data {
  [prop: string]: any
}

export function deepCopy<T extends Data | any[]>(sourceData: T): T {
  if (Array.isArray(sourceData)) {
    return (sourceData as any[]).map(item => {
      return deepCopy(item)
    }) as T
  } else if (typeof sourceData === "object") {
    let copyData: Data = {}
    Object.keys(sourceData).forEach(item => {
      copyData[item] = deepCopy((sourceData as Data)[item])
    })
    return copyData as T
  } else {
    return sourceData
  }
}
