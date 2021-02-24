'use strict';
exports.main = async (event, context) => {
	const labelList = await uniCloud.database().collection('label').get()
  
	//返回数据给客户端
	return {
    code: 200,
    msg: '',
    data: labelList.data
  }
};
