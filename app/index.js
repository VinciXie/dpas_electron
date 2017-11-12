// import antd from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// 这个库是用来生成 MongoId 的
const MongoId = require('mongoid-js').MongoId;
var idFactory = new MongoId(/*systemId:*/ 'local');

// 这个是 antd 的库
import { Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;

// 定义这个项目的 baseurl
const baseurl = '/lc';

const props = {
  name: 'file',
  multiple: true,
  // showUploadList: false,
  action: '//localhost:9000/',
  beforeUpload: (file, fileList) => {
    console.log('fileList', fileList);
  },

  customRequest: (e) => {
    console.log('customRequest', e);
  },
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


class App extends Component {

  constructor(props) {
    super(props);

    this.addDropEvent = this.addDropEvent.bind(this)
  }

  addDropEvent() {

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

  }

  render() {
    return (
      <div>
        <div style={{ marginTop: 16, height: 180 }}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
          </Dragger>
        </div>
      </div>
    );
  }

}


ReactDOM.render(<App />, document.getElementById('__root'))
