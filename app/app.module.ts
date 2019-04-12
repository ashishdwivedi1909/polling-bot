import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MastodonComponent } from './mastodon/mastodon.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule
} from "@angular/material";
import { ChartsModalComponent } from './charts-modal/charts-modal.component';

const MAT_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
    AppComponent,
    MastodonComponent,
    ChartsModalComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    ...MAT_MODULES,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  entryComponents: [ ChartsModalComponent ]
})
export class AppModule { }
