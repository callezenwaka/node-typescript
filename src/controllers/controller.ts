import express, { Request, Response, NextFunction } from "express";
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
const firestore = getFirestore();

/**
 * [START GET ALL]
 * @param {object} req Cloud Function request context.
 * @param {object} res Cloud Function response context.
 * @param {object} next Cloud Function next context.
 * @return {object} json items
 * Retrieve items
 */
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = await firestore.collection('users').get();
		// @ts-ignore
		const employees = [];
		data.forEach(doc => {
			let employee = {...doc.data(), id: doc.id};
			employees.push(employee);
		});
		res.render('index', {
			// @ts-ignore
			employees,
		});
	} catch (err) {
		console.log(err);
		res.json(err);
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
 export const postOne = async (req: Request, res: Response) => {
	try {
		await firestore.collection('users').add({
			name: req.body.name,
			email: req.body.email,
			department: req.body.department
		})
		const data = await firestore.collection('users').get();
		// @ts-ignore
		const employees = [];
		data.forEach(doc => {
			let employee = {...doc.data(), id: doc.id};
			employees.push(employee);
		});
		
		res.render('index', {
			// @ts-ignore
			employees,
		});
	} catch (err) {
		console.log(err);
		res.json(err);
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
 export const updateOne = (req: Request, res: Response) => {
	try {
		console.log(`hello ${req.body.name}!`);
		res.send(`hello ${req.body.name}!`);
	} catch (err) {
		console.log(err);
		res.json(err);
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
 export const getOne = (req: Request, res: Response) => {
	try {
		console.log(`hello ${req.body.name}!`);
		res.send(`hello ${req.body.name}!`);
	} catch (err) {
		console.log(err);
		res.json(err);
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
 export const deleteOne = (req: Request, res: Response) => {
	try {
		console.log(`hello ${req.body.name}!`);
		res.send(`hello ${req.body.name}!`);
	} catch (err) {
		console.log(err);
		res.json(err);
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