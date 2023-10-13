import React from 'react';
import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';

function Meals() {
    return (
        <React.Fragment>
            <MealsSummary />
            <AvailableMeals />
        </React.Fragment>
    )
}

export default Meals
