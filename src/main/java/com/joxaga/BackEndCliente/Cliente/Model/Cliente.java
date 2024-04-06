package com.joxaga.BackEndCliente.Cliente.Model;

import java.io.Serializable;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "cliente")
public class Cliente implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private int edad;

    @Column(nullable = false, unique = true)
    private String cedula;

    @Column(nullable = false)
    private String telefono;

    @Column(nullable = false)
    private String correo;
}