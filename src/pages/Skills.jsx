import SectionTitle from '../components/SectionTitle';

const skillCategories = [
  {
    title: 'LENGUAJES',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Bash', level: 88 },
      { name: 'C/C++', level: 70 },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    title: 'SEGURIDAD',
    skills: [
      { name: 'Penetration Testing', level: 92 },
      { name: 'Network Security', level: 88 },
      { name: 'OSINT', level: 90 },
      { name: 'Forensics', level: 78 },
      { name: 'Malware Analysis', level: 75 },
      { name: 'Cryptography', level: 80 },
    ],
  },
  {
    title: 'HERRAMIENTAS',
    skills: [
      { name: 'Kali Linux', level: 95 },
      { name: 'Burp Suite', level: 88 },
      { name: 'Metasploit', level: 85 },
      { name: 'Wireshark', level: 90 },
      { name: 'Docker', level: 82 },
      { name: 'Git', level: 92 },
    ],
  },
];

function SkillBar({ name, level, delay }) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${delay}s`, opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs tracking-[0.15em] text-white/70 font-medium">{name}</span>
        <span className="text-[10px] tracking-wider text-cyan/60">{level}%</span>
      </div>
      <div className="h-[2px] bg-secondary/50 w-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan to-cyan/60 transition-all duration-1000 ease-out"
          style={{
            width: `${level}%`,
            animation: `fade-in 1s ${delay + 0.3}s ease-out forwards`,
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="HABILIDADES" subtitle="// ARSENAL TÉCNICO" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {skillCategories.map((category, catIdx) => (
            <div
              key={category.title}
              className="border border-cyan/10 p-6 bg-secondary/10 animate-fade-in-up"
              style={{ animationDelay: `${catIdx * 0.2}s`, opacity: 0 }}
            >
              <h3 className="text-sm font-bold tracking-[0.25em] text-cyan mb-8 text-center">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIdx) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.3 + catIdx * 0.2 + skillIdx * 0.08}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Extra certs section */}
        <div
          className="mt-16 text-center animate-fade-in-up"
          style={{ animationDelay: '1s', opacity: 0 }}
        >
          <h3 className="text-xs tracking-[0.3em] text-white/30 mb-6">CERTIFICACIONES</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['CEH', 'OSCP', 'CompTIA Sec+', 'AWS Security', 'CISSP'].map((cert) => (
              <span
                key={cert}
                className="px-4 py-2 border border-cyan/15 text-[10px] tracking-[0.2em] text-white/40 hover:text-cyan hover:border-cyan/40 transition-all duration-300"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}