const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>Enter Message</title></head>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>')
    res.write('</html>')
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    // allows to listen to events
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

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