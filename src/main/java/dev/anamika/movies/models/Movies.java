package dev.anamika.movies.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "movies")
@Data //annotation that comes from the lombok dependency. takes care of all the related getter and setter methods
@AllArgsConstructor //annotation for creating a constructor that takes all the defines private fields as arguments
@NoArgsConstructor //annotation for constructor that takes no arguments
public class Movies {

    @Id //it will let the framework know that the following property is an unique identifier for the document.
    private ObjectId id;
    private String imdbId;
    private String title;
    private String releaseDate;
    private String trailerLink;
    private String poster;
    private List<String> genres;
    private List<String> backdrops;

    @DocumentReference //nifty annotation -> this will cause the db to store only the ids of the reviews which are stored in different collection
    //this is called manual reference relationship in mongodb
    private List<Reviews> reviewIds;

}
