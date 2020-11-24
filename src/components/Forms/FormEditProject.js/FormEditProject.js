import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';



export default function FormEditProject(props) {

    const dispatch = useDispatch();
    const submitForm = (e) => {
        e.preventDefault();
        alert('submit edit');
    }

    //componentdidmount
    useEffect(() => {

        dispatch({ type: 'SET_SUBMIT_EDIT_PROJECT', submitFunction: submitForm });




    }, [])


    const handleEditorChange = (content, editor) => {
        // setFieldValue('description', content)
    }

    return (
        <form className="container-fuild" onSubmit={submitForm}>
            <div className="row">
                <div className="col-4">

                    <div className="form-group">
                        <p className="font-weight-bold">Project id</p>
                        <input disabled className="form-control" name="id" />
                    </div>


                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project name</p>
                        <input className="form-control" name="projectName" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Category</p>
                        <input className="form-control" name="projectName" />
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        <Editor

                            name="description123"

                            init={{
                                selector: 'textarea#myTextArea',

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
                </div>
            </div>
        </form >
    )
}
