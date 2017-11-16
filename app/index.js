// react 库
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// 这个是 antd 的库
import { Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;

// import { getFilesPath } from './files';

var times = 0;

const props = {
  name: 'avatar',
  multiple: true,
  // showUploadList: false,
  action: '//localhost:9000/profile',
  beforeUpload: (file, fileList) => {
    console.log('fileList', fileList);
    if (times === 1) {
      // console.log('1 次了！');
      return false;
    }
    times += 1
    // 做事情
    // getFilesPath(fileList);
    // return false;
  },

  // customRequest: (e) => {
  //   console.log('customRequest', e);
  // },
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
  }

  render() {
    return (
      <div style={{ marginTop: 16, height: 480 }}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
        </Dragger>
      </div>
    );
  }

}


ReactDOM.render(<App />, document.getElementById('__root'))
