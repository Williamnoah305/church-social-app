import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Community Feed</h1>
      
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {loading ? (
            <p className="text-gray-500">Loading posts...</p>
          ) : posts.length > 0 ? (
            posts.map((post: any) => (
              <div key={post.id} className="bg-white rounded-lg shadow p-6 mb-4">
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <button className="hover:text-blue-600">❤️ Like</button>
                  <button className="hover:text-blue-600">💬 Comment</button>
                  <button className="hover:text-blue-600">↗️ Share</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No posts yet. Be the first to share!</p>
          )}
        </div>
        
        <aside className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="font-bold text-lg mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="text-sm">
              <p className="font-semibold text-gray-800">Sunday Service</p>
              <p className="text-gray-600">Tomorrow at 10:00 AM</p>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-800">Youth Group</p>
              <p className="text-gray-600">Friday at 6:00 PM</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
