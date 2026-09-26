# Git y GitHub

El repositorio Git local usa la rama `main` y el remoto `origin` apunta a:

`https://github.com/Jhean-Anco/ContiHack-2026.git`

## Flujo de trabajo

Revisa los cambios y prepara un commit:

```bash
git status
git add .
git commit -m "Describe el cambio"
```

Publica `main` en GitHub y configura el seguimiento de la rama:

```bash
git push -u origin main
```

Después del primer push, sincroniza con:

```bash
git pull --rebase
git push
```

No agregues `.env`, contraseñas, dependencias instaladas, builds ni el cliente Prisma generado. Las reglas están en `.gitignore`.
