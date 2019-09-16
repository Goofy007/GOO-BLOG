import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./TabList.scss";

const TabList = ({ files, activeId, unsaveIds = [], onTabClick, onCloseTab }) => {
    return (
        <ul className="nav nav-pills tablist-component">
            {files ?
                files.map(file => {
                    const withUnsaveMark = file ? unsaveIds.includes(file._id): null
                    const fClassName = classNames({
                        'nav-link': true,
                        'active': file? file._id === activeId: null,
                        'withUnsaved': withUnsaveMark
                    })
                    return (
                        file ?
                        <li className="nav-item" key={file ? file._id: null}>
                            <a
                                href="#"
                                className={fClassName}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onTabClick(file._id)
                                }}
                            >
                                {file.title}
                                <span 
                                    className="ml-2 close-icon"
                                    onClick={
                                        (e) => {
                                            e.stopPropagation(); // 阻止冒泡
                                            onCloseTab(file._id)
                                        }
                                    }
                                >
                                    <FontAwesomeIcon
                                        title="关闭"
                                        icon={faTimes}
                                    />
                                </span>
                                {
                                    withUnsaveMark && <span className="rounded-circle unsaved-icon ml-2">

                                    </span>
                                }
                            </a>
                        </li>:null
                    )
                })
                :null
            }
        </ul>
    )
}

export default TabList;