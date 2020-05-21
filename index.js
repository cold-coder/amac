var request = require("request");

var options = {
    method: 'GET',
    url: 'https://www.qcc.com/search',
    qs: {
        key: '%E8%8B%8F%E5%B7%9E%E6%98%8E%E5%BF%97%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8'
    },
    headers: {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        //  'accept-encoding': 'gzip, deflate',
        Host: 'www.qcc.com',
        Accept: '*/*',
        //  gzip:true,
        cookie: 'QCCSESSID=bk2r8fgfsg9tkh1vhn51hvvgr4; UM_distinctid=1722d00a41f81-00a41db5df37df-30667d00-1fa400-1722d00a42084b; _uab_collina=158989291667252302652456; acw_tc=65e21c1715898929168368297e4871070b4fd10a06a412986cd4cc5263; zg_did=%7B%22did%22%3A%20%221722d00a6ee37-0a9534a6e06671-30667d00-1fa400-1722d00a6ef678%22%7D; CNZZDATA1254842228=2058387744-1589888193-https%253A%252F%252Fwww.google.com%252F%7C1590061120; Hm_lvt_78f134d5a9ac3f92524914d0247e70cb=1589892917,1590062726; Hm_lpvt_78f134d5a9ac3f92524914d0247e70cb=1590062726; zg_de1d1a35bfa24ce29bbf2c7eb17e6c4f=%7B%22sid%22%3A%201590062719735%2C%22updated%22%3A%201590062727180%2C%22info%22%3A%201589892916982%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22%22%2C%22cuid%22%3A%20%22be315508b1f91d486c69f4d4903fddfc%22%2C%22zs%22%3A%200%2C%22sc%22%3A%200%7D'
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});