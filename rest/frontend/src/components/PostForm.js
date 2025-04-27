import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const PostForm = ({ post, show, onHide, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });
  const [validated, setValidated] = useState(false);

  // Update form data when post changes
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        body: post.body || ''
      });
    } else {
      setFormData({ title: '', body: '' });
    }
    // Reset validation when modal opens/closes
    setValidated(false);
  }, [post, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    onSubmit({
      ...formData,
      userId: post?.userId || 1 // Default userId if not provided
    });
    
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Post' : 'Create New Post'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={100}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a title (3-100 characters).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="postBody">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter post content"
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={1000}
            />
            <Form.Control.Feedback type="invalid">
              Please provide content (10-1000 characters).
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostForm;