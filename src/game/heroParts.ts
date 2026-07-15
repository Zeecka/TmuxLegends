/**
 * The one customizable Hero — "Muxie", the animated robot in play mode. Replaces
 * the old fixed-avatar roster: instead of buying a character, the player styles
 * this Hero — per-zone colors, a procedural accessory, a visor style, and a
 * custom aura. Shared, in design and code, with Vimersion's Hero.
 *
 * Zone → model material (public/models/hero.glb): body=`Main`, trim=`Grey`,
 * visor=`Black`. The 2D <HeroMark/> mirrors the same three zones.
 */

export type AccessoryId = 'none' | 'antenna' | 'halo' | 'tophat' | 'headphones' | 'cape'
export type VisorStyle = 'bar' | 'goggles' | 'single' | 'grille'
export type AuraStyle = 'sparkles' | 'fire' | 'bolt' | 'orbit' | 'rings'

export interface HeroAura {
  /** Custom aura tint; null = the equipped theme accent. */
  color: string | null
  style: AuraStyle
  /** 0..1 — particle density / glow strength. */
  intensity: number
}

/** Persisted Hero customization. null colors = the default look below. */
export interface HeroCustom {
  body: string | null
  trim: string | null
  visor: string | null
  accessory: AccessoryId
  visorStyle: VisorStyle
  aura: HeroAura
}

/** Resolved (non-null) colors, ready to paint the 3D materials / 2D mark. */
export interface HeroLook {
  body: string
  trim: string
  visor: string
}

/** Muxie's default look — tmux status-bar green, matching Tmuxpert's accent. */
export const DEFAULT_HERO_LOOK: HeroLook = { body: '#3ddc84', trim: '#9aa7c7', visor: '#0e1119' }

export const INITIAL_HERO: HeroCustom = {
  body: null,
  trim: null,
  visor: null,
  accessory: 'none',
  visorStyle: 'bar',
  aura: { color: null, style: 'sparkles', intensity: 0.6 },
}

/** Catalogs — labels + the `emoji` used for the lite-tier 2D aura particles. */
export const ACCESSORIES: { id: AccessoryId; name: string }[] = [
  { id: 'none', name: 'None' },
  { id: 'antenna', name: 'Antenna' },
  { id: 'halo', name: 'Halo' },
  { id: 'tophat', name: 'Top Hat' },
  { id: 'headphones', name: 'Headphones' },
  { id: 'cape', name: 'Cape' },
]

export const VISOR_STYLES: { id: VisorStyle; name: string }[] = [
  { id: 'bar', name: 'Visor' },
  { id: 'goggles', name: 'Goggles' },
  { id: 'single', name: 'Cyclops' },
  { id: 'grille', name: 'Grille' },
]

export const AURA_STYLES: { id: AuraStyle; name: string; emoji: string }[] = [
  { id: 'sparkles', name: 'Sparkles', emoji: 'sparkles' },
  { id: 'fire', name: 'Fire', emoji: 'fire' },
  { id: 'bolt', name: 'Bolt', emoji: 'bolt' },
  { id: 'orbit', name: 'Orbit', emoji: 'sparkles' },
  { id: 'rings', name: 'Rings', emoji: 'sparkles' },
]

const ACCESSORY_IDS = ACCESSORIES.map((a) => a.id) as string[]
const VISOR_IDS = VISOR_STYLES.map((v) => v.id) as string[]
const AURA_IDS = AURA_STYLES.map((a) => a.id) as string[]

/**
 * The old emoji-avatar roster (removed in save v3, when the Hero customizer
 * replaced it), mapped to what each one cost. Migration strips these from
 * `owned` and refunds the coins, so nobody loses value on the way over — see
 * store.ts. Keep the prices frozen at their retired values; they are history,
 * not a live price list.
 */
export const LEGACY_AVATAR_PRICES: Readonly<Record<string, number>> = Object.freeze({
  robot: 0,
  cat: 30,
  fox: 30,
  ghost: 40,
  alien: 60,
  wizard: 80,
  ninja: 90,
  dragon: 120,
})

export const LEGACY_AVATAR_IDS: string[] = Object.keys(LEGACY_AVATAR_PRICES)

/** Coins to give back for a save's owned legacy avatars. */
export function legacyAvatarRefund(owned: readonly string[]): number {
  return owned.reduce((sum, id) => sum + (LEGACY_AVATAR_PRICES[id] ?? 0), 0)
}

const isHex = (v: unknown): v is string => typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v)

/** Resolve a HeroCustom to concrete colors (custom picks win, else the default). */
export function heroLookFrom(hero: HeroCustom): HeroLook {
  return {
    body: hero.body ?? DEFAULT_HERO_LOOK.body,
    trim: hero.trim ?? DEFAULT_HERO_LOOK.trim,
    visor: hero.visor ?? DEFAULT_HERO_LOOK.visor,
  }
}

/**
 * Coerce any persisted/legacy hero blob to the canonical shape. Accepts the old
 * flat aura shape `{ color, effect, intensity }` (save v2, when Muxie was an
 * emoji face with only an aura to style) as well as the new nested one; invalid
 * fields fall back to defaults. Colors are validated as 6-digit hex (which is
 * also the server's snapshot contract).
 */
export function normalizeHero(raw: unknown): HeroCustom {
  const h = (raw ?? {}) as Record<string, unknown>
  const aura = (h.aura ?? {}) as Record<string, unknown>
  // v2 stored the aura flat on the hero; v3 nests it under `aura`.
  const style = AURA_IDS.includes(aura.style as string)
    ? (aura.style as AuraStyle)
    : AURA_IDS.includes(h.effect as string)
      ? (h.effect as AuraStyle)
      : 'sparkles'
  const color = isHex(aura.color) ? aura.color : isHex(h.color) ? h.color : null
  const rawIntensity = typeof aura.intensity === 'number' ? aura.intensity : h.intensity
  return {
    body: isHex(h.body) ? h.body : null,
    trim: isHex(h.trim) ? h.trim : null,
    visor: isHex(h.visor) ? h.visor : null,
    accessory: ACCESSORY_IDS.includes(h.accessory as string) ? (h.accessory as AccessoryId) : 'none',
    visorStyle: VISOR_IDS.includes(h.visorStyle as string) ? (h.visorStyle as VisorStyle) : 'bar',
    aura: {
      color,
      style,
      intensity: typeof rawIntensity === 'number' ? Math.min(1, Math.max(0, rawIntensity)) : 0.6,
    },
  }
}
