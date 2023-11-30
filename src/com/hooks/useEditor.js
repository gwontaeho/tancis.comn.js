import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
    toolbar: [
        //[{ 'font': [] }],
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
        ["clean"],
    ],
};

const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
];

export const useEditor = (props = {}) => {
    const { value = null, placeholder, readOnly = false } = props;
    const ref = useRef(null);

    const setValue = (value) => {
        ref.current.setEditorContents(ref.current.editor, value);
    };

    const getValue = () => {
        return ref.current.getEditorContents(ref.current.editor);
    };

    const setFocus = () => {
        ref.current.focus();
    };

    const blur = () => {
        ref.current.blur();
    };

    const getLength = () => {
        return ref.current.editor.getLength();
    };

    const setEditable = (editable) => {
        //ref.current.editor.setEditable(editable);
    };

    const setDisabled = (disabled) => {
        if (disabled === true) ref.current.editor.disable();
        else ref.current.editor.enable();
    };

    const schema = {
        modules,
        formats,
        theme: "snow",
        value: value || "",
        placeholder,
        readOnly,
        ref,
    };

    return { schema, setEditable, setDisabled, setValue, getValue, setFocus, blur, getLength };
};
