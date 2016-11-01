#!/usr/bin/env python3

import json


def read_html( ) :
  F = open( '../content/tiger.html', 'r' )
  html = F.read()
  F.close()
  return html


parameters = { 'success': True, 'payload': 'what ever' }

print( "Content-type: text/html\n\n" )
parameters[ 'payload' ] = read_html()
print( json.dumps( parameters ) )
