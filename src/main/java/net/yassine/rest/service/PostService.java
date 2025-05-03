package net.yassine.rest.service;

import net.yassine.rest.model.Post;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

/**
 * Service class to interact with the JSON Placeholder API.
 */
@Service
public class PostService {

    private final RestTemplate restTemplate;
    private final String baseUrl;

    public PostService(RestTemplate restTemplate, @Value("${jsonplaceholder.api.url}") String baseUrl) {
        this.restTemplate = restTemplate;
        this.baseUrl = baseUrl;
    }

    /**
     * Get all posts from the API.
     *
     * @return List of all posts
     */
    public List<Post> getAllPosts() {
        ResponseEntity<Post[]> response = restTemplate.getForEntity(baseUrl, Post[].class);
        return Arrays.asList(response.getBody());
    }

    /**
     * Get a post by its ID.
     *
     * @param id The ID of the post to retrieve
     * @return The post with the specified ID
     */
    public Post getPostById(Long id) {
        return restTemplate.getForObject(baseUrl + "/" + id, Post.class);
    }

    /**
     * Create a new post.
     *
     * @param post The post to create
     * @return The created post with its ID
     */
    public Post createPost(Post post) {
        return restTemplate.postForObject(baseUrl, post, Post.class);
    }

    /**
     * Update an existing post.
     *
     * @param id The ID of the post to update
     * @param post The updated post data
     * @return The updated post
     */
    public Post updatePost(Long id, Post post) {
        HttpEntity<Post> requestEntity = new HttpEntity<>(post);
        ResponseEntity<Post> response = restTemplate.exchange(
                baseUrl + "/" + id,
                HttpMethod.PUT,
                requestEntity,
                Post.class
        );
        return response.getBody();
    }

    /**
     * Delete a post by its ID.
     *
     * @param id The ID of the post to delete
     */
    public void deletePost(Long id) {
        restTemplate.delete(baseUrl + "/" + id);
    }
}