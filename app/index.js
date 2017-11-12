// react 库
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// 这个是 antd 的库
import { Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;

import { getFilesPath } from './files';

var times = 0;

const props = {
  name: 'file',
  multiple: true,
  showUploadList: false,
  action: '//localhost:9000/',
  beforeUpload: (file, fileList) => {
    // console.log('fileList', fileList);
    if (times === 1) {
      // console.log('1 次了！');
      return false;
    }
    times += 1
    // 做事情
    getFilesPath(fileList);
    return false;
  },

  // customRequest: (e) => {
  //   console.log('customRequest', e);
  // },

};


class App extends Component {

  constructor(props) {
    super(props);
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
