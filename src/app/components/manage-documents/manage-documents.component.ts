import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DocumentsService } from '../../services/documents.service';
import { Router, ActivatedRoute } from '@angular/router';
import { resDocuments } from '../../models/resDocuments';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../src/environments/environment';

@Component({
  selector: 'app-manage-documents',
  templateUrl: './manage-documents.component.html',
  styleUrls: ['./manage-documents.component.css']
})
export class ManageDocumentsComponent implements OnInit {
  areasList = [];
  cabeceraList = [];
  documents: resDocuments[];
  areaItem = {};
  type = '';
  MODULO = '';
  i: Number;
  send = false;
  cabeceraItem = {};
  fileToUpload: File = null;
  areasSettings = {};
  cabeceraSettings = {};
  codigo: string = '';
  nombre: string = '';
  host: string  = environment.api_url;
  documento: resDocuments = null;
  documentoId: number = 0;
  

  constructor(
    private documentsService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    console.log('111111122');
    console.log('1111111333');
    this.route.paramMap.subscribe(params => {
      var type = params.get('type');
      this.type = type;
      this.MODULO = 'Documento'
      if(type == 'manuales'){
        this.MODULO = 'Manual'
        this.documentsService.fetchDocuments(type).subscribe(documents => {
          this.documents = this.documentsService.responseRefactor(documents);
        }, error => { 
          if(error.status == 401){ 
            localStorage.clear();
            this.router.navigate(['./login']);
           }
        })
      } else{
        this.documents =  this.documentsService.responseRefactor([]);
      }
    })
     
    this.documentsService.fetchAreas().subscribe(areas => { this.areasList = areas; });
     this.documentsService.fetctCabeceras().subscribe(cabeceras => { this.cabeceraList = cabeceras; }, error => { 
      if(error.status == 401){ 
        localStorage.clear();
        this.router.navigate(['./login']);
       }
     });
    this.areasSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'nombre',
      allowSearchFilter: true,
      closeDropDownOnSelection :true
    };

    this.cabeceraSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'titulo',
      allowSearchFilter: true,
      closeDropDownOnSelection :true
    };
  }

  seleccionArea(item: any) {
    console.log('item', item);
    this.cabeceraItem = {};
    this.documents= [];
    this.documentsService.changeAreaId(item.id);  
  }

  seleccionCabecera(item: any) {
    this.documentsService.changeCabeceraId(item.id);  
    this.documentsService.fetchDocuments('').subscribe(documents => {
      this.documents = this.documentsService.responseRefactor(documents);
      console.log(this.documents);
    }, error => { 
      if(error.status == 401){ 
        localStorage.clear();
        this.router.navigate(['./login']);
       }
    })
  }

  handleFileInput(event, files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(event);
    console.log('this.fileToUpload' ,this.fileToUpload);
    event.target.value = "";
  }

  downloadPdf(fileName, areaId){
    let url = this.host + 'api/documents/' + (areaId ? areaId : '0') + '/'   + fileName;
    window.open(url, "_blank");
  }

  crearDocumento(){
    this.send = true;
    console.log('codigo', this.codigo)
    console.log('nombre', this.nombre)
    let tmp = {
      "id":37,
      "codigo":"ost",
      "titulo":"44",
      "url":"ost.pdf",
      "area_id":1,
      "cabecera_id":1,
      "cabecera_titulo":"PLAN DE PROCESOS"
    };
    let hell = this.documents[0];
    console.log()
    if(this.codigo && this.nombre && ((this.areasList.length && this.cabeceraList.length) || this.type == 'manuales') && this.fileToUpload){ 
      this.documentsService.crearDocumentos({ codigo:this.codigo, nombre:this.nombre, file:this.fileToUpload, cabecera: this.cabeceraList[0].titulo }).subscribe(doc => { 
        this.send = false;
        this.toastr.success('Creado', 'Se creo correctamente');
        document.getElementById('btn-close').click();
        //Se soluciona asi ya que no se puede hacer el push en el original,
        this.documents = this.documentsService.responseRefactor([doc].concat(this.documents[0])); 
        this.cerrar();
        return false;
      }, error => { 
        this.send = false;
        console.log('error', error);
        if(error.status == 401){ 
          localStorage.clear();
          this.router.navigate(['./login']);
         }
        if(error.error)
          alert(error.error.message);
        else 
          this.toastr.error('Error', 'Se presento un error , intente de nuevo por favor');
         return false;
       });
     } else 
     this.toastr.info('Campos Requeridos', 'Por favor llene todos los campos');
  }
  setDocumentoId(documento: resDocuments){
    this.documentoId = documento.id;
    this.codigo = documento.codigo;
    this.nombre = documento.titulo;
    this.documento = documento;
    this.send = false;
    console.log('this.documento', this.documento);
  }

  delete(id, i, codigo){
    this.documentoId = id;
    this.i = i;
    this.codigo = codigo;
  }

  editarDocumento(){
    if(this.codigo && this.nombre && this.areasList.length && this.cabeceraList.length && this.documentoId){
      this.documentsService.crearDocumentos({ 
        codigo:this.codigo,
        nombre:this.nombre,
        file:this.fileToUpload ,
        documentoId:this.documentoId,
        archivo: this.documento.url,
        type: this.type
      }).subscribe(cabeceras => { 
        alert('Se edito correctamente el Documento');
        this.documento.codigo = this.codigo;
        this.documento.titulo = this.nombre;
        this.documento.url = this.codigo + '.pdf';
        document.getElementById('btn-close').click();
        return false;
      }, error => { 
        if(error.status == 401){ 
          localStorage.clear();
          this.router.navigate(['./login']);
        }
        if(error.error)
          alert(error.error.message);
        else 
          alert('Se presento un error , intente de nuevo por favor');
        return false;
      });
    } else 
      alert('Por favor llene todos los campos');
  }

  deleteDocument(){
    console.log('delete', this.i);
    if(this.documentoId){
        this.documentsService.eliminarDocumentos({ 
        documentoId:this.documentoId
      }).subscribe(doc => { 
        this.documents[0] =  this.arrayRemove(this.documents[0], this.i);  
        this.cerrar();
        return false;
      });
    }
  }

  arrayRemove(arr, i) { 
    console.log(arr,arr);
    var ind= -1;
    var temp = arr.filter (function () {
      ind++;
      return ind != i ? true : false;
    });
    return temp;
  }

  proof(){
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
    
  


  cerrar(){
    this.documentoId = 0;
    this.i = -1;
    this.codigo = '';
    this.nombre = '';
    this.documentoId = null;
    this.fileToUpload = null;
  }

  onSelectAll(items: any) {
    console.log(items);
  }

}
