import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PostItem = ({ post, onEdit, onDelete }) => {
  // Truncate long text for display
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{truncateText(post.body)}</Card.Text>
        <div className="post-actions">
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={() => onEdit(post)}
          >
            Edit
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm" 
            onClick={() => onDelete(post)}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostItem;