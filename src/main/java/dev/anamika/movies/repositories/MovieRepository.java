package dev.anamika.movies.repositories;

import dev.anamika.movies.models.Movies;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository //to let the framework know this is a repository
//Data access layer for our API --> actually talking to db and fetching the data
public interface MovieRepository extends MongoRepository<Movies, ObjectId> {

    //Spring Data MongoDB automatically understands the query from the method name and generates it internally.
    Optional<Movies> findMovieByImdbId(String imdbId);
}
