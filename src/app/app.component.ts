import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { DecoupledEditor } from '@ckeditor/ckeditor5-build-decoupled-document';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import ExportWord from '@ckeditor/ckeditor5-export-word/src/exportword';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as htmlDocx from 'html-docx-js/dist/html-docx'; 
import { saveAs } from 'file-saver';



// declare const saveDocument: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'editor-txt';
  htmlContent = '';

  // public Editor = DecoupledEditor;

  // config = { 
  //   exportWord: {
  //           fileName: 'my-file.docx',
  //           converterOptions: {
  //               format: 'A4', // Default value, you don't need to specify it explicitly for A4.
  //               margin_top: '20mm',
  //               margin_bottom: '20mm',
  //               margin_right: '12mm',
  //               margin_left: '12mm'
  //           }
  //       },
  //          toolbar: [
  //         'exportWord',
  //     ],
  // }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log(this.Editor);
    
    // this.Editor.create( document.querySelector( '#editor' ), {
    //   cloudServices: {
    //       tokenUrl: 'https://example.com/cs-token-endpoint',
    //   },
    //   plugins: [ ExportWord ],
    //   toolbar: [
    //       'exportWord', '|',
    //   ],
    //   exportWord: {
    //       fileName: 'my-file.docx',
    //       converterOptions: {
    //           format: 'A4', // Default value, you don't need to specify it explicitly for A4.
    //           margin_top: '20mm',
    //           margin_bottom: '20mm',
    //           margin_right: '12mm',
    //           margin_left: '12mm'
    //       }
    //   }
    // } )
    // .then( (res) => console.log(res) )
    // .catch( (err) => console.log(err) );
  }

  export() {

    let htmlDocument = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title>';
    htmlDocument = htmlDocument + '</head><body>' + this.htmlContent + '</body></html>';
    const converted  = htmlDocx.asBlob(htmlDocument);
    saveAs(converted,'title', '.docx')
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement(),
    );

    // editor.plugins = ['exportWord'];
    // console.log(editor.plugins);
    

    //  editor.create( document.querySelector( '#editor' ), {
    //   cloudServices: {
    //       tokenUrl: 'https://example.com/cs-token-endpoint',
    //   },
    //   plugins: [ ExportWord ],
    //   toolbar: [
    //       'exportWord', '|',
    //   ],
    //   exportWord: {
    //       fileName: 'my-file.docx',
    //       converterOptions: {
    //           format: 'A4', // Default value, you don't need to specify it explicitly for A4.
    //           margin_top: '20mm',
    //           margin_bottom: '20mm',
    //           margin_right: '12mm',
    //           margin_left: '12mm'
    //       }
    //   }
    // } )
    // .then( (res) => console.log(res) )
    // .catch( (err) => console.log(err) );

    console.log(editor);
    
    
  }


  
}
