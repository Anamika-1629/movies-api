package dev.anamika.movies.services;

import dev.anamika.movies.models.Movies;
import dev.anamika.movies.models.Reviews;
import dev.anamika.movies.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    //Repos are used for basic CRUD operations but with templates, we can perform advance operations directly on the db
    //here, insert review --> update movie --> push review into movie's review list
    //we can use the template to perform dynamic query and do the operations inside our db without using the repo
    private MongoTemplate mongoTemplate;


    public Reviews createReview(String reviewBody, String imdbId){
        // Creates a new review document with fields: id and body
        Reviews review = reviewRepository.insert(new Reviews(reviewBody));

        //update the document inside the Movies collection
        mongoTemplate.update(Movies.class)
                // Find the movie whose imdbId matches the imdbId received from the user
                .matching(Criteria.where("imdbId").is(imdbId))

                // Update the movie document by adding the newly created review to the reviewIds array in the movies collection
                .apply(new Update().push("reviewIds").value(review.getId()))
                .first();

        return review;
    }
}
