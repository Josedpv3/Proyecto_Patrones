package com.cursojava.curso.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "casos")
@ToString @EqualsAndHashCode
public class Caso {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private Long id;

    @Getter @Setter @Column(name = "investigador")
    private Long investigador;

    @Getter @Setter @Column(name = "estado")
    private Long estado;

    @Getter @Setter @Column(name = "id_caso_relacionado")
    private Long id_caso_relacionado;

    @Getter @Setter @Column(name = "id_brecha")
    private Long id_brecha;

    @Getter @Setter @Column(name = "id_proyecto")
    private Long id_proyecto;

    @Getter @Setter @Column(name = "fecha")
    private LocalDateTime fecha;

    @Getter @Setter @Column(name = "empresa")
    private Long empresa;

    @Getter @Setter @Column(name = "tipo")
    private String tipo;

    @Getter @Setter @Column(name = "id_irregularidad")
    private Long id_irregularidad;

    @Getter @Setter @Column(name = "objetivo")
    private String objetivo;

    @Getter @Setter @Column(name = "incidencia")
    private String incidencia;

    @Getter @Setter @Column(name = "dias")
    private Long dias;

    @Getter @Setter @Column(name = "operandi")
    private String operandi;

    @Getter @Setter @Column(name = "area")
    private String area;

    @Getter @Setter @Column(name = "deteccion")
    private String deteccion;

    @Getter @Setter @Column(name = "diagnostico")
    private String diagnostico;

    @Getter @Setter @Column(name = "acciones")
    private String acciones;

    @Getter @Setter @Column(name = "conclusiones")
    private String conclusiones;

    @Getter @Setter @Column(name = "observaciones")
    private String observaciones;

    @Getter @Setter @Column(name = "soporte")
    private String soporte;


}
