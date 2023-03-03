import * as React from 'react';
import './styleedit.css';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
export default function CustomEditor(props) {
  const [editDescription1, setDescription] = useState(props.defaultValues);
  const handleChangeEditor = (value) => {
    setDescription(value);
    props.editorDescription(value);
  };
  // console.log(props.defaultValues);

  return (
    <>
      <ReactQuill
        theme="snow"
        value={editDescription1}
        modules={CustomEditor.modules}
        formats={CustomEditor.formats}
        bounds={'.app'}
        onChange={handleChangeEditor}
        // readOnly={true}
        // placeholder={this.props.placeholder}
      />
    </>
  );
}
CustomEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    // ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
CustomEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

CustomEditor.propTypes = {
  editorDescription: PropTypes.func.isRequired,
};
