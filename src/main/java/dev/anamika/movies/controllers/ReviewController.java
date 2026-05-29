package dev.anamika.movies.controllers;

import dev.anamika.movies.services.ReviewService;
import dev.anamika.movies.models.Reviews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping //handles POST requests
    //@RequestBody --> takes JSON data send by the user and converts it to Java data
    //reviewService.createReview() --> methods calls the Service class to create the review and connect it to the certain movie in movie collection
    private ResponseEntity<Reviews> createReview(@RequestBody Map<String, String> payload){
        return new ResponseEntity<Reviews>(reviewService.createReview(payload.get("reviewBody"),payload.get("imdbId")), HttpStatus.OK);
    }
}
