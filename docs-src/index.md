---
layout: page.11ty.cjs
title: <missile-attack> ⌲ Home
---

# &lt;missile-attack>

`<missile-attack>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<missile-attack>` is just an HTML element. You can it anywhere you can use HTML!

```html
<missile-attack></missile-attack>
```

  </div>
  <div>

<missile-attack></missile-attack>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<missile-attack>` can be configured with attributed in plain HTML.

```html
<missile-attack name="HTML"></missile-attack>
```

  </div>
  <div>

<missile-attack name="HTML"></missile-attack>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<missile-attack>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;missile-attack&gt;</h2>
    <missile-attack .name=${name}></missile-attack>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;missile-attack&gt;</h2>
<missile-attack name="lit-html"></missile-attack>

  </div>
</section>
