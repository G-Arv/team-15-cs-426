-- Adminer 5.2.1 PostgreSQL 17.4 dump

DROP TABLE IF EXISTS "document";
CREATE TABLE "public"."document" (
    "doc_id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "name" character varying(50) NOT NULL,
    "parent_directory" character varying NOT NULL,
    CONSTRAINT "document_pkey" PRIMARY KEY ("doc_id")
) WITH (oids = false);


DROP TABLE IF EXISTS "profile";
CREATE TABLE "public"."profile" (
    "user_id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "firstname" character varying(50) NOT NULL,
    "lastname" character varying(50) NOT NULL,
    "email" character varying,
    "phone" character varying,
    "isfemale" boolean NOT NULL,
    "age" integer,
    "lastVisitDay" date,
    "lastVisitTime" timestamptz,
    "allergies" character varying[] NOT NULL,
    CONSTRAINT "profile_pkey" PRIMARY KEY ("user_id")
) WITH (oids = false);

INSERT INTO "profile" ("user_id", "firstname", "lastname", "email", "phone", "isfemale", "age", "lastVisitDay", "lastVisitTime", "allergies") VALUES
('06b270bc-2278-474b-9794-9335040bfc88',	'Nithya',	'Jayakumar',	'nithyajayakumar@gmail.com',	'8745635422',	'1',	32,	'2025-05-06',	'2025-05-06 04:53:43.684782+00',	'{"Peanut Allergy","Lactose Intolerant"}');

DROP TABLE IF EXISTS "schedule";
CREATE TABLE "public"."schedule" (
    "pill_id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "name" character varying(50) NOT NULL,
    "amount" integer NOT NULL,
    "foodandpills" smallint NOT NULL,
    "daterange" character varying(50)[] NOT NULL,
    "timerange" character varying(10)[] NOT NULL,
    "weekdays" character varying(10)[] NOT NULL,
    "type" character varying(10),
    "user_id" uuid NOT NULL,
    CONSTRAINT "schedule_pkey" PRIMARY KEY ("pill_id")
) WITH (oids = false);

INSERT INTO "schedule" ("pill_id", "name", "amount", "foodandpills", "daterange", "timerange", "weekdays", "type", "user_id") VALUES
('e92efd1f-fee9-4d0c-ad0a-a79384e8dc1f',	'Tylenol',	2,	2,	'{2025-02-25,2025-04-25}',	'{"9:00 AM"}',	'{Monday,Wednesday,Friday}',	'tablet',	'06b270bc-2278-474b-9794-9335040bfc88'),
('a17126a2-e81c-43ec-9994-2c3584f293f7',	'Aspirin',	1,	1,	'{2025-02-25,2025-04-25}',	'{"4:00 PM"}',	'{Monday,Tuesday,Wednesday,Thursday}',	'tablet',	'06b270bc-2278-474b-9794-9335040bfc88');

DROP TABLE IF EXISTS "vitals";
CREATE TABLE "public"."vitals" (
    "user_id" uuid NOT NULL,
    "bloodglucosebefore" integer,
    "bloodglucoseafter" integer,
    "temperature" numeric(4,2),
    "height" character varying(10),
    "weight" character varying(10),
    "bloodpressure" character varying(10),
    CONSTRAINT "vitals_pkey" PRIMARY KEY ("user_id")
) WITH (oids = false);


ALTER TABLE ONLY "public"."document" ADD CONSTRAINT "document_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profile(user_id) ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."schedule" ADD CONSTRAINT "schedule_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profile(user_id) ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."vitals" ADD CONSTRAINT "user_id" FOREIGN KEY (user_id) REFERENCES profile(user_id) ON DELETE CASCADE NOT DEFERRABLE;

-- 2025-05-07 16:44:46 UTC