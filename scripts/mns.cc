

#include <string>  // std::string
#include <sstream>  // std::stringstream
#include <fstream>  // std::ifstream
#include <iostream>  // Input/Output

#include <boost/property_tree/json_parser.hpp>
#include <boost/property_tree/ptree.hpp>

//-----------------------------------------------------------------------------
using namespace std;  // shorthand
using boost::property_tree::ptree;


struct result_t {

  bool success;
  string payload;

};  // end result_t


std::string to_json( result_t const& o ) {
  ptree out;
  out.put( "success", o.success );
  out.put( "payload", o.payload );
  ostringstream oss;
  boost::property_tree::write_json( oss, out );
  return oss.str();
};  // end to_json


void to_json();

// Entry into application
//-----------------------------------------------------------------------------
int main( int, char*[] ) {


  ifstream ifs( "/var/www/html/mns/content/tiger.html" );
  stringstream raw;
  raw << ifs.rdbuf();  // read the file

  result_t result { true, string( raw.str() ) };

  cout << "Content-type: text/html"
       << endl << endl
       << to_json( result )
       << endl;

  return 0;

};  // end main
