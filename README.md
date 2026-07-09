# @oasisomniverse/react — OASIS React UI Component Library

The React UI component library for the [OASIS Platform](https://oasisomniverse.one). 126 components covering avatar SSO, karma, NFTs, quests, map, seeds, messaging, OApps, providers and more — ready to drop into any React or Next.js project.

[![npm](https://img.shields.io/npm/v/@oasisomniverse/react)](https://www.npmjs.com/package/@oasisomniverse/react)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://react.oportal.oasisomniverse.one)

## Install

```bash
npm install @oasisomniverse/react
```

## Basic Usage

```jsx
import { Login, AvatarConnect, KarmaToast } from '@oasisomniverse/react';

const App = () => (
  <div>
    <Login apiUrl="https://api.web4.oasisomniverse.one" onSuccess={(avatar) => console.log(avatar)} />
    <AvatarConnect />
    <KarmaToast message="+10 karma earned" value={10} />
  </div>
);

export default App;
```

## Component List

All 126 components are grouped below. Every component is also available in vanilla JS, Angular, Vue, Svelte and Next.js at full parity — see the [OASIS Web Component Library](https://oportal.oasisomniverse.one) for the full matrix.

| Group | Components |
|---|---|
| **Auth & Identity** | AcceptInvite, AvatarConnect, ForgotPassword, Login, ResetPassword, SearchAvatar, SearchAvatars, SendInvite, Signup, VerifyEmail |
| **Avatar** | AvatarProfile, AvatarWallet, EditAvatar, SearchProfiles, ViewAchievements, ViewAvatar, ViewAvatarKarma, ViewLeagues, ViewOrganizations, ViewTournaments |
| **Data Screen** | ActivityPub, AddData, EOSIO, Ethereum, Holochain, IPFS, LoadData, ManageData, MongoDB, Neo4j, OffChainManagement, SearchData, Solana, Solid, SQLite, ThreeFold |
| **Eggs** | Eggs, ManageEggs, SearchEggs, ViewEggs |
| **Game** | Game |
| **Karma** | KarmaPanel, KarmaToast, SearchKarma, ViewKarma, VoteKarma |
| **Map** | Add2DObjectToMap, Add3DObjectToMap, AddQuestToMap, DownloadMap, ManageMap, Map, PlotRouteOnMap, SearchMap, ViewGlobal3DMap, ViewHalonsOnMap, ViewOAppOnMap, ViewQuestOnMap |
| **Messages** | MenuMessage, Message, MessageContacts, Messaging |
| **Mission** | ManageMission, Mission, SearchMission, ViewMission |
| **NFT** | ContactPopupNFT, ManageNFT, NFT, PurchaseNFT, PurchaseVirtualLandNFT, SearchNFT, ViewNFT |
| **OApp** | CreateOApp, DeployOApp, DownloadOApp, EditOApp, InstallOApp, LaunchOApp, ManageOApp, OApp, SearchOApp |
| **Providers** | CompareProviderSpeeds, CrossChainManagement, ManageAutoFailover, ManageAutoReplication, ManageLoadBalancing, ManageProviders, ProviderDropdown, Providers, SearchProviders, SeedsProvider, ViewProviderStats, ViewProviders |
| **Quest** | ManageQuest, Quest, SearchQuest, ViewQuest |
| **Seeds** | DonateSeeds, ManageSeeds, PayWithSeeds, RewardSeeds, SearchSeeds, Seeds, ViewSeeds |
| **Common UI** | ComingSoon, Confirmation, Contact, HyperDrive, NavBar, ONET, ONODE, OasisModal, Settings, SideNav, StarField, Wallet |

## Dark Space Design System

The OASIS component library ships with the **Dark Space** design system — a deep-space aesthetic built for the OASIS Omniverse:

- **Background**: near-black (#0a0d14) with subtle nebula gradients
- **Primary accent**: electric cyan (#00c8ff)
- **Typography**: [Orbitron](https://fonts.google.com/specimen/Orbitron) for headings, [Rajdhani](https://fonts.google.com/specimen/Rajdhani) for body text
- **Text**: always bright (#e0f0ff / #fff) — never dim or faded
- **Borders**: translucent cyan (`rgba(0,200,255,0.2)`)
- **Cards**: glassy dark panels with backdrop-filter blur

Override the CSS custom properties to theme components for your own OAPP:

```css
:root {
  --oasis-bg: #0a0d14;
  --oasis-accent: #00c8ff;
  --oasis-text: #e0f0ff;
  --oasis-border: rgba(0, 200, 255, 0.2);
}
```

## Live Demo

**[react.oportal.oasisomniverse.one](https://react.oportal.oasisomniverse.one)** — the React OPORTAL running all 126 components live.

## Links

- [GitHub](https://github.com/NextGenSoftwareUK/OASIS-React-UI-Component-Library)
- [npm](https://www.npmjs.com/package/@oasisomniverse/react)
- [OASIS API Docs](https://oasis-web4.gitbook.io/oasis-web4-docs/)
- [Developer Portal](https://oportal.oasisomniverse.one)
- [OASIS Platform](https://oasisomniverse.one)
