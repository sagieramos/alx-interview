#!/usr/bin/node
const axios = require('axios');

const API_URL = 'https://swapi.dev/api';

if (process.argv.length > 2) {
  axios.get(`${API_URL}/films/${process.argv[2]}/`)
    .then(response => {
      const charactersURL = response.data.characters;
      const charactersName = charactersURL.map(url =>
        axios.get(url)
          .then(response => response.data.name)
          .catch(error => Promise.reject(error))
      );

      Promise.all(charactersName)
        .then(names => console.log(names.join('\n')))
        .catch(error => console.log(error));
    })
    .catch(error => {
      console.log(error);
    });
}
