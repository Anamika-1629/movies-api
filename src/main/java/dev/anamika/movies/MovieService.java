package dev.anamika.movies;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service //annotation to define Service class -> contains most of our business logic
//uses repository class, talks to db and fetch and return the list of movies to API layer
public class MovieService {
    @Autowired //we want the framework to instantiate the class MovieRepository
    private MovieRepository movieRepository;

    public List<Movies> allMovies(){
        return movieRepository.findAll();
    }
}
