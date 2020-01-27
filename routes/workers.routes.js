const {Router} = require('express');
const Worker = require('../models/worker');

const router = Router();

router.get('/', async (req, res) => {
	try {
		const worker = await Worker.getAll();
		// res.status(200).json(worker);

		res.json(worker);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
	}
})

module.exports = router;