import React from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "./Editor.css";

export const Editor = (props) => {
    const { schema } = props;

    return (
        <div className="wrap-editor">
            <ReactQuill {...schema} />
        </div>
    );
};
