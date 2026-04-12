import React from 'react'
import MacWindow from './MacWindow'
import ResumeFile from "../../assets/Resume.pdf";
import "./resume.scss"

const Resume = ({ windowName, setWindowsState }) => {
    return (
        <MacWindow windowName={windowName} setWindowsState={setWindowsState} >
            <div className="resume-window">
                <embed src={ResumeFile} type="application/pdf" width="100%" height="100%" />
            </div>
        </MacWindow>
    )
}

export default Resume