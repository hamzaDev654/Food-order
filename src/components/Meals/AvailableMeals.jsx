import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [mealItems, setMealItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchMealItemsData = async () => {
    setLoading(true);

    const response = await fetch(
      "https://react-http-958f9-default-rtdb.firebaseio.com/meals.json"
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Something went Wrong");
    }
    let loadMeals = [];
    for (const key in data) {
      // loadMeals=  [...loadMeals,{
      //   id:key,
      //   ...data[key]
      // }]
      loadMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }

    setMealItems(loadMeals);

    setError(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchMealItemsData().catch((e) => {
      setLoading(false);
      setError(e.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading....</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }
  const mealsList = mealItems.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
