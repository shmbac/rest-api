
const http = require('http');
const url = require('url');
const fs = require('fs');
const { createBrotliCompress } = require('zlib');

http.createServer((req, res) => {
    if (req.method === 'PUT' && req.url.includes('/user')) {
        const query = url.parse(req.url, true).query; 
         readFile((users) => {             //readfile is async function
            users.push(query.username);
            saveFile(users, () =>{
                res.write('user created');
                res.end();
            })
            console.log(users);           
        });                             
    } else if(req.method === 'GET' && req.url.includes('/user')) {
        readFile((users) => {
            res.write(JSON.stringify(users));
            res.end();
        });
    }
}).listen(4000);

function saveFile(content, cb) {
    fs.writeFile('./src/db.json', JSON.stringify(content), cb);
}

function readFile(cb) {
    fs.readFile('./src/db.json', {encoding: 'utf-8'}, (err, content) => {
        cb(JSON.parse(content));
    });
}

console.log('Listening on: http://localhost:4000');