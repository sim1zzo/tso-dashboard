import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const UserManagementContainer = styled.div`
  padding: 20px;
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulazione del caricamento degli utenti
    const mockUsers = [
      {
        id: 1,
        username: 'admin',
        role: 'Administrator',
        lastLogin: '2023-07-15 10:30:00',
      },
      {
        id: 2,
        username: 'operator1',
        role: 'Operator',
        lastLogin: '2023-07-14 15:45:00',
      },
      {
        id: 3,
        username: 'analyst1',
        role: 'Analyst',
        lastLogin: '2023-07-13 09:15:00',
      },
    ];
    setUsers(mockUsers);
  }, []);

  return (
    <UserManagementContainer>
      <h2>Gestione Utenti e Ruoli</h2>
      <UserTable>
        <thead>
          <tr>
            <TableHeader>Username</TableHeader>
            <TableHeader>Ruolo</TableHeader>
            <TableHeader>Ultimo Accesso</TableHeader>
            <TableHeader>Azioni</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.lastLogin}</TableCell>
              <TableCell>
                <button>Modifica</button>
                <button>Elimina</button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </UserTable>
    </UserManagementContainer>
  );
};

export default UserManagement;
