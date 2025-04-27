import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: '/api', // This will use the proxy setting in package.json
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for handling errors globally
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

// API methods for posts
export const postService = {
  // Get all posts
  getAllPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },

  // Get a post by ID
  getPostById: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Create a new post
  createPost: async (post) => {
    const response = await api.post('/posts', post);
    return response.data;
  },

  // Update a post
  updatePost: async (id, post) => {
    const response = await api.put(`/posts/${id}`, post);
    return response.data;
  },

  // Delete a post
  deletePost: async (id) => {
    await api.delete(`/posts/${id}`);
    return true;
  }
};

export default api;