import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './PhoneNumberInput.css';

function PhoneNumInput({ phoneNumber, setPhoneNumber }) {
    return (
        <PhoneInput
            containerStyle={{ width: 'fit-content', margin: '0px' }}
            placeholder='Enter your phone number'
            inputClass='PhoneInput'
            inputStyle={{ height: '50px', fontSize: '1rem'}}
            dropdownClass='PhoneInput-dropdown'
            country={'us'}
            value={phoneNumber}
            onChange={phone => setPhoneNumber(phone)} />
    )
}

export default PhoneNumInput;