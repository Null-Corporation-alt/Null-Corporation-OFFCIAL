export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-16 animate-fade-in-up">
      <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] text-white mb-4">
        {title}
      </h1>
      <div className="w-16 h-[2px] bg-cyan mx-auto mb-4" />
      {subtitle && (
        <p className="text-sm tracking-[0.2em] text-cyan/70 glow-cyan-subtle">
          {subtitle}
        </p>
      )}
    </div>
  );
}