package dev.anamika.movies.controllers;

import dev.anamika.movies.services.MovieService;
import dev.anamika.movies.models.Movies;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/movies")
@CrossOrigin(origins = {"http://localhost:3000"})
public class MovieController {
    @Autowired
    private MovieService movieService;

    @GetMapping //Get the request from user and returning the response
    //uses service class and deligating the task of fetching all the movies from db
    //gives it back to the api layer
    //so it call the allMovies() method inside the service class, get the list of movies, and return them with the Http Status OK (200)
    public ResponseEntity<List<Movies>> getAllMovies(){
        return new ResponseEntity<List<Movies>>(movieService.allMovies(), HttpStatus.OK); //HttpStatus.OK = 200 code
    }

    // Using "/{id}" exposes the database ObjectId directly in the API URL,
    // which is not a good practice because it reveals internal database details.
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Movies>> getSingleMovie(@PathVariable ObjectId id){
        return new ResponseEntity<Optional<Movies>>(movieService.singleMovie(id), HttpStatus.OK);
    }

    // @PathVariable takes the value from the URL and stores it in the method parameter.
    @GetMapping("/imdb-{imdbId}")
    public ResponseEntity<Optional<Movies>> getImdbIdMovie(@PathVariable String imdbId){
        return new ResponseEntity<Optional<Movies>>(movieService.getImdbIdMovie(imdbId), HttpStatus.OK);
    }
}
