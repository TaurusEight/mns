

// Support reading and writing information for each edit form
//-----------------------------------------------------------------------------
class EditForm {

  // constructor
  constructor( ) {
    console.log( 'EditForm constructor' );
    this.cid = window.location.hash.substring( 1 )  // cid value
    this.handle = document.querySelector( '#content form' );
    this.handle.addEventListener( 'submit', this.submit.bind( this ) );
    this.fill_form();  // any data currently in the form?
    console.log( 'CID 01: ', this.cid );
  }  // end constructor



  // if data is present write it to the form
  fill_form( ) {
    let data = new Information( this.cid ).read();
    console.log( data );
    Object.keys( data ).forEach( (key) => {
      this.handle.elements[ key ].value = data[ key ];
    } );  // end for each key
  }  // end fill_form



  // perform actions when the submit button is pressed
  submit( event ) {
    console.log( 'EditForm submit' );
    let params = new Parameters( this.handle );
    event.preventDefault();
    new Information( this.cid ).write( params.all() );
    console.log( 'CID 02: ', this.cid );
    window.location.href = './complete.html#' + this.cid;
  }  // end submit


}  // end class EditForm


var E = new EditForm();
