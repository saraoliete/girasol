import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Habitacion } from '../Modelo/habitacion';
import { Reserva } from '../Modelo/reserva';
import { Usuario } from '../Modelo/usuario';
import { CookieService } from 'ngx-cookie-service';
import { Pension } from '../Modelo/pension';
import { Tipousuario } from '../Modelo/tipousuario';
import { Tipohabitacion } from '../Modelo/tipohabitacion';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Login } from '../Modelo/login';

@Injectable({

    providedIn: 'root'
})

export class ServiceService {

    constructor(private http:HttpClient, private cookies:CookieService){}

    Url='http://localhost:8082/';

    //Login. check
    login(usuario: String){
        
        return this.http.post<Usuario>(this.Url + "session/", usuario,{
            headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        })
        });
    }

    checkUsuario():Observable<any>{
        return this.http.get<Usuario>(this.Url + "session/", {
            
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            observe: 'response',
            responseType: 'json',
            withCredentials: true
          }).pipe(
            catchError(err=>{
              console.log('ha ocurrido un error', err);
              return throwError(err);
      
            })
          );
    }

    
    //servicio de cookies
    setToken(token: string){
        this.cookies.set("token", token);
    }
    
    getToken(){
        return this.cookies.get("token");
    }
    
    logout(){
        this.cookies.delete("token");
    }
    
    //Usuario
    getUsuario(id:Number){
        return this.http.get<Usuario>(this.Url + "usuario/" + id);
    }
    
    createUser(usuario: string){
        return this.http.post<Usuario>(this.Url + "usuario/", usuario);
    }

    updateUsuario(usuario:String){
        return this.http.put<Usuario>(this.Url + "usuario/" + usuario, usuario);
    }

    deleteUser(usuario:Usuario){
        return this.http.delete<Usuario>(this.Url + "usuario/" + usuario.idusuario);
    }

    getPageUsuario(){
        return this.http.get<Usuario[]>(this.Url + "usuario/" + "page");
    }

    //Tipousuario

    getTipousuario(id:Number){
        return this.http.get<Tipousuario>(this.Url + "tipousuario/" + id);
    }

    getPageTipousuario(){
            return this.http.get<Tipousuario[]>(this.Url + "tipousuario/" + "page");
    }

    //Habitacion
    getHabitacion(id:String | null): Observable<Habitacion>{
        return this.http.get<Habitacion>(this.Url + "habitacion/" + id);
    }

    createHabitacion(habitacion:Habitacion): Observable<Habitacion>{
        return this.http.post<Habitacion>(this.Url + "habitacion/",habitacion);
    }

    updateHabitacion(habitacion:Habitacion){
        return this.http.put<Habitacion>(this.Url + "habitacion/" + habitacion.id, habitacion);
    }

    deleteHabitacion(habitacion:Habitacion){
        return this.http.delete<Habitacion>(this.Url + "habitacion/" + habitacion.id);
    }

    getPageHabitacion(page: number, size: number, order: string, asc: boolean): Observable<any>{
        return this.http.get<any>(this.Url + "habitacion/" + "page?" + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
    }

    //tipohabitacion

    getTipohabitacion(id:Number){
        return this.http.get<Tipohabitacion>(this.Url + "tipohabitacion/" + id);
    }

    getAllTipohabitacion(){
        return this.http.get<Tipohabitacion[]>(this.Url + "tipohabitacion/" + "all");
    }

    updateTipohabitacion(tipohabitacion:String){
            return this.http.put<Tipohabitacion>(this.Url + "tipohabitacion/" + tipohabitacion, tipohabitacion);
    }

    getPageTipohabitacion(){
            return this.http.get<Tipohabitacion[]>(this.Url + "tipohabitacion/" + "page");
    }

    //Pension
    getPension(id:String | null): Observable<Pension>{
        return this.http.get<Pension>(this.Url + "pension/" + id);
    }

    createPension(pension:Pension): Observable<Pension>{
        return this.http.post<Pension>(this.Url + "pension/", pension);
    }

    updatePension(pension:Pension){
        return this.http.put<Pension>(this.Url + "pension/" + pension.id, pension);
    }

    deletePension(pension:Pension){
        return this.http.delete<Pension>(this.Url + "pension/" + pension.id);
    }

    getPagePension(page: number, size: number, order: string, asc: boolean): Observable<any>{
        return this.http.get<any>(this.Url + "pension/" + "page?" + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
    }

    
    //Reserva
    getReserva(id:Number){
        return this.http.get<Reserva>(this.Url + "reserva/" + id);
    }

    createReserva(reserva:String){
        return this.http.post<Reserva>(this.Url + "reserva/", reserva);
    }

    deleteReserva(reserva:Reserva){
        return this.http.delete<Reserva>(this.Url + "reserva/" + reserva.idreserva);
    }

    getPageReserva(){
        return this.http.get<Reserva[]>(this.Url + "reserva/" + "page");
    }

}