#!/usr/bin/node

const request = require('request');

// Function to retrieve characters based on movie ID
function getMovieCharacters(movieId) {
  const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

  request(apiUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const movieData = JSON.parse(body);
      const characters = movieData.characters;

      // Iterate over characters and print their names
      characters.forEach(function (characterUrl) {
        request(characterUrl, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            const characterData = JSON.parse(body);
            console.log(characterData.name);
          } else {
            console.log('Error retrieving character data:', error);
          }
        });
      });
    } else {
      console.log('Error retrieving movie data:', error);
    }
  });
}

// Retrieve characters for a specific movie ID
const movieId = process.argv[2];
getMovieCharacters(movieId);
