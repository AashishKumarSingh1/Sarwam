'use client';
import React, { useEffect, useState, useContext } from 'react';
import ProtectedRoute from '../../components/protectedRoute';
import { UserContext } from '../context/user.context';
import Navbar from '../../components/navbar';
import Modal from './modal'; // Ensure this is the correct path to your Modal component
import { useRouter } from 'next/navigation'; // Import useRouter

const Dashboard = () => {
  const [authenticated] = useContext(UserContext);
  const [isVerified, setIsVerified] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState();
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    setType(authenticated?.user?.type);
    setIsVerified(authenticated?.user?.isVerified);
  }, [authenticated]);

  useEffect(() => {
    if (authenticated?.user?.username) {
      if (authenticated?.user?.isVerified) {
        setModalMessage(`${authenticated?.user?.username}, your account is verified!`);
      } else {
        setModalMessage(`Keep patience ${authenticated?.user?.username}. Your application is under verification process. It will take 3 to 4 days! Once Verfied you will have access to the dashboard `);
      }
      setShowModal(true);
    }
  }, [authenticated?.user]);

  const handleClose = () => {
    setShowModal(false);
    router.push('/'); // Redirect to the home page
  };
  useEffect(() => {
    // document.body.style.backdropFilter = 'blur(10px)';
    document.body.style.backgroundColor = 'rgba(255, 255, 255, 1)'; 
    document.body.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
    return () => {
      document.body.style.backdropFilter = '';
      document.body.style.backgroundColor = '';
      document.body.style.boxShadow = "";
    };
  }, []);

  return (
    <ProtectedRoute>
      <div className="glass-dashboard-background bg-slate-300">
        <Navbar />
        {showModal && <Modal message={modalMessage} onClose={handleClose} isVerified={isVerified} />}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
