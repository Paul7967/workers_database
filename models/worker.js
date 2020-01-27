const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

class Worker {
	constructor(name, surname, age, gender, position, married) {
		this.name = name,
		this.surname = surname, 
		this.age = age,
		this.gender = gender,
		this.position = position,
		this.married = married,
		this.id = uuid()
	}

	toJSON() {
		return {
			name: this.name,
			surname: this.surname,
			age: this.age,
			gender: this.gender,
			position: this.position,
			married: this.married,
			id: this.id
		}
	}

	async save() {
		const workers = await Worker.getAll();
		workers.push(this.toJSON());

		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, '..', 'database', 'workers.json'),
				JSON.stringify(workers),
				(err) => {
					if (err) {
						reject(err)
					} else {
						resolve()
					}
				}
			)
		})

		console.log('Worker: ', workers);
	}

	static getAll() {
		return new Promise((resolve, reject) => {
			fs.readFile(
				path.join(__dirname, '..', 'database', 'workers.json'),
				'utf-8',
				(err, content) => {
					if (err) {
						reject(err)
					} else {
						resolve(JSON.parse(content))
					}

				}
			)
		})
		
	}
}

module.exports = Worker