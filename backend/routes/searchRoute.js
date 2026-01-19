import express from 'express';
import { globalSearch } from '../controllers/searchController.js';
import { notAllowed } from '../utils/notAllowed.js';

const router = express.Router();

router.route('/search')
    .get(globalSearch)
    .all(notAllowed)




export default router;