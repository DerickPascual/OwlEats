import './HeaderButton.css'

function HeaderButton({ label, handler }) {
    return (
        <button onClick={handler} className='headerButton'>{label}</button>
    )
}

export default HeaderButton;

