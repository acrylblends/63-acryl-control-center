# Code signing policy

Free code signing provided by [SignPath.io](https://signpath.io), certificate by [SignPath Foundation](https://signpath.org).

This policy covers the Windows installers of **ACRYL Control Center** (`ACRYL-Control-Center-win-x64.exe` and `ACRYL-Control-Center-win-arm64.exe`)
published as assets of this repository's releases: <https://github.com/acrylblends/63-acryl-control-center/releases>.

## What is signed

- Only the Windows installers built by this repository's release workflow, [`.github/workflows/release.yml`](.github/workflows/release.yml), from a
  version tag (`v*`) of this repository. The workflow packs the installer on a GitHub-hosted runner and hands it to SignPath as a GitHub Actions
  artifact of the same run; SignPath reads it from there, so it only signs what that run built.
- Nothing built on a developer's machine, and no file from another repository, is submitted for signing.
- The signing steps are in the workflow itself and run only for a pushed tag. The artifact configuration SignPath uses (the installer, Authenticode) is
  kept in [`.signpath/artifact-configuration.xml`](.signpath/artifact-configuration.xml).
- The installer carries this repository's code (see [LICENSE](LICENSE)), the Electron runtime (MIT, with Chromium's licences in `LICENSES.chromium.html`)
  and the npm packages in `resources/app/node_modules`, each with its licence in its own `package.json` and licence file. A scan of the v0.2.19 Windows x64
  installer (2026-11-24, 541 packages) found MIT (469), Apache-2.0 (51), BSD-3-Clause (13), BSD-2-Clause, ISC, MPL-2.0, Python-2.0, Unlicense,
  MIT OR WTFPL, BlueOak-1.0.0 and, for sharp's libvips library, LGPL-3.0-or-later.
  The installer's own helper `resources/elevate.exe` is [jpassing/elevate](https://github.com/jpassing/elevate), under the MIT licence (its `LICENSE.md`).

## Team roles

<!-- OWNER TO CONFIRM: names and GitHub accounts before submitting the SignPath Foundation application. -->

| Role | Who | What they do |
|---|---|---|
| Committers and reviewers | [@musichen](https://github.com/musichen) (owner; confirm) | change the code of this repository |
| Approvers | [@musichen](https://github.com/musichen) (owner; confirm) | approve each signing request in SignPath, for a release the workflow built |

<!-- OWNER: before applying, turn on "Require two-factor authentication" in github.com/organizations/acrylblends/settings/security (it is off today, checked 2026-11-24) and enable MFA on SignPath; then the next paragraph is true. -->
Everyone who has a role in this policy uses multi-factor authentication on GitHub and on SignPath. Membership of the
[acrylblends](https://github.com/acrylblends) organisation and of SignPath requires it.

## Privacy policy

ACRYL Control Center is a program that runs on your computer. It will not transfer any information to other networked systems unless specifically
requested by the user or the person installing or operating it. The requests it makes, and when:

- **Your AI model provider** (DeepSeek, OpenAI, Anthropic or another you set up in Settings > Models): the messages of the chat and the files the agent
  reads, when you send a message. The key is kept on your computer.
- **GitHub** (github.com): when you sign in with GitHub, share an app or a plugin, pull a plugin from a GitHub repository, or when the app checks whether a
  newer release of this repository exists (a request for the releases list; it sends no information about you).
- **The npm registry** (registry.npmjs.org): when you make an app, install its dependencies or add a plugin.
- **The Blends and plugin registries** (acrylblends.github.io, cordisplugins.github.io): when you open the Blends store or pull a registry plugin
  (a request for a public list).
- **Feedback**: the embedded DeepSeek Harness engine can send a session log to its maker's collector only after you give explicit feedback on a session;
  `DSH_TELEMETRY_DISABLED` set to any value turns that off. ACRYL Control Center has no usage statistics, no crash reporting and no tracking of its own.

Apps you make with it are your own and talk to the services you choose.
