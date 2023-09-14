import 'reflect-metadata';

import TYPES from './types';

const container = new Container();

// AWS Resources
container.bind<DynamoDBClient>(TYPES.DynamoDBClient).toConstantValue(dynamoDb);

export default container;
