---
layout: page.11ty.cjs
title: <missile-attack> ⌲ Home
---

# &lt;missile-attack>

`<missile-attack>` is a Dungeon Crawl Classics missile attack calculator. It allows you to set characteristics such as strength, agility and weapon as HTML element attributes
and be provided with a user interface for rolling a missile weapon attack. Events receive dice roll objects that can be used to roll at attack and damage for the weapon attack.

## Configure with attributes

<section class="columns">
  <div>

`<missile-attack>` can be configured with attributed in plain HTML.

```html
<missile-attack strength="12" agility="12" weapon="Longbow"></missile-attack>
```

  </div>
  <div>

<missile-attack strength="12" agility="12" weapon="Longbow"></missile-attack>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<missile-attack>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const strength = '13';
const agility = '14';
const weapon = 'Dagger';

render(
  html`
    <h2>This is a &lt;missile-attack&gt;</h2>
    <missile-attack .strength=${strength} .agility="${agility}" .weapon="${weapon}"></missile-attack>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;missile-attack&gt;</h2>
<missile-attack strength="13" agility="14" weapon="Dagger"></missile-attack>

  </div>
</section>
