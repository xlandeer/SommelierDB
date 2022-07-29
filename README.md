# Whiskey Database #
Description: Whiskey Database running on a Apach2 Server with:
  * UI Features:
    * Adding of Whiskeys
    * Searching of Whiskeys by sereval attributes
    * Deleting of Whiskeys
  * Set up Database(see db directory for sql file)
  
TypeScript partly learned from:
"Programming TypeScript by Boris Cherny (O’Reilly). Copyright 2019 Boris Cherny, 978-1-492-03765-1.”
  
# Requirements #
* Apache2 WebServer and MySQLServer(e.g. [**XAMPP**](https://www.apachefriends.org/de/index.html))
* Node.js - npm

## Setup ##
```sh
$ npm install --save-dev typescript tslint @types/node @types/jquery
```
## Compile ##
```sh
$ /node_modules/.bin/tsc -p tsconfig.json
```
&rarr; load onto a Webserver and locate to 'Server-IP':80/WhiskeyDatabase/build

