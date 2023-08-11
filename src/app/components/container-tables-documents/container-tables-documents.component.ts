import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { resDocuments } from '../../models/resDocuments';

@Component({
  selector: 'app-container-tables-documents',
  templateUrl: './container-tables-documents.component.html',
  styleUrls: ['./container-tables-documents.component.css']
})
export class ContainerTablesDocumentsComponent implements OnInit {

  documents: resDocuments[][];

  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    /*this.documents = this.documentsService.fetchDocuments();
    console.log(this.documents);
    console.log("ahora si este");*/
  }

}
