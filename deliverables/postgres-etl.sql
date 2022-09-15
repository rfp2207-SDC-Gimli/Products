
-- TO MIGRATE DATA, CREATE THE DATABASE AND THEN IN THE POSTGRESQL COMMAND LINE RUN:

\copy product from 'product.csv' delimiter ',' csv header;

\copy related from 'related.csv' delimiter ',' csv header;

\copy skus from 'skus.csv' delimiter ',' csv header;

\copy styles from 'styles.csv' delimiter ',' csv header;

\copy features from 'features.csv' delimiter ',' csv header;

\copy photos from 'photos.csv' delimiter ',' csv header;