import { useId } from 'react'
import { site } from '../config/site'

/** Coraçãozinho personagem (original) que acena na abertura. */
export function CoracaoPersonagem({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 160 150" className={className} role="img" aria-label="Um coraçãozinho sorridente acenando">
      <defs>
        <linearGradient id={`${id}-corpo`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7afc2" />
          <stop offset="1" stopColor="#e7718f" />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="142" rx="30" ry="4.5" fill="#3b2231" opacity=".08" />
      {/* perninhas */}
      <path d="M71 116 L69 134" stroke="#d6617f" strokeWidth="5" strokeLinecap="round" />
      <path d="M89 116 L91 134" stroke="#d6617f" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="67" cy="136" rx="7" ry="4" fill="#b4193f" />
      <ellipse cx="93" cy="136" rx="7" ry="4" fill="#b4193f" />
      {/* bracinho parado */}
      <path d="M28 76 Q16 82 15 94" stroke="#e7718f" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="15" cy="96" r="5.5" fill="#e7718f" />
      {/* bracinho acenando */}
      <g className="animate-wave" style={{ transformOrigin: '130px 76px', transformBox: 'view-box' }}>
        <path d="M131 74 Q147 66 149 50" stroke="#e7718f" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="149" cy="47" r="5.5" fill="#e7718f" />
      </g>
      {/* corpo */}
      <path
        d="M80 126C35 99 15 72 22 47 28 25 57 16 80 40 103 16 132 25 138 47 145 72 125 99 80 126Z"
        fill={`url(#${id}-corpo)`}
      />
      <ellipse cx="48" cy="46" rx="11" ry="6" fill="#fff" opacity=".5" transform="rotate(-32 48 46)" />
      {/* rostinho */}
      <ellipse cx="65" cy="70" rx="4.3" ry="5.4" fill="#3b2231" />
      <ellipse cx="95" cy="70" rx="4.3" ry="5.4" fill="#3b2231" />
      <circle cx="66.6" cy="68" r="1.5" fill="#fff" />
      <circle cx="96.6" cy="68" r="1.5" fill="#fff" />
      <ellipse cx="54" cy="82" rx="7" ry="4" fill="#ff8fab" opacity=".6" />
      <ellipse cx="106" cy="82" rx="7" ry="4" fill="#ff8fab" opacity=".6" />
      <path d="M74 80Q80 87 86 80" stroke="#3b2231" strokeWidth="2.6" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/** Dois personagens de mãos dadas: um damasco e uma nuvenzinha rosa. */
export function CasalIlustracao({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg
      viewBox="0 0 320 236"
      className={className}
      role="img"
      aria-label={`Ilustração de dois personagens fofos de mãos dadas: ${site.assinatura} e ${site.nomeDela}`}
    >
      <defs>
        <radialGradient id={`${id}-damasco`} cx=".38" cy=".35" r=".75">
          <stop offset="0" stopColor="#ffd2a4" />
          <stop offset="1" stopColor="#f0975a" />
        </radialGradient>
        <radialGradient id={`${id}-ela`} cx=".4" cy=".35" r=".75">
          <stop offset="0" stopColor="#fdd5e0" />
          <stop offset="1" stopColor="#ee98b2" />
        </radialGradient>
      </defs>

      {/* chão */}
      <ellipse cx="160" cy="200" rx="128" ry="11" fill="#fde3ea" />
      <g fill="#f1a7bc">
        <circle cx="46" cy="196" r="3" />
        <circle cx="52" cy="192" r="3" />
        <circle cx="58" cy="196" r="3" />
        <circle cx="52" cy="200" r="3" />
      </g>
      <circle cx="52" cy="196" r="2.2" fill="#f8cf86" />
      <g fill="#c3b0e8">
        <circle cx="268" cy="194" r="3" />
        <circle cx="274" cy="190" r="3" />
        <circle cx="280" cy="194" r="3" />
        <circle cx="274" cy="198" r="3" />
      </g>
      <circle cx="274" cy="194" r="2.2" fill="#f8cf86" />

      {/* coração flutuando */}
      <g className="animate-bob" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <path
          d="M160 74c-11-7-18-14-18-22 0-5.5 4-10 9.4-10 3.4 0 6.4 1.7 8.6 4.6 2.2-2.9 5.2-4.6 8.6-4.6 5.4 0 9.4 4.5 9.4 10 0 8-7 15-18 22z"
          fill="#b4193f"
        />
        <path d="M150 50c1.6-2.4 4-3 6-2" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".6" />
      </g>
      <g fill="#f8cf86">
        <path d="M118 46l1.8 4 4 1.8-4 1.8-1.8 4-1.8-4-4-1.8 4-1.8z" className="animate-twinkle" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <path d="M206 36l1.4 3 3 1.4-3 1.4-1.4 3-1.4-3-3-1.4 3-1.4z" className="animate-twinkle" style={{ transformBox: 'fill-box', transformOrigin: 'center', ['--delay' as string]: '1.2s' }} />
      </g>

      <g className="animate-sway" style={{ transformOrigin: '160px 200px', transformBox: 'view-box' }}>
        {/* mãos dadas */}
        <path d="M150 146Q160 160 160 164" stroke="#f0975a" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M170 146Q160 160 160 164" stroke="#ee98b2" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="160" cy="166" r="6.5" fill="#f4b08a" />

        {/* Damasco */}
        <path d="M98 176L96 196" stroke="#d98149" strokeWidth="6" strokeLinecap="round" />
        <path d="M120 176L122 196" stroke="#d98149" strokeWidth="6" strokeLinecap="round" />
        <path d="M62 140Q48 150 50 164" stroke="#f0975a" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="110" cy="132" r="50" fill={`url(#${id}-damasco)`} />
        <path d="M112 83Q98 130 114 181" stroke="#d9783c" strokeWidth="3" fill="none" opacity=".35" strokeLinecap="round" />
        <path d="M112 84Q113 74 118 68" stroke="#7a5a3a" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M118 70Q132 60 140 70Q128 80 118 70z" fill="#8fbf7f" />
        <ellipse cx="94" cy="128" rx="4.2" ry="5.2" fill="#3b2231" />
        <ellipse cx="124" cy="128" rx="4.2" ry="5.2" fill="#3b2231" />
        <circle cx="95.5" cy="126" r="1.4" fill="#fff" />
        <circle cx="125.5" cy="126" r="1.4" fill="#fff" />
        <ellipse cx="84" cy="141" rx="7" ry="4" fill="#ff8f7a" opacity=".45" />
        <ellipse cx="134" cy="141" rx="7" ry="4" fill="#ff8f7a" opacity=".45" />
        <path d="M103 139Q109 145 115 139" stroke="#3b2231" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Ela */}
        <path d="M200 176L198 196" stroke="#d97798" strokeWidth="6" strokeLinecap="round" />
        <path d="M222 176L224 196" stroke="#d97798" strokeWidth="6" strokeLinecap="round" />
        <path d="M258 140Q272 150 270 164" stroke="#ee98b2" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="210" cy="134" r="47" fill={`url(#${id}-ela)`} />
        {/* lacinho */}
        <g transform="rotate(18 238 94)">
          <path d="M238 94l-14-8v16z" fill="#b4193f" />
          <path d="M238 94l14-8v16z" fill="#b4193f" />
          <circle cx="238" cy="94" r="4" fill="#8c1232" />
        </g>
        <path d="M190 131q6-6 12 0" stroke="#3b2231" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <path d="M218 131q6-6 12 0" stroke="#3b2231" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <ellipse cx="186" cy="143" rx="7" ry="4" fill="#ff7fa3" opacity=".5" />
        <ellipse cx="234" cy="143" rx="7" ry="4" fill="#ff7fa3" opacity=".5" />
        <path d="M204 141Q210 147 216 141" stroke="#3b2231" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>

      <text x="110" y="226" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="20" fill="#6a4a5b">
        {site.assinatura}
      </text>
      <text x="210" y="226" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="20" fill="#6a4a5b">
        {site.nomeDela}
      </text>
    </svg>
  )
}
