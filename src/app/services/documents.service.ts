import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resAreas } from '../models/resAreas';
import { resDocuments } from '../models/resDocuments';
import { resCabeceras } from '../models/resCabeceras';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http:HttpClient) { }

  private areaNameSource = new BehaviorSubject<string>("'default message'");
  private areaIdSource = new BehaviorSubject<number>(1);
  private cabeceraIdSource = new BehaviorSubject<number>(-1);
  private headers = null;
  
  areaName = this.areaNameSource.asObservable();
  areaId = this.areaIdSource.asObservable();
  cabeceraId = this.cabeceraIdSource.asObservable();
  host = environment.api_url;

  responseDB = [
    {
      id: 1,
      codigo: 'a_485',
      titulo: 'a1',
      url: '0087-FO-DLLO Descripcion del WS de Certifactura.pdf',
      cabecera_id: 1,
      cabecera_titulo: 'Procedimientos'
    },
    {
      id: 2,
      codigo: 'b_963',
      titulo: 'b1',
      url: '0087-FO-DLLO Descripcion del WS de Certifactura.pdf',
      cabecera_id: 2,
      cabecera_titulo: 'Formatos'
    },
    {
      id: 3,
      codigo: 'a_945',
      titulo: 'a2',
      url: '0087-FO-DLLO Descripcion del WS de Certifactura.pdf',
      cabecera_id: 1,
      cabecera_titulo: 'Procedimientos'
    },
    {
      id: 4,
      codigo: 'a_222',
      titulo: 'a3',
      url: '0087-FO-DLLO Descripcion del WS de Certifactura.pdf',
      cabecera_id: 1,
      cabecera_titulo: 'Procedimientos'
    },
    {
      id: 5,
      codigo: 'b_315',
      titulo: 'b2',
      url: '0087-FO-DLLO Descripcion del WS de Certifactura.pdf',
      cabecera_id: 2,
      cabecera_titulo: 'Formatos'
    },
    {
      id: 6,
      codigo: 'c_133',
      titulo: 'c1',
      url: '0087-FO-DLLO Descripcion del WS de Certifactura.pdf',
      cabecera_id: 3,
      cabecera_titulo: 'Plan de procesos'
    },
    {
      id: 7,
      codigo: 'b_878',
      titulo: 'b3',
      url: '0087-FO-DLLO Descripcion del WS de Certifactura.pdf',
      cabecera_id: 2,
      cabecera_titulo: 'Formatos'
    }
  ];
  responseAreas: resAreas[] = [
    {
      id: 1,
      nombre: "Bod. Osteosíntesis",
    },
    {
      id: 2,
      nombre: "Insumos",
    },
    {
      id: 3,
      nombre: "Importaciones",
    },
    {
      id: 4,
      nombre: "Control Interno",
    },
    {
      id: 5,
      nombre: "Calidad",
    },
    {
      id: 6,
      nombre: "Técnica",
    },
    {
      id: 7,
      nombre: "Sistemas",
    }
  ];
  urlApiAreas = this.host  + "api/areas";
  urlApiLinks = this.host  + "api/links";
  urlApiCabeceras = this.host  + "api/head/";
  urlApiDocument = this.host  + "api/documents";
  urlApiDocuments = this.host  + "api/documents/docs";
  urlApiGuides = this.host  + "api/documents/manuals";
  urlApiAnouncesIn = this.host  + "api/anounces/inside";
  urlApiAnouncesOut = this.host  + "api/anounces/outside";
  urlApiAnounces = this.host  + "api/anounces";

  changeAreaName(areaName: string){
    this.areaNameSource.next(areaName);
  }

  changeAreaId(areaId:number){
    this.areaIdSource.next(areaId);
    this.cabeceraIdSource.next(null);
  }

  changeCabeceraId(cabeceraId:number){
    this.cabeceraIdSource.next(cabeceraId);
  }

  fetchAreas(): Observable<resAreas[]> {
    this.headers = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get<resAreas[]>(this.urlApiAreas,  { headers: this.headers });
  }

  fetctCabeceras(): Observable<resCabeceras[]> {
    this.headers = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get<resCabeceras[]>(this.urlApiCabeceras ,  { headers: this.headers });
  }

  fetctAnunciosC(): Observable<any[]> {
    this.headers = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get<any[]>(localStorage.getItem('token') ? this.urlApiAnounces : this.urlApiAnounces ,  { headers: this.headers });
  }

  fetctAnuncios(): Observable<any[]> {
    this.headers = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get<any[]>(this.urlApiAnounces ,  { headers: this.headers });
  }

  fetctLinks(): Observable<any[]> {
    this.headers = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get<any[]>(this.urlApiLinks ,  { headers: this.headers });
  }

  crearDocumentos(data:any): Observable<any> {
    const formData: FormData = new FormData();
    this.headers = new HttpHeaders({Accept:'application/json', 'Access-Control-Allow-Origin': '*','Authorization':'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data'});
    if(data.file)
      formData.append('file', data.file, data.codigo + '.pdf');
    formData.append('areaId', this.areaIdSource.value + '');
    formData.append('cabeceraId', this.cabeceraIdSource.value + '');
    formData.append('nombre', data.nombre.trim());
    formData.append('type', data.type);
    formData.append('codigo', data.codigo.trim());
    console.log('data', data);
    console.log('formData', formData);
    if(data['archivo'])
      formData.append('archivo', data.archivo);
    if(data['cabecera'])
      formData.append('cabecera', data.cabecera);
    if(data.documentoId)
      return this.http.put(this.urlApiDocument + '/' + data.documentoId, formData);
    else
      return this.http.post(this.urlApiDocument, formData);
  }


  createAnounce(data:any): Observable<any> {
    const formData: FormData = new FormData();
    console.log('Service Data', data);
    this.headers = new HttpHeaders({Accept:'application/json', 'Access-Control-Allow-Origin': '*','Authorization':'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data'});
    if(data.file)
      formData.append('file', data.file);
    formData.append('title', data.title.trim());
    formData.append('description', data.description.trim());
    formData.append('interval', data.interval);
    formData.append('type', data.type);
    console.log('data', data);
    console.log('formData', formData);
    // if(data['archivo'])
    //   formData.append('archivo', data.archivo);
    // if(data['cabecera'])
    //   formData.append('cabecera', data.cabecera);
    // if(data.documentoId)
    //   return this.http.put(this.urlApiDocument + '/' + data.documentoId, formData);
    // else
    return this.http.post(this.urlApiAnounces, formData);
  }

  createLink(data:any): Observable<any> {
    const formData: FormData = new FormData();
    console.log('Service Data', data);
    this.headers = new HttpHeaders({Accept:'application/json', 'Access-Control-Allow-Origin': '*','Authorization':'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data'});
    if(data.file)
      formData.append('file', data.file);
    formData.append('title', data.title.trim());
    formData.append('description', data.description.trim());
    formData.append('onlyIn', data.onlyIn);
    formData.append('type', data.type);
    console.log('data', data);
    console.log('formData', formData);
    return this.http.post(this.urlApiAnounces, formData);
  }

  deleteLink(data:any): Observable<any> {
    this.headers = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    console.log(this.headers);
    return this.http.delete(this.urlApiLinks + '/' + data.id, { headers: this.headers });
  }

  deleteAnounce(data:any): Observable<any> {
    this.headers = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    console.log(this.headers);
    return this.http.delete(this.urlApiAnounces + '/' + data.id, { headers: this.headers });
  }

  eliminarDocumentos(data:any): Observable<any> {
    this.headers = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    console.log(this.headers);
    return this.http.delete(this.urlApiDocument + '/' + data.documentoId, { headers: this.headers });
  }

  fetchDocuments(type): Observable<resDocuments[]> {
    this.headers = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    console.log('areaId' , this.areaId);
    console.log('areaIdSource' , this.areaIdSource);
    console.log('cabeceraIdSource' , this.cabeceraIdSource);
    console.log('type' , type);
    return this.http.get<resDocuments[]>((type == 'manuales' ? this.urlApiGuides : this.urlApiDocuments) + '/' +  this.areaIdSource.value + (this.cabeceraIdSource.value ? '?cabeceraId=' + this.cabeceraIdSource.value : ''), { headers: this.headers });
    //return this.responseRefactor(this.responseDB);
  }

  responseRefactor(response) {
    console.log('responseRefactor',response);
    let arrayCategories = new Array();
    response.forEach(item => {
      console.log('item',item);
      if(item){
        if(arrayCategories[item.cabecera_id])
          arrayCategories[item.cabecera_id].push(item);
        else
          arrayCategories[item.cabecera_id] = [item];
      }
    });
    let newArrayCategories: resDocuments[] = arrayCategories.filter (function () {return true}); //notmaliza los index del array ["2","1","7"] -> [0,1,2]
    return newArrayCategories;
  }
  // deleteRepeated(arrayCategories: resDocuments[]): resDocuments[] {
  //   return Array.from<resDocuments[][]>(new Set(arrayCategories.map(JSON.stringify)), JSON.parse);
  // }

}


/* *************** JSON TESTS ***************** */

/*

areas
https://api.myjson.com/bins/mb95w

[{
		"id": 1,
		"nombre": "Bod. Osteosíntesis"
	},
	{
		"id": 2,
		"nombre": "Insumos"
	},
	{
		"id": 3,
		"nombre": "Importaciones"
	},
	{
		"id": 4,
		"nombre": "Control Interno"
	},
	{
		"id": 5,
		"nombre": "Calidad"
	},
	{
		"id": 6,
		"nombre": "Técnica"
	},
	{
		"id": 7,
		"nombre": "Sistemas"
	}
]

documentos
https://api.myjson.com/bins/8dplw

[{
		"id": 1,
		"codigo": "a_485",
		"titulo": "a1",
		"url": "0087-FO-DLLO Descripcion del WS de Certifactura.pdf",
		"cabecera_id": 1,
		"cabecera_titulo": "Procedimientos"
	},
	{
		"id": 2,
		"codigo": "b_963",
		"titulo": "b1",
		"url": "0087-FO-DLLO Descripcion del WS de Certifactura.pdf",
		"cabecera_id": 2,
		"cabecera_titulo": "Formatos"
	},
	{
		"id": 3,
		"codigo": "a_945",
		"titulo": "a2",
		"url": "0087-FO-DLLO Descripcion del WS de Certifactura.pdf",
		"cabecera_id": 1,
		"cabecera_titulo": "Procedimientos"
	},
	{
		"id": 4,
		"codigo": "a_222",
		"titulo": "a3",
		"url": "0087-FO-DLLO Descripcion del WS de Certifactura.pdf",
		"cabecera_id": 1,
		"cabecera_titulo": "Procedimientos"
	},
	{
		"id": 5,
		"codigo": "b_315",
		"titulo": "b2",
		"url": "'0087-FO-DLLO Descripcion del WS de Certifactura.pdf",
		"cabecera_id": 2,
		"cabecera_titulo": "Formatos"
	},
	{
		"id": 6,
		"codigo": "c_133",
		"titulo": "c1",
		"url": "'0087-FO-DLLO Descripcion del WS de Certifactura.pdf",
		"cabecera_id": 3,
		"cabecera_titulo": "Plan de procesos"
	},
	{
		"id": 7,
		"codigo": "b_878",
		"titulo": "b3",
		"url": "0087-FO-DLLO Descripcion del WS de Certifactura.pdf",
		"cabecera_id": 2,
		"cabecera_titulo": "Formatos"
	}
]

*/