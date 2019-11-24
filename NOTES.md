# Notes

## Fixing proxy issues for Google auth

- remove the `proxy` from `client/package.json`
- `cd client`, and `npm install http-proxy-middleware --save`
- Add `client/src/setupProxy.js`:

```
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
};
```

- HTML link to Login needs to be `<a>` instead of `<Link>`
