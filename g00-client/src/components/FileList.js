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
            const editItem = files.find(file => file.id === editStatus)
            onSaveEdit(editItem.id, value)
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
                files.map(file => (
                    <li
                        className="row list-group-item bg-light d-flex align-items-center file-item"
                        key={file.id}
                    >
                        {
                            (file.id !== editStatus) &&
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
                                        onFileClick(file.id)
                                    }}
                                >
                                    {file.title}
                                </span>
                                <button
                                    type="button"
                                    className="icon-button col-1"
                                    onClick={
                                        () => { setEditStatus(file.id); setValue(file.title) }
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
                                        () => { onFileDelete(file.id) }
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
                            (file.id === editStatus) &&
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
                ))
            }
        </ul>
    )
}

export default FileList;


