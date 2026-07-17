/**
 * Quiz content — a hand-written, multiple-choice question bank grouped by world,
 * mirroring the campaign curriculum. It powers the touch-friendly Quiz mode (the
 * mobile-first way to train, where the interactive tmux surface isn't practical).
 * Pure data, like challenges: `answer` indexes into `choices`; `explain` is shown
 * after you pick. Every binding assumes the default prefix, Ctrl-b (written C-b).
 */
export interface QuizQuestion {
  id: string
  tier: number
  prompt: string
  choices: string[]
  answer: number
  explain?: string
}

export const QUIZ: QuizQuestion[] = [
  // ── World 1 · Split ──────────────────────────────────────────────────
  {
    id: 'q1-prefix',
    tier: 1,
    prompt: 'What is the DEFAULT tmux prefix — the key combo before every command?',
    choices: ['Ctrl-b', 'Ctrl-a', 'Ctrl-t', 'Alt-x'],
    answer: 0,
    explain: 'tmux ships with Ctrl-b as the prefix; you tap it, release, then press a command key.',
  },
  {
    id: 'q1-splith',
    tier: 1,
    prompt: 'After the prefix, which key splits the pane into LEFT and RIGHT?',
    choices: ['%', '"', 'c', 'x'],
    answer: 0,
    explain: 'C-b % makes a vertical divider (left/right). C-b " splits top/bottom.',
  },
  {
    id: 'q1-splitv',
    tier: 1,
    prompt: 'Which key splits the current pane into TOP and BOTTOM?',
    choices: ['"', '%', 's', '-'],
    answer: 0,
    explain: 'C-b " stacks two panes vertically (top/bottom).',
  },
  {
    id: 'q1-nextpane',
    tier: 1,
    prompt: 'Move focus to the next pane with:',
    choices: ['o', 'n', 'p', 'w'],
    answer: 0,
    explain: 'C-b o cycles panes; the arrow keys move directionally.',
  },
  {
    id: 'q1-zoom',
    tier: 1,
    prompt: 'Toggle ZOOM so the current pane fills the window:',
    choices: ['z', 'f', 'm', '+'],
    answer: 0,
    explain: 'C-b z zooms the pane in/out without closing the others.',
  },
  {
    id: 'q1-kill',
    tier: 1,
    prompt: 'Kill (close) the current pane with:',
    choices: ['x', 'q', '&', 'd'],
    answer: 0,
    explain: 'C-b x kills the pane (it asks to confirm). C-b & kills the whole window.',
  },

  // ── World 2 · Windows ────────────────────────────────────────────────
  {
    id: 'q2-new',
    tier: 2,
    prompt: 'Create a NEW window with:',
    choices: ['c', 'n', 'w', 's'],
    answer: 0,
    explain: 'C-b c creates a window (like a new tab).',
  },
  {
    id: 'q2-rename',
    tier: 2,
    prompt: 'Rename the current window with:',
    choices: [',', '$', '.', 'r'],
    answer: 0,
    explain: 'C-b , renames the window; C-b $ renames the session.',
  },
  {
    id: 'q2-next',
    tier: 2,
    prompt: 'Go to the NEXT window:',
    choices: ['n', 'p', 'o', 'l'],
    answer: 0,
    explain: 'C-b n = next window, C-b p = previous window.',
  },
  {
    id: 'q2-jump',
    tier: 2,
    prompt: 'Jump straight to window number 2:',
    choices: ['2', 'w2', 'g2', ':2'],
    answer: 0,
    explain: 'C-b followed by a digit 0–9 jumps to that window index.',
  },
  {
    id: 'q2-list',
    tier: 2,
    prompt: 'Open an interactive list to pick a window:',
    choices: ['w', 'l', 's', 'f'],
    answer: 0,
    explain: 'C-b w shows a chooser of windows (C-b s chooses sessions).',
  },
  {
    id: 'q2-killwin',
    tier: 2,
    prompt: 'Kill the whole current WINDOW with:',
    choices: ['&', 'x', 'q', 'd'],
    answer: 0,
    explain: 'C-b & kills the window (with a prompt). C-b x only kills one pane.',
  },

  // ── World 3 · Sessions & Copy ────────────────────────────────────────
  {
    id: 'q3-detach',
    tier: 3,
    prompt: 'Detach from the session, leaving it running in the background:',
    choices: ['d', 'q', 'x', 'D'],
    answer: 0,
    explain: 'C-b d detaches; reattach later with `tmux attach`.',
  },
  {
    id: 'q3-renamesess',
    tier: 3,
    prompt: 'Rename the current SESSION with:',
    choices: ['$', ',', 'r', 's'],
    answer: 0,
    explain: 'C-b $ renames the session; C-b , renames the window.',
  },
  {
    id: 'q3-copymode',
    tier: 3,
    prompt: 'Enter copy mode to scroll and select the scrollback:',
    choices: ['[', ']', 'y', 'v'],
    answer: 0,
    explain: 'C-b [ enters copy mode; C-b ] pastes the buffer.',
  },
  {
    id: 'q3-yank',
    tier: 3,
    prompt: 'In copy mode (emacs keys), which key yanks the selection?',
    choices: ['y', 'p', 'c', 'Enter'],
    answer: 0,
    explain: 'y copies the highlighted text into the paste buffer.',
  },
  {
    id: 'q3-choosesess',
    tier: 3,
    prompt: 'Open the interactive SESSION switcher:',
    choices: ['s', 'w', '$', 'd'],
    answer: 0,
    explain: 'C-b s lists sessions so you can jump between them.',
  },
  {
    id: 'q3-paste',
    tier: 3,
    prompt: 'Paste the most recently copied buffer:',
    choices: [']', '[', 'p', 'y'],
    answer: 0,
    explain: 'C-b ] pastes; C-b [ enters copy mode to grab text first.',
  },

  // ── World 4 · Rearrange ──────────────────────────────────────────────
  {
    id: 'q4-layout',
    tier: 4,
    prompt: 'Cycle to the next preset pane LAYOUT with:',
    choices: ['Space', 'Tab', 'l', '='],
    answer: 0,
    explain: 'C-b Space rotates through even-horizontal, main-vertical, tiled, etc.',
  },
  {
    id: 'q4-swapnext',
    tier: 4,
    prompt: 'Swap the current pane with the NEXT one:',
    choices: ['}', '{', 'o', '>'],
    answer: 0,
    explain: 'C-b } swaps with the next pane; C-b { swaps with the previous.',
  },
  {
    id: 'q4-swapprev',
    tier: 4,
    prompt: 'Swap the current pane with the PREVIOUS one:',
    choices: ['{', '}', 'p', '<'],
    answer: 0,
    explain: 'C-b { moves the pane earlier in the order.',
  },
  {
    id: 'q4-break',
    tier: 4,
    prompt: 'Break the current pane out into its own new WINDOW:',
    choices: ['!', '&', 'c', 'b'],
    answer: 0,
    explain: 'C-b ! promotes the pane to a standalone window.',
  },
  {
    id: 'q4-rotate',
    tier: 4,
    prompt: 'C-b Space is best described as:',
    choices: [
      'Cycle preset layouts',
      'Create a new session',
      'Kill all panes',
      'Detach the client',
    ],
    answer: 0,
    explain: 'It re-tiles the panes using tmux\'s built-in layouts.',
  },

  // ── World 5 · Command Line ───────────────────────────────────────────
  {
    id: 'q5-prompt',
    tier: 5,
    prompt: 'Which prefix key opens the tmux COMMAND prompt?',
    choices: [':', '/', ';', '!'],
    answer: 0,
    explain: 'C-b : opens the prompt where you type commands like new-window.',
  },
  {
    id: 'q5-newwin',
    tier: 5,
    prompt: 'At the : prompt, which command creates a new window?',
    choices: ['new-window', 'split-window', 'new-session', 'kill-window'],
    answer: 0,
    explain: 'new-window (alias neww) adds a window to the current session.',
  },
  {
    id: 'q5-split',
    tier: 5,
    prompt: 'At the : prompt, which command splits the current pane?',
    choices: ['split-window', 'new-window', 'break-pane', 'select-pane'],
    answer: 0,
    explain: 'split-window (alias splitw); -h splits left/right, -v top/bottom.',
  },
  {
    id: 'q5-newsess',
    tier: 5,
    prompt: 'Create a brand-new SESSION from the prompt:',
    choices: ['new-session', 'new-window', 'attach-session', 'rename-session'],
    answer: 0,
    explain: 'new-session (alias new) starts a fresh session.',
  },
  {
    id: 'q5-swapwin',
    tier: 5,
    prompt: 'Reorder windows from the prompt with:',
    choices: ['swap-window', 'move-pane', 'select-window', 'link-window'],
    answer: 0,
    explain: 'swap-window -s X -t Y exchanges two windows\' positions.',
  },
  {
    id: 'q5-splitflag',
    tier: 5,
    prompt: 'Which flag makes split-window create a LEFT/RIGHT split?',
    choices: ['-h', '-v', '-d', '-p'],
    answer: 0,
    explain: '-h = horizontal arrangement (side by side); -v = stacked.',
  },

  // ── World 6 · Power User ─────────────────────────────────────────────
  {
    id: 'q6-resize',
    tier: 6,
    prompt: 'Which prompt command changes a pane\'s size?',
    choices: ['resize-pane', 'select-pane', 'swap-pane', 'break-pane'],
    answer: 0,
    explain: 'resize-pane -L/-R/-U/-D N grows or shrinks the pane by N cells.',
  },
  {
    id: 'q6-pastebuf',
    tier: 6,
    prompt: 'Which prefix key pastes the buffer into the pane?',
    choices: [']', '[', 'p', 'y'],
    answer: 0,
    explain: 'C-b ] pastes; the prompt equivalent is paste-buffer.',
  },
  {
    id: 'q6-swapreorder',
    tier: 6,
    prompt: 'Move window 3 to slot 1 using the prompt:',
    choices: ['swap-window -s 3 -t 1', 'move-pane -t 1', 'select-window -t 1', 'kill-window -t 3'],
    answer: 0,
    explain: 'swap-window exchanges the two windows\' indices.',
  },
  {
    id: 'q6-resizeflag',
    tier: 6,
    prompt: 'resize-pane -D 5 does what?',
    choices: [
      'Grows the pane 5 cells DOWNward',
      'Deletes 5 panes',
      'Detaches after 5 seconds',
      'Duplicates the pane 5 times',
    ],
    answer: 0,
    explain: '-D = down, -U = up, -L = left, -R = right; the number is the cell count.',
  },
  {
    id: 'q6-killsession',
    tier: 6,
    prompt: 'Which prompt command ends an entire session?',
    choices: ['kill-session', 'kill-pane', 'detach-client', 'kill-server'],
    answer: 0,
    explain: 'kill-session tears down one session; kill-server stops tmux entirely.',
  },
  {
    id: 'q6-movewindow',
    tier: 6,
    prompt: 'Which command renumbers/moves a window to a new index?',
    choices: ['move-window', 'swap-pane', 'new-window', 'rename-window'],
    answer: 0,
    explain: 'move-window -t N relocates the current window to index N.',
  },
]

/** Questions for one world, in authored order. */
export function quizForTier(tier: number): QuizQuestion[] {
  return QUIZ.filter((q) => q.tier === tier)
}
