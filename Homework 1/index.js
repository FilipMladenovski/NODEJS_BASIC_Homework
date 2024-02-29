import path from 'path';
import fs from 'fs/promises';

const homeworkTextPath = path.join(import.meta.dirname, 'homework.txt');

const homeworkApp = async () => {
	try {
		await fs.writeFile(homeworkTextPath, 'Homework 01 in Basic Node. ');
		await fs.appendFile(homeworkTextPath, 'FINISHED!');
		const text = await fs.readFile(homeworkTextPath, { encoding: 'utf-8' });
		console.log(text);
	} catch (err) {
		console.log('Something went wrong', err);
	} finally {
		console.log('The homework is finished!!!');
	}
};

homeworkApp();