import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatBoxComponent } from './Chat/chat-box/chat-box.component';

const authenticationModule = () => import('./Authentication/authentication.module').then(x => x.AuthenticationModule);
const routes: Routes = [
  { path: 'chat-box', component: ChatBoxComponent },
  { path: '', loadChildren: authenticationModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
