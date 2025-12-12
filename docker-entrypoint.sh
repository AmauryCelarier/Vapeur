#!/bin/sh

set -e
export DB_PASS=$(cat /run/secrets/db_password | sed 's/[[:space:]]*$//')
export DATABASE_URL=postgresql://vapeur_user:$DB_PASS@db:5432/vapeur_db?schema=public
npx prisma migrate deploy 
npm run start