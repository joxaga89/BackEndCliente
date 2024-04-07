import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClienteComponent = () => {
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({
    id: null,
    nombre: '',
    edad: '',
    cedula: '',
    telefono: '',
    correo: ''
  });
  const [searchId, setSearchId] = useState('');
  const [searchCedula, setSearchCedula] = useState('');

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cliente');
      setClientes(response.data.content);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  const saveCliente = async () => {
    try {
      await axios.post('http://localhost:8080/cliente', cliente);
      fetchClientes();
      setCliente({
        id: null,
        nombre: '',
        edad: '',
        cedula: '',
        telefono: '',
        correo: ''
      });
    } catch (error) {
      console.error('Error al guardar cliente:', error);
    }
  };

  const deleteCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/cliente/${id}`);
      fetchClientes();
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const searchById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/cliente/id/${searchId}`);
      setClientes([response.data]);
    } catch (error) {
      console.error('Error al buscar cliente por ID:', error);
    }
  };

  const searchByCedula = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/cliente/cedula/${searchCedula}`);
      setClientes([response.data]);
    } catch (error) {
      console.error('Error al buscar cliente por cédula:', error);
    }
  };

  const updateCliente = async () => {
    try {
      await axios.put('http://localhost:8080/cliente', cliente);
      fetchClientes();
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
    }
  };

  return (
    <div>
      <h1>Clientes</h1>
      <div>
        <input type="text" placeholder="Buscar por ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        <button onClick={searchById}>Buscar</button>
      </div>
      <div>
        <input type="text" placeholder="Buscar por Cédula" value={searchCedula} onChange={(e) => setSearchCedula(e.target.value)} />
        <button onClick={searchByCedula}>Buscar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Cédula</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.edad}</td>
              <td>{cliente.cedula}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.correo}</td>
              <td>
                <button onClick={() => deleteCliente(cliente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Crear Cliente</h2>
      <form onSubmit={(e) => { e.preventDefault(); saveCliente(); }}>
        <input type="text" name="nombre" placeholder="Nombre" value={cliente.nombre} onChange={handleInputChange} />
        <input type="text" name="edad" placeholder="Edad" value={cliente.edad} onChange={handleInputChange} />
        <input type="text" name="cedula" placeholder="Cédula" value={cliente.cedula} onChange={handleInputChange} />
        <input type="text" name="telefono" placeholder="Teléfono" value={cliente.telefono} onChange={handleInputChange} />
        <input type="text" name="correo" placeholder="Correo" value={cliente.correo} onChange={handleInputChange} />
        <button type="submit">Guardar</button>
      </form>
      <h2>Actualizar Cliente</h2>
      <form onSubmit={(e) => { e.preventDefault(); updateCliente(); }}>
        <input type="text" name="id" placeholder="ID" value={cliente.id} onChange={handleInputChange} />
        <input type="text" name="nombre" placeholder="Nombre" value={cliente.nombre} onChange={handleInputChange} />
        <input type="text" name="edad" placeholder="Edad" value={cliente.edad} onChange={handleInputChange} />
        <input type="text" name="cedula" placeholder="Cédula" value={cliente.cedula} onChange={handleInputChange} />
        <input type="text" name="telefono" placeholder="Teléfono" value={cliente.telefono} onChange={handleInputChange} />
        <input type="text" name="correo" placeholder="Correo" value={cliente.correo} onChange={handleInputChange} />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default ClienteComponent;
