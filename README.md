# Vue 3 Full Professional Template

Template com Vite + Vue 3 + TypeScript + Tailwind + Pinia + ESLint + Prettier + Husky + Vitest + Cypress + GitHub Actions.

## Scripts
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run format`
- `npm run prepare` (instala hooks do husky)
- `npm run test:unit`
- `npm run test:e2e`

## Inicialização (local)
1. `npm install`
2. `npm run prepare`  # instala hooks do husky
3. `npm run dev`

## CI
Arquivo GitHub Actions em `.github/workflows/ci.yml` roda lint, testes unitários e build no push/PR para `main`.

## Observações
- Substitua as imagens placeholders em `public/images/`.
- Configure variáveis de ambiente no `.env` se necessário.


## Firebase Hosting (CI/CD)

This template includes `firebase.json` and a GitHub Actions workflow to deploy to Firebase Hosting.

### Steps to enable automatic deploy

1. Install Firebase CLI locally: `npm install -g firebase-tools`.
2. Login and get a CI token: `firebase login:ci`.
3. In your GitHub repo: Settings → Secrets → Actions → New repository secret → `FIREBASE_TOKEN` = your token.
4. Set your Firebase project id in `.firebaserc` (replace `your-firebase-project-id`).
5. Push to `main`. The workflow will run and deploy to Firebase Hosting.