"use client";
import React, { useState } from 'react';
import Modal from 'react-modal';

interface AdminData {
  name: string;
  email: string;
}

function ModalAdmin({ initialAdminData }: { initialAdminData: AdminData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>(initialAdminData);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Detail Admin"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          justifyContent: 'flex-end', // Move content to right side
          alignItems: 'flex-start', // Move content to top
        },
        content: {
          padding: 20,
          border: 'none',
          borderRadius: 5,
        },
      }}
    >
      <h2>Detail Admin</h2>
      <p>Nama: {adminData.name}</p>
      <p>Email: {adminData.email}</p>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 15 }}>
        <button onClick={handleClose} className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
          Tutup
        </button>
        <button className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Edit Profil
        </button>
        <button className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Ubah Kata Sandi
        </button>
      </div>
    </Modal>
  );
}

export default ModalAdmin;