import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    // Check DB connection status here if we had one
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

export const healthRouter = router;
