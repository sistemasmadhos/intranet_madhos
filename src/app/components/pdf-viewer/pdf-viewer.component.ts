import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { environment } from '../../../../src/environments/environment';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {

  @Input() urlDocument;
  @Input() areaId;
  pag = 1;
  zom = 1.0;
  show = false;
  API_ENDPOINT: string = 'documents';
  pdfSrc = "";

  constructor() { }

  host = environment.api_url;

  goToLink(pdf: string) {
    let url = this.host  + 'api/' + this.API_ENDPOINT + '/' + this.areaId + '/'  + pdf;
    // let url = this.API_ENDPOINT + "/" + pdf;
    console.log(url);
    window.open(url, "_blank");
  }

  abrirPdf = (pdf) => {
    console.log("el link ");
    console.log(this.host  + 'api/'+ this.API_ENDPOINT + '/' + (this.areaId == -1 ? '0': this.areaId) + '/'  + pdf);
    console.log('this.areaId', this.areaId);
    this.pdfSrc = this.host  + 'api/'+ this.API_ENDPOINT + '/' + (this.areaId == -1 ? '0': this.areaId) + '/'  + pdf;;
  }

  aumentar() {
    this.pag++;
  }

  disminuir() {
    this.pag--;
  }

  zoom1() {
    this.zom = this.zom - 0.25;
  }

  zoom2() {
    this.zom = this.zom + 0.25;
  }

  ngOnInit() {
    //this.abrirPdf(this.urlDocument); 
    //this.urlDocument.subscribe( urlDocument )
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');
    this.abrirPdf(this.urlDocument); 
  }

}
