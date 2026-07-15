import { useMemo, useState } from 'react'
import { CHEAT_ROW_COUNT, PREFIX_LABEL, filterCheatsheet, type CheatRow } from '../game/cheatsheet'
import { downloadCheatsheetPdf } from '../game/pdf'

/**
 * A browsable, searchable tmux reference - and a one-click PDF download of the
 * same content (generated offline, see game/pdf.ts). Both read from the single
 * cheatsheet data module so they can never disagree.
 */
export function Cheatsheet() {
  const [q, setQ] = useState('')
  const sections = useMemo(() => filterCheatsheet(q), [q])

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-terminal text-3xl font-bold text-ink">tmux cheatsheet</h2>
          <p className="mt-1 text-sm text-ink-dim">
            The bindings that matter, in one place. Default prefix is{' '}
            <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-term">{PREFIX_LABEL}</code> - press it, release,
            then the key. {CHEAT_ROW_COUNT} entries.
          </p>
        </div>
        <button
          onClick={() => downloadCheatsheetPdf()}
          className="btn-primary inline-flex shrink-0 items-center gap-2 self-start rounded-xl px-4 py-2.5 font-bold sm:self-auto"
          title="Download the full cheatsheet as a PDF"
        >
          <span aria-hidden>&#8595;</span> Download PDF
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter bindings..."
            className="w-full rounded-lg border border-border bg-panel-2/60 px-3 py-2 text-sm text-ink placeholder:text-ink-dim/60 outline-none transition-colors focus:border-term"
          />
          {q && (
            <button
              onClick={() => setQ('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-dim hover:text-term"
              title="Clear"
            >
              &times;
            </button>
          )}
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-dim">
          <span className="inline-block h-2 w-2 rounded-full bg-term" /> playable in Tmuxpert
        </span>
      </div>

      {sections.length === 0 ? (
        <p className="mt-10 text-center text-ink-dim">
          Nothing matches &ldquo;{q}&rdquo;.
        </p>
      ) : (
        <div className="mt-6 gap-4 md:columns-2 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {sections.map((sec) => (
            <section
              key={sec.title}
              className="panel p-4"
              style={{ borderColor: 'color-mix(in srgb, var(--color-term) 30%, var(--color-border))' }}
            >
              <h3 className="font-terminal text-lg font-bold text-term">{sec.title}</h3>
              {sec.blurb && <p className="mt-0.5 text-xs text-ink-dim">{sec.blurb}</p>}
              <div className="mt-3 space-y-2">
                {sec.rows.map((row) => (
                  <Row key={row.keys} row={row} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

function Row({ row }: { row: CheatRow }) {
  return (
    <div className="border-b border-border/40 pb-2 last:border-0 last:pb-0">
      <div className="flex items-center gap-2">
        {row.sim ? (
          <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-term" title="Playable in Tmuxpert" />
        ) : (
          <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full border border-border" />
        )}
        <code className={`font-mono text-[13px] ${row.sim ? 'text-ink' : 'text-ink-dim'}`}>{row.keys}</code>
      </div>
      <p className="ml-4 mt-0.5 text-[13px] text-ink-dim">{row.desc}</p>
    </div>
  )
}
