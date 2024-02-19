-- database
CREATE DATABSE yelp;

CREATE TABLE restaurants (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range INT NOT NULL CHECK (price_range >= 1 and price_range <= 5)
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants (id),
    name VARCHAR(255) NOT NULL,
    review TEXT,
    rating INT NOT NULL CHECK (rating > 0 and rating <= 5)
);

insert into reviews (restaurant_id, name, review, rating)
values (11, 'badon', 'the foods are the best ever!', 5);

-- queries
SELECT restaurants.id, restaurants.name, location, price_range, reviews.name, review, rating FROM restaurants
JOIN reviews ON restaurants.id = restaurant_id;

SELECT * FROM restaurants INNER JOIN reviews ON restaurants.id = reviews.restaurant_id;

select * from restaurants
left join (select restaurant_id, count(*) as reviews, round(avg(rating), 1) as avg_rating from reviews group by restaurant_id) reviews
on restaurants.id = reviews.restaurant_id;

select * from restaurants
left join (select restaurant_id, count(*) as reviews, round(avg(rating), 1) as avg_rating from reviews group by restaurant_id) reviews
on restaurants.id = reviews.restaurant_id where id = 2;

-- queries with aggregate function
-- getting the average rating
SELECT AVG(rating) FROM reviews;
SELECT TRUNC(AVG(rating), 2) FROM reviews;
SELECT TRUNC(AVG(rating), 2) as average_rating FROM reviews;
-- can do the same with round(), prefer to use ROUND
SELECT ROUND(AVG(rating), 2) as average_rating FROM reviews;

-- counting how many reviews are there
SELECT COUNT(*) FROM reviews;
SELECT COUNT(*) FROM reviews WHERE restaurant_id = 2;

-- finding the max value
SELECT MAX(rating) FROM reviews WHERE restaurant_id = 2;
-- finding the minimun value
SELECT MIN(rating) FROM reviews WHERE restaurant_id = 2;

-- using group by to count how many restaurant in the same location
SELECT location, COUNT(location) FROM restaurants GROUP BY location;
-- using group by in counting the review for a restaurant
SELECT restaurant_id, COUNT(restaurant_id) FROM reviews GROUP BY restaurant_id;
