import Checkbox from '../Checkbox/Checkbox';
import { useNavigate } from 'react-router-dom';
import '../../Settings.css'

const possibleDiets = ["Vegetarian", "Vegan", "Halal"]

function DietPrefSettings({ checkedDiets, setCheckedDiets }) {
    const navigate = useNavigate();

    const updateCheckStatus = (e) => {
        let updatedList = [...checkedDiets];

        const targetDiet = e.target.value.toLowerCase();
        if (!checkedDiets.includes(targetDiet)) {
            updatedList = [...checkedDiets, targetDiet];
        } else {
            updatedList.splice(checkedDiets.indexOf(targetDiet), 1);
        }

        setCheckedDiets(updatedList);
    };

    const handleNoteRedirect = (e) => {
        e.preventDefault();

        navigate('/multiple-prefs')
    }

    return (
        <div className='settings-section-container'>
            <div className='settings-description'>
                <h2>Dietary Preferences</h2>
                <div className='settings-subtext'>
                    <h3>If you select a dietary preference, you'll only receive menu items that align with that preference.</h3>
                    <h3>Click <a className="settings-note-anchor"onClick={handleNoteRedirect}>here</a> for a note about selecting multiple preferences.</h3>
                </div>
            </div>
            <div className='settings-form'>
                <div className='settings-checkbox-container'>
                    {possibleDiets.map((diet, index) => (
                        <Checkbox
                            isChecked={checkedDiets.includes(diet.toLowerCase())}
                            key={index}
                            index={index}
                            value={diet}
                            checkHandler={updateCheckStatus}
                            label={diet}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DietPrefSettings;