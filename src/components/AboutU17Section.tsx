import { Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AboutU17Section() {
  return (
    <section className="container py-8 sm:py-12">
      <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 via-emerald-500/5 to-purple-500/10 border border-emerald-500/20 p-8 sm:p-12">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2">
          <Heart className="h-5 w-5 text-emerald-600" fill="currentColor" />
          <span className="text-sm font-semibold text-emerald-700">Our Story & Mission</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">
          Who is <span className="text-emerald-600">United 17</span>?
        </h2>

        <div className="mx-auto max-w-4xl space-y-4 text-base text-muted-foreground leading-relaxed">
          <p>
            <span className="font-semibold text-foreground">United 17</span> is a <span className="font-semibold">youth-led volunteer organisation</span> founded on <span className="font-semibold text-foreground">01 June 2021</span>, built by a group of young Sri Lankans who share a <span className="italic font-medium text-emerald-700">unique identity</span> — we are the <span className="font-semibold text-foreground">All Ceylon 2017 O/L Students Federation</span>, consisting of students who were born in <span className="font-semibold">2001</span>, completed <span className="font-semibold">2017 O/L</span>, and later <span className="font-semibold">2020 A/L</span>.
          </p>

          <p>
            This shared journey is what makes <span className="font-semibold text-foreground">United 17</span> truly unique. 💠 <span className="font-semibold">Every volunteer belongs to the same batch and age group</span>. This creates a <span className="italic font-medium text-emerald-700">powerful bond, unity of purpose, and a strong sense of responsibility</span> toward our society.
          </p>

          <p>
            As a <span className="italic">diverse group of youth from different regions, cultures, and religions</span>, we stand together with a <span className="font-semibold text-foreground">common goal: to support our society and contribute positively to our country</span>. Our work focuses on <span className="font-semibold">addressing social issues, helping communities in need, strengthening national welfare, and responding to challenges</span> that affect people across Sri Lanka.
          </p>

          <p>
            <span className="font-semibold text-foreground">United 17</span> also prioritizes the <span className="italic font-medium">personal and social development</span> of our members. We believe that <span className="font-semibold">when youth grow together, learn together, and support one another, they become a strong force</span> capable of <span className="italic">meaningful, long-term impact</span>.
          </p>

          <div className="rounded-lg bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-6 mt-6 border border-emerald-500/20">
            <p className="text-sm text-muted-foreground mb-4">
              If you are also from the <span className="font-semibold text-foreground">2017 O/L batch</span> <span className="text-xs text-muted-foreground">(2001-born)</span> and wish to be part of a <span className="italic font-medium text-emerald-700">youth movement that uplifts communities and creates real change</span>, we warmly invite you to join us.
            </p>
            <Button asChild className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
              <a href="https://wa.me/94772855928" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Atheeq on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
