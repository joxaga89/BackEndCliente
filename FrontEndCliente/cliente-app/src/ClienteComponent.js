import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TablePagination } from '@mui/material';

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
  const [clienteToUpdate, setClienteToUpdate] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchCedula, setSearchCedula] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cliente');
      setClientes(response.data.content);
    } catch (error) {
      handleDialogError('Error al obtener clientes:'+ error.response.status);
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
      handleDialogSuccess('Cliente guardado exitosamente');
    } catch (error) {
      handleDialogError('Error al guardar cliente:'+ error.response.status);
    }
  };

  // Función para eliminar cliente
  const deleteCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/cliente/${id}`);
      fetchClientes();
      handleDialogSuccess('Cliente eliminado exitosamente');
    } catch (error) {
      handleDialogError('Error al eliminar cliente:'+ error.response.status);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const selectCliente = (cliente) => {
    setClienteToUpdate({ ...cliente });
    setOpenUpdateDialog(true);
  };

  // Función para manejar cambios en el campo de búsqueda por ID
  const handleSearchIdChange = (event) => {
    const { value } = event.target;
    setSearchId(value);
    if (value === '') {
      fetchClientes(); // Cargar todos los clientes si el campo de búsqueda está vacío
    }
  };

  // Función para manejar cambios en el campo de búsqueda por cédula
  const handleSearchCedulaChange = (event) => {
    const { value } = event.target;
    setSearchCedula(value);
    if (value === '') {
      fetchClientes(); // Cargar todos los clientes si el campo de búsqueda está vacío
    }
  };

  // Función para buscar cliente por ID
  const searchById = async () => {
    try {
      if (searchId.trim() === '') {
        fetchClientes(); // Cargar todos los clientes si el campo de búsqueda está vacío
      } else {
        const response = await axios.get(`http://localhost:8080/cliente/id/${searchId}`);
        setClientes([response.data]);
      }
    } catch (error) {
      if(error.response.status == 404)      
          handleDialogError('No se se encuentra el cliente en BD:'+ error.response.status);
      else
          handleDialogError('Error al buscar cliente por cédula:'+ error.response.status);
    }
  };

  // Función para buscar cliente por cédula
  const searchByCedula = async () => {
    try {
      if (searchCedula.trim() === '') {
        fetchClientes(); // Cargar todos los clientes si el campo de búsqueda está vacío
      } else {
        const response = await axios.get(`http://localhost:8080/cliente/cedula/${searchCedula}`);
        setClientes([response.data]);
      }
    } catch (error) {
        if(error.response.status == 404)      
            handleDialogError('No se se encuentra el cliente en BD:'+ error.response.status);
        else
            handleDialogError('Error al buscar cliente por cédula:'+ error.response.status);
    }
  };

  // Función para actualizar cliente
  const updateCliente = async () => {
    try {
      await axios.put(`http://localhost:8080/cliente/${clienteToUpdate.id}`, clienteToUpdate);
      fetchClientes();
      handleDialogSuccess('Cliente actualizado exitosamente');
      setOpenUpdateDialog(false);
    } catch (error) {
      handleDialogError('Error al actualizar cliente:'+ error.response.status);
    }
  };

  // Función para manejar diálogos de éxito
  const handleDialogSuccess = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
  };

  // Función para manejar diálogos de error
  const handleDialogError = (errorMessage, error) => {
    console.error(errorMessage, error);
    setDialogMessage(errorMessage);
    setOpenDialog(true);
  };

  // Función para cerrar diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Función para cerrar diálogo de actualización
  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  // Función para cambiar página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Función para cambiar filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>Contactos</Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField fullWidth size="small" label="Buscar por ID" value={searchId} onChange={handleSearchIdChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" onClick={searchById}>Buscar</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField fullWidth size="small" label="Buscar por Cédula" value={searchCedula} onChange={handleSearchCedulaChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" onClick={searchByCedula}>Buscar</Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? clientes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : clientes
            ).map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.id}</TableCell>
                <TableCell>{cliente.nombre}</TableCell>
                <TableCell>{cliente.edad}</TableCell>
                <TableCell>{cliente.cedula}</TableCell>
                <TableCell>{cliente.telefono}</TableCell>
                <TableCell>{cliente.correo}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => deleteCliente(cliente.id)}>Eliminar</Button>
                  <Button variant="contained" color="primary" onClick={() => selectCliente(cliente)}>Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={clientes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Actualizar Cliente</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => { e.preventDefault(); updateCliente(); }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" name="id" label="ID" value={clienteToUpdate?.id || ''} onChange={(e) => setClienteToUpdate({ ...clienteToUpdate, id: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" name="nombre" label="Nombre" value={clienteToUpdate?.nombre || ''} onChange={(e) => setClienteToUpdate({ ...clienteToUpdate, nombre: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" name="edad" label="Edad" value={clienteToUpdate?.edad || ''} onChange={(e) => setClienteToUpdate({ ...clienteToUpdate, edad: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" name="cedula" label="Cédula" value={clienteToUpdate?.cedula || ''} onChange={(e) => setClienteToUpdate({ ...clienteToUpdate, cedula: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" name="telefono" label="Teléfono" value={clienteToUpdate?.telefono || ''} onChange={(e) => setClienteToUpdate({ ...clienteToUpdate, telefono: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" name="correo" label="Correo" value={clienteToUpdate?.correo || ''} onChange={(e) => setClienteToUpdate({ ...clienteToUpdate, correo: e.target.value })} />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">Actualizar</Button>
                <Button variant="contained" onClick={handleCloseUpdateDialog}>Cerrar</Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      <Typography variant="h4" align="center" gutterBottom mt={2}>Crear Contacto</Typography>
      <form onSubmit={(e) => { e.preventDefault(); saveCliente(); }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" name="nombre" label="Nombre" value={cliente.nombre} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" name="edad" label="Edad" value={cliente.edad} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" name="cedula" label="Cédula" value={cliente.cedula} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" name="telefono" label="Teléfono" value={cliente.telefono} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" name="correo" label="Correo" value={cliente.correo} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Guardar</Button>
          </Grid>
        </Grid>
      </form>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Información</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClienteComponent;
