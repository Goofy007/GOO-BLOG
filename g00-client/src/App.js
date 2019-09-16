import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "easymde/dist/easymde.min.css";
import { faPlus, faYenSign } from '@fortawesome/free-solid-svg-icons';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import FileList from "./components/FileList";
import BottomBtn from './components/BottomBtn';
import TabList from "./components/TabList";
import SimpleMDE from "react-simplemde-editor";

axios.defaults.headers.common["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlMGE3YjUyZWRjYTA2OGExNzhjYjIiLCJpYXQiOjE1Njg1NDEzMjksImV4cCI6MTU2ODYyNzcyOX0.bHJF1NdoQZ43EU_PV7Q9UgMhSNABfErxf9jReOxbuJA";


function App() {
  const [files, setFiles] = useState([])
  const [openedFileIDs, setOpenedFileIDs] = useState([''])
  const [activeFileID, setActiveFileID] = useState('')
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const [finish, setFinish] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const re = await axios.get('http://localhost:3010/api/blogs');
      setFiles(re.data.data)
    }
    fetchData();
  }, [])

  const openedFiles = openedFileIDs.map((openID) => {
    return files.find(file => file._id === openID)
  })
  const activeFile = files.find(file => file._id === activeFileID)

  const fileClick = (fileID) => {
    setActiveFileID(fileID);
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID])
    }

  }

  const updateFileName = (id, title) => {
    let params = {}
    const newFiles = files.map(file => {
      if (file._id === id) {
        params.author = 'xiaolizi';
        params.title = title;
        params.content = file.content;
        file.title = title
        file.isNew = false
      }
      return file
    })

    setFiles(newFiles)
    axios.post(`http://localhost:3010/api/blogs/update/${id}`, params)
  }

  const deleteFile = (id) => {
    const newFiles = files.filter(file => file._id !== id)
    setFiles(newFiles)
    tabClose(id)
    axios.post(`http://localhost:3010/api/blogs/delete/${id}`)
  }

  const createNewFile = async () => {
    let params = {
      title: 'New Blog',
      content: 'Content...',
      author: 'xiaolizi'
    }
    const re = await axios.post(`http://localhost:3010/api/blogs/add`, params)
    console.log('new', re.data.data._id)
    // const newID = uuidv4()
    const newFiles = await [
      ...files,
      {
        _id: re.data.data._id,
        ...params,
        isNew: true
      }
    ]
    await setFiles(newFiles)
  }

  const updateNewFile = async () => {
    const re = await axios.post(`http://localhost:3010/api/blogs/update/${activeFile._id}`, activeFile)
    console.log('new', re.data.data._id)
    // const newID = uuidv4()
    const newFiles = await files.map(file => {
      if (file._id === activeFile._id) {
        file.author ='xiaolizi';
        file.title = activeFile.title;
        file.content = activeFile.content;
      }
      return file;
    })
    await setFiles(newFiles)
    await setFinish(false)
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

  const fileChange = (id, value) => {
    if (!finish) {
      setFinish(true)
    }
    const newFiles = files.map(file => {
      if (file._id === id) {
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
            files={files}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className="row button-group">
            <div className="col-12">
              {finish ?
                <BottomBtn
                  text="完成"
                  colorClass="btn-primary"
                  icon={faYenSign}
                  onBtnClick={updateNewFile}
                />
                : <BottomBtn
                  text="新建"
                  colorClass="btn-primary"
                  icon={faPlus}
                  onBtnClick={createNewFile}
                />}
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
            key={activeFile && activeFile._id}
            value={activeFile && activeFile.content}
            onChange={(value) => {
              fileChange(activeFile._id, value)
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
