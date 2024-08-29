const express = require('express');
const router = express.Router();
const db = require('../../db/conn');

router.route('/')
    .get(async function (req, res, next) {
        try {
            const query = 'SELECT * FROM public.folder WHERE index = 0 ORDER BY id'
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

            const queryCheckParent = 'SELECT "isParent", index FROM public.folder WHERE id = $1'
            const resultCheckParent = await db.pool.query(queryCheckParent, [parent])
            const result = resultCheckParent.rows[0]

            const query = 'INSERT INTO public.folder(name, parent, index) VALUES($1, $2, $3)'
            await db.pool.query(query, [name, parent, result.index + 1])

            if (!result.isParent) {
                const queryUpdateParent = 'UPDATE public.folder SET "isParent" = TRUE, updated_at = now() WHERE id = $1'
                await db.pool.query(queryUpdateParent, [parent])
            }
            res.status(201).send({
                status: 'success',
                message: 'Folder created'
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

router.route('/:id')
    .get(async function (req, res, next) {
        try {
            const { id } = req.params
            const query = 'SELECT * FROM public.folder WHERE parent = $1 ORDER BY id'
            const result = await db.pool.query(query, [id])
            res.status(200).send({
                status: 'success',
                data: result.rows
            });
        } catch (error) {
            next(error);
        }
    })

router.route('/child/:id')
    .get(async function (req, res, next) {
        try {
            const { id } = req.params
            const query = `(SELECT *, 'folder' as type FROM public.folder WHERE parent = $1)
            UNION ALL
            (SELECT id, name, false AS isParent, parent, 0 as index, created_at, updated_at, 'file' AS type FROM public.file WHERE parent = $1)`
            const result = await db.pool.query(query, [id])
            res.status(200).send({
                status: 'success',
                data: result.rows
            });
        } catch (error) {
            next(error);
        }
    })

module.exports = router;