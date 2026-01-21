import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

import { logger } from './common/utils/logger';

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
