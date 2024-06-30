import {LitElement, html, css} from 'lit';

const diceChain = [
  'd3',
  'd4',
  'd5',
  'd6',
  'd7',
  'd8',
  'd10',
  'd12',
  'd14',
  'd16',
  'd20',
  'd24',
  'd30',
];

class DiceRoll {
  name = '';
  description = '';
  qty = 1;
  die = 20;
  mod = +0;
  weapon = '';
  range = 'short';
  squeezingEntangledUntrained = false;
  firingIntoMelee = false;
  sneakAttack = false;
  opponentKneelingSittingProneBehindCover = false;
  opponentBlinded = false;
  opponentEntangledParalyzedSleepingBound = false;
  attackDieAdjustment = 0;
}

const weapons = new Map([
  [
    'Blowgun',
    {
      range: {short: 20, medium: 40, long: 60},
      damage: '1d3',
      sneakDamage: '1d5',
      cost: 6,
    },
  ],
  [
    'Crossbow',
    {
      range: {short: 80, medium: 160, long: 240},
      damage: '1d6',
      twoHanded: true,
      cost: 30,
    },
  ],
  [
    'Dagger',
    {
      range: {short: 10, medium: 20, long: 30},
      damage: '1d4',
      sneakDamage: '1d10',
      thrown: true,
      cost: 3,
      addStrengthToDamageAtShortRange: true,
    },
  ],
  [
    'Dart',
    {
      range: {short: 20, medium: 40, long: 60},
      damage: '1d3',
      thrown: true,
      cost: 0.5,
      addStrengthToDamageAtShortRange: true,
    },
  ],
  [
    'Handaxe',
    {
      range: {short: 10, medium: 20, long: 30},
      damage: '1d3',
      thrown: true,
      cost: 4,
      addStrengthToDamageAtShortRange: true,
    },
  ],
  [
    'Javelin',
    {
      range: {short: 30, medium: 60, long: 90},
      damage: '1d3',
      thrown: true,
      cost: 1,
      addStrengthToDamageAtShortRange: true,
    },
  ],
  [
    'Longbow',
    {
      range: {short: 70, medium: 140, long: 210},
      damage: '1d6',
      twoHanded: true,
      cost: 40,
    },
  ],
  [
    'Shortbow',
    {
      range: {short: 50, medium: 100, long: 150},
      damage: '1d6',
      twoHanded: true,
      cost: 25,
    },
  ],
  [
    'Sling',
    {
      range: {short: 40, medium: 80, long: 160},
      damage: '1d3',
      cost: 2,
      addStrengthToDamageAtShortRange: true,
    },
  ],
]);

// @ts-ignore
export class MissileAttack extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0px;
        font-family: var(--main-font, 'Arial', sans-serif);
        font-size: 1em;
      }
      .wrapper {
        border: 1px black solid;
        width: fit-content;
        padding: 10px;
        border-radius: 10px;
        min-width: 260px;
        min-height: 210px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .buttons {
        display: flex;
        gap: 5px;
        justify-content: center;
      }
      button.attack-display-button,
      button.damage-display-button {
        aspect-ratio: 1 / 1;
        border-radius: 5px;
        border: 1px black solid;
        cursor: pointer;
        background: none;
        min-width: 50px;
        min-height: 50px;
        margin: 0;
        padding: 0;
        color: black;
      }
      button:hover {
        background-color: rgba(211, 211, 211, 0.5);
      }
      button:active {
        transform: translateY(1px);
      }
      .dice-chain-adjustment-buttons {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .dice-chain-adjustment-buttons button {
        margin: 0;
        padding: 0px;
        aspect-ratio: 1/1;
        width: 22px;
        border: 1px black solid;
        cursor: pointer;
        border-radius: 50%;
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }
      h1 {
        margin: 0;
        padding: 0;
        font-size: 0.8em;
      }
      h2 {
        margin: 0;
        padding: 0;
        font-size: 0.6em;
      }
      .range {
        font-size: 0.8em;
      }
      ul {
        font-size: 0.8em;
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      .checkboxes {
        margin: 0;
        padding: 0;
      }
      .checkboxes li {
        display: flex;
        gap: 5px;
        align-items: center;
      }
      header {
        display: flex;
        justify-content: space-between;
      }
      input[type='checkbox'],
      input[type='radio'] {
        margin: 0;
      }
      .range ul {
        display: flex;
        gap: 5px;
      }
      .range label {
        display: flex;
        gap: 5px;
        flex-direction: row;
        align-items: center;
      }
      .attack {
        display: flex;
        gap: 5px;
      }
    `;
  }

  static get properties() {
    return {
      strength: {type: Number, required: true},
      agility: {type: Number, required: true},
      weapon: {type: String, reflect: true},
      attackDie: {attribute: 'attack-die', type: String, reflect: true},
      damageDie: {attribute: 'damage-die', type: String, reflect: true},
      attackModifierAdjustment: {
        attribute: 'attack-modifier-adjustment',
        type: Number,
      },
      attackModifierOverride: {
        attribute: 'attack-modifier-override',
        type: Number,
      },
      damageModifierAdjustment: {
        attribute: 'damage-modifier-adjustment',
        type: Number,
      },
      damageModifierOverride: {
        attribute: 'damage-modifier-override',
        type: Number,
      },
      range: {state: true},
      squeezingEntangledUntrained: {state: true},
      firingIntoMelee: {state: true},
      sneakAttack: {state: true},
      opponentKneelingSittingProneBehindCover: {state: true},
      opponentBlinded: {state: true},
      opponentEntangledParalyzedSleepingBound: {state: true},
      attackDieAdjustment: {state: true},
    };
  }

  constructor() {
    super();
    this.strength = null;
    this.agility = null;
    this.weapon = null;
    this.attackDie = 'd20';
    this.damageDie = null;
    this.attackModifierAdjustment = 0;
    this.attackModifierOverride = null;
    this.damageModifierAdjustment = 0;
    this.damageModifierOverride = null;
    this.range = 'short';
    this.squeezingEntangledUntrained = false;
    this.firingIntoMelee = false;
    this.sneakAttack = false;
    this.opponentKneelingSittingProneBehindCover = false;
    this.opponentBlinded = false;
    this.opponentEntangledParalyzedSleepingBound = false;
    this.attackDieAdjustment = 0;
  }

  render() {
    const weaponStats = this._weaponStatsFor(this.weapon);
    return html`
      <div class="wrapper" part="wrapper">
        <header part="header">
          <div class="text">
            <h1 part="title">Missile</h1>
            <h2 part="subtitle">${this.weapon}</h2>
          </div>
          <div class="buttons">
            <div class="attack" part="attack">
              <div class="dice-chain-adjustment-buttons">
                <button
                  id="increment-dice-chain"
                  @click="${this.adjustAttackDieUp}"
                >
                  +
                </button>
                <button
                  id="decrement-dice-chain"
                  @click="${this.adjustAttackDieDown}"
                >
                  -
                </button>
              </div>
              <button
                class="attack-display-button"
                @click="${this._attackRoll}"
              >
                <h2 part="subtitle">Attack</h2>
                ${this.attackDisplay}
              </button>
            </div>
            <div class="damage" part="damage">
              <button
                class="damage-display-button"
                @click="${this._damageRoll}"
              >
                <h2 part="subtitle">Damage</h2>
                ${this.damageDisplay}
              </button>
            </div>
          </div>
        </header>
        <div class="range" part="range">
          <ul>
            <li>
              <label>
                <input
                  id="range-short"
                  type="radio"
                  name="range"
                  value="short"
                  .checked="${this.range === 'short'}"
                  @change="${this.handleRangeChange}"
                />
                Short (${weaponStats?.range.short})
              </label>
            </li>
            <li>
              <label>
                <input
                  id="range-medium"
                  type="radio"
                  name="range"
                  value="medium"
                  .checked="${this.range === 'medium'}"
                  @change="${this.handleRangeChange}"
                />
                Medium (${weaponStats?.range.medium})
              </label>
            </li>
            <li>
              <label>
                <input
                  id="range-long"
                  type="radio"
                  name="range"
                  value="long"
                  .checked="${this.range === 'long'}"
                  @change="${this.handleRangeChange}"
                />
                Long (${weaponStats?.range.long})
              </label>
            </li>
          </ul>
        </div>
        <div class="you-are" part="you-are">
          <h2>You are...</h2>
          <ul class="checkboxes">
            <label>
              <li>
                <input
                  type="checkbox"
                  name="squeezing-entangled-untrained"
                  .checked="${this.squeezingEntangledUntrained}"
                  @change="${this.handleCheckboxChange}"
                />
                squeezing, entangled or untrained
              </li>
            </label>
            <label>
              <li>
                <input
                  type="checkbox"
                  name="firing-into-melee"
                  .checked="${this.firingIntoMelee}"
                  @change="${this.handleCheckboxChange}"
                />
                firing into melee
              </li>
            </label>
            <label>
              <li>
                <input
                  type="checkbox"
                  name="sneak-attack"
                  .checked="${this.sneakAttack}"
                  @change="${this.handleCheckboxChange}"
                />
                performing a <em>sneak attack</em>
              </li>
            </label>
          </ul>
        </div>
        <div class="your-target-is" part="your-target-is">
          <h2>Your target is...</h2>
          <ul class="checkboxes">
            <li>
              <label>
                <input
                  type="checkbox"
                  name="kneeling-sitting-prone-behind-cover"
                  .checked="${this.opponentKneelingSittingProneBehindCover}"
                  @change="${this.handleCheckboxChange}"
                />
                kneeling, sitting, prone or behind cover
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="blinded"
                  .checked="${this.opponentBlinded}"
                  @change="${this.handleCheckboxChange}"
                />
                blinded
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="entangled-paralyzed-sleeping-bound"
                  .checked="${this.opponentEntangledParalyzedSleepingBound}"
                  @change="${this.handleCheckboxChange}"
                />
                entangled, paralyzed, sleeping or bound
              </label>
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  handleRangeChange(event) {
    this.range = event.target.value;
  }

  handleCheckboxChange(event) {
    switch (event.target.name) {
      case 'squeezing-entangled-untrained':
        this.squeezingEntangledUntrained = event.target.checked;
        break;
      case 'firing-into-melee':
        this.firingIntoMelee = event.target.checked;
        break;
      case 'sneak-attack':
        this.sneakAttack = event.target.checked;
        break;
      case 'kneeling-sitting-prone-behind-cover':
        this.opponentKneelingSittingProneBehindCover = event.target.checked;
        break;
      case 'blinded':
        this.opponentBlinded = event.target.checked;
        break;
      case 'entangled-paralyzed-sleeping-bound':
        this.opponentEntangledParalyzedSleepingBound = event.target.checked;
        break;
      default:
        break;
    }
  }

  adjustAttackDieUp() {
    if (this._attackDie === 'd30') return;
    this.attackDieAdjustment++;
  }

  adjustAttackDieDown() {
    if (this._attackDie === 'd3') return;
    this.attackDieAdjustment--;
  }

  _attackRoll() {
    const dr = new DiceRoll();
    dr.name = 'Missile Attack';
    dr.description = `A missile attack roll was made with a ${this.weapon?.toLowerCase()}`;
    dr.weapon = this.weapon;

    const [qty, die] = this._attackDie.split('d');
    dr.qty = Number(qty || 1);
    dr.die = Number(die || 20);
    dr.mod = this._attackModifier;

    dr.range = this.range;
    dr.attackDieAdjustment = this.attackDieAdjustment;
    dr.squeezingEntangledUntrained = this.squeezingEntangledUntrained;
    dr.firingIntoMelee = this.firingIntoMelee;
    dr.sneakAttack = this.sneakAttack;
    dr.opponentKneelingSittingProneBehindCover =
      this.opponentKneelingSittingProneBehindCover;
    dr.opponentBlinded = this.opponentBlinded;
    dr.opponentEntangledParalyzedSleepingBound =
      this.opponentEntangledParalyzedSleepingBound;

    this.dispatchEvent(
      new CustomEvent('attack-roll', {detail: {diceRoll: dr}})
    );

    // reset attack die adjustment back to 0 after each roll
    this.attackDieAdjustment = 0;
  }

  _damageRoll() {
    const dr = new DiceRoll();
    dr.name = 'Missile Damage';
    dr.description = `A missile damage roll was made with a ${this.weapon?.toLowerCase()}`;
    dr.weapon = this.weapon;

    const [qty, die] = this._damageDie.split('d');
    dr.qty = Number(qty || 1);
    dr.die = Number(die || 4);
    dr.mod = this._damageModifier;

    dr.range = this.range;
    dr.attackDieAdjustment = this.attackDieAdjustment;
    dr.squeezingEntangledUntrained = this.squeezingEntangledUntrained;
    dr.firingIntoMelee = this.firingIntoMelee;
    dr.sneakAttack = this.sneakAttack;
    dr.opponentKneelingSittingProneBehindCover =
      this.opponentKneelingSittingProneBehindCover;
    dr.opponentBlinded = this.opponentBlinded;
    dr.opponentEntangledParalyzedSleepingBound =
      this.opponentEntangledParalyzedSleepingBound;

    this.dispatchEvent(
      new CustomEvent('damage-roll', {detail: {diceRoll: dr}})
    );
  }

  get _attackDie() {
    // start with the attackDie that may have been passed in as an attribute (or the default)
    let [qty, die] = this.attackDie.split('d');
    die = `d${die}`;
    qty = qty || '1';

    // if the range is long, it's minus 1 die
    if (this.range === 'long') {
      // guard against going out of bounds in the dice chain
      if (diceChain[diceChain.indexOf(die) - 1]) {
        die = diceChain[diceChain.indexOf(die) - 1];
      }
    }

    // if you are restricted in some way, it's minus 1 die
    if (this.squeezingEntangledUntrained) {
      // guard against going out of bounds in the dice chain
      if (diceChain[diceChain.indexOf(die) - 1]) {
        die = diceChain[diceChain.indexOf(die) - 1];
      }
    }

    // if your opponent is restricted, it's plus 1 die
    if (this.opponentEntangledParalyzedSleepingBound) {
      // guard against going out of bounds in the dice chain
      if (diceChain[diceChain.indexOf(die) + 1]) {
        die = diceChain[diceChain.indexOf(die) + 1];
      }
    }

    // if the plus/minus buttons have been used to adjust the dice chain manually
    // iterate until all increments or decrements have been used to move the dice chain up or down
    let i = this.attackDieAdjustment;
    while (i !== 0) {
      if (i < 0) {
        if (die === 'd3') {
          i = 0;
          continue;
        }
        die = diceChain[diceChain.indexOf(die) - 1];
        i++;
      } else {
        if (die === 'd30') {
          i = 0;
          continue;
        }
        die = diceChain[diceChain.indexOf(die) + 1];
        i--;
      }
    }

    return `${qty}${die}`;
  }

  get _attackModifier() {
    let modifier = this._modifierFor(this.agility);
    if (this.attackModifierAdjustment)
      modifier += this.attackModifierAdjustment;

    if (this.range === 'medium') modifier -= 2;
    if (this.firingIntoMelee) modifier -= 1;
    if (this.opponentBlinded) modifier += 2;
    if (this.opponentKneelingSittingProneBehindCover) modifier -= 2;

    if (this.attackModifierOverride) modifier = this.attackModifierOverride;
    return modifier;
  }

  get attackDisplay() {
    const die = this._attackDie;
    const mod = this._attackModifier;
    return `${die}${mod ? (mod > 0 ? `+${mod}` : mod) : ''}`;
  }

  get _damageDie() {
    const weaponStats = weapons.get(this.weapon);

    let die = null;

    // set the die to the weapon's normal damage die
    if (weaponStats?.damage) die = weaponStats.damage;

    // if the character is performing a sneak attack and has a weapon that uses a higher die for sneak attacks, use that
    if (this.sneakAttack && weaponStats?.sneakDamage)
      die = weaponStats?.sneakDamage;

    // allow override via attributes
    if (this.damageDie) die = this.damageDie;

    return die;
  }

  get _damageModifier() {
    // start with zero modifier
    let modifier = 0;

    // apply any attribute based adjustment
    if (this.damageModifierAdjustment)
      modifier += this.damageModifierAdjustment;

    // add strength modifier to certain weapons when used at short range
    const weapon = weapons.get(this.weapon);
    if (
      weapon &&
      weapon.addStrengthToDamageAtShortRange &&
      this.range === 'short'
    ) {
      modifier += this._modifierFor(this.strength);
    }

    // allow complete override
    if (this.damageModifierOverride) modifier = this.damageModifierOverride;
    return modifier;
  }

  get damageDisplay() {
    const mod = this._damageModifier;
    return `${this._damageDie}${mod ? (mod > 0 ? `+${mod}` : mod) : ''}`;
  }

  _weaponStatsFor(weaponType) {
    const weapon = weapons.get(weaponType);
    if (weapon) {
      return weapon;
    }
  }

  _modifierFor(stat) {
    if (stat <= 3) return -3;
    if (stat >= 4 && stat <= 5) return -2;
    if (stat >= 6 && stat <= 8) return -1;
    if (stat >= 9 && stat <= 12) return 0;
    if (stat >= 13 && stat <= 15) return +1;
    if (stat >= 16 && stat <= 17) return +2;
    if (stat >= 18) return +3;
    return 0;
  }
}

window.customElements.define('missile-attack', MissileAttack);
