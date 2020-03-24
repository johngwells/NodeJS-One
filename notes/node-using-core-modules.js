const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers); // 
  // process.exit(); hard exit on the event loop
  
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>')
  res.write('<head><title>My first page</title></head>')
  res.write('<body><h1>Hello World</h1></body>')
  res.write('</html>')
  res.end();
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});