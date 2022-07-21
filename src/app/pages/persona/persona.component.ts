import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/Service/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

  public formulario = this.freactive.group({
    nombre: [''],
    apellido: [''],
    documento: [''],
    telefono: ['']

  })

  public lista:Array<Persona>=[];

  public metodo:String = "G"
  public id:any = null;

  constructor(
    private freactive:FormBuilder,
    private personaService:PersonaService
  ) { }

  ngOnInit(): void {
    this.ListarPersonas()
  }

  

  Guardar(){
    if(this.metodo == "G"){
    this.personaService.createPersona(this.formulario.value).subscribe(
      (res)=>{
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Se guardo la persona exitosamente...!!',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#b0b0b0',
          timer: 2500
        });
        this.ListarPersonas();
      }
    )
    }else{
      if(this.metodo == "E"){
        this.personaService.updatePersona(this.formulario.value, this.id).subscribe(
          (res)=>{
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Se actualizaron los datos exitosamente...!!',
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#b0b0b0',
              timer: 2500
            });
            this.ListarPersonas();
            this.metodo = "G";
          }
        )
      }
    }
  }

  ListarPersonas(){
    this.personaService.getPersonas().subscribe(
    (res)=>{
      console.log(res);
      this.lista = res;
    }
    )
  }

  Eliminar(id:any){
    this.personaService.DeletePersona(id).subscribe(
      (res)=>{
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Se elimino la persona exitosamente...!!',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#b0b0b0',
          timer: 2500
        });
        this.ListarPersonas();
      }
      )
  }

  Editar(persona:Persona){
    this.metodo = "E";
    this.id = persona.id;

    this.formulario.controls.nombre.setValue(persona.nombre);
    this.formulario.controls.apellido.setValue(persona.apellido);
    this.formulario.controls.documento.setValue(persona.documento);
    this.formulario.controls.telefono.setValue(persona.telefono);
    Swal.fire({
      icon: 'success',
      title: 'Se cargaron los datos para editar..!!',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#b0b0b0',
      timer: 2500
    });
  }

  Cancelar(){
    this.metodo = "G";
    Swal.fire({
      icon: 'success',
      title: 'Se cancelo la actualizacion de datos...!!',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#b0b0b0',
      timer: 2500
    });
  }
  

}
