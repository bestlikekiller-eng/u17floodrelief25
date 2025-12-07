import { Heart, MessageCircle } from 'lucide-react';

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

        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
          Who we <span className="text-emerald-600">are</span>?
        </h2>

        <div className="mx-auto max-w-4xl space-y-6 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed text-center">
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
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              If you are also from the <span className="font-semibold text-foreground">2017 O/L batch</span> <span className="text-xs">(2001-born)</span> and wish to be part of a <span className="font-semibold text-emerald-700">youth movement that uplifts communities and creates real change</span>, we warmly invite you to join us.
            </p>

            {/* Contact Cards */}
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
              {/* Ayash Card */}
              <a
                href="https://wa.me/94773810094"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border-2 border-emerald-500 bg-white dark:bg-muted/50 p-4 sm:p-5 hover:shadow-lg transition-shadow"
              >
                <p className="font-semibold text-foreground text-sm sm:text-base">Ayash Muhammadh</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">+94 77 381 0094</p>
                <div className="mt-3 flex items-center justify-center gap-2 text-emerald-600">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">Chat on WhatsApp</span>
                </div>
              </a>

              {/* Atheeq Card */}
              <a
                href="https://wa.me/94772855928"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border-2 border-emerald-500 bg-white dark:bg-muted/50 p-4 sm:p-5 hover:shadow-lg transition-shadow"
              >
                <p className="font-semibold text-foreground text-sm sm:text-base">Muhammadh Atheeq</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">+94 77 285 5928 <span className="text-xs">(WhatsApp only)</span></p>
                <div className="mt-3 flex items-center justify-center gap-2 text-emerald-600">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">Chat on WhatsApp</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
