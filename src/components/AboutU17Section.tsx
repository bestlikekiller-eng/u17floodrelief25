import { Heart, MessageCircle } from 'lucide-react';

// WhatsApp icon SVG component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function AboutU17Section() {
  return (
    <section className="container py-8 sm:py-12">
      <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 via-emerald-500/5 to-purple-500/10 border border-emerald-500/20 p-6 sm:p-10 lg:p-12">
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2">
            <Heart className="h-5 w-5 text-emerald-600" fill="currentColor" />
            <span className="text-sm font-semibold text-emerald-700">Our Story & Mission</span>
          </div>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
          Who we <span className="text-emerald-600">are</span>?
        </h2>

        <div className="mx-auto max-w-4xl space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed text-center">
          <p>
            <span className="font-semibold text-foreground">United 17</span> is a <span className="font-semibold text-foreground">youth-led volunteer organisation</span> founded on <span className="font-semibold text-foreground">01 June 2021</span>, built by a group of young Sri Lankans who share a <span className="font-semibold text-emerald-700">unique identity</span> — we are the <span className="font-semibold text-foreground">All Ceylon 2017 O/L Students Federation</span>, consisting of students who were born in <span className="font-semibold">2001</span>, completed <span className="font-semibold">2017 O/L</span>, and later <span className="font-semibold">2020 A/L</span>.
          </p>

          <p>
            This shared journey is what makes <span className="font-semibold text-foreground">United 17</span> truly unique. 💠 <span className="font-semibold text-foreground">Every volunteer belongs to the same batch and age group</span>. This creates a <span className="font-semibold text-emerald-700">powerful bond, unity of purpose, and a strong sense of responsibility</span> toward our society.
          </p>

          <p>
            As a <span className="font-semibold text-foreground">diverse group of youth from different regions, cultures, and religions</span>, we stand together with a <span className="font-semibold text-foreground">common goal: to support our society and contribute positively to our country</span>. Our work focuses on <span className="font-semibold text-foreground">addressing social issues, helping communities in need, strengthening national welfare, and responding to challenges</span> that affect people across Sri Lanka.
          </p>

          <p>
            <span className="font-semibold text-foreground">United 17</span> also prioritizes the <span className="font-semibold text-foreground">personal and social development</span> of our members. We believe that <span className="font-semibold text-foreground">when youth grow together, learn together, and support one another, they become a strong force</span> capable of <span className="font-semibold text-emerald-700">meaningful, long-term impact</span>.
          </p>

          <div className="rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-6 sm:p-8 mt-8 border border-emerald-500/20">
            <p className="text-sm text-muted-foreground mb-6">
              If you are also from the <span className="font-semibold text-foreground">2017 O/L batch</span> <span className="text-xs">(2001-born)</span> and wish to be part of a <span className="font-semibold text-emerald-700">youth movement that uplifts communities and creates real change</span>, we warmly invite you to join us.
            </p>

            {/* Contact Cards - DonationCTA Style */}
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
              {/* Ayash Card */}
              <a
                href="https://wa.me/94773810094"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:border-green-500 hover:shadow-md"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground group-hover:text-green-600">
                    Ayash Muhammadh
                  </span>
                  <span className="text-xs text-muted-foreground">
                    +94 77 381 0094
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                    <WhatsAppIcon className="h-4 w-4" />
                    Chat on WhatsApp
                  </span>
                </div>
              </a>

              {/* Atheeq Card */}
              <a
                href="https://wa.me/94772855928"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:border-green-500 hover:shadow-md"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground group-hover:text-green-600">
                    Muhammadh Atheeq
                  </span>
                  <span className="text-xs text-muted-foreground">
                    +94 77 285 5928 <span className="text-green-600">(WhatsApp only)</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                    <WhatsAppIcon className="h-4 w-4" />
                    Chat on WhatsApp
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
