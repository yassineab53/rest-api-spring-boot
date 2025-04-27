import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { postService } from '../services/api';
import PostItem from './PostItem';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import PostForm from './PostForm';
import DeleteConfirmation from './DeleteConfirmation';
import PostContext from '../context/PostContext';

const PostList = () => {
  // State
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  
  // Modal state
  const [showPostForm, setShowPostForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Context
  const { showNotification } = useContext(PostContext);

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [searchTerm, posts]);

  // Fetch posts from API
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.getAllPosts();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      setError('Failed to fetch posts. Please try again later.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle create post
  const handleCreatePost = () => {
    setCurrentPost(null);
    setIsEditing(false);
    setShowPostForm(true);
  };

  // Handle edit post
  const handleEditPost = (post) => {
    setCurrentPost(post);
    setIsEditing(true);
    setShowPostForm(true);
  };

  // Handle delete post
  const handleDeletePost = (post) => {
    setCurrentPost(post);
    setShowDeleteConfirm(true);
  };

  // Submit post (create or update)
  const handleSubmitPost = async (postData) => {
    setLoading(true);
    try {
      if (isEditing) {
        // Update existing post
        const updatedPost = await postService.updatePost(currentPost.id, postData);
        setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
        showNotification('Post updated successfully!', 'success');
      } else {
        // Create new post
        const newPost = await postService.createPost(postData);
        setPosts([newPost, ...posts]);
        showNotification('Post created successfully!', 'success');
      }
    } catch (err) {
      setError(isEditing ? 'Failed to update post.' : 'Failed to create post.');
      showNotification(isEditing ? 'Failed to update post.' : 'Failed to create post.', 'danger');
      console.error('Error submitting post:', err);
    } finally {
      setLoading(false);
    }
  };

  // Confirm delete post
  const confirmDeletePost = async () => {
    if (!currentPost) return;
    
    setLoading(true);
    try {
      await postService.deletePost(currentPost.id);
      setPosts(posts.filter(p => p.id !== currentPost.id));
      showNotification('Post deleted successfully!', 'success');
    } catch (err) {
      setError('Failed to delete post.');
      showNotification('Failed to delete post.', 'danger');
      console.error('Error deleting post:', err);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="post-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Posts</h2>
        <Button variant="primary" onClick={handleCreatePost}>
          Create New Post
        </Button>
      </div>

      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {loading && <LoadingSpinner />}

      {!loading && filteredPosts.length === 0 && (
        <Alert variant="info">
          {searchTerm ? 'No posts match your search.' : 'No posts available.'}
        </Alert>
      )}

      {!loading && filteredPosts.length > 0 && (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {currentPosts.map(post => (
              <Col key={post.id}>
                <PostItem 
                  post={post} 
                  onEdit={handleEditPost} 
                  onDelete={handleDeletePost} 
                />
              </Col>
            ))}
          </Row>

          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}

      {/* Post Form Modal */}
      <PostForm 
        post={currentPost}
        show={showPostForm}
        onHide={() => setShowPostForm(false)}
        onSubmit={handleSubmitPost}
        isEditing={isEditing}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation 
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeletePost}
        postTitle={currentPost?.title}
      />
    </div>
  );
};

export default PostList;