package com.cursojava.curso.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "brecha")
@ToString @EqualsAndHashCode
public class Brecha {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private Long id;

    @Getter @Setter @Column(name = "tipo")
    private String tipo;

    @Getter @Setter @Column(name = "subtipo")
    private String subtipo;


}
