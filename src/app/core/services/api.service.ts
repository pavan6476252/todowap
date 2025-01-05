import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPIResposne } from "../../@types/api-response";
import { environment } from "../../../environments/environment";

@Injectable({providedIn:'root'})
export class ApiService {
    private baseUrl =environment.apiUrl;

    constructor(private httpClient: HttpClient) {

    }
    

    // private generateHeader(httpHeader: HttpHeaders = new HttpHeaders()) {
    //     const token = this.getAccessToken
    //     if (token) {
    //         httpHeader.append('Authorization', `Bearer ${token}`)
    //     }
    //     return httpHeader;
    // }

    get<T>(endPoint: string, httpParams: HttpParams = new HttpParams()) {
        return this.httpClient.get<IAPIResposne< T>>(`${this.baseUrl}/${endPoint}`, {
            // headers: this.generateHeader(),
            params: httpParams,
        })
    }

    post<T>(endPoint: string, body: any, httpParams: HttpParams = new HttpParams()) {
        return this.httpClient.post<IAPIResposne< T>>(`${this.baseUrl}/${endPoint}`, body, {
            // headers: this.generateHeader(),
            params: httpParams,
        })
    }
    put<T>(endPoint: string, body: any, httpParams: HttpParams = new HttpParams()) {
        return this.httpClient.put<IAPIResposne< T>>(`${this.baseUrl}/${endPoint}`, body, {
            // headers: this.generateHeader(),
            params: httpParams,
        })
    }
    patch<T>(endPoint: string, body: any, httpParams: HttpParams = new HttpParams()) {
        return this.httpClient.patch<IAPIResposne< T>>(`${this.baseUrl}/${endPoint}`, body, {
            // headers: this.generateHeader(),
            params: httpParams,
        })
    }
    delete<T>(endPoint: string, httpParams: HttpParams = new HttpParams()) {
        return this.httpClient.delete<IAPIResposne< T>>(`${this.baseUrl}/${endPoint}`, {
            // headers: this.generateHeader(),
            params: httpParams,
        })
    }
}