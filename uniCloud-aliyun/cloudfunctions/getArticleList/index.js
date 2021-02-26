
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
  const {classify} = event;
  
	const res = await uniCloud.database()
  .collection('article')
  .where({
    classify
  })
  .field({
    content: false
  })
  .get();
	
	//返回数据给客户端
	return {
    code: 200,
    msg: '',
    data: res
  }
};
