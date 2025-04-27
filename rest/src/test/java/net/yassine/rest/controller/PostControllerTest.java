package net.yassine.rest.controller;

import net.yassine.rest.model.Post;
import net.yassine.rest.service.PostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class PostControllerTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        @Primary
        public PostService postService() {
            return Mockito.mock(PostService.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PostService postService;

    private Post testPost;
    private List<Post> testPosts;

    @BeforeEach
    void setUp() {
        testPost = new Post(1L, 1L, "Test Title", "Test Body");
        Post post2 = new Post(2L, 1L, "Test Title 2", "Test Body 2");
        testPosts = Arrays.asList(testPost, post2);
    }

    @Test
    void getAllPosts_ShouldReturnAllPosts() throws Exception {
        when(postService.getAllPosts()).thenReturn(testPosts);

        mockMvc.perform(get("/api/posts"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].title", is("Test Title")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].title", is("Test Title 2")));
    }

    @Test
    void getPostById_ShouldReturnPost() throws Exception {
        when(postService.getPostById(1L)).thenReturn(testPost);

        mockMvc.perform(get("/api/posts/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.title", is("Test Title")))
                .andExpect(jsonPath("$.body", is("Test Body")));
    }

    @Test
    void createPost_ShouldReturnCreatedPost() throws Exception {
        when(postService.createPost(any(Post.class))).thenReturn(testPost);

        mockMvc.perform(post("/api/posts")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"userId\":1,\"title\":\"Test Title\",\"body\":\"Test Body\"}"))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.title", is("Test Title")))
                .andExpect(jsonPath("$.body", is("Test Body")));
    }

    @Test
    void updatePost_ShouldReturnUpdatedPost() throws Exception {
        Post updatedPost = new Post(1L, 1L, "Updated Title", "Updated Body");
        when(postService.updatePost(anyLong(), any(Post.class))).thenReturn(updatedPost);

        mockMvc.perform(put("/api/posts/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"userId\":1,\"title\":\"Updated Title\",\"body\":\"Updated Body\"}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.title", is("Updated Title")))
                .andExpect(jsonPath("$.body", is("Updated Body")));
    }

    @Test
    void deletePost_ShouldReturnNoContent() throws Exception {
        doNothing().when(postService).deletePost(1L);

        mockMvc.perform(delete("/api/posts/1"))
                .andExpect(status().isNoContent());
    }
}
