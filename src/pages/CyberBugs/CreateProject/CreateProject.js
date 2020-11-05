import React from 'react'
import { Editor } from '@tinymce/tinymce-react';

export default function CreateProject(props) {


    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        console.log('Content was updated:', editor);
    }


    return (
        <div className="container m-5">
            <h3>CreateProject</h3>
            <form className="container">
                <div className="form-group">
                    <p>Name</p>
                    <input className="form-control" name="projectName" />
                </div>
                <div className="form-group">
                    <p>Description</p>
                    <Editor
                        name="description"
                        initialValue=""
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div className="form-group">
                    <select name="categoryId" className="form-control">
                        <option>Software</option>
                        <option>Web</option>
                        <option>App</option>
                    </select>
                </div>
                <button className="btn btn-outline-primary" type="submit">Create project</button>
            </form>
        </div>
    )
}
