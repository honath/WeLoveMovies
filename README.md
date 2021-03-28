# Project WeLoveMovies

## Overview
Backend project that includes a custom written API connecting routes to a database using Knex.

## File Structure
- src/
    - app.js
    - server.js
    - src/db/
        - connection.js (migration config file)
        - src/db/migrations
            - contains all migration files
        - src/db/seeds
            - contains all seed files
    - src/errors/
        - asyncErrorBoundary.js (error function wrapper for async functions)
        - errorHandler.js (takes in dynamic error object, outputs error, includes a default)
        - methodNotAllowed.js (route handler attachment, returns error for unavailable route method)
        - notFound.js (Generic 404 not found error handler)
    - src/movies/
        - movies.controller.js (API endpoints)
        - movies.router.js (path router)
        - movies.service.js (DB caller function for API endpoints)
    - src/reviews
        - reviews.controller.js (API endpoints)
        - reviews.router.js (path router)
        - reviews.service.js (DB caller function for API endpoints)
    - src/theaters
        - theaters.controller.js (API endpoints)
        - theaters.router.js (path router)
        - theaters.service.js (DB caller function for API endpoints)
    - src/utils
        - map-properties.js (formats object key/value pairs into desired data)
- docs/
    - docs/routes/
        - contains all route requirements
    - docs/tables/
        - contains all table requirements