package com.joxaga.BackEndCliente.Cliente.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.joxaga.BackEndCliente.Cliente.Model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByCedula(String cedula);
}
