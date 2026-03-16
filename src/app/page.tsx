"use client"

import React from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function App() {
  const expertise = [
    {
      title: 'AI product integration',
      detail:
        'Building practical AI features, internal tools, and automation workflows that improve efficiency, reduce manual work, and create real business value.',
    },
    {
      title: 'Full-stack systems',
      detail:
        'Designing and developing complete product flows across frontend, backend, APIs, and application logic with a focus on maintainability and speed.',
    },
    {
      title: 'Architecture and infrastructure',
      detail:
        'Designing the technical foundation behind products, from system architecture and APIs to deployment, environments, and monitoring, so software stays reliable, scalable, and production-ready.',
    },
    {
      title: 'Product-minded engineering',
      detail:
        'Bringing together engineering, usability, and business context to build solutions that are not only functional, but also clear and effective.',
    },
  ]

  const [openExpertise, setOpenExpertise] = React.useState(expertise[0].title)

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#0a0a0a] selection:bg-[#ff3300] selection:text-white">
      <header className="sticky top-0 z-50 border-b-2 border-[#0a0a0a] bg-[#fafaf8]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:contents">
            <a
              href="#top"
              className="font-space relative inline-flex items-center gap-3 text-base font-semibold tracking-[-0.02em] text-[#0a0a0a] sm:text-lg"
            >
              <span>Leon Yanagida</span>
            </a>

            <div className="font-mono-custom order-2 flex items-center gap-3 text-[9px] uppercase tracking-[0.08em] text-[#2a2a2a] sm:order-3 sm:gap-2 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00ff66] shadow-[0_0_0_2px_#fafaf8,0_0_0_4px_#00ff66] sm:h-2 sm:w-2" />
              <span>Online Now</span>
            </div>
          </div>

          <div className="order-3 -mx-4 border-t border-[#0a0a0a]/10 px-4 pt-3 sm:order-2 sm:mx-0 sm:border-0 sm:px-0 sm:pt-0">
            <nav className="flex w-full items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.08em] text-[#2a2a2a] sm:w-auto sm:flex-wrap sm:justify-start sm:gap-8 sm:text-[12px]">
              <a
                href="#about"
                className="flex min-w-0 flex-1 items-center justify-center border-b border-transparent px-0 py-1.5 text-center transition hover:text-[#0a0a0a] hover:border-[#ff3300] sm:min-w-fit sm:flex-none sm:justify-start sm:py-0"
              >
                About
              </a>
              <a
                href="#contact"
                className="flex min-w-0 flex-1 items-center justify-center border-b border-transparent px-0 py-1.5 text-center transition hover:text-[#0a0a0a] hover:border-[#ff3300] sm:min-w-fit sm:flex-none sm:justify-start sm:py-0"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="grid min-h-[calc(100vh-84px)] border-b-2 border-[#0a0a0a] lg:grid-cols-2">
          <div className="relative flex flex-col justify-center border-b-2 border-[#0a0a0a] px-5 py-12 sm:px-8 lg:border-r-2 lg:border-b-0 lg:px-12 xl:px-16">
            <div className="font-mono-custom mb-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-[#2a2a2a]">
              <span className="h-px w-10 bg-[#ff3300]" />
              <span>Software Engineer / Product Builder</span>
            </div>

            <h1 className="font-space mb-6 text-[clamp(3rem,9vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.05em]">
              <span className="block">Building</span>
              <span className="block">digital</span>
              <span className="block">products_</span>
            </h1>

            <p className="font-inter max-w-[34rem] text-lg leading-8 text-[#2a2a2a]">
              Full-stack engineer focused on building AI-powered systems, solid product architecture, and software that makes teams faster, operations smoother, and products easier to scale.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 border-2 border-[#0a0a0a] px-5 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-[#0a0a0a] transition hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-[#0a0a0a] hover:text-white hover:shadow-[4px_4px_0_#ff3300]"
              >
                <span className="transition group-hover:text-white">Contact</span>
                <span className="transition group-hover:text-white">→</span>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              {[
                ['5+', 'Years'],
                ['Full-Stack', 'Builder'],
                ['AI Architect', 'Systems'],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="font-space text-3xl font-semibold leading-none">
                    {value}
                  </span>
                  <span className="font-mono-custom text-[11px] uppercase tracking-[0.12em] text-[#2a2a2a]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[28rem] items-center justify-center overflow-hidden bg-[#e8e8e3] px-5 py-10 sm:px-8 lg:px-12 xl:px-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(0,102,255,0.10),transparent_25%),radial-gradient(circle_at_20%_80%,rgba(255,51,0,0.10),transparent_25%)]" />

            <div className="relative w-full max-w-[34rem] border-[3px] border-[#0a0a0a] bg-[#f5f5f0] p-5 shadow-[12px_12px_0_rgba(0,0,0,0.12)] sm:p-7">
              <div className="font-mono-custom mb-4 text-[11px] uppercase tracking-[0.12em] text-[#2a2a2a]">
                signal_board_2026
              </div>

              <div className="grid gap-3">
                {[
                  ['ROLE', 'Full-stack software engineer'],
                  ['FOCUS', 'AI / Architecture / Product systems'],
                  ['VALUE', 'Automation / Scale / Impact'],
                  ['STYLE', 'Practical, sharp, business-first'],
                ].map(([key, value], index) => (
                  <div
                    key={key}
                    className={`grid grid-cols-[92px_1fr] gap-3 border-2 border-[#0a0a0a] px-3 py-3 text-sm ${index === 2 ? 'bg-[#ff3300] text-white' : index === 1 ? 'bg-[#2b2b2b] text-white' : 'bg-[#fafaf8] text-[#0a0a0a]'}`}
                  >
                    <div className="font-mono-custom text-[11px] uppercase tracking-[0.12em] opacity-80">
                      {key}
                    </div>
                    <div className="font-space font-medium tracking-[-0.02em]">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute right-[8%] bottom-[3%] rotate-[7deg] bg-[#ff3300] px-4 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-white shadow-[4px_4px_0_#0a0a0a] sm:bottom-[8%]">
              5+ Years XP
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-b-2 border-[#0a0a0a] bg-[#0a0a0a] py-4 text-[#fafaf8]">
          <motion.div
            className="font-mono-custom flex gap-10 whitespace-nowrap px-6 text-[12px] uppercase tracking-[0.14em]"
            animate={{ x: [0, -900] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <React.Fragment key={i}>
                <span>React / Next.js</span>
                <span>✦</span>
                <span>TypeScript</span>
                <span>✦</span>
                <span>Node.js</span>
                <span>✦</span>
                <span>AWS / Cloud</span>
                <span>✦</span>
                <span>AI Integration</span>
                <span>✦</span>
                <span>System Thinking</span>
                <span>✦</span>
              </React.Fragment>
            ))}
          </motion.div>
        </section>

        <div id="about" className="scroll-mt-24 bg-[#0a0a0a]">
          <div className="font-space flex items-center gap-3 bg-[#fafaf8] px-5 py-6 text-sm font-semibold uppercase tracking-[0.12em] sm:px-8 lg:px-12 xl:px-16">
            <span>About me</span>
            <span className="text-[#2a2a2a]">↓</span>
          </div>
        </div>

        <section className="grid gap-[2px] bg-[#0a0a0a] lg:grid-cols-2">
          <div className="bg-[#fafaf8] px-5 pt-12 pb-48 sm:px-8 lg:px-12 xl:px-16">
            <p className="mb-6 text-xl font-medium leading-9 text-[#0a0a0a] sm:text-2xl sm:leading-10">
              I do my best work where{' '}
              <span className="inline-block rotate-[-1deg] bg-[#ff3300] px-2 py-0.5 text-white">
                product thinking
              </span>
              , engineering depth, and business needs intersect.
            </p>
            <p className="mb-6 text-lg leading-9 text-[#2a2a2a]">
              I like owning enough of the system to make better decisions, move
              quickly, and build solutions that are both practical and well
              considered.
            </p>
            <p className="mb-6 text-lg leading-9 text-[#2a2a2a]">
              I&apos;m especially interested in work that improves workflows,
              reduces unnecessary complexity, and creates real leverage through
              better software and thoughtful AI integration.
            </p>
            <p className="text-lg leading-9 text-[#2a2a2a]">
              For me, good engineering is not just about shipping features. It
              is about building systems and experiences that stay useful,
              reliable, and clear over time.
            </p>
          </div>

          <div className="bg-[#f5f5f0] px-5 py-12 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid gap-10">
              <div>
                <div className="font-mono-custom mb-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#2a2a2a]">
                  <span className="text-[#ff3300]">■</span>
                  <span>Current focus</span>
                </div>
                <div className="grid gap-0.5">
                  {expertise.map((item) => (
                    <div key={item.title} className="border-b border-[#e8e8e3] py-1">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenExpertise((current) =>
                            current === item.title ? '' : item.title,
                          )
                        }
                        className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-lg transition hover:text-[#ff3300]"
                        aria-expanded={openExpertise === item.title}
                      >
                        <span>{item.title}</span>
                        <motion.span
                          className="text-[#2a2a2a]"
                          animate={{ rotate: openExpertise === item.title ? 45 : 0 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                        >
                          +
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {openExpertise === item.title ? (
                          <motion.div
                            key={item.title}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <motion.div
                              initial={{ y: -8 }}
                              animate={{ y: 0 }}
                              exit={{ y: -8 }}
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                              className="pb-4 pr-8 text-sm leading-7 text-[#2a2a2a]"
                            >
                              {item.detail}
                            </motion.div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0a0a0a] p-5 text-[#fafaf8]">
                <div className="font-mono-custom mb-2 text-[11px] uppercase tracking-[0.12em] text-[#ff3300]">
                  Now focused
                </div>
                <div className="text-base leading-7">
                  AI-powered product systems, practical automation, and sharper user experiences.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="grid gap-[2px] bg-[#0a0a0a] lg:grid-cols-2">
          <div className="bg-[#0a0a0a] px-5 py-12 text-[#fafaf8] sm:px-8 lg:px-12 xl:px-16">
            <div className="font-mono-custom mb-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#ff3300]">
              <span>★</span>
              <span>Featured project</span>
            </div>

            <h2 className="font-space text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              Chrome Piano
            </h2>
            <p className="mt-6 max-w-[34rem] text-lg leading-9 text-white/80">
              Chrome Piano is a fun side project I built in 2017 to learn how to make interactive web applications.
            </p>

            <div className="mt-10 flex flex-wrap gap-10 border-t border-white/10 pt-8">
              {[
                ['100K+', 'Users'],
                ['1M+', 'Downloads'],
                ['∞', 'Fun'],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="font-space text-5xl font-medium leading-none text-[#ff3300]">
                    {value}
                  </span>
                  <span className="font-mono-custom text-[11px] uppercase tracking-[0.12em] text-white/45">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://chromewebstore.google.com/detail/chrome-piano/pjafcgbpdclmdeiipolenjgkikeldljl"
              className="group mt-10 inline-flex items-center gap-3 border-2 border-[#fafaf8] px-5 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-[#fafaf8] transition hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-[#fafaf8] hover:text-[#0a0a0a] hover:shadow-[4px_4px_0_#ff3300]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="transition group-hover:text-[#0a0a0a]">
                Download Chrome Extension
              </span>
              <ArrowRight className="h-4 w-4 transition group-hover:text-[#0a0a0a]" />
            </a>
          </div>

          <div className="relative flex min-h-[28rem] items-center justify-center overflow-hidden bg-[#2a2a2a] px-4 py-8 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,51,0,0.16),transparent_26%),radial-gradient(circle_at_80%_70%,rgba(0,102,255,0.18),transparent_28%)]" />
            <div className="relative mt-6 w-full max-w-[38rem]">
              <a
                href="https://chromewebstore.google.com/detail/chrome-piano/pjafcgbpdclmdeiipolenjgkikeldljl"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                  <Image
                    src="/static/chrome-piano.svg"
                  alt="Chrome Piano project preview"
                    width={700}
                    height={500}
                  className="h-auto w-full drop-shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                />
              </a>
              <div className="mx-auto mt-3 h-8 w-[80%] rounded-full bg-black/35 blur-2xl" />
              <div className="absolute top-[12%] -left-5 text-3xl text-white/50">
                ♪
              </div>
              <div className="absolute top-[46%] right-0 text-4xl text-white/45">
                ♫
              </div>
              <div className="absolute bottom-[6%] left-[20%] text-2xl text-white/40">
                ♬
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t-2 border-[#0a0a0a] bg-[#fafaf8]">
        <div className="grid gap-[2px] bg-[#0a0a0a] lg:grid-cols-2">
          <div className="bg-[#fafaf8] px-5 py-12 sm:px-8 lg:px-12 xl:px-16">
            <h2 className="font-space text-[clamp(2.4rem,4vw,4rem)] font-medium leading-[1.1] tracking-[-0.03em]">
              Let&apos;s build
              <br />
              something together
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#2a2a2a]">
              Strong product ideas, better interfaces, cleaner systems, or AI
              workflows that actually help.
            </p>

            <div className="mt-10 grid gap-2">
              {[
                ['Email', 'contact@leonyanagida.com'],
              ].map(([label, value]) => (
                <a
                  key={label}
                  href={`mailto:${value}`}
                  className="group flex items-center justify-between border-b border-[#e8e8e3] py-5 text-xl font-medium tracking-[-0.02em] transition hover:text-[#ff3300]"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-space">{value}</span>
                  </span>
                  <span className="transition group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-[#f5f5f0] px-5 py-12 sm:px-8 lg:px-12 xl:px-16">
            <div className="text-sm leading-8 text-[#2a2a2a]">
              <p>
                <strong className="text-[#0a0a0a]">Location</strong>
                <br />
                Los Angeles / Remote
              </p>
            </div>

            <div className="font-mono-custom mt-8 inline-flex items-center gap-2 bg-[#0a0a0a] px-4 py-3 text-sm uppercase tracking-[0.08em] text-[#fafaf8]">
              <span className="h-2 w-2 rounded-full bg-[#00ff66]" />
              Online Now
            </div>

            <blockquote className="font-space mt-10 border-t-2 border-[#e8e8e3] pt-8 text-2xl font-medium leading-9 tracking-[-0.02em] text-[#2a2a2a] italic">
              &ldquo;The best products don&apos;t just work well. They make the right thing feel obvious.&rdquo;
            </blockquote>
          </div>
        </div>

        <div className="font-mono-custom flex flex-col gap-3 border-t-2 border-[#0a0a0a] px-5 py-6 text-sm text-[#2a2a2a] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12 xl:px-16">
          <span>© 2026 Leon Yanagida</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-left transition hover:text-[#ff3300] sm:text-right"
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </div>
  )
}
