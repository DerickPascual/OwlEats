import Checkbox from '../Checkbox/Checkbox';

const possibleAllergens = ['Gluten', 'Soy', 'Dairy', 'Eggs', 'Fish', 'Shellfish', 'Peanuts', 'Treenuts', 'Sesame']

function AllergenSettings({ checkedAllergens, setCheckedAllergens }) {

    const updateCheckStatus = (e) => {
        let updatedList = [...checkedAllergens];

        const targetAllergen = e.target.value.toLowerCase();
        if (!checkedAllergens.includes(targetAllergen)) {
            updatedList = [...checkedAllergens, targetAllergen];
        } else {
            updatedList.splice(checkedAllergens.indexOf(targetAllergen), 1);
        }

        setCheckedAllergens(updatedList);
    };

    return (
        <div className='settings-section-container'>
            <div className='settings-description'>
                <h2>Allergens</h2>
                <div className='settings-subtext'>
                    <h3>If you select any allergens, you won't receive any menu items that contain those allergens.</h3>
                </div>
            </div>
            <div className='settings-form'>
                <div className='settings-checkbox-container'>
                    {possibleAllergens.map((allergen, index) => (
                        <Checkbox
                            isChecked={checkedAllergens.includes(allergen.toLowerCase())}
                            key={index}
                            index={index}
                            value={allergen}
                            checkHandler={updateCheckStatus}
                            label={allergen}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllergenSettings;