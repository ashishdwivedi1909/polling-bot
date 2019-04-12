import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MastodonComponent } from "./mastodon/mastodon.component";

const routes: Routes = [
  { path: 'home', component: MastodonComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
