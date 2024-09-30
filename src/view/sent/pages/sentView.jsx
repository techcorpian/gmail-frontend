import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ViewLayout from '../../shared/components/ViewLayout';

const SentView = () => {
    const { id } = useParams();
    const [emailView, setEmailView] = useState([]);

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/sent/view/${id}`)
            .then(res => {
                setEmailView(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, [id]); // Ensure the effect runs when 'id' changes

    return (


        <ViewLayout emailView={emailView} backLink='/' tag='Sent'/>
    );
}

export default SentView;
