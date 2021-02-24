export function callFunction(name, data) {
  return new Promise((resolve, reject) => {
    uniCloud.callFunction({
      name,
      data: data || null
    })
    .then(res => {
      if(res.result.code === 200) {
        resolve(res.result.data)
      } else {
        reject(res.result.msg)
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}