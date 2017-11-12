
// 这个是 antd 的库
// import { Modal } from 'antd';

// 这个库是用来生成 MongoId 的
const MongoId = require('mongoid-js').MongoId;
var idFactory = new MongoId(/*systemId:*/ 'local');

function getFilesPath(fileList) {
  // console.log('fileList', fileList);
  let images = {}
  for (let f of fileList) {
    console.log('File(s) you dragged here: ', f.path)
    let image_id = idFactory.fetch()
    images[image_id] = f.path
    // images[image_id] = '/Users/leon/Developer/data/images/rudolf/59479551b62cde001809483a.2017-06-12_09.57.54.ndpi'
  }
  // console.log('images', images);
}


export { getFilesPath };
