type RouteParams = Readonly<
  Partial<{
    path: string
    '*': string
  }>
>

function extractRoutingParams(params: RouteParams): string[] {
  let routingParams: string[] = []
  if (params.path) {
    routingParams.push(params.path)
  }
  if (params['*']) {
    const additionalParams = params['*'].split('/').filter(param => param)
    routingParams = routingParams.concat(additionalParams)
  }
  return routingParams
}

function getSizeFile(size: number): string {
  const sizeKb = size / 1024
  const sizeMb = sizeKb / 1024
  const sizeGb = sizeMb / 1024

  if (sizeGb > 1) {
    return `${Math.floor(sizeGb)} GB`
  } else if (sizeMb > 1) {
    return `${Math.floor(sizeMb)} MB`
  } else if (sizeKb > 1) {
    return `${Math.floor(sizeKb)} KB`
  } else {
    return `${Math.floor(size)} B`
  }
}

export { extractRoutingParams, getSizeFile }
