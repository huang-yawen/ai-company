import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

type View = 'home' | 'signup' | 'workspace' | 'products' | 'courses' | 'pricing' | 'about' | 'contact' | 'security' | 'privacy' | 'terms'

const Arrow = () => <span className="arrow">↗</span>
const Spark = () => <span className="spark">✦</span>

function Logo() {
  return <div className="logo"><span className="logo-mark"><i></i><i></i><i></i></span><span>BITWISEPLUS<span className="logo-muted">/</span>AI</span></div>
}

// 数据指标带：进入视口后数字滚动计数（示例占位数据，上线前请换成真实数据）
const stats: { value: number; suffix: string; label: string; decimals?: number }[] = [
  { value: 120, suffix: '+', label: 'Teams onboarded' },
  { value: 38, suffix: '%', label: 'Average productivity lift' },
  { value: 4.9, suffix: '/5', label: 'Learner satisfaction', decimals: 1 },
  { value: 24, suffix: '/7', label: 'Expert support' }
]

function Stats() {
  const ref = useRef<HTMLElement>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1600)
        setP(1 - Math.pow(1 - k, 3))
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [])
  return <section className="stats-band" ref={el => { ref.current = el }}>{stats.map(s => <div key={s.label}><strong>{(s.value * p).toFixed(s.decimals ?? 0)}<span>{s.suffix}</span></strong><small>{s.label}</small></div>)}</section>
}

function Home({ setView }: { setView: (view: View) => void }) {
  const goSignup = () => setView('signup')
  return <main className="site-shell">
    <nav className="nav"><Logo /><div className="nav-links"><button onClick={() => setView('products')}>Products</button><button onClick={() => setView('courses')}>Academy</button><a href="#solutions">Solutions</a><button onClick={() => setView('about')}>Company</button></div><div className="nav-actions"><button className="text-btn" onClick={() => setView('workspace')}>Sign in</button><button className="nav-cta" onClick={goSignup}>Get started <Arrow /></button></div></nav>

    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse"></span> THE INTELLIGENCE LAYER FOR AMBITIOUS TEAMS</div>
        <h1>Make AI your<br /><em>unfair advantage.</em></h1>
        <p className="hero-text">BitwisePlus gives your team the tools, learning, and operating system to turn generative AI into measurable work.</p>
        <div className="hero-buttons"><button className="primary-btn" onClick={goSignup}>Build with BitwisePlus <Arrow /></button><button className="play-btn" onClick={() => setView('products')}><span>▶</span> Explore the platform</button></div>
        <div className="trusted"><span>TRUSTED BY TEAMS BUILDING WHAT'S NEXT</span><div className="brand-row"><b>VERGE</b><b>arc<span>°</span></b><b>northstar</b><b>PARALLEL</b></div></div>
      </div>
      <div className="hero-visual" aria-label="BitwisePlus AI product interface">
        <div className="orb orb-one"></div><div className="orb orb-two"></div><div className="grid-plane"></div>
        <div className="product-window">
          <div className="window-top"><div className="mini-logo"><Spark /> BITWISEPLUS</div><span>Workspace / Growth strategy</span><div className="window-dot"></div></div>
          <div className="window-body"><aside><div className="side-item active">⌘ <span>Command</span></div><div className="side-item">◫ <span>Projects</span></div><div className="side-item">◌ <span>Knowledge</span></div><div className="side-item">◒ <span>Learning</span></div></aside><div className="command"><div className="command-title"><span className="small-label">BITWISEPLUS COMMAND</span><span className="live"><i></i> LIVE</span></div><h3>What are we building<br />together today?</h3><div className="command-input"><span>Ask BitwisePlus anything...</span><button>↑</button></div><div className="suggestions"><span>Plan a launch</span><span>Analyze my market</span></div></div></div>
        </div>
        <div className="float-card signal"><span className="card-icon">⌁</span><div><small>TEAM SIGNAL</small><strong>+42% faster output</strong></div><div className="sparkline">╱╱╲╱╱╲</div></div>
        <div className="float-card course"><span className="course-number">03</span><div><small>IN PROGRESS</small><strong>AI Strategy Sprint</strong><div className="progress"><i></i></div></div></div>
      </div>
    </section>

    <Stats />
    <section className="statement" id="platform"><div className="section-kicker"><Spark /> ONE SYSTEM. REAL MOMENTUM.</div><h2>AI adoption is a<br /><em>company-wide practice.</em></h2><p>Stop collecting disconnected tools and generic tutorials. BitwisePlus gives every team a clear path from first prompt to scaled capability.</p></section>

    <section className="products" id="solutions"><div className="product-intro"><div><span className="overline">THE BITWISEPLUS SYSTEM</span><h2>From curiosity<br />to capability.</h2></div><p>Everything your organization needs to work intelligently, in one considered system.</p></div><div className="product-grid">
      <article className="product-card product-dark"><div className="card-top"><span className="number">01</span><span className="tag">CORE PLATFORM</span></div><div className="card-art workflow"><div className="flow-node main">Campaign brief</div><div className="flow-line"></div><div className="flow-node">Audience</div><div className="flow-node">Concepts</div><div className="flow-node result">Launch plan ✦</div></div><h3>BitwisePlus Studio</h3><p>Your secure AI workspace for turning scattered knowledge into repeatable, high-value work.</p><button onClick={() => setView('products')}>Discover Studio <Arrow /></button></article>
      <article className="product-card product-mint"><div className="card-top"><span className="number">02</span><span className="tag">TEAM LEARNING</span></div><div className="card-art lessons"><div className="lesson-progress"><span>YOUR PATH</span><b>68%</b></div><div className="lesson-line"><i></i><i></i><i className="done"></i><i className="done"></i><i className="done"></i></div><div className="lesson-title">Prompting for<br />better decisions</div></div><h3>BitwisePlus Academy</h3><p>Practical learning paths that move your people from AI-aware to AI-native.</p><button onClick={() => setView('courses')}>Browse programs <Arrow /></button></article>
      <article className="product-card product-lilac"><div className="card-top"><span className="number">03</span><span className="tag">EXPERT PARTNERSHIP</span></div><div className="card-art orbit"><div className="orbit-core">A</div><i className="planet p1"></i><i className="planet p2"></i><i className="planet p3"></i><div className="orbit-ring"></div></div><h3>BitwisePlus Advisory</h3><p>Hands-on partnership for leaders turning AI ambition into an operating advantage.</p><button onClick={() => setView('contact')}>Meet our experts <Arrow /></button></article>
    </div></section>

    <section className="academy" id="academy"><div className="academy-panel"><div className="academy-copy"><span className="overline">BITWISEPLUS ACADEMY</span><h2>Learning that<br /><em>changes the work.</em></h2><p>Role-specific programs made for the practical reality of your team, not a distant future.</p><button className="dark-btn" onClick={goSignup}>Explore the Academy <Arrow /></button></div><div className="learning-list"><div className="list-head"><span>POPULAR PATHS</span><span>VIEW ALL →</span></div><div className="path"><b>01</b><div><strong>AI Foundations for Teams</strong><small>6 modules · 4 hours</small></div><span className="path-arrow">↗</span></div><div className="path"><b>02</b><div><strong>AI-Powered Marketing</strong><small>8 modules · 6 hours</small></div><span className="path-arrow">↗</span></div><div className="path"><b>03</b><div><strong>Leading in the AI Era</strong><small>5 modules · 3 hours</small></div><span className="path-arrow">↗</span></div></div></div></section>

    <section className="cta"><div className="cta-star">✦</div><span className="overline">START WHERE YOU ARE</span><h2>The future of work<br />has a <em>starting point.</em></h2><p>Join teams building a more capable, creative way to work.</p><button className="light-btn" onClick={goSignup}>Create your workspace <Arrow /></button></section>
    <footer><Logo /><span>© 2026 BitwisePlus AI, Inc.</span><FooterLinks setView={setView}/></footer>
  </main>
}

function Signup({ setView }: {setView: (view: View) => void}) {
  const [submitted, setSubmitted] = useState(false)
  return <main className="auth-shell"><div className="auth-left"><button className="back" onClick={() => setView('home')}>← Back to BitwisePlus</button><div className="auth-orb"></div><div className="auth-quote"><Spark /><h2>“The most valuable AI<br />is the one your team<br />actually uses.”</h2><p>Build the habits that make capability compound.</p></div><Logo /></div><section className="auth-card"><Logo /><div className="auth-content">{submitted ? <><div className="success-icon">✦</div><span className="overline">YOU'RE IN</span><h1>Your workspace<br />is ready.</h1><p>We’ve created a starting space for your team. Let’s make your first AI advantage.</p><button className="primary-btn full" onClick={() => setView('workspace')}>Open my workspace <Arrow /></button></> : <><span className="overline">START BUILDING</span><h1>Create your<br />BitwisePlus account.</h1><p>Start exploring the platform and give your team a clearer path to AI capability.</p><div className="form"><label>Work email<input placeholder="you@company.com" type="email" /></label><label>Full name<input placeholder="Your name" /></label><button className="primary-btn full" onClick={() => setSubmitted(true)}>Create account <Arrow /></button></div><div className="or"><span></span> OR <span></span></div><button className="sso">Continue with Google</button><small className="terms">By continuing, you agree to BitwisePlus's Terms of Service and Privacy Policy.</small></>}</div><button className="signin-link" onClick={() => setView('workspace')}>Already have an account? <b>Sign in</b></button></section></main>
}

const productData: [string, string, string, string, string, string[]][] = [
  ['Studio', 'Your team’s private AI operating environment.', '$39', 'per member / month', 'BITWISEPLUS STUDIO', ['Secure team workspaces', 'Reusable AI workflows', 'Source-grounded answers']],
  ['Academy', 'Structured learning that becomes daily practice.', '$24', 'per learner / month', 'BITWISEPLUS ACADEMY', ['Role-based learning paths', 'Skills reporting', 'Private team cohorts']],
  ['Advisory', 'Embedded expertise for your highest-leverage AI bets.', '$4,800', 'starting per engagement', 'BITWISEPLUS ADVISORY', ['AI opportunity mapping', 'Leadership workshops', '90-day adoption plan']]
]

function ProductPage({setView}:{setView:(view:View)=>void}) {
  const [selected, setSelected] = useState(0)
  const product = productData[selected]
  return <main className="catalog-page"><nav className="nav catalog-nav"><button className="brand-button" onClick={() => setView('home')}><Logo/></button><div className="nav-links"><button className="selected-nav" onClick={() => setView('products')}>Products</button><button onClick={() => setView('courses')}>Academy</button><a href="#compare">Compare plans</a></div><div className="nav-actions"><button className="text-btn" onClick={() => setView('workspace')}>Sign in</button><button className="nav-cta" onClick={() => setView('signup')}>Get started <Arrow/></button></div></nav><section className="catalog-hero"><span className="overline">PRODUCTS</span><h1>Systems for the<br/><em>work ahead.</em></h1><p>Designed for teams who want AI to become a real operating advantage, not another tab in the browser.</p></section><section className="product-tabs">{productData.map((item,i)=><button key={item[0]} className={i===selected?'tab-active':''} onClick={()=>setSelected(i)}><span>0{i+1}</span>{item[0]}</button>)}</section><section className="product-focus"><div className="product-preview"><div className={'preview-art preview-'+selected}><div className="preview-header"><span>{product[4]}</span><i></i><i></i></div><div className="preview-body"><div className="preview-side"><b>Overview</b><b>Workspace</b><b>Team</b></div><div className="preview-content"><small>WORKFLOW IN PROGRESS</small><h3>{selected===0?'Plan a high-stakes launch':selected===1?'Your AI capability roadmap':'AI adoption signal report'}</h3><div className="preview-bars"><i></i><i></i><i></i></div></div></div></div></div><div className="product-detail"><span className="overline">{product[4]}</span><h2>{product[0]}<span>.</span></h2><p>{product[1]}</p><ul>{product[5].map(x=><li key={x}><span>✦</span>{x}</li>)}</ul><div className="price"><strong>{product[2]}</strong><small>{product[3]}</small></div><button className="primary-btn" onClick={() => setView(selected === 2 ? 'contact' : 'signup')}>{selected === 2 ? 'Book a consultation' : 'Start with ' + product[0]} <Arrow/></button><button className="demo-btn" onClick={() => setView('contact')}>Talk to an expert →</button></div></section><section className="plan-strip" id="compare"><span>BUILT FOR REAL TEAMS</span><b>No set-up fee. Flexible team billing. Enterprise security.</b><button onClick={() => setView('pricing')}>Compare plans →</button></section><footer><Logo/><span>© 2026 BitwisePlus AI, Inc.</span><FooterLinks setView={setView}/></footer></main>
}

const videos = [
  {id:'tchN4xa4pfg', title:'AI Foundations for Absolute Beginners', channel:'freeCodeCamp.org', level:'FOUNDATIONS', time:'4h 31m'},
  {id:'4LKmQ1Qv7Zc', title:'OpenAI API: Your First AI Product', channel:'AI Foundations Lab', level:'BUILD', time:'42 min'},
  {id:'F0GQ0l2NfHA', title:'Generative AI for Developers', channel:'freeCodeCamp.org', level:'BUILD', time:'9h 48m'},
  {id:'DOXJ7s1D6iE', title:'Generative AI Bootcamp', channel:'freeCodeCamp.org', level:'PRACTICE', time:'65h'}
]

function CoursesPage({setView}:{setView:(view:View)=>void}) {
  const [active, setActive] = useState<typeof videos[0] | null>(null)
  return <main className="courses-page"><nav className="nav catalog-nav"><button className="brand-button" onClick={() => setView('home')}><Logo/></button><div className="nav-links"><button onClick={() => setView('products')}>Products</button><button className="selected-nav" onClick={() => setView('courses')}>Academy</button><a href="#library">Library</a></div><div className="nav-actions"><button className="text-btn" onClick={() => setView('workspace')}>Sign in</button><button className="nav-cta" onClick={() => setView('signup')}>Join Academy <Arrow/></button></div></nav><section className="course-hero"><div><span className="overline">BITWISEPLUS ACADEMY</span><h1>Learn the work<br/><em>AI makes possible.</em></h1><p>Practical, role-aware learning for people building capability together.</p><button className="primary-btn" onClick={() => document.getElementById('library')?.scrollIntoView({behavior:'smooth'})}>Explore learning paths <Arrow/></button></div><div className="featured-course"><div className="video-surface"><img src="https://i.ytimg.com/vi/tchN4xa4pfg/hqdefault.jpg" alt="AI Foundations course preview"/><button onClick={() => setActive(videos[0])}>▶</button><span>FEATURED CLASS</span></div><div className="featured-meta"><div><small>START HERE · 4H 31M</small><h3>AI Foundations for<br/>Absolute Beginners</h3><p>Learn the language, concepts and practical decisions behind modern AI.</p></div><button onClick={() => setActive(videos[0])}>Watch preview ↗</button></div></div></section><section className="learning-library" id="library"><div className="library-head"><div><span className="overline">LEARNING LIBRARY</span><h2>Pick your<br/>next <em>practice.</em></h2></div><div className="filter-row"><button className="filter-active">All paths</button><button>Foundations</button><button>Build</button><button>Leadership</button></div></div><div className="course-grid">{videos.map((video,i)=><article className="course-card" key={i}><button className="thumb" onClick={() => setActive(video)}><img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt=""/><span>▶</span><small>{video.level}</small></button><div className="course-card-copy"><span>{video.time} · {video.channel}</span><h3>{video.title}</h3><button onClick={() => setActive(video)}>Preview course <Arrow/></button></div></article>)}</div></section><section className="academy-join"><span className="overline">LEARN TOGETHER</span><h2>Your team’s next<br/>capability <em>starts here.</em></h2><button className="dark-btn" onClick={() => setView('signup')}>Create a team cohort <Arrow/></button></section>{active && <div className="video-modal" onClick={() => setActive(null)}><div className="video-dialog" onClick={e=>e.stopPropagation()}><button className="close-video" onClick={() => setActive(null)}>×</button><iframe src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1`} title={active.title} allow="autoplay; encrypted-media" allowFullScreen></iframe><div><span className="overline">{active.level} · {active.time}</span><h2>{active.title}</h2><p>Preview a public lesson, then create a BitwisePlus account to save the pathway to your workspace.</p><button className="primary-btn" onClick={() => setView('signup')}>Save this path <Arrow/></button></div></div></div>}<footer><Logo/><span>© 2026 BitwisePlus AI, Inc.</span><FooterLinks setView={setView}/></footer></main>
}

type WsTab = 'overview' | 'learn' | 'studio' | 'library'
type ChatMsg = { role: 'user' | 'ai'; text: string }
type Activity = { who: string; what: string; at: string }

const wsTabs: [WsTab, string][] = [['overview', 'Overview'], ['learn', 'Learn'], ['studio', 'Studio'], ['library', 'Library']]

const wsPaths = [
  { title: 'AI Strategy for Leaders', meta: 'Academy · 6 modules', progress: 68 },
  { title: 'AI-Powered Marketing', meta: 'Academy · 8 modules', progress: 25 },
  { title: 'Prompting for Better Decisions', meta: 'Academy · 5 modules', progress: 0 }
]

const wsLibrary = [
  { title: "The team leader's guide to AI adoption", tag: 'PLAYBOOK' },
  { title: 'Weekly AI opportunity scan', tag: 'STUDIO TEMPLATE' },
  { title: 'Design a high-leverage AI workflow', tag: 'GUIDE' },
  { title: 'Measuring time saved with AI', tag: 'PLAYBOOK' },
  { title: 'Launch plan brief', tag: 'STUDIO TEMPLATE' }
]

const wsActivityPool: Omit<Activity, 'at'>[] = [
  { who: 'Ava', what: 'finished “Prompting basics”' },
  { who: 'Liam', what: 'saved a workflow to Studio' },
  { who: 'Noor', what: 'started “AI-Powered Marketing”' },
  { who: 'Ken', what: 'ran the weekly opportunity scan' },
  { who: 'Mia', what: 'shared a launch plan with the team' }
]

const wsSuggestions = ['Plan a launch', 'Analyze my market', 'Summarize this week']

// 前端模拟回复：没有后端，按关键词返回一段结构化建议
const wsReply = (q: string) => {
  const t = q.toLowerCase()
  if (t.includes('launch')) return 'Here is a 3-step launch plan:\n1. Define the audience and the one promise you want them to remember.\n2. Draft three concepts and test them with 5 customers.\n3. Lock the channel mix and a 14-day countdown.'
  if (t.includes('market')) return 'Market snapshot:\n• Demand is growing in mid-size teams adopting AI for support and marketing.\n• Your edge: practical learning plus a shared workspace.\n• Next move: interview 5 buyers about their current AI tooling.'
  if (t.includes('week') || t.includes('summar')) return 'This week: the team saved about 12 hours, 2 learning paths progressed, and 3 teammates are ready to start. Suggested focus: invite them and share one reusable workflow.'
  return 'Got it. I would start by clarifying the goal, listing what you already know, and turning the next step into a small, testable task. Want me to draft that as a Studio workflow?'
}

function Workspace({setView}: {setView:(view:View)=>void}) {
  const [tab, setTab] = useState<WsTab>('overview')
  const [now, setNow] = useState(new Date())
  const [lesson, setLesson] = useState(68)
  const [paths, setPaths] = useState(wsPaths)
  const [hours, setHours] = useState(0)
  const [bars, setBars] = useState([14, 19, 16, 25, 31, 29, 42])
  const [feed, setFeed] = useState<Activity[]>([{ who: 'Ava', what: 'joined the workspace', at: 'just now' }])
  const [ready, setReady] = useState(3)
  const [toast, setToast] = useState('')
  const [query, setQuery] = useState('')
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState<ChatMsg[]>([{ role: 'ai', text: 'Hi Morgan, what are we building together today?' }])
  const chatEnd = useRef<HTMLDivElement>(null)
  const typer = useRef<number | undefined>(undefined)

  // 时钟：问候语和日期随当前时间变化
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(id)
  }, [])

  // 指标数字从 0 滚动到 12.4
  useEffect(() => {
    let step = 0
    const id = window.setInterval(() => {
      step += 1
      setHours(Math.min(12.4, +(12.4 * step / 20).toFixed(1)))
      if (step >= 20) window.clearInterval(id)
    }, 50)
    return () => window.clearInterval(id)
  }, [])

  // 实时数据：柱状图滚动、团队动态陆续出现
  useEffect(() => {
    const barId = window.setInterval(() => setBars(b => [...b.slice(1), 10 + Math.round(Math.random() * 32)]), 2500)
    const feedId = window.setInterval(() => {
      const item = wsActivityPool[Math.floor(Math.random() * wsActivityPool.length)]
      setFeed(f => [{ ...item, at: 'just now' }, ...f.map(x => ({ ...x, at: x.at === 'just now' ? '1 min ago' : x.at }))].slice(0, 5))
    }, 6000)
    return () => { window.clearInterval(barId); window.clearInterval(feedId) }
  }, [])

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(''), 2500)
    return () => window.clearTimeout(id)
  }, [toast])

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, [messages])
  useEffect(() => () => window.clearInterval(typer.current), [])

  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const dateText = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()
  const moduleNo = Math.max(1, Math.min(6, Math.ceil(lesson / 100 * 6)))

  const resume = () => {
    const next = Math.min(100, lesson + 8)
    setLesson(next)
    setPaths(p => p.map((x, i) => i === 0 ? { ...x, progress: next } : x))
    setToast(next === 100 ? 'Path completed 🎉' : 'Lesson resumed · progress saved')
  }
  const advance = (index: number) => {
    setPaths(p => p.map((x, i) => i === index ? { ...x, progress: Math.min(100, x.progress + 10) } : x))
    if (index === 0) setLesson(l => Math.min(100, l + 10))
  }
  const invite = () => {
    if (ready === 0) { setToast('Everyone has been invited'); return }
    setReady(r => r - 1)
    setFeed(f => [{ who: 'You', what: 'invited a teammate', at: 'just now' }, ...f].slice(0, 5))
    setToast('Invite sent to a teammate')
  }

  const send = (text: string) => {
    const q = text.trim()
    if (!q || typing) return
    const answer = wsReply(q)
    setInput('')
    setTyping(true)
    setMessages(m => [...m, { role: 'user', text: q }, { role: 'ai', text: '' }])
    let i = 0
    typer.current = window.setInterval(() => {
      i += 2
      setMessages(m => m.map((x, idx) => idx === m.length - 1 ? { ...x, text: answer.slice(0, i) } : x))
      if (i >= answer.length) { window.clearInterval(typer.current); setTyping(false) }
    }, 20)
  }

  const goTab = (t: WsTab) => setTab(t)
  const shownLibrary = wsLibrary.filter(x => x.title.toLowerCase().includes(query.toLowerCase()))

  const overview = <>
    <div className="dash-head"><div><span className="overline">{dateText}</span><h1>{greeting}, Morgan<span>.</span></h1><p>Here’s what’s moving your AI practice forward.</p></div><button className="dark-btn" onClick={() => goTab('studio')}>Open BitwisePlus Studio <Arrow/></button></div>
    <div className="dashboard-grid">
      <article className="continue-card"><div className="continue-top"><span>CONTINUE LEARNING</span><span className="circle-progress">{lesson}%</span></div><h2>AI Strategy<br />for Leaders</h2><p>Module {moduleNo} of 6 · Making adoption stick</p><div className="ws-progress"><i style={{ width: lesson + '%' }}></i></div><button onClick={resume} disabled={lesson >= 100}>{lesson >= 100 ? 'Completed' : 'Resume lesson'} <Arrow/></button></article>
      <article className="metric-card"><span className="overline">TEAM MOMENTUM <b className="ws-live"><i></i> LIVE</b></span><strong>{hours.toFixed(1)}<span>h</span></strong><p>Time saved this week</p><div className="metric-chart">{bars.map((h, i) => <i key={i} style={{ height: h }}></i>)}</div><small>↑ 18% from last week</small></article>
      <article className="next-card"><span className="overline">YOUR NEXT MOVE</span><h3>Bring your team<br />into the practice.</h3><p>{ready > 0 ? `${ready} teammate${ready > 1 ? 's are' : ' is'} ready for their first learning path.` : 'Everyone is invited. Nice work.'}</p><button onClick={invite}>Invite teammates →</button></article>
    </div>
    <div className="ws-split">
      <section className="ws-card"><span className="overline">TEAM ACTIVITY</span><ul className="ws-feed">{feed.map((a, i) => <li key={a.who + a.what + i}><b>{a.who}</b> {a.what}<small>{a.at}</small></li>)}</ul></section>
      <section className="ws-card"><span className="overline">ASK STUDIO</span><div className="ws-quick">{wsSuggestions.map(s => <button key={s} onClick={() => { goTab('studio'); send(s) }}>{s}</button>)}</div></section>
    </div>
  </>

  const learn = <>
    <div className="dash-head"><div><span className="overline">MY LEARNING</span><h1>Your paths<span>.</span></h1><p>Pick up where you left off.</p></div></div>
    <div className="ws-list">{paths.map((p, i) => <article key={p.title}><div><h3>{p.title}</h3><small>{p.meta}</small><div className="ws-progress dark"><i style={{ width: p.progress + '%' }}></i></div></div><div className="ws-side"><b>{p.progress}%</b><button onClick={() => advance(i)} disabled={p.progress >= 100}>{p.progress === 0 ? 'Start' : p.progress >= 100 ? 'Done' : 'Continue'} →</button></div></article>)}</div>
  </>

  const studio = <>
    <div className="dash-head"><div><span className="overline">BITWISEPLUS STUDIO</span><h1>What are we building<span>?</span></h1><p>Demo assistant · replies are simulated in this prototype.</p></div></div>
    <div className="ws-chat">
      <div className="ws-msgs">{messages.map((m, i) => <div key={i} className={'ws-msg ' + m.role}>{m.text || '…'}</div>)}<div ref={chatEnd}></div></div>
      <div className="ws-quick">{wsSuggestions.map(s => <button key={s} onClick={() => send(s)} disabled={typing}>{s}</button>)}</div>
      <form className="ws-input" onSubmit={e => { e.preventDefault(); send(input) }}><input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask BitwisePlus anything..." /><button type="submit" disabled={typing || !input.trim()}>↑</button></form>
    </div>
  </>

  const library = <>
    <div className="dash-head"><div><span className="overline">LIBRARY</span><h1>Resources<span>.</span></h1><p>Playbooks, guides and templates for your team.</p></div></div>
    <input className="ws-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search the library..." />
    <div className="recommendations">{shownLibrary.map(x => <article key={x.title}><small>{x.tag}</small><h3>{x.title}</h3><button onClick={() => setToast('Opened “' + x.title + '”')}>Open →</button></article>)}{shownLibrary.length === 0 && <p>No results.</p>}</div>
  </>

  return <main className="workspace"><header className="workspace-nav"><Logo/><div className="workspace-center">{wsTabs.map(([k, label]) => <span key={k} className={tab === k ? 'active' : ''} onClick={() => goTab(k)}>{label}</span>)}</div><div className="user-pill" onClick={() => setView('home')} title="Back to home"><span>MH</span> Morgan Hale <i>⌄</i></div></header><div className="workspace-main"><aside className="workspace-side"><small>YOUR WORKSPACE</small><b>Northstar Studio <i>⌄</i></b><div className="side-nav">{wsTabs.map(([k, label]) => <span key={k} className={tab === k ? 'selected' : ''} onClick={() => goTab(k)}>{label}</span>)}</div><small>SUPPORT</small><div className="side-nav"><span onClick={() => setToast('Support will reply within a day')}>◉ Get help</span></div><div className="upgrade"><Spark/><b>Build more with your team.</b><p>Invite members to unlock shared learning.</p><button onClick={invite}>Invite team →</button></div></aside><section className="dashboard"><div className="ws-mtabs">{wsTabs.map(([k, label]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => goTab(k)}>{label}</button>)}</div>{tab === 'overview' ? overview : tab === 'learn' ? learn : tab === 'studio' ? studio : library}</section></div>{toast && <div className="ws-toast">{toast}</div>}</main>
}

// 公司页面：Pricing / About / Contact / Security / Privacy / Terms 共用的页面框架
const FooterLinks = ({ setView }: { setView: (view: View) => void }) => <div>{([['Pricing', 'pricing'], ['About', 'about'], ['Security', 'security'], ['Privacy', 'privacy'], ['Terms', 'terms'], ['Contact', 'contact']] as [string, View][]).map(([label, v]) => <a key={v} href={'/' + v} onClick={e => { e.preventDefault(); setView(v) }}>{label}</a>)}</div>

function InfoPage({ setView, current, kicker, title, lead, aside, children }: { setView: (view: View) => void; current: View; kicker: string; title: ReactNode; lead: string; aside?: ReactNode; children: ReactNode }) {
  const heroText = <><span className="overline">{kicker}</span><h1>{title}</h1><p>{lead}</p></>
  const link = (v: View, label: string) => <button className={current === v ? 'selected-nav' : ''} onClick={() => setView(v)}>{label}</button>
  return <main className="catalog-page"><nav className="nav catalog-nav"><button className="brand-button" onClick={() => setView('home')}><Logo/></button><div className="nav-links">{link('products', 'Products')}{link('courses', 'Academy')}{link('pricing', 'Pricing')}{link('about', 'About')}</div><div className="nav-actions"><button className="text-btn" onClick={() => setView('workspace')}>Sign in</button><button className="nav-cta" onClick={() => setView('signup')}>Get started <Arrow/></button></div></nav>{aside ? <section className="catalog-hero with-aside"><div>{heroText}</div>{aside}</section> : <section className="catalog-hero">{heroText}</section>}{children}<footer><Logo/><span>© 2026 BitwisePlus AI, Inc.</span><FooterLinks setView={setView}/></footer></main>
}

function PricingPage({ setView }: { setView: (view: View) => void }) {
  const rows: [string, string, string, string][] = [
    ['Best for', 'Teams running daily AI work', 'Teams building AI skills', 'Leaders setting AI direction'],
    ['Billing', 'Per member / month', 'Per learner / month', 'Per engagement'],
    ['Getting started', 'Self-serve in minutes', 'Self-serve, team cohorts on request', 'Scoped with an expert'],
    ['Support', 'Email, within 1 business day', 'Email, within 1 business day', 'Dedicated expert lead']
  ]
  const faqs: [string, string][] = [
    ['Can we mix products?', 'Yes. Studio, Academy and Advisory are designed to work together, and billing can be combined under one team account.'],
    ['Is there a set-up fee?', 'No. Studio and Academy have no set-up fee. Advisory engagements are scoped and priced up front.'],
    ['How does team billing work?', 'You pay per active member each month and can add or remove members at any time.'],
    ['Do you offer enterprise terms?', 'Yes. Contact sales for volume pricing, security reviews and custom agreements.']
  ]
  return <InfoPage setView={setView} current="pricing" kicker="PRICING" title={<>Plans built for<br/><em>how teams work.</em></>} lead="Start with one product or combine all three. No set-up fee, flexible team billing.">
    <section className="info-section"><div className="info-grid">{productData.map(p => <article className="info-card" key={p[0]}><span className="overline">{p[4]}</span><h3>{p[0]}</h3><p>{p[1]}</p><div className="plan-price"><strong>{p[2]}</strong><small>{p[3]}</small></div><ul>{p[5].map(x => <li key={x}><span>✦</span>{x}</li>)}</ul><button className="primary-btn" onClick={() => setView(p[0] === 'Advisory' ? 'contact' : 'signup')}>{p[0] === 'Advisory' ? 'Contact sales' : 'Start with ' + p[0]} <Arrow/></button></article>)}</div></section>
    <section className="info-section"><span className="overline">COMPARE PLANS</span><h2>Side by side.</h2><div className="table-wrap"><table className="plan-table"><thead><tr><th></th>{productData.map(p => <th key={p[0]}>{p[0]}</th>)}</tr></thead><tbody>{rows.map(r => <tr key={r[0]}><th>{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>)}</tbody></table></div></section>
    <section className="info-section"><span className="overline">FAQ</span><h2>Common questions.</h2><div className="faq">{faqs.map(f => <div key={f[0]}><b>{f[0]}</b><p>{f[1]}</p></div>)}</div></section>
    <section className="plan-strip"><span>NEED SOMETHING CUSTOM?</span><b>Volume pricing, security reviews and custom agreements.</b><button onClick={() => setView('contact')}>Contact sales →</button></section>
  </InfoPage>
}

function AboutPage({ setView }: { setView: (view: View) => void }) {
  const principles: [string, string][] = [
    ['Practice over hype', 'We measure AI by the work it improves, not by the demos it produces.'],
    ['Capability compounds', 'Tools fade, skills stay. Every product is built to grow what your people can do.'],
    ['Trust by default', 'Your data, your sources, your decisions. Security and privacy are part of the design.'],
    ['Clear and considered', 'Fewer, better tools. Plain language. No noise.']
  ]
  const journey: [string, string, string][] = [
    ['01', 'Learn', 'Role-based programs in Academy give every team a shared language and confidence with AI.'],
    ['02', 'Build', 'Studio turns what people learn into secure, reusable workflows the whole team can run.'],
    ['03', 'Scale', 'Advisory helps leaders connect it all to strategy, with a clear 90-day adoption plan.']
  ]
  const teams = ['Leadership', 'Operations', 'Marketing & Growth', 'Product & Engineering', 'People & Learning', 'Customer Success']
  const aside = <div className="about-visual" aria-hidden="true"><div className="av-ring r1"></div><div className="av-ring r2"></div><div className="av-core">✦</div><span className="av-chip c1">Tools</span><span className="av-chip c2">Learning</span><span className="av-chip c3">Expertise</span></div>
  return <InfoPage setView={setView} current="about" kicker="ABOUT BITWISEPLUS" title={<>AI that becomes<br/><em>everyday work.</em></>} lead="BitwisePlus helps organizations turn generative AI into measurable results with one connected system for tools, learning and expert guidance." aside={aside}>
    <section className="info-section mission"><span className="overline">OUR MISSION</span><p>To make AI a practical, trusted part of how every team works, and to give people the skills to use it well.</p></section>
    <section className="info-section"><span className="overline">WHAT WE DO</span><h2>One system, three ways in.</h2><div className="info-grid">{productData.map(p => <article className="info-card" key={p[0]}><span className="overline">{p[4]}</span><h3>{p[0]}</h3><p>{p[1]}</p></article>)}</div></section>
    <section className="info-section"><span className="overline">HOW IT FITS TOGETHER</span><h2>From curiosity to capability.</h2><div className="info-grid">{journey.map(j => <article className="info-card step" key={j[0]}><b>{j[0]}</b><h3>{j[1]}</h3><p>{j[2]}</p></article>)}</div></section>
    <section className="info-section"><span className="overline">HOW WE WORK</span><h2>Our principles.</h2><div className="info-grid four">{principles.map(p => <article className="info-card" key={p[0]}><h3>{p[0]}</h3><p>{p[1]}</p></article>)}</div></section>
    <section className="info-section"><span className="overline">WHO WE WORK WITH</span><h2>Built for every team that touches AI.</h2><div className="chip-row">{teams.map(t => <span key={t}>{t}</span>)}</div></section>
    <section className="plan-strip"><span>LET'S TALK</span><b>Tell us where AI could move your team forward.</b><button onClick={() => setView('contact')}>Contact us →</button></section>
  </InfoPage>
}

function ContactPage({ setView }: { setView: (view: View) => void }) {
  const [sent, setSent] = useState(false)
  return <InfoPage setView={setView} current="contact" kicker="CONTACT" title={<>Talk to<br/><em>our team.</em></>} lead="Questions about plans, security or an Advisory engagement? Tell us a little and we'll reply within one business day.">
    <section className="info-section contact-wrap">{sent
      ? <div className="info-card"><span className="overline">MESSAGE RECEIVED</span><h3>Thank you.</h3><p>We've got your note and will get back to you within one business day.</p><button className="primary-btn" onClick={() => setView('home')}>Back to home <Arrow/></button></div>
      : <form className="form contact-form" onSubmit={e => { e.preventDefault(); setSent(true) }}>
        <label>Full name<input required placeholder="Your name" /></label>
        <label>Work email<input required type="email" placeholder="you@company.com" /></label>
        <label>Company<input placeholder="Company name" /></label>
        <label>I'm interested in<select defaultValue="Advisory">{['Studio', 'Academy', 'Advisory', 'Something else'].map(x => <option key={x}>{x}</option>)}</select></label>
        <label>How can we help?<textarea required rows={5} placeholder="Tell us about your team and goals" /></label>
        <button className="primary-btn" type="submit">Send message <Arrow/></button>
      </form>}</section>
  </InfoPage>
}

function SecurityPage({ setView }: { setView: (view: View) => void }) {
  const items: [string, string][] = [
    ['Data protection', 'Data is encrypted in transit and at rest. Workspaces are isolated per organization.'],
    ['Access control', 'Role-based permissions, team workspaces and single sign-on for larger organizations.'],
    ['Responsible AI', 'Answers can be grounded in your own sources, and your content is not used to train public models.'],
    ['Reliability', 'Monitored infrastructure, regular backups and clear incident communication.']
  ]
  return <InfoPage setView={setView} current="security" kicker="SECURITY" title={<>Built to be<br/><em>trusted.</em></>} lead="Enterprise-grade protection for the work your team does with AI.">
    <section className="info-section"><div className="info-grid four">{items.map(p => <article className="info-card" key={p[0]}><h3>{p[0]}</h3><p>{p[1]}</p></article>)}</div></section>
    <section className="plan-strip"><span>SECURITY REVIEW</span><b>Need a questionnaire answered or a security overview?</b><button onClick={() => setView('contact')}>Contact sales →</button></section>
  </InfoPage>
}

const legalDocs: Record<'privacy' | 'terms', { kicker: string; title: string; lead: string; sections: [string, string][] }> = {
  privacy: {
    kicker: 'PRIVACY POLICY', title: 'Your privacy matters.', lead: 'Last updated: October 27, 2026',
    sections: [
      ['Information we collect', 'Account details you provide (such as name and work email), usage information about how you use our products, and content you submit to the services.'],
      ['How we use information', 'To provide and improve BitwisePlus, secure our services, communicate with you, and meet legal obligations. We do not sell your personal information.'],
      ['Sharing', 'We share information only with service providers who help us operate the services, when required by law, or with your consent.'],
      ['Retention and your rights', 'We keep information as long as needed to provide the services. You may request access, correction or deletion of your personal information by contacting us.'],
      ['Contact', 'Questions about this policy can be sent through our Contact page.']
    ]
  },
  terms: {
    kicker: 'TERMS OF SERVICE', title: 'Terms of Service.', lead: 'Last updated: October 27, 2026',
    sections: [
      ['Using the services', 'By creating an account or using BitwisePlus you agree to these terms. You are responsible for the activity on your account and for keeping your credentials secure.'],
      ['Acceptable use', 'Do not misuse the services, attempt to disrupt them, or use them to violate the law or the rights of others.'],
      ['Your content', 'You retain ownership of the content you submit. You grant us the limited rights needed to operate the services for you.'],
      ['Payment', 'Paid plans are billed as described at purchase. Fees are non-refundable except where required by law.'],
      ['Disclaimer and liability', 'The services are provided "as is". To the extent permitted by law, BitwisePlus is not liable for indirect or consequential damages.'],
      ['Changes and termination', 'We may update these terms or suspend access for violations. Continued use after changes means you accept the updated terms.']
    ]
  }
}

function LegalPage({ doc, setView }: { doc: 'privacy' | 'terms'; setView: (view: View) => void }) {
  const d = legalDocs[doc]
  return <InfoPage setView={setView} current={doc} kicker={d.kicker} title={d.title} lead={d.lead}>
    <section className="info-section legal">{d.sections.map(s => <div key={s[0]}><h3>{s[0]}</h3><p>{s[1]}</p></div>)}</section>
  </InfoPage>
}

const routeToView = (): View => {
  const route = window.location.pathname.replace(/^\/+|\/+$/g, '')
  return (['products', 'courses', 'signup', 'workspace', 'pricing', 'about', 'contact', 'security', 'privacy', 'terms'] as View[]).includes(route as View) ? route as View : 'home'
}

function App(){
  const [view,setView] = useState<View>(routeToView)
  const navigate = (next: View) => {
    const path = next === 'home' ? '/' : `/${next}`
    if (window.location.pathname !== path) window.history.pushState({view: next}, '', path)
    setView(next)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
  useEffect(() => {
    const onPopState = () => { setView(routeToView()); window.scrollTo({top: 0, behavior: 'smooth'}) }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  // 全站动效：滚动进度条、鼠标聚光、区块滚动渐显
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      document.documentElement.style.setProperty('--scroll', String(max > 0 ? window.scrollY / max : 0))
    }
    const onMove = (e: MouseEvent) => {
      const hero = document.querySelector<HTMLElement>('.hero')
      if (!hero) return
      const r = hero.getBoundingClientRect()
      hero.style.setProperty('--mx', `${e.clientX - r.left}px`)
      hero.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMove)
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMove) }
  }, [])
  useEffect(() => {
    if (view === 'workspace') return
    const targets = document.querySelectorAll<HTMLElement>('.statement,.product-intro,.product-card,.academy-panel,.cta,.stats-band,.catalog-hero,.product-tabs,.product-focus,.plan-strip,.course-hero,.library-head,.course-card,.academy-join,.info-section,footer')
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return
      const el = en.target as HTMLElement
      el.classList.add('in')
      io.unobserve(el)
      window.setTimeout(() => { el.style.transitionDelay = '' }, 1200)
    }), { threshold: 0.12 })
    targets.forEach((el, i) => {
      el.classList.add('reveal')
      // 同一父级内的卡片依次错开出现
      el.style.transitionDelay = `${(Array.from(el.parentElement?.children ?? []).indexOf(el) % 4) * 90}ms`
      io.observe(el)
    })
    return () => io.disconnect()
  }, [view])
  return <><div className="scroll-progress"></div>{view === 'home' ? <Home setView={navigate}/> : view === 'signup' ? <Signup setView={navigate}/> : view === 'products' ? <ProductPage setView={navigate}/> : view === 'courses' ? <CoursesPage setView={navigate}/> : view === 'pricing' ? <PricingPage setView={navigate}/> : view === 'about' ? <AboutPage setView={navigate}/> : view === 'contact' ? <ContactPage setView={navigate}/> : view === 'security' ? <SecurityPage setView={navigate}/> : view === 'privacy' || view === 'terms' ? <LegalPage doc={view} setView={navigate}/> : <Workspace setView={navigate}/>}</>
}
createRoot(document.getElementById('root')!).render(<App />)
