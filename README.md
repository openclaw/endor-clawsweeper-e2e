# Endor to ClawSweeper E2E fixture

This public repository is a disposable integration fixture. It intentionally
pins vulnerable direct dependencies so Endor Labs can create a remediation
pull request and ClawSweeper can review that exact pull request.

Do not deploy or reuse this package. The fixture pins `fast-xml-parser@5.3.5`,
which is affected by `GHSA-jmr7-xgp7-cmfj` and is fixed in `5.3.6`.
The earlier `5.3.4` to `5.3.5` remediation already has an Endor PR with autofix
history. Advancing this pin leaves a different fix for Endor to propose as a
fresh PR for the automerge test; Endor still chooses the recommended version.

It also pins `lodash@4.17.20`, which is affected by
[`GHSA-35jh-r3h4-6jhm`](https://github.com/advisories/GHSA-35jh-r3h4-6jhm).
That advisory is fixed in `4.17.21`; Endor may recommend a newer version to
address other findings. Endor currently detects Lodash's findings but does not
produce a Lodash upgrade recommendation, so it is not the active PR trigger.

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
