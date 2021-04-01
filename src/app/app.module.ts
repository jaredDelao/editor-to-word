import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { DocumentEditorModule } from '@txtextcontrol/tx-ng-document-editor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // CKEditorModule
    AngularEditorModule
    // DocumentEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
