
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
  const {classify, pageIndex, pageSize} = event;
  let where = {}
  if(classify !== '全部') {
    where = {
      classify
    }
  }
	const res = await uniCloud.database()
  .collection('article')
  .where(where)
  .field({
    content: false
  })
  .skip((pageIndex-1) * pageSize)
  .limit(pageSize)
  .get();
	
	//返回数据给客户端
	return {
    code: 200,
    msg: '',
    data: res
  }
};
