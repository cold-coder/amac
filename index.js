var request = require("request")
const cheerio = require('cheerio')
const fs = require('fs')

const companyList = require('./company')

const fileName = 'ret.txt'

// try {
//     if (fs.existsSync(fileName)) {
//         fs.unlinkSync(fileName, (err) => {
//             if (err) throw err;
//         });
//     }
// } catch (err) {
//     console.error(err)
// }

companyList.forEach(c => {
    processData(c)
})

function fetch(company) {
    var options = {
        method: 'GET',
        url: 'https://www.qcc.com/search',
        qs: {
            key: company
        },
        headers: {
            'cache-control': 'no-cache',
            Connection: 'keep-alive',
            Host: 'www.qcc.com',
            Accept: '*/*',
            cookie: 'QCCSESSID=bk2r8fgfsg9tkh1vhn51hvvgr4; UM_distinctid=1722d00a41f81-00a41db5df37df-30667d00-1fa400-1722d00a42084b; _uab_collina=158989291667252302652456; acw_tc=65e21c1715898929168368297e4871070b4fd10a06a412986cd4cc5263; zg_did=%7B%22did%22%3A%20%221722d00a6ee37-0a9534a6e06671-30667d00-1fa400-1722d00a6ef678%22%7D; Hm_lvt_78f134d5a9ac3f92524914d0247e70cb=1589892917,1590062726,1590152473; acw_sc__v2=5ec7d327b103affe4a5cdde1129c14f1a2210549; CNZZDATA1254842228=2058387744-1589888193-https%253A%252F%252Fwww.google.com%252F%7C1590153024; hasShow=1; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201590152472168%2C%22updated%22%3A%201590154685538%2C%22info%22%3A%201589892916982%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22%22%2C%22cuid%22%3A%20%22be315508b1f91d486c69f4d4903fddfc%22%2C%22zs%22%3A%200%2C%22sc%22%3A%200%7D; Hm_lpvt_78f134d5a9ac3f92524914d0247e70cb=1590154686'
        }
    }
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error) reject(error)
            resolve(body)
        })
    })
}

async function processData(company) {
    const companyPage = await fetch(company)
    const $ = cheerio.load(companyPage)
    const searchResult = $('#search-result tr:nth-child(1) td').text().replace(/ /g, '')
    console.log(searchResult)
    fs.appendFileSync(fileName, searchResult)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}