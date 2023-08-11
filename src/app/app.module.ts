import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderIndexComponent } from './components/header-index/header-index.component';
import { FullIndexComponent } from './components/full-index/full-index.component';
import { ContainerModuleComponent } from './components/container-module/container-module.component';
import { ContainerDocumentsComponent } from './components/container-documents/container-documents.component';
import { AppRoutingModule } from './app-routing.module';
import { ContainerTablesDocumentsComponent } from './components/container-tables-documents/container-tables-documents.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FullLoginComponent } from './components/full-login/full-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ManageDocumentsComponent } from './components/manage-documents/manage-documents.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ManageAnouncesComponent } from './components/manage-anounces/manage-anounces.component';
import { ManageLinksComponent } from './components/manage-links/manage-links.component';
import { LinksComponent } from './components/links/links.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderIndexComponent, 
    FullIndexComponent,
    ContainerModuleComponent,
    ContainerDocumentsComponent,
    ContainerTablesDocumentsComponent,
    PdfViewerComponent,
    FullLoginComponent,
    HeaderComponent,
    ManageDocumentsComponent,
    ManageAnouncesComponent,
    ManageLinksComponent,
    LinksComponent
  ],
  imports: [
    PdfViewerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
