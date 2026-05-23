import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`/api/users/${id}`);
        const postsResponse = await axios.get(`/api/users/${id}/posts`);
        
        setUser(userResponse.data.user);
        setPosts(postsResponse.data.posts);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) return <p className="text-center py-8">Loading profile...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center space-x-8">
          <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
          <div>
            <h1 className="text-3xl font-bold">{user?.name || 'User'}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Follow
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Posts</h2>
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <div key={post.id} className="mb-6 pb-6 border-b">
              <h3 className="font-bold text-lg mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
