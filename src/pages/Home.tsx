import { Link } from "react-router-dom";
import { lessons } from "@/content";
import { Logo } from "@/components/Logo";
import { Mascot } from "@/components/Mascot";
import { loadProgress } from "@/lib/storage";

const MODULE_ICONS = ["☕", "📐", "📦", "🔗", "🍫", "🧋", "🌀", "🕸️", "🌳", "⛰️", "🗄️", "🗺️", "🍬"];

export function Home() {
  const progress = loadProgress();

  return (
    <div className="min-h-screen cocoa-dust flex flex-col items-center px-4 py-10 gap-10 relative">
      {/* dekoratif arka plan lekeleri */}
      <div className="pointer-events-none fixed -top-10 -left-10 w-64 h-64 rounded-full bg-caramel/15 blur-3xl" />
      <div className="pointer-events-none fixed top-40 -right-16 w-72 h-72 rounded-full bg-blush/15 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-1/3 w-80 h-80 rounded-full bg-mint/10 blur-3xl" />

      <div className="flex flex-col items-center gap-2 z-10">
        <Logo className="w-80 h-auto drop-shadow-xl" />
        <p className="text-center max-w-md text-cocoa-600 dark:text-cream/80 font-semibold">
          Veri yapılarını, bir fincan sıcak çikolatayla öğren.
          <br />
          <span className="shimmer-gold font-display text-lg">Her modül dükkânın bir durağı. 🍫</span>
        </p>
      </div>

      <div className="choc-card drip-top flex items-center gap-4 px-6 py-4 z-10 animate-pop" style={{ "--choc-card-top": "#fff6e9", "--choc-card-bottom": "#f3dcb8" } as React.CSSProperties}>
        <Mascot mood="happy" className="w-20 h-20" />
        <div className="text-sm font-semibold">
          <p className="flex items-center gap-1.5">
            <span className="text-lg">🍫</span> {progress.chocolateSquares} çikolata karesi
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-lg">🌰</span> {progress.cacaoBeans} kakao çekirdeği
          </p>
          <p className="flex items-center gap-1.5 text-caramel">
            <span className="text-lg">✓</span> {progress.completedLessons.length} / {lessons.length} modül tamamlandı
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 w-full max-w-2xl z-10">
        {lessons.map((lesson, i) => {
          const completed = progress.completedLessons.includes(lesson.id);
          return (
            <Link
              key={lesson.id}
              to={`/ders/${lesson.id}`}
              className="choc-card drip-top group p-5 flex flex-col gap-1.5 transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:rotate-[-0.5deg]"
              style={
                {
                  "--choc-card-top": completed ? "#e9f6ee" : "#fff6e9",
                  "--choc-card-bottom": completed ? "#c9ead4" : "#f3dcb8",
                  animationDelay: `${i * 0.04}s`,
                } as React.CSSProperties
              }
            >
              <div className="flex items-start justify-between">
                <span className="text-xs text-caramel font-bold tracking-wide uppercase">Modül {lesson.moduleNumber}</span>
                <span className="text-2xl group-hover:animate-bob">{MODULE_ICONS[i] ?? "🍬"}</span>
              </div>
              <h3 className="font-display text-xl text-cocoa-800 dark:text-cream">{lesson.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                {lesson.isExamScope && (
                  <span className="text-xs w-fit bg-blush/40 text-cocoa-800 px-2.5 py-0.5 rounded-full font-semibold">
                    Vize Kapsamı
                  </span>
                )}
                {completed && (
                  <span className="text-xs w-fit bg-mint/50 text-cocoa-800 px-2.5 py-0.5 rounded-full font-semibold">
                    ✓ Tamamlandı
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <footer className="text-xs text-cocoa-500 dark:text-cream/50 z-10 pb-4">
        🍫 ChocoNode — "Veri yapılarını, bir fincan sıcak çikolatayla öğren."
      </footer>
    </div>
  );
}
