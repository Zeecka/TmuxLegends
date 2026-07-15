/**
 * Which scene indices (CHALLENGES order) have a dedicated 3D scene.
 *
 * Sync-bundle-safe: NO three imports here. CampaignMode consults this to
 * decide whether to go glass over a bespoke world — the actual component map
 * lives in sceneRegistry.ts inside the lazy 3D chunk. Keep the two in lock-step.
 */
export const HAS_3D_SCENE: ReadonlySet<number> = new Set()
