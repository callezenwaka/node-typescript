import express from "express";
import controller from "../controllers/controller";
const router = express.Router();

/**
 * [START GET ALL]
 * Retrieve all
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
 * [START UPDATE BY ID]
 * Update item by id.
 */
router.get('/:id', controller.updateOne);
// [END UPDATE BY ID]

/**
 * [START GET BY ID]
 * Retrieve item by id.
 */
router.get('/:id', controller.getOne);
// [END GET BY ID]

/**
 * [START DELETE BY ID]
 * Remove item by id.
 */
router.delete('/:id', controller.deleteOne);
// [END DELETE BY ID]

export default router;