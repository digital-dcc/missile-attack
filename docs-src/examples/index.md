---
layout: example.11ty.cjs
title: <missile-attack> ⌲ Examples ⌲ Basic
tags: example
name: Basic
description: A basic example
---

<style>
  missile-attack::part(wrapper) {
		border: solid 1px blue;
	}
</style>
<missile-attack strength="15" agility="13" weapon="Shortbow"></missile-attack>

<h3>CSS</h3>

```css
missile-attack::part(wrapper) {
  border: solid 1px blue;
}
```

<h3>HTML</h3>

```html
<missile-attack strength="15" agility="13" weapon="Shortbow"></missile-attack>
```
