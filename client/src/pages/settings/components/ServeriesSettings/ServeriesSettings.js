import Checkbox from '../Checkbox/Checkbox';
import { useEffect, useState } from 'react';

const possibleServeries = ['North', 'West', 'South', 'Seibel', 'Baker'];

function ServeriesSettings({ checkedServeries, setCheckedServeries}) {
    const updateCheckStatus = (e) => {
        let updatedList = [...checkedServeries];
        const eventServery = e.target.value.toLowerCase();
        if (!updatedList.includes(eventServery)) {
            updatedList = [...checkedServeries, eventServery];
        } else {
            updatedList.splice(checkedServeries.indexOf(eventServery), 1);
        }

        setCheckedServeries(updatedList);
    };

    return (
        <div className='settings-section-container'>
            <div className='settings-description'>
                <h2>Serveries</h2>
                <div className='settings-subtext'>
                    <h3>You'll only receive menu texts for the serveries you've checked off.</h3>
                </div>
            </div>
            <div className='settings-form'>
                <div className='settings-checkbox-container'>
                    {possibleServeries.map((servery, index) => (
                        <Checkbox 
                            isChecked={checkedServeries.includes(servery.toLowerCase())}
                            key={index}
                            value={servery} 
                            checkHandler={updateCheckStatus}
                            label={servery}
                            />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ServeriesSettings;