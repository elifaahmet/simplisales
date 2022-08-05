import { BACKEND_URL, LIMIT } from "./constants";

const RESTAURANTS = `query {
  restaurants(delivery: $delivery, limit: $limit, index: $index){
    name
    open
    avgScore
    minOrderAmount
  }
}
`;

export const getRestaurants = async (token, index, delivery) => {
  const request = RESTAURANTS.replace('$delivery', delivery).replace('$limit', LIMIT).replace('$index', index);
  try {
    const result = await fetch(BACKEND_URL, {
      method: 'POST',
      body: JSON.stringify({
        query: request,
      }),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then((res) => res.json());

    if (result.errors) {
      return {
        isSuccess: false,
        restaurants: [],
      };
    }

    return {
      isSuccess: true,
      restaurants: result.data.restaurants,
    };
  } catch (e) {
    return {
      isSuccess: false,
      restaurants: null,
    };
  }
};