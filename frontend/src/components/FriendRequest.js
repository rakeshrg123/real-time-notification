import React, { useState, useEffect } from 'react';

import { getAllUsers, getUser } from '../services/api'; // Adjust the import path as needed
import '../FriendRequest.css';
import Navbar from './Navabar';
import Modal from 'react-modal';
import socket from '../socket';
import { checkAuth } from './auth/CheckAuth';

// Set the app element for accessibility
Modal.setAppElement('#root');

const FriendRequest = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

 


  const acceptFriendRequest = (senderId) => {
    socket.emit('acceptFriendRequest', {
      senderId,
      receiverId: currentUserId,
    });
    openModal('Friend request accepted!');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || { user: { id: 'user123' } };
    const userId = user.user.id;
    setCurrentUserId(userId);

    // Fetch friend requests from the backend if there are any
    const fetchFriendRequests = async () => {
      try {
        const response = await getUser(userId);
        
        setFriendRequests(response.data.data.friendRequests); // Update state with friend requests
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    fetchFriendRequests(); // Call to fetch the requests on initial load

    socket.emit('addUser', userId);

    socket.on('getUsers', (users) => {
      setOnlineUsers(users);
    });

    socket.on('receiveFriendRequest', ({ senderId, message }) => {
      setFriendRequests((prevRequests) => [
        ...prevRequests,
        { senderId, message },
      ]);
      openModal('You have received a new friend request!');
    });

    socket.on('friendRequestAccepted', ({ senderId, message }) => {
      openModal('Your friend request has been accepted!');
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        setAllUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openModal = (message) => {
    setModalMessage(message);
    setModalIsOpen(true);

    setTimeout(() => {
      setModalIsOpen(false);
    }, 3000); // Close modal after 3 seconds
  };

  const sendFriendRequest = (receiverId) => {
    socket.emit('sendFriendRequest', {
      senderId: currentUserId,
      receiverId,
      message: 'Hi! Let’s connect.',
    });
    openModal('Friend request sent!');
  };



  return (
    <>
      <Navbar />
      <div className="friendRequest-container">
        <h2>Friend Requests</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <ul className="user-list">
            {allUsers
              .filter((user) => user._id !== currentUserId)
              .map((user) => (
                <li key={user._id}>
                  <span>{user.name}</span>
                  <button onClick={() => sendFriendRequest(user._id)}>
                    Send Friend Request
                  </button>
                </li>
              ))}
          </ul>
        )}

        <div className="friendRequests-container">
          <h3>Friend Requests</h3>
          <ul>
            {friendRequests.map((request, index) => (
              <li key={index}>
                <span>{request.name} - you got a request</span>
                <button onClick={() => acceptFriendRequest(request.userId)}>
                  Accept Request
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal Popup */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Friend Request Notification"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{modalMessage}</h2>
      </Modal>
    </>
  );
};

export default checkAuth(FriendRequest);