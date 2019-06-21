// 开发地址
const devRoot = {
  api: 'http://192.100.7.80:8080'
}
// 测试地址
const testRoot = {}
// 线上地址
const productionRoot = {}

// 图片上传URL
const UPLOADRoot =
  process.env.NODE_ENV === 'production'
    ? productionRoot.api
    : process.env.NODE_ENV === 'testing'
      ? testRoot.api
      : devRoot.api

// 各环境API地址
const APIRoot =
  process.env.NODE_ENV === 'production'
    ? productionRoot
    : process.env.NODE_ENV === 'testing'
      ? testRoot
      : devRoot

// 下载以及读取图片地址
const photoUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://192.100.7.80:8080'
    : UPLOADRoot
// 152.12.12.171 新华线上
const apilist = {}
for (const key in APIRoot) {
  if (!Object.prototype.hasOwnProperty.call(apilist, key)) {
    apilist[key] =
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'testing'
        ? `/${key}`
        : APIRoot[key]
  }
}

module.exports = {
  APILIST: apilist,
  PHOTOURL: photoUrl
}
