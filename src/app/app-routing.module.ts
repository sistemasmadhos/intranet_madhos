import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { ContainerDocumentsComponent } from './components/container-documents/container-documents.component';
import { FullIndexComponent } from './components/full-index/full-index.component';
import { FullLoginComponent } from './components/full-login/full-login.component';
import { ManageDocumentsComponent } from './components/manage-documents/manage-documents.component';
import { ManageAnouncesComponent } from './components/manage-anounces/manage-anounces.component';
import { ManageLinksComponent } from './components/manage-links/manage-links.component';
import { LinksComponent } from './components/links/links.component';
import { AuthGuard } from './auth/auth.guard';
import { RouteGuardService } from './services/route-guard.service'

const routes: Routes = [
  { path: '', component: FullIndexComponent, canActivate: [AuthGuard]},
  { path: 'index', component: FullIndexComponent, canActivate: [AuthGuard]},
  { path: 'links', component: LinksComponent, canActivate: [AuthGuard]},
  { path: 'documentos', component: ContainerDocumentsComponent, canActivate: [AuthGuard]},
  { path: 'admin-documentos/:type', component: ManageDocumentsComponent, canActivate: [AuthGuard, RouteGuardService]},
  { path: 'admin-anounces', component: ManageAnouncesComponent, canActivate: [AuthGuard, RouteGuardService]},
  { path: 'admin-links', component: ManageLinksComponent, canActivate: [AuthGuard, RouteGuardService]},
  { path: 'login', component: FullLoginComponent }
];

const routerOptions: ExtraOptions = {
  useHash: true,
  anchorScrolling: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
