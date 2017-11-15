# Project 4 - Angular
### it2810-webutvikling-h17-prosjekt-4-group-01
Welcome to our repository! To read further about our project in detail, 
please visit our[**wiki**](https://github.com/IT2810/it2810-webutvikling-h17-prosjekt-4-group-01/wiki/Project-4---Wiki)

**Authors of the projects:**
- Martin Lunde
- Christoffer Almankaas
- Petter Lohne
- Thayanan Tharmapalan
- Steffen Helgeland

### Table of contents:
1. [Running Website Locally](#Local)
2. [The Projects Tests]($Tests)

### Running Website Locally <a name="Local"></a>
To run the website locally, you have to make sure you have the following dependencies
installed on your computer.
```
- Node 8.5 or newer
- MongoDB
```
Then you can proceed to cloning the project, and installing the dependencies inside
the `/website` folder using `npm install`.

When all dependencies are finished downloading, your ready to run the initial script
to fill your database with data from the omdbApi. All you have to do, is to run 
the `omdb-transfer.js` script using `node`.

Finally to make the website available locally, you have to build a distribution and 
serve it. Proceed with the following commands inside the `/website` folder.  
- `ng build`
- `node server.js`

You may now visit your local website on `localhost:8084`.