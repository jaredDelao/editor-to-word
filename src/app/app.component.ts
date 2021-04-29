import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { DecoupledEditor } from '@ckeditor/ckeditor5-build-decoupled-document';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import ExportWord from '@ckeditor/ckeditor5-export-word/src/exportword';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as htmlDocx from 'html-docx-js/dist/html-docx';
import * as mammoth from 'mammoth';
import { saveAs } from 'file-saver';


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
    height: '80vh',
    // minHeight: '5rem',
    placeholder: '',
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

  constructor() {
  }

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

  converter(inputElement) {
    console.log(inputElement);
    
      var files = inputElement.srcElement.files || [];
      if (!files.length) return;
      var file = files[0];

      console.log(file);
      
  
      let reader = new FileReader();
      reader.onloadend = (event) => {
        let arrayBuffer = reader.result;
        // debugger
  
        mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then((resultObject) => {
          // result1.innerHTML = resultObject.value
          console.log(resultObject.value)
          this.htmlContent = resultObject.value;
        })
  
        // mammoth.extractRawText({arrayBuffer: arrayBuffer}).then(function (resultObject) {
        //   result2.innerHTML = resultObject.value
        //   console.log(resultObject.value)
        // })
  
        // mammoth.convertToMarkdown({arrayBuffer: arrayBuffer}).then(function (resultObject) {
        //   result3.innerHTML = resultObject.value
        //   console.log(resultObject.value)
        // })
      };
      reader.readAsArrayBuffer(file);
  }


  

  // mammoth.convertToHtml({path: "src/assets/title.docx"})
  //   .then(function(result){
      
  //     var html = result.value; // The generated HTML 
  //     console.log(html);
  //     var messages = result.messages; // Any messages, such as warnings during conversion 

  //   })
  //   .done();
}
