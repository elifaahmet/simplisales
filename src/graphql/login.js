import { BACKEND_URL } from "./constants";

const LOGIN = `
    mutation {
      loginWithEmail(email: "$email", password: "$password") {
        token
      }
    }
`;

export const login = async (email, password) => {
  const request = LOGIN.replace('$email', email).replace('$password', password);
  try {
    const result = await fetch(BACKEND_URL, {
      method: 'POST',
      body: JSON.stringify({
        query: request,
      })
    }).then((res) => res.json());

    if (result.errors) {
      return {
        isSuccess: false,
        token: null,
      };
    }

    return {
      isSuccess: true,
      token: result.data.loginWithEmail.token,
    };
  } catch (e) {
    return {
      isSuccess: false,
      token: null,
    };
  }
};