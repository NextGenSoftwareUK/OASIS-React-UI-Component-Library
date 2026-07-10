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
    <AvatarConnect apiUrl="https://api.web4.oasisomniverse.one" onLogin={(s) => console.log(s)} />
    <Login apiUrl="https://api.web4.oasisomniverse.one" onSuccess={(s) => console.log(s)} />
    <KarmaToast message="Quest completed" amount={150} />
  </div>
);
```

All components accept an `apiUrl` prop that defaults to `https://api.web4.oasisomniverse.one`.

---

## Component Reference

### Auth & Identity

#### `<Login />`

Avatar login popup/form.

```jsx
<Login
  apiUrl="https://api.web4.oasisomniverse.one"
  onSuccess={(session) => console.log(session)}
  onClose={() => {}}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `apiUrl` | `string` | `'https://api.web4.oasisomniverse.one'` | OASIS API base URL |
| `onSuccess` | `(session) => void` | — | Called with session object on successful login |
| `onClose` | `() => void` | — | Called when the form is dismissed |

---

#### `<Signup />`

New avatar registration form.

```jsx
<Signup
  apiUrl="https://api.web4.oasisomniverse.one"
  onSuccess={(data) => console.log(data)}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `apiUrl` | `string` | `'https://api.web4.oasisomniverse.one'` | OASIS API base URL |
| `onSuccess` | `(data) => void` | — | Called with new avatar data on registration |
| `onClose` | `() => void` | — | Called when dismissed |

---

#### `<AvatarConnect />`

Login/logout toggle chip — manages session state automatically.

```jsx
<AvatarConnect
  apiUrl="https://api.web4.oasisomniverse.one"
  sessionKey="oasis_session"
  onLogin={(session) => console.log(session)}
  onLogout={() => console.log('logged out')}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `apiUrl` | `string` | `'https://api.web4.oasisomniverse.one'` | OASIS API base URL |
| `sessionKey` | `string` | `'oasis_session'` | sessionStorage key for login state persistence |
| `onLogin` | `(session) => void` | — | Called with session object after login |
| `onLogout` | `() => void` | — | Called after logout |

---

#### `<ForgotPassword />`

Password reset request form.

```jsx
<ForgotPassword apiUrl="https://api.web4.oasisomniverse.one" onClose={() => {}} />
```

---

#### `<ResetPassword />`

Password reset form — use with the token from the reset email link.

```jsx
<ResetPassword
  apiUrl="https://api.web4.oasisomniverse.one"
  token={tokenFromUrl}
  onSuccess={() => {}}
/>
```

| Prop | Type | Description |
|---|---|---|
| `token` | `string` | **Required.** Reset token from the email link |

---

#### `<VerifyEmail />`

Email verification confirmation.

```jsx
<VerifyEmail apiUrl="https://api.web4.oasisomniverse.one" token={tokenFromUrl} onSuccess={() => {}} />
```

---

#### `<SearchAvatars />`

Search the OASIS avatar directory.

```jsx
<SearchAvatars
  apiUrl="https://api.web4.oasisomniverse.one"
  onSelect={(avatar) => console.log(avatar)}
/>
```

---

#### `<SendInvite />` / `<AcceptInvite />`

```jsx
<SendInvite apiUrl="..." onSuccess={() => {}} />
<AcceptInvite apiUrl="..." inviteCode={code} onSuccess={() => {}} />
```

---

### Avatar

#### `<AvatarProfile />`

```jsx
<AvatarProfile apiUrl="..." avatarId="abc123" onClose={() => {}} />
```

| Prop | Type | Description |
|---|---|---|
| `avatarId` | `string` | Avatar to display — defaults to logged-in user |

---

#### `<ViewAvatar />`

Read-only avatar card for any avatar ID.

```jsx
<ViewAvatar apiUrl="..." avatarId="abc123" />
```

---

#### `<EditAvatar />`

Edit the logged-in avatar's profile fields.

```jsx
<EditAvatar apiUrl="..." onSuccess={() => {}} onClose={() => {}} />
```

---

#### `<ViewAvatarKarma />`

Karma breakdown panel.

```jsx
<ViewAvatarKarma apiUrl="..." avatarId="abc123" />
```

---

### Karma

#### `<KarmaToast />`

Floating karma notification — renders a self-dismissing toast.

```jsx
<KarmaToast message="Quest completed" amount={150} />
```

| Prop | Type | Description |
|---|---|---|
| `message` | `string` | Reason text shown below the karma amount |
| `amount` | `number` | Karma delta — positive shown in cyan, negative in red |

---

#### `<KarmaPanel />`

Full karma dashboard.

```jsx
<KarmaPanel apiUrl="..." onClose={() => {}} />
```

---

### Map

#### `<Map />`

Interactive 3D globe with holon and quest overlays.

```jsx
<Map apiUrl="..." onClose={() => {}} />
```

---

### NFT

#### `<NFT />`

View and manage a single NFT.

```jsx
<NFT apiUrl="..." nftId="nft-001" onClose={() => {}} />
```

#### `<PurchaseNFT />`

NFT purchase flow.

```jsx
<PurchaseNFT apiUrl="..." nftId="nft-001" onSuccess={() => {}} onClose={() => {}} />
```

---

### OApp

#### `<CreateOApp />`

Step-by-step OApp creation wizard.

```jsx
<CreateOApp apiUrl="..." onSuccess={(oapp) => console.log(oapp)} onClose={() => {}} />
```

#### `<LaunchOApp />`

Launch an installed OApp by ID.

```jsx
<LaunchOApp apiUrl="..." oappId="my-oapp" onClose={() => {}} />
```

---

### Seeds

#### `<Seeds />`

Seeds wallet overview for the logged-in avatar.

```jsx
<Seeds apiUrl="..." onClose={() => {}} />
```

#### `<PayWithSeeds />`

Seeds payment flow.

```jsx
<PayWithSeeds apiUrl="..." amount={50} recipientId="abc123" onSuccess={() => {}} onClose={() => {}} />
```

---

### Common UI

#### `<OasisModal />`

Reusable modal wrapper.

```jsx
<OasisModal title="My Modal" accentColor="#00c8ff" onClose={() => {}}>
  <p>Modal content goes here.</p>
</OasisModal>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `''` | Modal header title |
| `accentColor` | `string` | `'#00c8ff'` | Header accent colour |
| `onClose` | `() => void` | — | Called when dismissed |
| `children` | `ReactNode` | — | Modal body content |

---

#### `<NavBar />`

Top navigation bar with avatar chip, karma display and menu links.

```jsx
<NavBar
  apiUrl="..."
  links={[{ label: 'Map', href: '/map' }, { label: 'Quest', href: '/quest' }]}
/>
```

---

#### `<Settings />`

User settings panel (provider, theme, notifications).

```jsx
<Settings apiUrl="..." onClose={() => {}} />
```

---

#### `<Wallet />`

Multi-chain wallet overview.

```jsx
<Wallet apiUrl="..." onClose={() => {}} />
```

---

#### `<StarField />`

Animated star field background canvas.

```jsx
<StarField /> {/* attach to a full-screen container */}
```

---

#### `<ComingSoon />`

Placeholder for features not yet live.

```jsx
<ComingSoon label="Quests" />
```

---

## Full Component List

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

---

## Dark Space Design System

The OASIS component library ships with the **Dark Space** design system:

- **Background**: near-black (`#0a0d14`) with subtle nebula gradients
- **Primary accent**: electric cyan (`#00c8ff`)
- **Typography**: [Orbitron](https://fonts.google.com/specimen/Orbitron) for headings, [Rajdhani](https://fonts.google.com/specimen/Rajdhani) for body text
- **Text**: always bright (`#e0f0ff` / `#fff`) — never dim or faded
- **Borders**: translucent cyan (`rgba(0,200,255,0.2)`)
- **Cards**: glassy dark panels with `backdrop-filter: blur`

Override the CSS custom properties to theme components for your own OAPP:

```css
:root {
  --oasis-bg: #0a0d14;
  --oasis-accent: #00c8ff;
  --oasis-text: #e0f0ff;
  --oasis-border: rgba(0, 200, 255, 0.2);
}
```

---

## Live Demo

**[react.oportal.oasisomniverse.one](https://react.oportal.oasisomniverse.one)** — the React OPORTAL running all 126 components live.

## Links

- [GitHub](https://github.com/NextGenSoftwareUK/OASIS-React-UI-Component-Library)
- [npm](https://www.npmjs.com/package/@oasisomniverse/react)
- [OASIS API Docs](https://oasis-web4.gitbook.io/oasis-web4-docs/)
- [Developer Portal](https://oportal.oasisomniverse.one)
- [OASIS Platform](https://oasisomniverse.one)
