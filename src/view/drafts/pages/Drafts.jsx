import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Make sure axios is imported
import Table from '../../shared/components/Table';
import AuthService from '../../../services/auth.service.jsx';
import { useToast } from '../../shared/hooks/useToast.jsx';

const Drafts = () => {
  const currentUser = AuthService.getCurrentUser();
  const userMail = currentUser.email;
  const [emails, setEmails] = useState([]);
  const { showToast, ToastComponent } = useToast();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/draft/get/${userMail}`)
      .then(res => {
        setEmails(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);  // Removed `id` from dependencies since it is not defined



  return (
    <div>
      <Table emails={emails} setEmails={setEmails} Draft='Draft' ToastComponent={ToastComponent}/>
    </div>
  );
};

export default Drafts;
