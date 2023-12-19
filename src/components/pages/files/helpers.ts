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

export { extractRoutingParams }
