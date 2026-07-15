import { describe, expect, it } from 'vitest'
import {
  DEFAULT_HERO_LOOK,
  INITIAL_HERO,
  LEGACY_AVATAR_IDS,
  heroLookFrom,
  legacyAvatarRefund,
  normalizeHero,
} from '../src/game/heroParts'
import { COSMETIC_BY_ID, COSMETICS, DEFAULTS, FREE_COSMETICS } from '../src/game/cosmetics'

/**
 * The Hero customizer replaced the emoji-avatar roster in save v3. These cover
 * the migration path a real v2 save takes: the old flat aura shape is coerced to
 * the nested one, retired avatars are refunded, and nothing dangles.
 */
describe('hero customization', () => {
  it('resolves null colors to the tmux-green default look', () => {
    expect(heroLookFrom(INITIAL_HERO)).toEqual(DEFAULT_HERO_LOOK)
    expect(DEFAULT_HERO_LOOK.body).toBe('#3ddc84')
  })

  it('keeps custom colors over the defaults', () => {
    const look = heroLookFrom({ ...INITIAL_HERO, body: '#ff0000' })
    expect(look.body).toBe('#ff0000')
    expect(look.trim).toBe(DEFAULT_HERO_LOOK.trim)
  })

  it('normalizes a v2 hero (flat aura) to the nested shape', () => {
    // v2 stored { color, effect, intensity } directly on `hero`.
    const hero = normalizeHero({ color: '#ff6ac1', effect: 'fire', intensity: 0.9 })
    expect(hero.aura).toEqual({ color: '#ff6ac1', style: 'fire', intensity: 0.9 })
    expect(hero.accessory).toBe('none')
    expect(hero.visorStyle).toBe('bar')
    expect(hero.body).toBeNull()
  })

  it('round-trips a v3 hero unchanged', () => {
    const hero = {
      body: '#123456',
      trim: '#abcdef',
      visor: '#000000',
      accessory: 'tophat' as const,
      visorStyle: 'goggles' as const,
      aura: { color: '#ffffff', style: 'rings' as const, intensity: 0.25 },
    }
    expect(normalizeHero(hero)).toEqual(hero)
  })

  it('falls back to defaults on garbage input', () => {
    expect(normalizeHero(null)).toEqual(INITIAL_HERO)
    expect(normalizeHero({ body: 'not-a-color', accessory: 'jetpack', visorStyle: 9 })).toEqual(INITIAL_HERO)
    // Shorthand hex is rejected: the server contract is 6-digit.
    expect(normalizeHero({ body: '#fff' }).body).toBeNull()
  })

  it('clamps aura intensity into 0..1', () => {
    expect(normalizeHero({ aura: { intensity: 5 } }).aura.intensity).toBe(1)
    expect(normalizeHero({ aura: { intensity: -3 } }).aura.intensity).toBe(0)
  })

  it('refunds exactly what the retired avatars cost', () => {
    // A v2 player who bought the dragon (120) and cat (30); 'robot' was free.
    expect(legacyAvatarRefund(['robot', 'cat', 'dragon'])).toBe(150)
    // Cosmetics that still exist are never refunded.
    expect(legacyAvatarRefund(['crt', 'tmux-green', 'nebula'])).toBe(0)
    expect(legacyAvatarRefund([])).toBe(0)
  })
})

describe('cosmetics catalog', () => {
  it('no longer sells avatars', () => {
    expect(COSMETICS.some((c) => (c.kind as string) === 'avatar')).toBe(false)
    for (const id of LEGACY_AVATAR_IDS) {
      expect(COSMETIC_BY_ID[id], `retired avatar '${id}' still in the catalog`).toBeUndefined()
    }
  })

  it('defaults are free and therefore owned from the first launch', () => {
    expect(FREE_COSMETICS).toContain(DEFAULTS.theme)
    expect(FREE_COSMETICS).toContain(DEFAULTS.background)
  })

  it('every background has a scene key and every theme a pair of accents', () => {
    for (const c of COSMETICS) {
      if (c.kind === 'background') expect(c.bg, `${c.id} has no bg key`).toBeTruthy()
      if (c.kind === 'theme') {
        expect(c.accent, `${c.id} has no accent`).toMatch(/^#[0-9a-f]{6}$/i)
        expect(c.accentDim, `${c.id} has no accentDim`).toMatch(/^#[0-9a-f]{6}$/i)
      }
    }
  })

  it('cosmetic ids are unique', () => {
    const ids = COSMETICS.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
