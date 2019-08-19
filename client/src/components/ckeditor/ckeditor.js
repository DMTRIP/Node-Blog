import React from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ckeditor.css';

const Ckeditor = (props) => {
  const { ckeditorOnChage, createPostHandler } = props;

  return (
    <div className="CKEditor ckeditor">
      <CKEditor
        editor={ ClassicEditor }
        data=""
        onInit={ (editor, config) => {
          // You can store the "editor" and use when it is needed.
          console.log( 'Editor is ready to use!', editor );
        } }
        onChange={ ( event, editor ) => {
          const data = editor.getData();
          ckeditorOnChage(data);
        } }
        onBlur={ editor => {
          console.log( 'Blur.', editor );
        } }
        onFocus={ editor => {
          console.log( 'Focus.', editor );
        } }
      />

      <button type="button" className="btn btn-primary"
              onClick={createPostHandler}>
        Create </button>

    </div>
  )
};

  export default Ckeditor;