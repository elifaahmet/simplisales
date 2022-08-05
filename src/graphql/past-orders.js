import { BACKEND_URL, LIMIT } from "./constants";

const PASTORDERS = `query {
  pastOrders(limit: $limit, index: $index){
    address {
      city {
        name
      }
    }
    items {
      amount
			description
      name
      note
      oldAmount
      quantity
      totalAmount
      types {
        name
      }
		}
    deliveryDriver {
      firstName
      lastName
    }
    deliveryFee
    deliveryTime
    deliveryType
    restaurant {
      name
    }
    orderDate
    total
    usedPoints
    status
  }
}
`;

export const getPastOrders = async (token, index) => {
  const request = PASTORDERS.replace('$limit', LIMIT).replace('$index', index);
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
        pastOrders: [],
      };
    }

    return {
      isSuccess: true,
      pastOrders: result.data.pastOrders,
    };
  } catch (e) {
    return {
      isSuccess: false,
      pastOrders: null,
    };
  }
};