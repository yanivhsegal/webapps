import logger from '../components/logger';
import {seed} from 'mongoose-plugin-seed';

export default mongoose => {
    mongoose.Promise = Promise;

    if (process.env.SEED_DB === 'true') {
        return seed(mongoose)
            .then(() => {
                logger.info('Finished populating database.');
            })
            .catch(err => {
                logger.error({err}, 'Unable to populate database');

                throw err;
            });
    }

    return Promise.resolve();
};
