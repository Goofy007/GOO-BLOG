import React, { useState ,useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "easymde/dist/easymde.min.css";
import { faPlus, faFileImport, faPlug } from '@fortawesome/free-solid-svg-icons';
import SimpleMDE from "react-simplemde-editor";
import uuidv4 from 'uuid/v4';
import FileList from "./components/FileList";
import BottomBtn from './components/BottomBtn';
import TabList from "./components/TabList";
import { defaultFiles } from './utils/defaultFiles';

function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState('1')
  const [openedFileIDs, setOpenedFileIDs] = useState(['1'])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const [searchedFiles, setSearchedFiles] = useState([])

  const openedFiles = openedFileIDs.map((openID) => {
    return files.find(file => file.id === openID)
  })

  const fileClick = (fileID) => {
    setActiveFileID(fileID);
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID])
    }
  }

  const tabClick = (fileID) => {
    setActiveFileID(fileID)
  }

  const tabClose = (id) => {
    const tabsWithout = openedFileIDs.filter(fileID => fileID !== id)
    setOpenedFileIDs(tabsWithout)
    if (tabsWithout.length > 0) {
      setActiveFileID(tabsWithout[0])
    } else {
      setActiveFileID('')
    }
  }

  const deleteFile = (id) => {
    const newFiles = files.filter(file => file.id !== id)
    setFiles(newFiles)
    tabClose(id)
  }


  const updateFileName = (id, title) => {
    const newFiles = files.map(file => {
      if (file.id === id) { 
        file.title = title
        file.isNew = false
       }
      return file
    })

    setFiles(newFiles)
  }

  const createNewFile = () => {
    const newID = uuidv4()
    const newFiles = [
      ...files,
      {
        id: newID,
        title: '',
        content: '## 新建',
        createdAt: new Date().getTime(),
        isNew: true
      }
    ]
    setFiles(newFiles)
  }



  const activeFile = files.find(file => file.id === activeFileID)
  const fileListArr = (searchedFiles.length > 0) ? searchedFiles: files

  const fileChange = (id, value) => {
    const newFiles = files.map(file => {
      if (file.id === id) {
        file.content = value
      }
      return file
    })
    setFiles(newFiles)

    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id])
    }
  }

  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-3 left-panel">
          <FileList
            files={fileListArr}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className='row button-group'>
            <div className="col-12">
              <BottomBtn
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">

          <TabList
            files={openedFiles}
            activeId={activeFileID}
            unsaveIds={unsavedFileIDs}
            onTabClick={tabClick}
            onCloseTab={tabClose}
          />
          <SimpleMDE
            key={activeFile && activeFile.id}
            value={activeFile.content}
            onChange={(value) => {
              fileChange(activeFile.id, value)
            }}
            options={{
              minHeight: '515px'
            }}
          />
        </div>
      </div>

    </div>
  );
}

export default App;
