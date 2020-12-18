import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { Select, Radio } from 'antd';
const { Option } = Select;

const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
export default function FormCreateTask(props) {

    const [size, setSize] = React.useState('default');

    const handleEditorChange = (content, editor) => {

    }

    function handleChange(value) {
        console.log(`Selected: ${value}`);
      }

    const children = [];
    return (
        <div className="container">          
            <div className="form-group">
                <p>Project</p>
                <select name="projectId" className="form-control">
                    <option value="54">Project A</option>
                    <option value="55">Project A</option>
                </select>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" className="form-control">
                            <option>High</option>
                            <option>Low</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task type</p>
                        <select className="form-control" name="typeId">
                            <option>New Task</option>
                            <option>Bugs</option>
                        </select>
                    </div>
                </div>
                
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                    <p>Assignees</p>
                    <Select
                            mode="multiple"
                            size={size}
                            options={[{value:'a12',label:'b12'},{value:'a12',label:'b12'},{value:'a12',label:'b12'}]}
                            placeholder="Please select"
                            defaultValue={['a10', 'c12']}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        >
                            {children}
      </Select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <p>Description</p>
                <Editor
                    name="description"
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
    )
}
