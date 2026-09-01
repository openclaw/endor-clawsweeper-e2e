# Endor to ClawSweeper E2E fixture

This private repository is a disposable integration fixture. It intentionally
pins a vulnerable direct dependency so Endor Labs can create a remediation
pull request and ClawSweeper can review that exact pull request.

Do not deploy or reuse this package. The fixture pins `fast-xml-parser@5.3.4`,
which is affected by `GHSA-m7jm-9gc2-mpf2` and is fixed in `5.3.5`.

## Local proof

```bash
npm ci --ignore-scripts
npm start
npm ls fast-xml-parser
npm audit --omit=dev
```

The program parses a constant XML document through the vulnerable dependency,
making the dependency directly callable for Endor reachability analysis. The
repository exists only to prove the Endor -> GitHub PR -> ClawSweeper flow.
