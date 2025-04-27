import React from 'react';

// Create a context for posts with default values
const PostContext = React.createContext({
  showNotification: () => {},
});

export default PostContext;