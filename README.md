## Introduction

Reproduction for https://github.com/prisma/prisma/issues/2957

## Steps

1. Clone the repo and install the packages.
2. Replace placeholder in .env with a legit mysql db url
3. Run `npx prisma migrate save --experimental && npx prisma migrate up --experimental`
4. Run `yarn start`
