// @ts-nocheck
import {MissileAttack} from '../missile-attack.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('missile-attack', () => {
  test('is defined', () => {
    const el = document.createElement('missile-attack');
    assert.instanceOf(el, MissileAttack);
  });

  test('renders correctly with minimal values', async () => {
    const el = await fixture(
      html`<missile-attack
        agility="18"
        strength="12"
        weapon="Dagger"
      ></missile-attack>`
    );
    assert.match(el.shadowRoot?.innerHTML, /1d20\+3/);
    assert.match(el.shadowRoot?.innerHTML, /1d4/);
  });

  test('renders correctly with strength applied to thrown weapon at close range', async () => {
    const el = await fixture(
      html`<missile-attack
        agility="18"
        strength="18"
        weapon="Dagger"
      ></missile-attack>`
    );
    assert.match(el.shadowRoot?.innerHTML, /1d20\+3/);
    assert.match(el.shadowRoot?.innerHTML, /1d4\+3/);
  });

  test('renders with attack and damage overrides applied', async () => {
    const el = await fixture(
      html`<missile-attack
        agility="18"
        strength="18"
        weapon="Dagger"
        attack-modifier-override="+1"
        damage-modifier-override="+1"
      ></missile-attack>`
    );
    assert.match(el.shadowRoot?.innerHTML, /1d20\+1/);
    assert.match(el.shadowRoot?.innerHTML, /1d4\+1/);
  });

  test('renders with attack die override applied', async () => {
    const el = await fixture(
      html`<missile-attack
        agility="18"
        strength="12"
        weapon="Dagger"
        attack-die="d16"
      ></missile-attack>`
    );
    assert.match(el.shadowRoot?.innerHTML, /1d16\+3/);
    assert.match(el.shadowRoot?.innerHTML, /1d4/);
  });

  test('renders with attack modifier adjustment applied', async () => {
    const el = await fixture(
      html`<missile-attack
        agility="18"
        strength="12"
        weapon="Dagger"
        attack-modifier-adjustment="+3"
      ></missile-attack>`
    );
    assert.match(el.shadowRoot?.innerHTML, /1d20\+6/);
    assert.match(el.shadowRoot?.innerHTML, /1d4/);
  });

  test('renders with damange modifier adjustment applied', async () => {
    const el = await fixture(
      html`<missile-attack
        agility="18"
        strength="12"
        weapon="Dagger"
        damage-modifier-adjustment="+2"
      ></missile-attack>`
    );
    assert.match(el.shadowRoot?.innerHTML, /1d20\+3/);
    assert.match(el.shadowRoot?.innerHTML, /1d4\+2/);
  });

  test('renders with damage die override applied', async () => {
    const el = await fixture(
      html`<missile-attack
        agility="18"
        strength="12"
        weapon="Dagger"
        damage-die="2d6"
      ></missile-attack>`
    );
    assert.match(el.shadowRoot?.innerHTML, /1d20\+3/);
    assert.match(el.shadowRoot?.innerHTML, /2d6/);
  });

  test('range affects attack die and attack modifier', async () => {
    const el = await fixture(
      html`<missile-attack
        strength="12"
        agility="12"
        weapon="Longbow"
      ></missile-attack>`
    );
    el.shadowRoot?.querySelector('#range-medium')?.click();
    await el.updateComplete;
    assert.match(el.shadowRoot?.innerHTML, /1d20-2/);
    el.shadowRoot?.querySelector('#range-long')?.click();
    await el.updateComplete;
    assert.match(el.shadowRoot?.innerHTML, /1d16/);
  });

  test('range affects whether strength is applied to thrown weapon damage', async () => {
    const el = await fixture(
      html`<missile-attack
        strength="18"
        agility="12"
        weapon="Dart"
      ></missile-attack>`
    );
    // initially defaults to short range and strength is applied
    assert.match(el.shadowRoot?.innerHTML, /1d3\+3/);
    el.shadowRoot?.querySelector('#range-medium')?.click();
    await el.updateComplete;
    // at medium range, strength is not applied
    assert.notMatch(el.shadowRoot?.innerHTML, /1d3\+3/);
    el.shadowRoot?.querySelector('#range-long')?.click();
    await el.updateComplete;
    // at long range, strength is not applied
    assert.notMatch(el.shadowRoot?.innerHTML, /1d3\+3/);
  });

  test('when sneak-attack checked weapon damage uses sneak attack damage if applicable', async () => {
    const el = await fixture(
      html`<missile-attack
        strength="12"
        agility="12"
        weapon="Blowgun"
      ></missile-attack>`
    );
    // regular weapon damage is applied
    assert.match(el.shadowRoot?.innerHTML, /1d3/);
    el.shadowRoot?.querySelector('input[name=sneak-attack]')?.click();
    await el.updateComplete;
    // sneak attack weapon damage is applied
    assert.match(el.shadowRoot?.innerHTML, /1d5/);
  });

  test('you are... squeezing, entangled or untrained', async () => {
    const el = await fixture(
      html`<missile-attack
        strength="12"
        agility="12"
        weapon="Blowgun"
      ></missile-attack>`
    );

    assert.match(el.shadowRoot?.innerHTML, /1d20/);
    el.shadowRoot
      ?.querySelector('input[name=squeezing-entangled-untrained]')
      ?.click();
    await el.updateComplete;

    assert.match(el.shadowRoot?.innerHTML, /1d16/);
  });

  test('you are... firing into melee', async () => {
    const el = await fixture(
      html`<missile-attack
        strength="12"
        agility="16"
        weapon="Shortbow"
      ></missile-attack>`
    );

    assert.match(el.shadowRoot?.innerHTML, /1d20\+2/);
    el.shadowRoot?.querySelector('input[name=firing-into-melee]')?.click();
    await el.updateComplete;

    assert.match(el.shadowRoot?.innerHTML, /1d20\+1/);
  });

  test('your target is... kneeling, sitting, prone or behind cover', async () => {
    const el = await fixture(
      html`<missile-attack
        strength="12"
        agility="18"
        weapon="Shortbow"
      ></missile-attack>`
    );

    assert.match(el.shadowRoot?.innerHTML, /1d20\+3/);
    el.shadowRoot
      ?.querySelector('input[name=kneeling-sitting-prone-behind-cover]')
      ?.click();
    await el.updateComplete;

    assert.match(el.shadowRoot?.innerHTML, /1d20\+1/);
  });

  test('your target is... blinded', async () => {
    const el = await fixture(
      html`<missile-attack
        strength="12"
        agility="18"
        weapon="Shortbow"
      ></missile-attack>`
    );

    assert.match(el.shadowRoot?.innerHTML, /1d20\+3/);
    el.shadowRoot?.querySelector('input[name=blinded]')?.click();
    await el.updateComplete;

    assert.match(el.shadowRoot?.innerHTML, /1d20\+5/);
  });

  test('your target is... entangled, paralyzed, sleeping or bound', async () => {
    const el = await fixture(
      html`<missile-attack
        strength="12"
        agility="18"
        weapon="Shortbow"
      ></missile-attack>`
    );

    assert.match(el.shadowRoot?.innerHTML, /1d20\+3/);
    el.shadowRoot
      ?.querySelector('input[name=entangled-paralyzed-sleeping-bound]')
      ?.click();
    await el.updateComplete;

    assert.match(el.shadowRoot?.innerHTML, /1d24\+3/);
  });

  test('increment attack die on the dice chain', async () => {
    const el = await fixture(
      html`<missile-attack
        strength="12"
        agility="18"
        weapon="Shortbow"
      ></missile-attack>`
    );

    assert.match(el.shadowRoot?.innerHTML, /1d20\+3/);
    el.shadowRoot?.querySelector('#increment-dice-chain')?.click();
    await el.updateComplete;

    assert.match(el.shadowRoot?.innerHTML, /1d24\+3/);
  });

  test('increment attack die stays within bounds', async () => {
    const el = await fixture(
      html`<missile-attack
        strength="12"
        agility="18"
        weapon="Shortbow"
      ></missile-attack>`
    );

    assert.match(el.shadowRoot?.innerHTML, /1d20\+3/);
    el.shadowRoot?.querySelector('#increment-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#increment-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#increment-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#increment-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#increment-dice-chain')?.click();
    await el.updateComplete;

    assert.match(el.shadowRoot?.innerHTML, /1d30\+3/);
  });

  test('decrement attack die on the dice chain', async () => {
    const el = await fixture(
      html`<missile-attack
        strength="12"
        agility="18"
        weapon="Shortbow"
      ></missile-attack>`
    );

    assert.match(el.shadowRoot?.innerHTML, /1d20\+3/);
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;

    assert.match(el.shadowRoot?.innerHTML, /1d16\+3/);
  });

  test('decrement attack die stays within bounds', async () => {
    const el = await fixture(
      html`<missile-attack
        strength="12"
        agility="18"
        weapon="Shortbow"
      ></missile-attack>`
    );

    assert.match(el.shadowRoot?.innerHTML, /1d20\+3/);
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('#decrement-dice-chain')?.click();
    await el.updateComplete;

    assert.match(el.shadowRoot?.innerHTML, /1d3\+3/);
  });

  test('listening for attack events', async () => {
    let clickedCount = 0;
    let diceRoll;
    const clickHandler = (event) => {
      clickedCount++;
      diceRoll = event.detail.diceRoll;
    };
    const el = await fixture(
      html`<missile-attack
        @attack-roll=${clickHandler}
        strength="12"
        agility="12"
        weapon="Longbow"
      ></missile-attack>`
    );
    const button = el.shadowRoot?.querySelector('.attack-display-button');
    button?.click();
    // @ts-ignore
    await el.updateComplete;
    assert.equal(clickedCount, 1);
    assert.equal(diceRoll.name, 'Missile Attack');
    assert.equal(
      diceRoll.description,
      'A missile attack roll was made with a longbow'
    );
    assert.equal(diceRoll.qty, 1);
    assert.equal(diceRoll.die, 20);
    assert.equal(diceRoll.mod, 0);
    assert.equal(diceRoll.weapon, 'Longbow');
  });

  test('listening for attack events using an increased die and a modifier', async () => {
    let attackRoll;
    let damageRoll;
    const attackClickHandler = (event) => {
      attackRoll = event.detail.diceRoll;
    };
    const damageClickHandler = (event) => {
      damageRoll = event.detail.diceRoll;
    };
    const el = await fixture(
      html`<missile-attack
        @attack-roll=${attackClickHandler}
        @damage-roll=${damageClickHandler}
        strength="18"
        agility="18"
        weapon="Dagger"
      ></missile-attack>`
    );
    el.shadowRoot?.querySelector('#increment-dice-chain')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('input[name="sneak-attack"]')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('.attack-display-button')?.click();
    await el.updateComplete;
    el.shadowRoot?.querySelector('.damage-display-button')?.click();
    await el.updateComplete;
    // @ts-ignore
    assert.equal(attackRoll.qty, 1);
    assert.equal(attackRoll.die, 24);
    assert.equal(attackRoll.mod, +3);
    assert.equal(damageRoll.qty, 1);
    assert.equal(damageRoll.die, 10);
    assert.equal(damageRoll.mod, +3);
  });

  test('listening for damage events', async () => {
    let clickedCount = 0;
    let diceRoll;
    const clickHandler = (event) => {
      clickedCount++;
      diceRoll = event.detail.diceRoll;
    };
    const el = await fixture(
      html`<missile-attack
        @damage-roll=${clickHandler}
        strength="12"
        agility="12"
        weapon="Longbow"
      ></missile-attack>`
    );
    const button = el.shadowRoot?.querySelector('.damage-display-button');
    button?.click();
    // @ts-ignore
    await el.updateComplete;
    assert.equal(clickedCount, 1);
    assert.equal(diceRoll.name, 'Missile Damage');
    assert.equal(
      diceRoll.description,
      'A missile damage roll was made with a longbow'
    );
    assert.equal(diceRoll.qty, 1);
    assert.equal(diceRoll.die, 6);
    assert.equal(diceRoll.mod, 0);
    assert.equal(diceRoll.weapon, 'Longbow');
  });
});
