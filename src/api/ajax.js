import axios from 'axios'

export default function ajax(url, data={}, type='GET') {

  return new Promise((resolve, reject) => {
    let promise
    if(type === 'GET'){  //GET请求
      let paramStr = ''
      Object.keys(data).forEach(key=>{
        paramStr += key + '=' + data[key] + "&"
      })
      if(paramStr){
        paramStr = '?' + paramStr.substring(0,paramStr.length-1)
      }
      //使用axios发送
      promise = axios.get(url + paramStr)
    }else{    //POST请求
      promise = axios.post(url,data)
    }

    promise.then(response=>{
      resolve(response.data)
    }).catch(error=>{
      reject(error)
    })
  })
}
