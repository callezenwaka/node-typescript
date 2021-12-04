import { Request, Response, NextFunction } from "express";
import { getFirestore } from 'firebase-admin/firestore';
import { nextTick } from "process";
const firestore = getFirestore();

interface Employee {
	name: string;
	email: string;
	department: string;
	created_at?: number,
	updated_at?: number,
	id?: string;
}

/**
 * [START GET ALL]
 * @param {object} req Cloud Function request context.
 * @param {object} res Cloud Function response context.
 * @param {object} next Cloud Function next context.
 * @return {object} json items
 * Retrieve items
 */
export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<object> => {
	try {
		const data = await firestore.collection('users').get();
		if (data.empty) {
			return res.json([]);
		}
		let employees: Employee[] = [];
		data.forEach(doc => {
			let employee: Employee = {
				name: doc.data().name,
				email: doc.data().email,
				department: doc.data().department,
				created_at: doc.data().created_at,
        updated_at: doc.data().updated_at,
				id: doc.id
			}
			employees.push(employee);
		});
		return res.json(employees);
	} catch (error) {
		// next(error);
		return res.json(error);
	}
}
// [END GET ALL]

/**
 * [START POST]
 * @param {object} req Cloud Function request context.
 * @param {object} res Cloud Function response context.
 * @param {object} next Cloud Function next context.
 * @return {object} json item
 * Add item
 */
 export const postOne = async (req: Request, res: Response, next: NextFunction): Promise<object> => {
	try {
		let employee: Employee = {
			name: req.body.name,
			email: req.body.email,
			department: req.body.department,
			created_at: Date.now(),
			updated_at: Date.now(),
		}
		const data = await firestore.collection('users').add(employee);
		return res.json(data.id);
	} catch (error) {
		// next(error);
		return res.json(error);
	}
}
// [END POST]

/**
 * [START PUT]
 * @param {object} req Cloud Function request context.
 * @param {object} res Cloud Function response context.
 * @param {object} next Cloud Function next context.
 * @return {object} json item
 * Update item
 */
 export const updateOne = async (req: Request, res: Response, next: NextFunction): Promise<object> => {
	try {
		let employee: Employee = {
			name: req.body.name,
			email: req.body.email,
			department: req.body.department,
			updated_at: Date.now(),
		}
		await firestore.collection('users').doc(req.params.id).update(employee);
		return res.json(`Update successful`);
	} catch (error) {
		// next(error);
		return res.json(error);
	}
}
// [END PUT]

/**
 * [START GET]
 * @param {object} req Cloud Function request context.
 * @param {object} res Cloud Function response context.
 * @param {object} next Cloud Function next context.
 * @return {object} json item
 * Retrieve item
 */
 export const getOne = async (req: Request, res: Response, next: NextFunction): Promise<object> => {
	try {
		const data = await firestore.collection('users').doc(req.params.id).get();
		if (!data.exists) {
			return res.json({});
		} 
		let employee: Employee = {
			name: data.data()!.name,
			email: data.data()!.email,
			department: data.data()!.department,
			created_at: data.data()!.created_at,
			updated_at: data.data()!.updated_at,
			id: data.id
		}
		return res.json(employee);
	} catch (error) {
		// next(error);
		return res.json(error);
	}
}
// [END GET]

/**
 * [START DELETE]
 * @param {object} req Cloud Function request context.
 * @param {object} res Cloud Function response context.
 * @param {object} next Cloud Function next context.
 * @return {object} json item
 * Remove item
 */
 export const deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<object> => {
	try {
		await firestore.collection('users').doc(req.params.id).delete();
		return res.json(`Delete successful`);
	} catch (error) {
		// next(error);
		return res.json(error);
	}
}
// [END DELETE]

export default {
	getAll, 
	postOne,
	updateOne,
	getOne,
	deleteOne
}