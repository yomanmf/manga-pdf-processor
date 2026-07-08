# Manga PDF Processor

Source backup for the Railway services that process manga PDFs/CBZ files,
download chapters from WeebCentral, merge manga pages for landscape reading,
and optionally send the resulting PDF files to Kindle.

## Services

- `work/manga-pdf-processor/index.ts` — main web app deployed on Railway as a
  Function image. Railway stores the function source in `FUNCTION_SOURCE_*`
  variables.
- `work/kindle-uploader/` — Kindle uploader worker deployed as a Docker-based
  Railway service.

## Main app environment variables

Keep values only in Railway variables, never in git:

- `APP_PASSWORD`
- `APP_SESSION_TOKEN`
- `KINDLE_WORKER_URL`
- `KINDLE_SHARED_SECRET`

## Kindle uploader environment variables

Keep values only in Railway variables, never in git:

- `KINDLE_SHARED_SECRET`
- `PUBLIC_BASE_URL`
- `APP_ORIGIN`
- `AWS_ENDPOINT_URL`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET_NAME`
- `AWS_DEFAULT_REGION`
- `AWS_S3_URL_STYLE`
- `DATA_DIR`

## Backup rule

After every code change, push the source to GitHub first, then deploy to
Railway. Railway is runtime state; GitHub is the source of truth.
