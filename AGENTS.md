# Dependency upgrades

Before recommending automerge for a dependency upgrade, inspect this repository's use of the dependency and run `npm test` on the current PR head. Require `Endor dependency contract` to complete with `SUCCESS` for that same head; missing, skipped, pending, or failed checks do not pass.

Preserve existing test assertions and the upgrade's security fixes. Do not delete or skip tests, revert the upgrade, or disable a security guard to make CI green.

Application code may be repaired to preserve existing behavior while retaining the security fix. Keep applicable safety guards bounded and verify they still reject inputs beyond their limits. If compatibility or retained protection cannot be proven, hold the PR for human review.
