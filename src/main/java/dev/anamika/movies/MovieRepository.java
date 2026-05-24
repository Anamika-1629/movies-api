package dev.anamika.movies;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository //to let the framework know this is a repository
//Data access layer for our API --> actually talking to db and fetching the data
public interface MovieRepository extends MongoRepository<Movies, ObjectId> {
}
