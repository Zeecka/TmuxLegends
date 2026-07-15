import { Suspense, lazy, useState } from 'react'
import { Emoji } from './Emoji'
import { sfx } from '../game/sound'

// The modal + the PDF generator load only when a player actually opens the
// sheet — keeping the sync bundle lean.
const CheatsheetModal = lazy(() => import('./CheatsheetModal'))

/**
 * Self-contained trigger + lazy modal. Drop anywhere. `keepSurfaceFocus` uses the
 * mousedown-preventDefault trick so opening it mid-level doesn't steal the tmux
 * surface's focus, and `onClosed` lets the play screen hand focus back.
 */
export function CheatsheetButton({
  className = '',
  label = 'Cheatsheet',
  responsive = false,
  keepSurfaceFocus = false,
  onClosed,
}: {
  className?: string
  /** Visible button text (also part of the accessible name). */
  label?: string
  /** Hide the label below the `md` breakpoint (for the crowded top bar). */
  responsive?: boolean
  keepSurfaceFocus?: boolean
  onClosed?: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onMouseDown={keepSurfaceFocus ? (e) => e.preventDefault() : undefined}
        onClick={() => {
          sfx.ui()
          setOpen(true)
        }}
        title="tmux cheatsheet — every binding, downloadable"
        aria-label="Open the tmux cheatsheet"
        className={
          className ||
          'inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-ink-dim transition-colors hover:border-term hover:text-term'
        }
      >
        <Emoji name="keyboard" size={14} />
        {label && <span className={responsive ? 'hidden md:inline' : undefined}>{label}</span>}
      </button>
      {open && (
        <Suspense fallback={null}>
          <CheatsheetModal
            onClose={() => {
              setOpen(false)
              onClosed?.()
            }}
          />
        </Suspense>
      )}
    </>
  )
}
