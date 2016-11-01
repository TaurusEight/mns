

// Perform request for a resource
//-----------------------------------------------------------------------------
class ResourceRequest extends Ajax {

  // constructor
  constructor( application ) {
    super( './scripts/mns.app' );  // URL of service script
    this.application = application;  // store pointer to main object
  }  // end constructor


  // call parent class and perform the post
  perform_post( cid, mail ) {
    console.log( `CID: ${cid}, MAIL: ${mail}` )
    this.get( { 'cid': cid, 'mail': mail } );
  }  // end perform_post


  // Data has returned from the server
  ready( json ) {
    console.log( 'ResourceRequest.ready' );
    console.log( "JSON: ", json );
    this.application.ready( json[ 'payload' ] );
  }  // end ready


};  // end class ResourceRequest



// Main class of this script
//-----------------------------------------------------------------------------
class Application {

  // constructor
  constructor( ) {
    this.cid = window.location.hash.substring( 1 );  // which one
    console.log( `cid: ${this.cid}` );
    let information = new Information( this.cid );
    this.information = information.read();  // get information
    console.log( this.information );
    let request = new ResourceRequest( this );
    request.perform_post( this.cid, this.information[ 'mail' ] );
  }  // end constructor

  // Data has returned - display it in the textarea
  ready( resource ) {
    console.log( 'Application.resource' );
    let temp = null;
    Object.keys( this.information ).forEach( (key) => {
      temp = '88' + key + '88';
      console.log( `${temp} : ${key} : ${this.information[ key ]}` );
      resource = resource.replace( temp, this.information[ key ] );
    } );  // end for each key in information
    document.querySelector( 'article textarea' ).value = resource;
  }  // end ready

};  // end class Application


new Application();
