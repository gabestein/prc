CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.users (
    user_id text NOT NULL
);
CREATE TABLE public.work_relations (
    relation_id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    parent_doi text NOT NULL,
    child_doi text NOT NULL,
    relation_type text NOT NULL
);
CREATE TABLE public.works (
    doi text NOT NULL,
    indexed date,
    "referenceCount" numeric DEFAULT 0 NOT NULL,
    publisher text,
    type text,
    "publishedPrint" jsonb,
    created date,
    source text,
    title text,
    prefix text,
    author jsonb,
    member numeric,
    "contentCreated" jsonb,
    "containerTitle" text,
    deposited date,
    "referencesCount" numeric DEFAULT 0 NOT NULL,
    relation jsonb,
    url text,
    issue text,
    volume text,
    issn jsonb,
    json_dump jsonb NOT NULL,
    "journalIssue" jsonb,
    "issnType" jsonb,
    "isReferencedByCount" numeric,
    language text,
    link jsonb,
    "shortContainerTitle" text,
    score numeric,
    "originalTitle" text,
    "shortTitle" text,
    page text,
    subtitle text,
    "alternativeId" jsonb,
    issued jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
ALTER TABLE ONLY public.work_relations
    ADD CONSTRAINT work_relations_pkey PRIMARY KEY (relation_id);
ALTER TABLE ONLY public.works
    ADD CONSTRAINT works_pkey PRIMARY KEY (doi);
CREATE TRIGGER set_public_works_updated_at BEFORE UPDATE ON public.works FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_works_updated_at ON public.works IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.work_relations
    ADD CONSTRAINT work_relations_child_doi_fkey FOREIGN KEY (child_doi) REFERENCES public.works(doi) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.work_relations
    ADD CONSTRAINT work_relations_parent_doi_fkey FOREIGN KEY (parent_doi) REFERENCES public.works(doi) ON UPDATE RESTRICT ON DELETE RESTRICT;
