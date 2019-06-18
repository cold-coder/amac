const axios = require('axios')
const cheerio = require('cheerio')

const listUrl = 'http://gs.amac.org.cn/amac-infodisc/api/pof/manager'
const detailUrl = 'http://gs.amac.org.cn/amac-infodisc/res/pof/manager/'
const condition = {
  "registerProvince": "江苏",
  "registerCity": "苏州市"
}

let companyList = []

axios.post(listUrl + '?page=1&size=100', condition).then(res => {
  if (res.status === 200) {
    // analysePage(res.data.content[0].url)
    const totalPages = res.data.totalPages
    for (let index = 0; index < totalPages; index++) {
      axios.post(`${listUrl}?page=${index}&size=100`, condition).then(res => {
        if (res.status === 200) {
          const list = res.data.content
          for (let index = 0; index < list.length; index++) {
            const company = list[index]
            const url = company.url
            analysePage(url).then(res => {
              console.log(res)
            })
          }
        }
      })
    }
  }
})

function analysePage(url) {
  return axios.get(`${detailUrl}${url}`).then(res => {
    if (res.status === 200) {
      $ = cheerio.load(res.data)
      const companyName = $('#complaint1').text()
      const tt = $('.table-info tr:nth-child(11)').text()
      return companyName
    }
  }).catch(err =>{
    console.log(err)
  })
}