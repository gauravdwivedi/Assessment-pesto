const { Router} = require('express');
const router = Router();
const todoController = require('../../../controllers/api/v1/todo_controller');
const { validateTodo} = require('../../../middleware/validateData');
const { authenticateJWT} = require('../../../middleware/authenticate');


router.use(authenticateJWT); //Apply JWT authentication middleware to all routes


router.use('/add',validateTodo,  todoController.add);
router.use('/edit/:id',validateTodo, todoController.edit);
router.use('/delete/:id',todoController.delete);
router.use('/list',todoController.list);

module.exports= router;