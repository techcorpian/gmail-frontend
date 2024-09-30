import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Make sure axios is imported
import Table from '../../shared/components/Table';
import AuthService from '../../../services/auth.service.jsx';
import { useToast } from '../../shared/hooks/useToast.jsx';

const Sent = () => {
  const currentUser = AuthService.getCurrentUser();
  const userMail = currentUser.email;
  const [emails, setEmails] = useState([]);
  const [message, setMessage] = useState('');
  const { showToast, ToastComponent } = useToast();

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  // Function to fetch emails
  const fetchSent = () => {
    axios.get(`${apiUrl}/sent/get/${userMail}`)
      .then(res => {
        setEmails(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  // Fetch emails on component mount (initial load)
  useEffect(() => {
    fetchSent();
  }, []);

  // Function to handle deletion of an email
  const handleSentDelete = async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/sent/${id}/delete`);
      // setMessage(response.data.message);
      showToast(response.data.message, 'info');

      // Remove the deleted email from the emails array
      setEmails(prevEmails => prevEmails.filter(email => email._id !== id));
    } catch (err) {
      setMessage('Failed to delete the message');
      console.error(err);
    }
  }

  const handleSentSnooze = async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/sent/${id}/snooze`);
      setMessage(response.data.message);

      // Remove the deleted email from the emails array
      setEmails(prevEmails => prevEmails.filter(email => email._id !== id));
    } catch (err) {
      setMessage('Failed to delete the message');
      console.error(err);
    }
  }

  const handleSentArchive = async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/sent/${id}/archive`);
      setMessage(response.data.message);

      // Remove the deleted email from the emails array
      setEmails(prevEmails => prevEmails.filter(email => email._id !== id));
    } catch (err) {
      setMessage('Failed to delete the message');
      console.error(err);
    }
  }

  const handleSentRead = async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/sent/${id}/read`);
      setMessage(response.data.message);

      // Remove the deleted email from the emails array
      // setEmails(prevEmails => prevEmails.filter(email => email._id !== id));
    } catch (err) {
      setMessage('Failed to delete the message');
      console.error(err);
    }
  }



  return (
    <div>
      <Table emails={emails} setEmails={setEmails} fetchEmails={fetchSent} deleteMail={handleSentDelete} archiveMail={handleSentArchive} markAsRead={handleSentRead} snoozeMail={handleSentSnooze} ToastComponent={ToastComponent} view='sentview' />
    </div>
  );
};

export default Sent;
