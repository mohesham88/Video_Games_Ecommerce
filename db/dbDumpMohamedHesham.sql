--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-07-14 21:42:56

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16432)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 862 (class 1247 OID 16540)
-- Name: Users_gender_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Users_gender_enum" AS ENUM (
    'male',
    'female'
);


ALTER TYPE public."Users_gender_enum" OWNER TO postgres;

--
-- TOC entry 859 (class 1247 OID 16533)
-- Name: Users_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Users_role_enum" AS ENUM (
    'admin',
    'customer',
    'vendor'
);


ALTER TYPE public."Users_role_enum" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16562)
-- Name: Categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Categories" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "parentCategoryId" uuid
);


ALTER TABLE public."Categories" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16582)
-- Name: Products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Products" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    price numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    stock integer NOT NULL,
    images text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    slug character varying NOT NULL,
    "addedById" uuid,
    "categoryId" uuid
);


ALTER TABLE public."Products" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16617)
-- Name: Reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reviews" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    rating numeric NOT NULL,
    comment character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid,
    "productId" uuid
);


ALTER TABLE public."Reviews" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16545)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(30) NOT NULL,
    email character varying NOT NULL,
    role public."Users_role_enum" DEFAULT 'customer'::public."Users_role_enum" NOT NULL,
    gender public."Users_gender_enum" NOT NULL,
    address character varying NOT NULL,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "upadatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16479)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16478)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 216
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 4721 (class 2604 OID 16482)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 4905 (class 0 OID 16562)
-- Dependencies: 219
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Categories" (id, title, description, "createdAt", "updatedAt", "parentCategoryId") FROM stdin;
4ffff09c-1619-43d2-87bc-ad1a6b5db549	Action	emphasize physical challenges that require hand-eye coordination and motor skill to overcome. They center around the player, who is in control of most of the action.	2024-02-16 21:27:08.113858	2024-02-16 21:27:08.113858	\N
b3b5b57c-b1de-4308-b175-a87115e1e364	Platform	Platform games (or platformers) have gameplay primarily centered around jumping and climbing to navigate the player's environment. They may have enemies or obstacles to avoid and fight or may just be pure jumping puzzles. Generally the playable characters in a platform game are able to jump many times their own height and the player is offered some control over their movement in midair as well as the height and distance of their jumps.[2] Settings tend to be vertically exaggerated with much uneven terrain that the player can leap up to or fall off of.	2024-02-16 21:27:08.113858	2024-02-16 21:27:08.113858	\N
92bd5d3c-0786-441c-8d70-0df310970139	Shooter	In shooter games (or simply shooters), players use ranged weapons to participate in the action, which takes place at a distance.[2] Most shooters involve violent gameplay; lethal weaponry is used to damage opponents. However, some shooters, such as Splatoon, have non-violent objectives.	2024-02-16 21:27:08.113858	2024-02-16 21:27:08.113858	\N
3a35dfba-eaf2-4744-8a26-e6e794db5c2b	Survival	Survival games start the player off with minimal resources, in a hostile, open-world environment, and require them to collect resources, craft tools, weapons, and shelter, in order to survive as long as possible. Many are set in procedurally-generated environments, and are open-ended with no set goals. They may overlap with the survival horror genre, in which the player must survive within a supernatural setting, such as a zombie apocalypse.	2024-02-16 21:27:08.113858	2024-02-16 21:27:08.113858	\N
1bfbafd4-ec50-4331-bcc8-c626838fb0cf	Survival horror	Survival horror games focus on fear and attempt to scare the player via traditional horror fiction elements such as atmospherics, death, the undead, blood and gore. One crucial gameplay element in many of these games is the low quantity of ammunition, or number of breakable melee weapons.	2024-02-16 21:29:26.162006	2024-02-16 21:29:26.162006	3a35dfba-eaf2-4744-8a26-e6e794db5c2b
fa55b370-6d8e-4f25-81a3-aee9736457b6	AAA	AAA Games are made by big companies EA, Rockstar, Ubisoft, insomia, ...etc 	2024-02-16 22:06:05.104924	2024-02-16 22:06:05.104924	1bfbafd4-ec50-4331-bcc8-c626838fb0cf
c4438a45-5cc2-4479-bf71-722803276069	AAA	AAA Games are made by big companies EA, Rockstar, Ubisoft, insomia, ...etc 	2024-03-12 17:18:42.022374	2024-03-12 17:18:42.022374	1bfbafd4-ec50-4331-bcc8-c626838fb0cf
df9a76e8-d103-4f4d-a83a-6463de9be759	hack and slash	Ahack and slash 	2024-03-16 00:55:05.198547	2024-03-16 00:55:05.198547	\N
\.


--
-- TOC entry 4906 (class 0 OID 16582)
-- Dependencies: 220
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Products" (id, name, description, price, stock, images, "createdAt", "updatedAt", slug, "addedById", "categoryId") FROM stdin;
85c8953f-7c29-4227-9de7-7f37d4c92702	Gta V	Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the seventh main entry in the Grand Theft Auto series, following 2008's Grand Theft Auto IV, and the fifteenth instalment overall. Set within the fictional state of San Andreas, based on Southern California, the single-player story follows three protagonists—retired bank robber Michael De Santa (Ned Luke), street gangster Franklin Clinton (Shawn Fonteno), and drug dealer and gunrunner Trevor Philips (Steven Ogg), and their attempts to commit heists while under pressure from a corrupt government agency and powerful criminals. Players freely roam San Andreas's open world countryside and fictional city of Los Santos, based on Los Angeles.	59.99	33	https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png,https://c4.wallpaperflare.com/wallpaper/262/188/865/new-grand-theft-auto-v-grand-theft-auto-5-game-wallpaper-preview.jpg	2024-03-22 00:44:57.807438	2024-03-22 17:25:52.231374	Gta-V	763c37e6-1e42-4efd-908b-afe68165b483	c4438a45-5cc2-4479-bf71-722803276069
30687d90-c916-4ef6-99a7-0bf5731803a4	Ghost of Tsushima	Ghost of Tsushima is a 2020 action-adventure game developed by Sucker Punch Productions and published by Sony Interactive Entertainment. The player controls Jin Sakai, a samurai on a quest to protect Tsushima Island during the first Mongol invasion of Japan. Jin must choose between following the warrior code to fight honorably, or using practical but dishonorable methods of repelling the Mongols with minimal casualties. The game features a large open world which can be explored either on foot or on horseback. When facing enemies, the player can choose to engage in a direct confrontation using Jin's katana or to become a legendary warrior known as 'the Ghost' by using stealth tactics to assassinate opponents.	29.99	54	https://upload.wikimedia.org/wikipedia/en/b/b6/Ghost_of_Tsushima.jpg	2024-03-22 19:22:43.122446	2024-03-22 19:22:43.122446	Ghost-of-Tsushima	763c37e6-1e42-4efd-908b-afe68165b483	c4438a45-5cc2-4479-bf71-722803276069
7a2c5cbc-2f9d-4508-a52b-a6a978413cdb	Watch Dogs	Watch Dogs (stylized as WATCH_DOGS) is an action-adventure video game franchise published by Ubisoft, and developed primarily by its Montreal and Toronto studios using the Disrupt game engine.[1] The series' eponymous first title was released in 2014, and it has featured three games in total, the most recent being 2020's Watch Dogs: Legion. Several tie-in books and comic book miniseries set in the games' universe have also been published.	9.99	58	https://en.wikipedia.org/wiki/Watch_Dogs#/media/File:Watch_Dogs.svg	2024-03-22 20:01:45.599522	2024-03-22 20:05:59.123785	Watch-Dogs	763c37e6-1e42-4efd-908b-afe68165b483	c4438a45-5cc2-4479-bf71-722803276069
\.


--
-- TOC entry 4907 (class 0 OID 16617)
-- Dependencies: 221
-- Data for Name: Reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reviews" (id, rating, comment, "createdAt", "updatedAt", "userId", "productId") FROM stdin;
cdd95130-9afa-4cdb-8f7a-bc0d9dbca012	3.5	Great Game!! wish it come to PC 😥	2024-04-12 19:37:55.837455	2024-04-12 19:37:55.837455	763c37e6-1e42-4efd-908b-afe68165b483	30687d90-c916-4ef6-99a7-0bf5731803a4
cd96e0c3-4d9c-44cd-937a-a39729b50390	3.5	Great story , gameplay but the online is trash	2024-04-27 01:02:18.929867	2024-04-27 01:02:18.929867	73487816-f3af-462f-bf52-980f909201f5	7a2c5cbc-2f9d-4508-a52b-a6a978413cdb
81681fee-94a2-40ad-947d-c1a4afa783e1	1.5	Graphics doesn't look like the TRAILER 🤬🤬🤬	2024-04-27 01:28:11.290727	2024-04-27 01:28:11.290727	763c37e6-1e42-4efd-908b-afe68165b483	7a2c5cbc-2f9d-4508-a52b-a6a978413cdb
\.


--
-- TOC entry 4904 (class 0 OID 16545)
-- Dependencies: 218
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, username, email, role, gender, address, password, "createdAt", "upadatedAt") FROM stdin;
000a6e77-7c53-4a43-b35c-0ed570d20804	Mohamed Hesham	moheshamfathi@gmail.com	customer	male	123 giza	zx87865134POS#	2024-02-10 19:47:58.292264	2024-02-10 19:47:58.292264
f9b1e953-e066-4843-ad2c-e9439ba20ba2	Tharwat Fahmy	tharwat@gmail.com	customer	male	123 alex, Egypt	zx8786OS#TYPO	2024-02-10 19:47:58.292264	2024-02-10 19:47:58.292264
292c6af4-782f-4683-b314-2676bc5a8cbd	Dr. Mekawy	mekawy12@gmail.com	customer	male	123 sharm el sheikh, Egypt	$2b$10$DRCYHNKEhIwsql3BlImvVuKkbRuPcRYMPUQKpV8r1BIJ/HZqf/Oi.	2024-02-10 20:22:37.752547	2024-02-10 20:22:37.752547
363b9a2b-85a0-4bcd-bbf9-10299c8484bc	Ahmed Mousa	a.mousa@gmail.com	customer	male	4 Faisal, Giza, Egypt	$2b$10$56xbVl6bwKItzBhka2ejsO7vkO1XTscrkw127fU3R6xd/lktS/kZS	2024-02-10 20:25:35.461577	2024-02-10 20:25:35.461577
763c37e6-1e42-4efd-908b-afe68165b483	admin	admin@admin.com	admin	male	45 admin street	$2b$10$/ahB5wykWMfRU.DHOztWxOuVd4mThdThPoAVqMBlKy4TjnEI5NUze	2024-02-12 19:23:30.672933	2024-02-12 19:23:30.672933
cf54d14d-4855-43c6-8021-c12bdec73e28	hh	hh@admin.com	customer	male	hh	$2b$10$CJaoNyBsHcg0njxgwLga1utRfs9wYNiKan3/b1upuFiRzyVA/EB6e	2024-02-12 19:44:50.963522	2024-02-12 19:44:50.963522
12e80db2-05fa-44f5-aa90-f71dc4ddda61	sisi	cc@admin.com	customer	female	cc	$2b$10$KnzhnyWWiZ6oFQeQ8ZcZLuigpaTqceS0pjauWVvMH0JG8yZfOZWyy	2024-02-12 20:03:47.520724	2024-02-12 20:03:47.520724
73487816-f3af-462f-bf52-980f909201f5	mousa	stewie@gmail.com	customer	male	المزاريطة	$2b$10$V7fZG/rfGC1s4UJQlVkLcedEApoQQOajoup0kwRoyH9vZonC6MN8u	2024-02-10 20:28:16.76769	2024-03-01 17:35:07.593051
\.


--
-- TOC entry 4903 (class 0 OID 16479)
-- Dependencies: 217
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
3	1707059586721	Initial1707059586721
4	1707586302465	Initial1707586302465
5	1707587249567	Initial1707587249567
6	1707937237016	Category1707937237016
7	1708113867417	PrimarygeneratedUUIDForCategoryColumn1708113867417
8	1710584909910	AddTBLProduct1710584909910
9	1710585487925	AddTBLProductFixRelation1710585487925
10	1710585625651	AddTBLProductFixRelation21710585625651
11	1711062024325	MakingSlugsForProductsUnique1711062024325
12	1712432938621	ReviewTable1712432938621
\.


--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 216
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 12, true);


--
-- TOC entry 4739 (class 2606 OID 16553)
-- Name: Users PK_16d4f7d636df336db11d87413e3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY (id);


--
-- TOC entry 4747 (class 2606 OID 16592)
-- Name: Products PK_36a07cc432789830e7fb7b58a83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "PK_36a07cc432789830e7fb7b58a83" PRIMARY KEY (id);


--
-- TOC entry 4745 (class 2606 OID 16570)
-- Name: Categories PK_537b5c00afe7427c4fc9434cd59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "PK_537b5c00afe7427c4fc9434cd59" PRIMARY KEY (id);


--
-- TOC entry 4753 (class 2606 OID 16626)
-- Name: Reviews PK_5ae106da7bc18dc3731e48a8a94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "PK_5ae106da7bc18dc3731e48a8a94" PRIMARY KEY (id);


--
-- TOC entry 4737 (class 2606 OID 16486)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 4749 (class 2606 OID 16614)
-- Name: Products UQ_26c9336d231c4e90419a5954bd7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "UQ_26c9336d231c4e90419a5954bd7" UNIQUE (name);


--
-- TOC entry 4741 (class 2606 OID 16559)
-- Name: Users UQ_3c3ab3f49a87e6ddb607f3c4945; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE (email);


--
-- TOC entry 4751 (class 2606 OID 16616)
-- Name: Products UQ_e67e2afd334d79fdb9de48e68b7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "UQ_e67e2afd334d79fdb9de48e68b7" UNIQUE (slug);


--
-- TOC entry 4743 (class 2606 OID 16557)
-- Name: Users UQ_ffc81a3b97dcbf8e320d5106c0d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d" UNIQUE (username);


--
-- TOC entry 4757 (class 2606 OID 16627)
-- Name: Reviews FK_03697b4cf2383ce44b9b0ac3fda; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "FK_03697b4cf2383ce44b9b0ac3fda" FOREIGN KEY ("userId") REFERENCES public."Users"(id);


--
-- TOC entry 4754 (class 2606 OID 16577)
-- Name: Categories FK_30f0c3e083681f76d7dfa8f4878; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "FK_30f0c3e083681f76d7dfa8f4878" FOREIGN KEY ("parentCategoryId") REFERENCES public."Categories"(id);


--
-- TOC entry 4755 (class 2606 OID 16598)
-- Name: Products FK_38d2d5625490d24508e9c605340; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "FK_38d2d5625490d24508e9c605340" FOREIGN KEY ("addedById") REFERENCES public."Users"(id);


--
-- TOC entry 4756 (class 2606 OID 16608)
-- Name: Products FK_85fdee89fa67fcdce66863def29; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "FK_85fdee89fa67fcdce66863def29" FOREIGN KEY ("categoryId") REFERENCES public."Categories"(id);


--
-- TOC entry 4758 (class 2606 OID 16632)
-- Name: Reviews FK_8679c285008ea7ff66b93edc0ac; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "FK_8679c285008ea7ff66b93edc0ac" FOREIGN KEY ("productId") REFERENCES public."Products"(id);


-- Completed on 2024-07-14 21:42:57

--
-- PostgreSQL database dump complete
--

