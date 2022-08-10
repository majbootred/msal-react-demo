export const fetchData = (endPoint, accessToken) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers: headers,
  };

  return fetch(endPoint, options)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
