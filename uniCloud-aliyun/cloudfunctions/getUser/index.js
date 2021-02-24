'use strict';
exports.main = async (event, context) => {
	const res = await uniCloud.database().collection('user').get()
	console.log(res)
	//返回数据给客户端
	return {
    code: 200,
    msg: '',
    data: res.data
  }
};
