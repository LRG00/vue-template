export function formatCurrency (num) {
  // eslint-disable-next-line no-useless-escape
  num = num.toString().replace(/\$|\,/g, '')
  // console.log(num)
  if (isNaN(num)) num = '0'
  let sign = num == (num = Math.abs(num))
  num = Math.floor(num * 100 + 0.50000000001)
  let cents = num % 100
  num = Math.floor(num / 100).toString()
  if (cents < 10) cents = '0' + cents
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      ',' +
      num.substring(num.length - (4 * i + 3))
  }
  return (sign ? '' : '-') + num + '.' + cents
}

export function treeToList (tree) {
  var queen = []
  var out = []
  queen = queen.concat(tree)
  while (queen.length) {
    var first = queen.shift()
    if (first.children) {
      queen = queen.concat(first.children)
      // delete first["children"];
    }

    out.push(first)
  }
  return out
}

export function listToTree (list) {
  var map = {}
  var node
  var tree = []
  var i
  for (i = 0; i < list.length; i++) {
    map[list[i].id] = list[i]
    list[i].children = []
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i]
    if (node.pId !== '-1') {
      map[node.pId].children.push(node)
    } else {
      tree.push(node)
    }
  }
  return tree
}
// 图片上传前处理
export function beforeUpload (file) {
  let type = file.name
    ? file.name.split('.')[file.name.split('.').length - 1]
    : ''
  const isJPG =
    type === 'jpg' ||
    type === 'png' ||
    type === 'bmp' ||
    type === 'doc' ||
    type === 'docx' ||
    type === 'xls' ||
    type === 'xlsx' ||
    type === 'ppt' ||
    type === 'zip' ||
    type === 'rar' ||
    type === 'pdf'
  if (!isJPG) {
    this.btnLoading = false
    this.$message.error(
      '请上传jpg,png,bmp,doc,docx,xls,xlsx,ppt,zip,rar,pdf格式的文件或图片'
    )
  }
  const isLt2M = file.size / 1024 / 1024 < 10
  if (!isLt2M) {
    this.$message.error('上传附件不能超过10M')
  }
  return isJPG && isLt2M
}
// 图片加载
export function loadImg (fileName) {
  let type = fileName
    ? fileName.split('.')[fileName.split('.').length - 1]
    : ''
  switch (type) {
    case (type = 'xls'):
      type = 'xls'
      break
    case (type = 'xlxs'):
      type = 'xls'
      break
    case (type = 'doc'):
      type = 'doc'
      break
    case (type = 'docx'):
      type = 'doc'
      break
    case (type = 'jpg'):
      type = 'jpg'
      break
    case (type = 'png'):
      type = 'png'
      break
    default:
      type = 'default'
  }
  return type
}
// 获取年份
export function getYear () {
  var myDate = new Date()
  var startYear = myDate.getFullYear() - 50 // 起始年份
  var endYear = myDate.getFullYear() // 结束年份
  for (var i = startYear; i <= endYear; i++) {
    this.years.push(i)
  }
  this.years.reverse()
}
// 下载文件兼容文件名
export function funDownload (content, filename) {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement('a')
  eleLink.download = filename
  eleLink.style.display = 'none'
  // 字符内容转变成blob地址
  var blob = new Blob([content])
  eleLink.href = URL.createObjectURL(blob)
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}

export function isAuth (key) {
  // prodownload
  var isDownLoad = false
  const menus = JSON.parse(window.localStorage.getItem('menujson'))
  menus.map(item => {
    if (item.children && item.children.length) {
      item.children.map(ele => {
        if (ele.power.includes(key)) {
          isDownLoad = true
        }
      })
    }
  })
  return isDownLoad
}
