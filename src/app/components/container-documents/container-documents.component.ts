import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { resDocuments } from '../../models/resDocuments';
import { Router } from '@angular/router';

import { environment } from '../../../../src/environments/environment';


@Component({
  selector: 'app-container-documents',
  templateUrl: './container-documents.component.html',
  styleUrls: ['./container-documents.component.css']
})
export class ContainerDocumentsComponent implements OnInit {

  documents: resDocuments[];
  urlDocument = "";
  areaName: string;
  areaId: number;
  host: string  = environment.api_url;
  show: boolean;

  constructor(private documentsService: DocumentsService, private router: Router) { }

  ngOnInit() {
      
    
    this.show  =false;
    this.documentsService.areaName.subscribe(message => {
      this.areaName = message;
    })

    this.documentsService.areaId.subscribe(areaId => {
      this.areaId = areaId;
      // // acá hago otra vez la petición
      // this.documents = [
      //   [
      //     {
      //       id: 1,
      //       codigo: 'a_485',
      //       titulo: 'a1',
      //       url: '0087-FO-DLLO Descripcion del WS de Certifactura.pdf',
      //       cabecera_id: 1,
      //       cabecera_titulo: 'Procedimientos'
      //     }
      //   ]
      // ]
      //acá también dejas en blanco el pdf viewer
      this.documentsService.fetchDocuments(this.areaId == -1 ? 'manuales': '').subscribe(documents => {
        var docs = documents;
        console.log('docssssssss11212',docs);
        this.documents = this.documentsService.responseRefactor(docs);
        console.log('docssssssss',this.documents);
      }, error => { 
        if(error.status == 401){ 
          localStorage.clear();
          this.router.navigate(['./login']);
         }
      })
      this.urlDocument = null;
      console.log("el area y mensaje" + this.areaId + " " + this.areaName);
    })

    //   console.log(this.areaId);
    //   this.documentsService.fetchDocuments(this.areaId == -1 ? 'manuales': '').subscribe(documents => {
    //     console.log('EPAAAAAAAAAAAA',this.documents);
    //   this.documents = this.documentsService.responseRefactor(documents);
    // })

  }

  setUrlPdf(urlPdf) {
    console.log('urlPdf',urlPdf);
    this.urlDocument = urlPdf;
  }

  downloadPdf(fileName, areaId){
    let url = this.host + 'api/documents/' + (areaId ? areaId : '0') + '/'  + fileName;
    window.open(url, "_blank");
  }

}
