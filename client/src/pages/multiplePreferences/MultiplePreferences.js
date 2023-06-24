import Header from '../../shared_components/Header/Header';
import './MultiplePreferences.css';
import { useNavigate } from 'react-router-dom';

export default function MultiplePreferences() {
    const navigate = useNavigate();

    const handleSettingsRedirect = () => {
        navigate('/settings');
    }

    return (
        <div>
            <Header />
            <h2>A note on selecting multiple preferences</h2>
            <h3 className='multiplePreferences-description'>If you select multiple dietary preferences, Rice Menus will send you menu items so that each item fulfills all of those preferences. 
                For example, if you select vegan and halal, Rice Menus will text you menu items that are all, individually, both vegan and halal.</h3>
            <h2>Selecting Vegan and Vegetarian</h2>
            <h3 className='multiplePreferences-description'>If you select vegan and vegetarian, Rice Menus will send you only vegan items -- since only vegan items fall under the category of both vegan and vegetarian. This can be an unexpected behavior.
                Knowing this, for our users who want strictly vegetarian items -- Rice Menus has implemented it so selecting the vegatarian option by itself will send you vegan menu items as well as vegatarian ones.</h3>
            <h3><a className='multiplePreferences-redirect' onClick={handleSettingsRedirect}>Return to settings</a></h3>
        </div>
    )
}