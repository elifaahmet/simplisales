import { BACKEND_URL } from "./constants";

const USER = `query {
  user {
    email
    firstName
    lastName
    addresses {
      addressLine1
      addressLine2
      city {
        name
      }
    }
    mobileNumber
    points
  }
}
`;

export const getUser = async (token) => {
  try {
    const result = await fetch(BACKEND_URL, {
      method: 'POST',
      body: JSON.stringify({
        query: USER,
      }),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then((res) => res.json());

    if (result.errors) {
      return {
        isSuccess: false,
        user: {},
      };
    }

    return {
      isSuccess: true,
      user: result.data.user,
    };
  } catch (e) {
    return {
      isSuccess: false,
      user: {},
    };
  }
};