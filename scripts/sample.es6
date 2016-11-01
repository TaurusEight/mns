
"use strict";


//-----------------------------------------------------------------------------
class Ajax {

  constructor( app ) {
    console.log( 'Ajax.constructor' );
    this.application = app;  // save pointer to parent object
    this.handle = new XMLHttpRequest()
    this.handle.onreadystatechange = this.change.bind( this );
  }  // end constructor

  change( ) {
    console.log( 'Ajax.change' );
    let status = this.handle.status;
    if ( this.handle.readyState == 4 && status == 200 ) { this.parse(); }
    else { console.log( `STATE: ${this.handle.readyState} - STATUS: ${status}` ); };
  }  // end change

  parse() {
    console.log( 'Ajax.parse' );
    let json = JSON.parse( this.handle.responseText );
    console.log( json );
    this.application.ready( json[ 'payload' ] );
  }  // end parse

  post( url, form ) {
    console.log( 'Ajax.post' );
    let data = new FormData( form );
    data.append( "one", 'blast' );
    console.log( data.keys() );
    this.handle.open( "POST", url, true );
    this.handle.send( data ); //new FormData( form ) );
  }  // end post

  get( url, form ) {
    console.log( 'Ajax.get' );
    let data = new FormData( form );
    data.append( "one", "animal" );
    this.handle.open( "GET", url, true );
    this.handle.send( data );
  }  // end get

};  // end Ajax



//-----------------------------------------------------------------------------
class Application {

  // constructor
  constructor( ) {
    console.log( 'Application.constructor' );
    this.form = document.querySelector( '#content form' );
    this.form.addEventListener( 'submit', this.submit.bind( this ) )
  }  // end constructor

  // submit the form
  submit( event ) {
    console.log( 'Application.submit' );
    event.preventDefault();  // stop default submission
    new Ajax( this ).get( './sample.app', this.form );
  }  // end submit

  // update innerhtml with payload
  ready( payload ) {
    console.log( 'Application.ready' );
    let div = document.querySelector( '#output' );
    div.innerHTML = payload;
  }  // end ready


};  // end class Application


new Application();  // start the application
