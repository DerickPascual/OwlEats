import './Checkbox.css'

function Checkbox({ label, checkHandler, index, value, isChecked }) {
    return (
        <div className='checkbox-container'>
            <input
                value={value}
                type="checkbox"
                id={`checkbox-${index}`}
                onChange={checkHandler}
                className='checkbox'
                defaultChecked={isChecked}
            >
            </input>
            <label 
                htmlFor={`checkbox-${index}`}
                className='checkbox-label'
            >{label}</label>
        </div>
    )
}

export default Checkbox;