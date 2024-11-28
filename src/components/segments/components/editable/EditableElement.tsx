import {useEffect, useState} from "react";
import './EditableField.css';

const EditableElement = ({value, id, handleChangeById}) => {
    const [editMode, setEditMode] = useState(false);
    const [localValue, setLocalValue] = useState(value)

    const handleChange = (e) => {
        setLocalValue(e.target.value.trim())
    }
    const handleEnd = (e) => {
        setEditMode(false);
        let val = e.target.value
        if (val !== value){
            handleChangeById(id, val)

        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            handleEnd(e)
        }
    };

    const handleDoubleClick = (e) => {
        setEditMode(true);
    };

    const handleBlur = (e) => {
        handleEnd(e)
    };

    useEffect( () => {
        setLocalValue(value)
    }, [value])

    return (
        <div>
            {editMode ? (
                <input
                    type="text"
                    value={localValue}
                    className="editable-input"
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    onChange={handleChange}
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