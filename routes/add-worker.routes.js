const {Router} = require('express');
const path = require('path');
const Worker = require('../models/worker');
const {check, validationResult} = require('express-validator');

const router = Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname,'..', 'views','add-worker.html'));
});

router.post(
	'/', 
	[        // добавляем middleware для валидации
		check('name', 'name length should be from 2 to 20 characters.').isLength({ min: 2, max: 20 }),
		check('surname', 'surname length should be from 2 to 20 characters.').isLength({ min: 2, max: 20 })
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Not valid data"
				})
			}
			
			const worker = new Worker(
				req.body.name,
				req.body.surname,
				req.body.age,
				req.body.gender,
				req.body.position,
				req.body.married
			);

			await worker.save();

			res.status(201).json({ message: 'Worker added' });
			// return res.redirect('/workers');
		} catch (error) {
			res.status(500).json({message: "Something is wrong. Try it again."})
		}
		
});

module.exports = router;

