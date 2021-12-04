import express from "express";
import controller from "../controllers";
const router = express.Router();

/**
 * [START GET ALL]
 * Retrieve items
 */
router.get('/', controller.getAll);
// [END GET ALL]

/**
 * [START POST]
 * Add item
 */
 router.post('/', controller.postOne);
 // [END POST]

 /**
 * [START UPDATE]
 * Update item.
 */
router.put('/:id', controller.updateOne);
// [END UPDATE]

/**
 * [START GET BY ID]
 * Retrieve item.
 */
router.get('/:id', controller.getOne);
// [END GET BY ID]

/**
 * [START DELETE]
 * Remove item.
 */
router.delete('/:id', controller.deleteOne);
// [END DELETE]

export default router;