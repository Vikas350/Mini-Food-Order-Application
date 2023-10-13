import React, {useEffect, useState} from 'react';
import './AvailableMeals.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

/*
const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];
*/

function AvailableMeals() {
    // to change the meal data on screen use useState
    const [meals,setMeals] = useState([]);
    const [isLoading,setIsLoading] = useState(true); //for loader
    const [httpError,setHttpError] = useState(); //for error handling

    //here wrap fecth with useEffect so it run/fetch when we load first time 
    useEffect(() => {
        const fetchMeals = async () =>{
            const response = await fetch("https://react-http-b0804-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json");

            //here fisrt check is the response in Ok or not
            if(!response.ok){
                throw new Error('Something went Wrong!');
            }
        
            const responseData = await response.json();

            // now this response data is in from of key and object
            const loadedMeals = [];
            for(const key in responseData){
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        }

        /*NOTE - 
        try{
            fetchMeals(); //here call that asunchronous function
        }catch(error){
            setIsLoading(false);
            setHttpError(error.message);
        }*/

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    },[]);

    if(isLoading){
        return (
            <section className='MealsLoading'>
                <p>Loading...</p>
            </section>
        )
    }

    if(httpError){
        return (
            <section className='MealsError'>
                <p>{httpError}</p>
            </section>
        )
    }

    //if we write a html element in the function then {} is not use
    const mealsList = meals.map((meal) => (
        <MealItem
            id={meal.id} // use in mail item form through meal item file
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className='meals'>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals
