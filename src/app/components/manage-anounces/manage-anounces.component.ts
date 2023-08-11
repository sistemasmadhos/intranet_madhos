import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentsService } from '../../services/documents.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../src/environments/environment';

@Component({
  selector: 'app-manage-anounces',
  templateUrl: './manage-anounces.component.html',
  styleUrls: ['./manage-anounces.component.css']
})
export class ManageAnouncesComponent implements OnInit {

  anounces = [];
  fileToUpload: File = null;
  title: string = '';
  type: string = '';
  send = false;
  i: Number;
  id: Number;
  description: string = '';
  interval: Number = 4;
  host: string  = environment.api_url;

  constructor(private documentsService: DocumentsService , private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.documentsService.fetctAnuncios().subscribe(documents => {
      console.log('anoun', documents);
      this.anounces = documents;
      console.log(this.anounces);
    }, error => { 
      if(error.status == 401){ 
        localStorage.clear();
        this.router.navigate(['./login']);
       }
    })
  }

  handleFileInput(e, t: FileList) {
    // this.fileToUpload = files.item(0);
    // var ext = this.fileToUpload.name.split('.').pop();
    // ext = ext.toLowerCase();
  
    // if( ext == 'mp4'){
    //   this.type = 'vid';
    // } else if (ext=="jpg" || ext=="jpeg" || ext=="png") {
    //   this.type = 'img';
    // }  else {
    //   this.toastr.warning('La extensión del arhivo no es valida', 'Extensión Archivo');
    //   this.fileToUpload = null;
    //   return false;
    // }
    // event.target.value = "";
    var n = this;
    this.fileToUpload = t.item(0);
    var r = this.fileToUpload.name.split(".").pop();
    r = r.toLowerCase();
    var i = window.URL;
    if ("mp4" == r) {
        this.type = "video";
        var o = document.createElement("video");
        o.src = i.createObjectURL(this.fileToUpload), o.onloadedmetadata = function() {
            window.URL.revokeObjectURL(o.src);
            if(o.duration > 120){
              n.toastr.warning("La duración del video no puede ser mayor a 2 min.", "Duración Video") 
              n.fileToUpload = null;
            }
            n.interval = o.duration;
        };
    } else {
        if ("jpg" != r && "jpeg" != r && "png" != r) 
          return this.toastr.warning("La extensión del arhivo no es valida", "Extensión Archivo"), 
        this.fileToUpload = null;
        this.type = "img";
        var a = new Image();
        a.src = i.createObjectURL(this.fileToUpload)
        a.onload = function(e) {
          var t = (e as any).path[0].height;
          var r = (e as any).path[0].width;
          console.log("height", t);
            console.log("width", r);
          if(t > 700 || t < 500 || r > 1500 || r < 1150) {
            n.toastr.warning("El tamaño de la imagen no es valido, por favor lea las indicaciones", "Tamaño Imagen");
            n.fileToUpload = null;
          }
        };
    }
    e.target.value = "";
  }

  downloadPdf(fileName){
    let url = this.host + 'api/anounces/' + fileName;
    window.open(url, "_blank");
  }

  delete(id, i, title){
    this.id = id;
    this.i = i;
    this.title = title;
  }

  deleteAnounce(){
    if(this.id){
        this.documentsService.deleteAnounce({ 
          id:this.id
      }).subscribe(doc => { 
        this.anounces =  this.arrayRemove(this.anounces, this.i); 
        this.cerrar();
        return false;
      });
    }
  }

  arrayRemove(arr, i) { 
    // console.log(arr,arr);
    var ind= -1;
    var temp = arr.filter (function () {
      ind++;
      return ind != i ? true : false;
    });
    return temp;
  }


  crearAnuncio(){
    this.send = true;
    console.log('title', this.title)
    console.log('description', this.description)
    console.log({ title:this.title, description:this.description, file:this.fileToUpload, type: this.type, interval: this.interval })
    if(this.fileToUpload){ 
      this.documentsService.createAnounce({ title:this.title, description:this.description, file:this.fileToUpload, type: this.type, interval: this.interval }).subscribe(anounce => { 
        this.send = false;
        this.toastr.success('Creado', 'Se creo correctamente');
        document.getElementById('btn-close').click();
        this.anounces = this.anounces.concat(anounce);
        //Se soluciona asi ya que no se puede hacer el push en el original,
        // this.documents = this.documentsService.responseRefactor([doc].concat(this.documents[0])); 
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
          this.toastr.error('Error', error.error.message);
        else 
          this.toastr.error('Error', 'Se presento un error , intente de nuevo por favor');
         return false;
       });
     } else 
     this.toastr.info('Campos Requeridos', 'Por favor llene todos los campos');
  }

  cerrar(){
    this.title = '';
    this.description = '';
    this.interval = 4;
    this.type = '';
    this.send = false;
    this.fileToUpload = null;
  }

}
