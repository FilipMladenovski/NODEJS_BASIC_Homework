import http from 'http';
import fs from 'fs';

const server = http.createServer((request, response) => {
    const URL = request.url;
    if (URL === '/') {
        response.setHeader('Content-Type', 'text/html');
        response.write(`<h1> Welcome to my homework number 2 </h1>`);
        response.end();
    }
    if (URL === '/student') {
        response.setHeader('Content-Type', 'text/html');
        response.write(`<ul> 
            <li>Student Name: Filip</li>
            <li>Student lastname : Mladenovski</li>
            <li>Academy : Qinshift Academy</li>
            <li>Subject : NodeJS Basic</li> 
        </ul>`);
        response.end();
    }
    if (URL === '/add_student') {
        response.setHeader('Content-Type', 'text/html');
        response.write(`
			<form action="/all_students" method="POST">
				<input type="text" name="studentName" />
				<button type="submit">Add Student</button>
			</form>
		`);
        response.end();
    }
    if (URL === '/all_students') {
        response.setHeader('Content-Type', 'text/html');
        const chunks = [];
        request.on('data', chunk => {
            chunks.push(chunk);
        });
        request.on('end', () => {
            const parsedChunks = Buffer.concat(chunks).toString();
            const studentName = parsedChunks.split('=')[1].replace(/\+/g, ' ');
            fs.appendFile('students.txt', `${studentName}\n`, err => {
                if (err) {
                    console.error('Error writing to file:', err);
                    response.write('<p>Error writing to file</p>');
                } else {
                    console.log('The student name is:', studentName);
                    response.write(`<p>The student name is: ${studentName}</p>`);
                }
                response.end();
            });
        });
    }
});

server.listen(3000);
