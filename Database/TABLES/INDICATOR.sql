DO $$
BEGIN
	RAISE INFO 'CREATE of INDICATOR';

	CREATE TABLE FIND.INDICATOR
	(
		INDICATOR_ID SERIAL,
		DATA_MODIFIED_TS TIMESTAMP NOT NULL,
		CATEGORY_ID INT DEFAULT 0,
		INDICATOR_NAME VARCHAR(200) NOT NULL,
		INDICATOR_URL VARCHAR(520) NOT NULL,
		DIRECT_INDICATOR_SOURCE VARCHAR(200) NOT NULL,
		ORIGINAL_INDICATOR_SOURCE VARCHAR(200) NULL,
		INDICATOR_DEF TEXT,
		CONSTRAINT INDICATOR_PK PRIMARY KEY ( INDICATOR_ID )
	)
	WITH (
		OIDS=FALSE
	);
END $$;
