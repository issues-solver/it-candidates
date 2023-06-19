export default {
    jwtSecret: process.env.JWT_SECRET || 'jwt_candidates_it_secret_key',
    databaseUserName: process.env.DATABASE_USER_NAME || 'sergejprovalinskij',
    databasePassword: process.env.DATABASE_PASSWORD || 'qwerty597',
    databaseName: process.env.DATABASE_NAME || 'it-candidates-database',
};
