import {useState} from "react";
import './EditableField.css';

const EditableElement = () => {
    const [value, setValue] = useState('');
    const [editMode, setEditMode] = useState(false);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            setEditMode(false);
        }
    };

    const handleDoubleClick = () => {
        setEditMode(true);
    };

    const handleBlur = () => {
        setEditMode(false);
    };

    return (
        <div>
            {editMode ? (
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    className="editable-input"
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    autoFocus
                    maxLength={60}
                />
            ) : (
                <span onDoubleClick={handleDoubleClick}>{value || 'Double click to edit'}</span>
            )}
        </div>
    );
}

export default EditableElement