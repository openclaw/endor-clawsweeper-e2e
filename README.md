# Endor to ClawSweeper E2E fixture

This public repository is a disposable integration fixture. It intentionally
pins vulnerable direct dependencies so Endor Labs can create a remediation
pull request and ClawSweeper can review that exact pull request.

Do not deploy or reuse this package. The fixture pins `fast-xml-parser@5.3.4`,
which is affected by `GHSA-m7jm-9gc2-mpf2` and is fixed in `5.3.5`.

It also pins `lodash@4.17.20`, which is affected by
[`GHSA-35jh-r3h4-6jhm`](https://github.com/advisories/GHSA-35jh-r3h4-6jhm).
That advisory is fixed in `4.17.21`; Endor may recommend a newer version to
address other findings. Lodash supplies a separate remediation candidate so
the automation can process a new Endor PR without changing the existing XML
parser PR or its review history.

## Local proof

```bash
npm ci --ignore-scripts
npm start
npm ls fast-xml-parser lodash
npm audit --omit=dev
```

The program parses a constant XML document and renders a constant Lodash
template. Both dependencies are called directly; Endor still determines their
reported reachability. The fixture accepts no external input, opens no network
listener, and must never be deployed. The repository exists only to prove the
Endor -> GitHub PR -> ClawSweeper flow. Audit findings are expected until the
remediation PRs are merged.
