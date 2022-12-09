# Documentation

Documentation is an incredibly important part of Fides, both for explaining its concepts to general audiences and describing its usage to developers.

## Concepts

Fides includes a great deal of "concept" documentation, which covers features, tutorials, guides, and examples separately from the auto-generated API reference. 

To write concept docs, add Markdown files to the `/pages/` directory (or one of its subdirectories). To ensure that your page is displayed correctly in the navigation, edit the corresponding `meta.json` to include a reference to it.

## Semantics

### Capitalization

Concepts that refer to proper nouns or are trademarked should always be capitalized. The exception for Fides is only when referencing any languages or tools, such as fideslang or fideslog.

Other Fides terms, like "Data Category" or "System", should also be capitalized to be clear about the fact that a Fides resource is being referenced.

> When a System is applied, it is either created or updated through the Fides API.

> The System model requires a field called `fides_key`.

## Previewing docs locally

Documentation (including both concepts and API references) is built and deployed with every merge to the fidesdocs master branch.

The project uses [pnpm](https://pnpm.io), [Nextra](https://nextra.vercel.app) and deploys via [Vercel](https://vercel.com). To develop it locally, clone this repository and run the following command to start the local dev server:

```bash
pnpm install
pnpm dev
```

And visit `localhost:3000` to preview your changes.
