package com.cursojava.curso.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "personal_amonestado")
@ToString @EqualsAndHashCode
public class Personal_amonestado {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private Long id;

    @Getter @Setter @Column(name = "ci")
    private Long ci;

    @Getter @Setter @Column(name = "empresa")
    private Long empresa;

    @Getter @Setter @Column(name = "caso")
    private Long caso;

    @Getter @Setter @Column(name = "nombre")
    private String nombre;

    @Getter @Setter @Column(name = "apellido")
    private String apellido;


}
