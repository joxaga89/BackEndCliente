package com.joxaga.BackEndCliente.Cliente.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.joxaga.BackEndCliente.Cliente.Model.Cliente;
import com.joxaga.BackEndCliente.Cliente.Repository.ClienteRepository;
import com.joxaga.BackEndCliente.Cliente.Service.ClienteService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.OPTIONS})
public class ClienteController {
    @Autowired
    private ClienteService clientesService;

    @Autowired
    private ClienteRepository clienteRepository;

    public ResponseEntity<Void> handleOptions(HttpServletRequest request, HttpServletResponse response, @PathVariable Long id) {
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Max-Age", "3600"); // 1 hour
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Cliente> saveClient (@Valid @RequestBody Cliente cliente){
        return ResponseEntity.status(HttpStatus.CREATED).body(clientesService.saveClient(cliente));
    }

    @PostMapping("/guardar_lista")
    public ResponseEntity<List<Cliente>> guardarListaClientes(@RequestBody List<Cliente> clientes) {
        List<Cliente> clientesGuardados = clientesService.saveListClient(clientes);
        return new ResponseEntity<>(clientesGuardados, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<Cliente>> getAllClient (
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "false") Boolean enablePagination
    ){
        return ResponseEntity.ok(clientesService.getAllClient(page, size, enablePagination));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteClient(@PathVariable ("id") Long id){
        clientesService.deleteClient(id);
        return ResponseEntity.ok(!clientesService.existById(id));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Cliente> findById(@PathVariable Long id) {
        Optional<Cliente> clienteOptional = clientesService.findById(id);
        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            return ResponseEntity.status(HttpStatus.OK).body(cliente);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/cedula/{cedula}")
    public ResponseEntity<Cliente> findByCedula(@PathVariable String cedula) {
        Optional<Cliente> clienteOptional = clientesService.findByCedula(cedula);
        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            return ResponseEntity.status(HttpStatus.OK).body(cliente);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Cliente> actualizarCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
        Optional<Cliente> clienteExistente = clientesService.findById(id);
        System.out.println(clienteExistente);
        if (clienteExistente.isPresent()) {
            cliente.setId(id); // Asigna el ID proporcionado al cliente
            Cliente clienteActualizado = clienteRepository.save(cliente); // Actualiza el cliente
            System.out.println(clienteActualizado);
            System.out.println(new ResponseEntity<>(clienteActualizado, HttpStatus.OK));
            return new ResponseEntity<>(clienteActualizado, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}