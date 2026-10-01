# Endor to ClawSweeper E2E fixture

This public repository is a disposable integration fixture. It intentionally
pins vulnerable direct dependencies so Endor Labs can create a remediation
pull request and ClawSweeper can review that exact pull request.

Do not deploy or reuse this package. The fixture pins `fast-xml-parser@5.3.6`,
which is affected by
[`GHSA-fj3w-jwp8-x2g3`](https://github.com/advisories/GHSA-fj3w-jwp8-x2g3)
and is fixed in `5.3.8`. It calls `XMLBuilder` with `preserveOrder: true` and
constant, harmless input. This leaves a different fix from the held `5.3.5` to
`5.3.6` PR for Endor to propose; Endor still chooses the recommended version.

It also pins `lodash@4.17.20`, which is affected by
[`GHSA-35jh-r3h4-6jhm`](https://github.com/advisories/GHSA-35jh-r3h4-6jhm).
That advisory is fixed in `4.17.21`; Endor may recommend a newer version to
address other findings. Endor currently detects Lodash's findings but does not
produce a Lodash upgrade recommendation, so it is not the active PR trigger.

## Local proof

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm start
pnpm test
pnpm list fast-xml-parser lodash
pnpm audit --prod
```

The program parses and builds constant XML and renders a constant Lodash
template. Both dependencies are called directly; Endor still determines their
reported reachability. The fixture accepts no external input, opens no network
listener, and must never be deployed. The repository exists only to prove the
Endor -> GitHub PR -> ClawSweeper flow. Audit findings are expected until the
remediation PRs are merged.

## Dependency regression stage

The two `pnpm test` cases use the application's exported `parseDocument`.
The shallow document is a control. The regression case expects the status
inside 102 grouping levels in a fixed, valid 1,552-byte XML document. It uses
no DTD, entity expansion, network access, or external input.

`fast-xml-parser@5.3.6` accepts that document. Version `5.3.8` introduced a
default nesting limit of 100, retained in `5.3.9`, so the same application call throws
`Maximum nested tags exceeded`. This is an application compatibility failure
caused by intentional dependency hardening, not a claim that the new parser
is defective. See the [upstream changelog](https://github.com/NaturalIntelligence/fast-xml-parser/blob/v5.3.9/CHANGELOG.md).
The tests assert parsed values, never a dependency version or a forced failure.

This stage uses vulnerable `5.3.6` to request a fresh upgrade: rescanning the
previous `5.3.7` pin reused Endor's record for already-merged PR #7. Install this
stage first, then let Endor propose its upgrade. Run `pnpm install --frozen-lockfile --ignore-scripts`
and `pnpm test` on the upgrade's exact head.
The **Unit dependency contract** workflow runs these two tests on the PR's exact
head and also supports manual dispatch. It uses read-only permissions and no
privileged secrets. It does not trigger the Endor/ClawSweeper E2E journey or
configure required branch-protection checks.

The companion ClawSweeper guard requires the **Endor dependency contract**
check to complete successfully for every automerge PR in this fixture,
including replacement repairs. That guard is still local, not deployed. The
first hosted run exercises the existing review/repair behavior. Missing,
skipped, or unrelated green checks must not substitute for contract proof.

The upgrade must not merge while the contract is broken. A bounded application
parser-limit adjustment may restore the contract while keeping the dependency's
security fix; that repaired upgrade can pass. Do not remove the test, weaken its
assertion, revert the security fix, or disable the nesting guard to get green.
Local test failure alone does not prove that hosted ClawSweeper holds a PR;
that requires a separately authorized live run and its review/merge evidence.
