const axios = require('axios')
const cheerio = require('cheerio')
const json2xls = require('json2xls')
const fs = require('fs')

const listUrl = 'http://gs.amac.org.cn/amac-infodisc/api/pof/manager'
const detailUrl = 'http://gs.amac.org.cn/amac-infodisc/res/pof/manager/'
const condition = {
  "registerProvince": "河南",
  "registerCity": "郑州市"
}
const PAGESIZE = 20

let companyList = []
axios.defaults.timeout = 30000

axios.post(`${listUrl}?page=1&size=${PAGESIZE}&rand=${Math.random()}`, condition).then(res => {
  if (res.status === 200) {
    // analysePage(res.data.content[0].url).then(res => {
    //   console.log(res)
    // })
    const totalPages = res.data.totalPages
    const totalCount = res.data.totalElements
    console.log('total' + totalCount + 'records')
    for (let index = 0; index < totalPages; index++) {
      console.log(`loop ${index}`)
      axios.post(`${listUrl}?page=${index}&size=${PAGESIZE}&rand=${Math.random()}`, condition).then(res => {
        if (res.status === 200) {
          const list = res.data.content
          for (let index = 0; index < list.length; index++) {
            const company = list[index]
            const url = company.url
            analysePage(url).then(r => {
              companyList.push(r)
              console.log(companyList.length + ':' + r.fullName)
              if (companyList.length === totalCount) {
                // console.log(companyList)
                var xls = json2xls(companyList)
                fs.writeFileSync('data.xlsx', xls, 'binary')
              }
            }).catch(err => {
              console.log(err)
            }).finally(() => {
              // console.log('complete')
            })
          }
        }
      })
    }
  }
}).catch(err => {
  console.log('outer query error' + err)
})

function analysePage(url) {
  return axios.get(`${detailUrl}${url}`).then(res => {
    if (res.status === 200) {
      // return parseByRegExp(res.data)
      const result = parseByCheerio(res.data)
      // console.log(result)
      return result
    }
  }).catch(err =>{
    // console.log(err)
    return {
      fullName: '',
      address: '',
      foundDate: '',
      type: '',
      website: ''
    }
  })
}

function parseByCheerio(txt) {
  $ = cheerio.load(txt)
  const fullName = $('#complaint1').text().trim().replace(/(\r\n|\n|\r)/gm, '').replace(/ /gm, '')
  const address = $('.table-info:first-of-type tr:nth-child(9) td:nth-child(2)').text().replace(/(\r\n|\n|\r)/gm, '').replace(/ /gm, '')
  const foundDate = $('.table-info:first-of-type tr:nth-child(7) td:nth-child(4)').text().replace(/(\r\n|\n|\r)/gm, '').replace(/ /gm, '')
  const type = $('.table-info:first-of-type tr:nth-child(12) td:nth-child(2)').text().replace(/(\r\n|\n|\r)/gm, '').replace(/ /gm, '')
  const website = $('.table-info:first-of-type tr:nth-child(15) td:nth-child(2)').text().replace(/(\r\n|\n|\r)/gm, '').replace(/ /gm, '')
  return { fullName, address, foundDate, type, website}
}

function parseByRegExp(txt) {
  var plainTxt = txt.replace(/(\r\n|\n|\r)/gm, '').replace(/ /gm, '')
  const regexpFullname = /complaint2">(.+) &nbsp/g
  const regexpAddress = /<tdclass="td-title">办公地址:<\/td><tdclass="td-content"colspan="3">(.+)<\/td><\/tr>/g
  const fullnameMatch = regexpFullname.exec(plainTxt)
  const addressMatch = regexpAddress.exec(plainTxt)
  // console.log(txt)
  const fullName = fullnameMatch[1].trim()
  const address = addressMatch[1].trim()
  return {fullName, address}
}