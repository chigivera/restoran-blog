// Import necessary modules
import React, { useEffect, useRef } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/link.min.js'
const Editor = ({ initialValue,onGetContent }) => {
    const editorRef = useRef(null);
    useEffect(() => {
        if (editorRef.current && onGetContent) {
          onGetContent(editorRef.current.lastChild.value);
        }
      }, [editorRef.current]); //
  const froalaOptions = {
    charCounterCount: true,
    height: 300,
    theme: 'dark',
    toolbarInline: false,
    toolbarSticky: false,
    toolbarButtonsXS: ['bold', 'italic', 'underline','insertLink'],
    toolbarButtonsSM: ['undo', 'redo', 'clearFormatting'],
    toolbarButtonsMD: ['html'],
  };

const getContent = () => {
  if (editorRef.current) {
    return editorRef.current.lastChild.value;
  }
  return '';
};
  return (
    <div id="editor" className="App" ref={editorRef}>
      <FroalaEditor
        tag='textarea'
        config={froalaOptions}
        model={initialValue}
      />
    </div>
  );
};

export default Editor;