const MongoId = require('mongoid-js').MongoId;
var idFactory = new MongoId(/*systemId:*/ 'local');

const baseurl = '/lc'

const holder = document.getElementById('id-drag-image')
holder.ondragover = () => {
  return false;
}
holder.ondragleave = holder.ondragend = () => {
  return false;
}
holder.ondrop = (e) => {
  e.preventDefault()
  for (let f of e.dataTransfer.files) {
    console.log('File(s) you dragged here: ', f.path)
    let image_id = idFactory.fetch()
    let path = f.path
    let body = JSON.stringify({path})
    console.log('image_id', image_id);
    // ajax('POST', baseurl + `/image/${image_id}`, body, function (data) {
    //   console.log('data', data);
    // })
  }
  return false;
}
