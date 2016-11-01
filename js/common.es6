
"use strict";  // true support of JS6


// Read and Write data to local storage
//-----------------------------------------------------------------------------
class Information {

  // constructor
  constructor( cid ) {
    this.key = "mns";  // main key of this object
    this.cid = cid  // which resource
  }  // constructor

  // Read all values
  read() {
    let raw = JSON.parse( localStorage.getItem( this.key ) )
    if ( raw == null ) { return {}; };
    return raw[ this.cid ]
  }  // end read

  // Write all values
  write( parameters ) {
    let data = JSON.parse( localStorage.getItem( this.key ) )
    if ( data == null ) { data = {}; };
    data[ this.cid ] = parameters;
    console.log( data );
    localStorage.setItem( this.key, JSON.stringify( data ) );
  }  // end write


};  // end class Information



// Handle the parameters from a form
//-----------------------------------------------------------------------------
class Parameters {

  // Constructor
  constructor( form ) {
    console.log( 'Parameters constructor' );
    let data = new FormData( form );
    this.handle = {};  // place holder
    for ( let key of data.keys() ) { this.handle[ key ] = data.get( key ); };
  }  // end constructors


  // Convert into json
  all() { return this.handle; }  // end json

};  // end Parameters



//-----------------------------------------------------------------------------
// Base Ajax request class
//-----------------------------------------------------------------------------
class Ajax {


  // Constructor
  constructor( url ) {
    this.handle = new XMLHttpRequest()
    this.handle.onreadystatechange = this.state_change.bind( this );
    this.url = url
  }  // end constructor


  // Check for state change
  state_change() {
    let status = this.handle.status;
    if ( this.handle.readyState == 4 && status == 200 ) {
      this.parse();
      //this.ready( this.parse() );  // format the data as JSON
    }  // end if ready
  }  // end state_change


  // Parse the returned data as JSON data
  parse( ) {
    let json = JSON.parse( this.handle.responseText );
    if ( json[ 'success' ] == true ) { this.ready( json ); }
    else { this.failure( json ); };
  }  // end parse


  // Override in child class
  ready( json ) {
    console.log( 'Ajax.ready' );
    alert( this.handle.responseText );
  }  // end ready


  // The Ajax called returned, the script ran but there was an error in it
  failure( json ) {
    console.log( 'something bad happened' );
    alert( this.handle.responseText );
  }  // end failure

  // Issue a 'GET' request
  get( data ) {
    this.handle.open( "GET", this.url, true );
    this.handle.send( data );
  }  // end open


  // Issue a 'POST' request
  post( data ) {
    this.handle.open( "POST", this.url, true );
    this.handle.send( data );
  }  // end POST


};  // end clas Ajax
