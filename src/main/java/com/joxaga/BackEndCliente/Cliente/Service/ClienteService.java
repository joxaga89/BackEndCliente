package com.joxaga.BackEndCliente.Cliente.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.joxaga.BackEndCliente.Cliente.Model.Cliente;
import com.joxaga.BackEndCliente.Cliente.Repository.ClienteRepository;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

 @Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    @Transactional
    public Cliente saveClient (Cliente cliente){
        if (cliente.getId() == null){
            return clienteRepository.save(cliente);
        }
        return null;
    }

    @Transactional
    public List<Cliente> saveListClient(List<Cliente> clientes) {
        return clienteRepository.saveAll(clientes);
    }

    public Page<Cliente> getAllClient (Integer page, Integer size, Boolean enablePagination){
        return clienteRepository.findAll(enablePagination ? PageRequest.of(page, size): Pageable.unpaged());
    }

    public Optional<Cliente> findById(Long id){
        return clienteRepository.findById(id);
    }

    public  Optional<Cliente> findByCedula(String cedula){
        return clienteRepository.findByCedula(cedula);
    }

    @Transactional
    public void deleteClient(Long id){
        clienteRepository.deleteById(id);
    }

    @Transactional
    public Cliente editClient (Cliente cliente){
        if (cliente.getId() != null && clienteRepository.existsById(cliente.getId())){
            return clienteRepository.save(cliente);
        }
        return null;
    }

    public boolean existById(Long id) {
        return clienteRepository.existsById(id);
    }

}