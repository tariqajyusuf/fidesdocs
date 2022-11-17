import GetStartedWrap, { GetStarted } from 'components/getstarted'
import KeyFeatWrap, { KeyFeat } from 'components/keyfeat'

import ThreeColWrap, { ThreeCol } from 'components/threecol'

# The Fides Ecosystem

Fides (pronounced */fee-dhez/*, from Latin: Fidēs) is an open-source privacy engineering platform for managing the fulfillment of data privacy requests in your runtime environment, and the enforcement of privacy regulations in your code.

The Fides developer tools allow engineers and legal teams to label system privacy characteristics, orchestrate programmatic rights fulfillment, and audit stored personal identifiable information (PII) throughout application systems and infrastructure. This includes support for major privacy regulations (e.g. [GDPR](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/), [CCPA](https://ethyca.com/cpra-hub/) and [LGPD](https://iapp.org/news/a/the-new-brazilian-general-data-protection-law-a-detailed-analysis/)), and standards like [ISO 19944](https://www.iso.org/standard/79573.html) by default.


<GetStartedWrap>
  <GetStarted title="Title" link="https://twitter.com/ethyca"  description="According to all known laws of aviation"/>
  <GetStarted title="Title" link="https://twitter.com/cillian"  description="According to all known laws of aviation" />
  <GetStarted title="Title" link="https://twitter.com/cillian"   description="According to all known laws of aviation"/>
  <GetStarted title="Title" link="https://twitter.com/ethyca"   description="According to all known laws of aviation"/>
</GetStartedWrap>


<KeyFeatWrap>
  <KeyFeat title="End-to-End Data Subject Request Automation" link="https://twitter.com/ethyca"  description="When your organization receives a privacy request, Fides will automatically fulfill it according to the execution policies your legal and business owners have created. Fides orchestrates connections to both your owned databases and third-party systems to access, update, and delete sensitive data."/>
  <KeyFeat title="Privacy-as-Code" link="https://twitter.com/cillian"  description="Fides' extensible description language allows you to describe your datasets and code in human-readable manifest files. Create a consistent, versioned definition of your system's privacy characteristics and resources for use in your CI/CD pipeline, when processing privacy requests, or in the Fides UI."/>
  <KeyFeat title="Compliance-minded Data Mapping" link="https://twitter.com/cillian"   description="Export a data map of your connected databases and services, or run an audit of your resources to generate an Article 30-compliant Record of Processing Activities (RoPA)."/>
  <KeyFeat title="Comprehensive Privacy Standard Support" link="https://twitter.com/ethyca"   description="Fides' policy declarations efficiently describe the privacy behaviors of your system for major regulations, including GDPR, CCPA, and LGPD, as well as major standards like ISO 19944."/>
</KeyFeatWrap>


<ThreeColWrap>
  <ThreeCol title="Title" link="https://twitter.com/ethyca"  description="According to all known laws of aviation"/>
  <ThreeCol title="Title" link="https://twitter.com/cillian"  description="According to all known laws of aviation" />
  <ThreeCol title="Title" link="https://twitter.com/cillian"   description="According to all known laws of aviation"/>
  <ThreeCol title="Title" link="https://twitter.com/ethyca"   description="According to all known laws of aviation"/>
  
  <ThreeCol title="Title" link="https://twitter.com/cillian"  description="According to all known laws of aviation" />
  <ThreeCol title="Title" link="https://twitter.com/cillian"   description="According to all known laws of aviation"/>
</ThreeColWrap>

## Why is it called Fides?

Fides was the goddess of trust and good faith in Roman paganism. Fides represented everything that was required for *"honor and credibility"* in every aspect of Roman life. In addition to this, Fides means *"reliability": reliability between two parties, which is always reciprocal*. Fides stood out for her embodiment of this project's philosophy - to provide developers with a powerful tool to make privacy a default feature of any software.

If you'd like a brief Roman mythology lesson, check out [Fides on Wikipedia](https://en.wikipedia.org/wiki/Fides_(deity)).


## Passing Objects

import Callout from 'nextra-theme-docs/callout'

<Callout>
  Since SWR 1.1.0, object-like keys will be serialized under the hood automatically. 
</Callout>
  
Say you have another function that fetches data with a user scope: `fetchWithUser(api, user)`. You can do the following:

```js
const { data: user } = useSWR(['/api/user', token], fetchWithToken)

// ...and then pass it as an argument to another useSWR hook
const { data: orders } = useSWR(user ? ['/api/orders', user] : null, fetchWithUser)
```

You can directly pass an object as the key, and `fetcher` will receive that object too:

```js
const { data: orders } = useSWR({ url: '/api/orders', args: user }, fetcher)
```

<Callout emoji="⚠️">
  In older versions (< 1.1.0), SWR **shallowly** compares the arguments on every render, and triggers revalidation if any of them has changed. 
</Callout>
