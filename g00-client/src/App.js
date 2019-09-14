import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileList from "./components/FileList";

import { defaultFiles } from './utils/defaultFiles';

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-4 left-panel">

          <FileList
            files={defaultFiles}
            onFileClick={(id) => {
              console.log("ClickID", id)
            }}
            onFileDelete={(id) => { console.log("delId", id) }}
            onSaveEdit={(id, newVal) => { console.log("new", id, newVal) }}
          />

        </div>
        <div className="col-8 right-panel">

          "内容区域"
      </div>
      </div>

    </div>
  );
}

export default App;
