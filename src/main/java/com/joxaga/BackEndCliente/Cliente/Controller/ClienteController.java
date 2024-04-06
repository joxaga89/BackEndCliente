package com.joxaga.BackEndCliente.Cliente.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.joxaga.BackEndCliente.Cliente.Model.Cliente;
import com.joxaga.BackEndCliente.Cliente.Service.ClienteService;
import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    private ClienteService clientesService;

    @PostMapping
    public ResponseEntity<Cliente> saveClient (@Valid @RequestBody Cliente cliente){
        return ResponseEntity.status(HttpStatus.CREATED).body(clientesService.saveClient(cliente));
    }

    @GetMapping
    public ResponseEntity<Page<Cliente>> getAllStudent (
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

    @PutMapping
    public ResponseEntity<Cliente> editClient (@Valid @RequestBody Cliente cliente){
        return ResponseEntity.status(HttpStatus.CREATED).body(clientesService.editClient(cliente));
    }

}