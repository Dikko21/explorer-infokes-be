const express = require('express');
const router = express.Router();
const db = require('../../db/conn');

router.route('/')
    .get(async function (req, res, next) {
        try {
            const query = 'SELECT * FROM public.file'
            const result = await db.pool.query(query)
            res.status(200).send({
                status: 'success',
                data: result.rows
            });
        } catch (error) {
            next(error);
        }
    })
    .post(async function (req, res, next) {
        try {
            const { name, parent } = req.body
            const query = 'INSERT INTO public.file(name, parent) VALUES($1, $2)'
            await db.pool.query(query, [name, parent])
            res.status(201).send({
                status: 'success',
                message: 'File created'
            });
        } catch (error) {
            next(error);
        }
    })
    .put(async function (req, res, next) {
        try {
            res.status(200).send({
                status: 'success'
            });
        } catch (error) {
            next(error);
        }
    })
    .delete(async function (req, res, next) {
        try {
            res.status(200).send({
                status: 'success'
            });
        } catch (error) {
            next(error);
        }
    })

module.exports = router;