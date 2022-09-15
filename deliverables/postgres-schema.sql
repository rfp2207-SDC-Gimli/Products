-- Database: products

-- DROP DATABASE IF EXISTS products;

CREATE DATABASE products
    WITH
    OWNER = 'FILL_IN'
    ENCODING = 'UTF8';



CREATE TABLE "product" (
  "id" int,
  "name" text,
  "slogan" text,
  "description" text,
  "category" text,
  "default_price" int
);

CREATE TABLE "related" (
  "id" int,
  "current_product_id" int,
  "related_product_id" int
);

CREATE TABLE "features" (
  "id" int,
  "product_id" int,
  "feature" text,
  "value" text
);

CREATE TABLE "photos" (
  "id" int,
  "styleId" int,
  "url" text,
  "thumbnail_id" text
);

CREATE TABLE "skus" (
  "id" int,
  "styleId" int,
  "size" text,
  "quantity" int
);

CREATE TABLE "styles" (
  "id" int,
  "productId" int,
  "name" text,
  "sale_price" text,
  "original_price" int,
  "default_style" bool
);

