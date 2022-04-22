import { Router } from "express";
import { scrape } from '../controllers/scrape.controller.js';

const router = Router();

router.get('/scraping', scrape);

export default router;