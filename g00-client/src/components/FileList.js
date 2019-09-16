import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import useKeyPress from "../hooks/useKeyPress";

const FileList = ({
    files, onFileClick, onSaveEdit, onFileDelete
}) => {
    const [editStatus, setEditStatus] = useState(false)
    const [value, setValue] = useState('')
    const closeEdit = () => {
        setEditStatus(false)
        setValue('')
    }
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)

    useEffect(() => {
        if (enterPressed && editStatus) {
            const editItem = files.find(file => file._id === editStatus)
            onSaveEdit(editItem._id, value)
            setEditStatus(false)
            setValue('')
        }
        if (escPressed && editStatus) {
            closeEdit()
        }
        // const handleInputEvent = (event) => {
        //     const { keyCode } = event
        //     if (keyCode === 13 && editStatus) {
        //         const editItem = files.find(file => file.id === editStatus)
        //         onSaveEdit(editItem.id,value)
        //         setEditStatus(false)
        //         setValue('')
        //     } else if (keyCode === 27 && editStatus) {
        //         closeSearch(event)
        //     }
        // }
        // document.addEventListener('keyup',handleInputEvent)
        // return () => {
        //     document.removeEventListener('keyup',handleInputEvent)
        // }
    }, [enterPressed, editStatus, escPressed, files, onSaveEdit, value])
    return (
        <ul className="list-group list-group-flush file-list">
            {
                files ? 
                files.map(file => (
                    <li
                        className="row list-group-item bg-light d-flex align-items-center file-item"
                        key={file._id}
                    >
                        {
                            (file._id !== editStatus) &&
                            <div>
                                <span className="col-2">
                                    <FontAwesomeIcon
                                        title="markdown"
                                        size="lg"
                                        icon={faMarkdown}
                                    />
                                </span>
                                <span
                                    className="col-6 c-link"
                                    onClick={() => {
                                        onFileClick(file._id)
                                    }}
                                >
                                    {file.title}
                                </span>
                                <button
                                    type="button"
                                    className="icon-button col-1"
                                    onClick={
                                        () => { setEditStatus(file._id); setValue(file.title) }
                                    }
                                >
                                    <FontAwesomeIcon
                                        title="编辑"
                                        icon={faEdit}
                                    />
                                </button>
                                <button
                                    type="button"
                                    className="icon-button col-1"
                                    onClick={
                                        () => { onFileDelete(file._id) }
                                    }
                                >
                                    <FontAwesomeIcon
                                        title="删除"
                                        icon={faTrash}
                                    />
                                </button>
                            </div>
                        }
                        {
                            (file._id === editStatus) &&
                            <div className="row">
                                <input
                                    className="form-control col-10"
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                    }}
                                />
                                <button
                                    type="button"
                                    className="icon-button col-2"
                                    onClick={
                                        closeEdit
                                    }
                                >
                                    <FontAwesomeIcon
                                        title="关闭"
                                        icon={faTimes}
                                    />
                                </button>
                            </div>
                        }

                    </li>
                )): null
            }
        </ul>
    )
}

export default FileList;


