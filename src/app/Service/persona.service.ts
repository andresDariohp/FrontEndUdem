import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private httpClient:HttpClient) { }

  Url = "http://localhost:8080/api/personas";

  getPersonas():Observable<any>{
    return this.httpClient.get<Persona[]>(this.Url);
  }

  createPersona(persona:any):Observable<any>{
    return this.httpClient.post<Persona>(this.Url,persona);
  }

  getPersonasById(id:number):Observable<any>{
    return this.httpClient.get<Persona>(this.Url+"/"+id);
  }

  updatePersona(persona:any, id:any):Observable<any>{
    return this.httpClient.put<Persona>(this.Url+"/"+id, persona);
  }

  DeletePersona(id:number):Observable<any>{
    return this.httpClient.delete<Persona>(this.Url+"/"+id);
  }
}
