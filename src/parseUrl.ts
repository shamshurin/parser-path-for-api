export const parseUrl = (
  path: string,
  params?: Record<string, string | number>
) => {
  let transformedPath: string | null = path
  const patternAll = /\:([\w]+)([\?]*)/
  const patternReq = /\:[\w]+\/*$/
	const hasRequiredParams = patternReq.test(path)
  let math = patternAll.exec(transformedPath)

  if (params || (!params && !hasRequiredParams)) {    
    while (math && transformedPath) {      
      const isRequired = math[2] !== '?'
      const paramName = math[1]
      const replacedString = math[0]
      const paramValue = params?.[paramName]?.toString() || ''
      if (!isRequired) {        
        transformedPath = transformedPath.replace(replacedString, paramValue)
      } else {
        if (paramValue) {
          transformedPath = transformedPath.replace(replacedString, paramValue)
        } else {
          math = null
          transformedPath = null
          console.error('Пропущен обязательный параметр')
          continue
        }
      }
      math = patternAll.exec(transformedPath)
      // math = null
    }
  } else if (hasRequiredParams) {
    console.error('Пропущен обязательный параметр')
    transformedPath = null
  }
	
  if (transformedPath && transformedPath[transformedPath.length - 1] === '/') {
    transformedPath = transformedPath.slice(0, -1)
  }
  return transformedPath
}