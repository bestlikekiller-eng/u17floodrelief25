import { Card, CardContent } from '@/components/ui/card';
import { Heart, Building2, Phone, Facebook, Info, Globe, FileCheck } from 'lucide-react';
import unitedLogo from '@/assets/united17-logo.jpg';

const bankAccounts = [
  {
    bank: 'Commercial Bank',
    accountName: 'S.I. A. Muhammadhu',
    accountNumber: '8010632037',
    branch: 'Anuradhapura Main Branch',
  },
  {
    bank: "People's Bank",
    accountName: 'M. Atheeq Ameenudhdheen',
    accountNumber: '052200120088413',
    branch: 'Maho Branch',
  },
];

const contacts = [
  { name: 'Ayash Muhammadh', phone: '+94 77 381 0094', whatsappOnly: false },
  { name: 'Muhammadh Atheeq', phone: '+94 77 285 5928', whatsappOnly: true },
  { name: 'Mohammed Ilman', phone: '+94 77 337 0729', whatsappOnly: false },
  { name: 'Mohammed Ahsan', phone: '+94 77 280 5190', whatsappOnly: false },
];

function getWhatsAppLink(phone: string): string {
  const cleanPhone = phone.replace(/\s+/g, '').replace('+', '');
  return `https://wa.me/${cleanPhone}`;
}

export function DonationCTA() {
  return (
    <section className="container py-8 sm:py-12">
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-success/5">
        <CardContent className="p-6 sm:p-8">
          {/* Emotional Quote Section */}
          <div className="mb-8 text-center">
            <img 
              src={unitedLogo} 
              alt="United 17 Logo" 
              className="mx-auto mb-6 h-24 w-24 rounded-xl object-cover shadow-lg sm:h-32 sm:w-32"
            />
            <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Heart className="h-5 w-5 text-primary" fill="currentColor" />
              <span className="font-medium text-primary">Join Our Mission</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Every Contribution Matters
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Even a small donation can make a big difference in someone's life. 
              Together, we can rebuild homes, restore hope, and bring smiles back to affected families. 
              <span className="mt-2 block font-medium text-foreground">
                Donate whatever you can – join us in this noble mission!
              </span>
            </p>
          </div>

          {/* Transparency Notice */}
          <div className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-start gap-3">
              <FileCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h4 className="font-semibold text-foreground">Full Transparency Guaranteed</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  This portal serves to track all donation amounts transparently. We will also be adding 
                  <span className="font-medium text-foreground"> expenses, receipts, and proof photos </span> 
                  for every transaction – so you can see exactly how your contributions are being utilized.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Bank Accounts */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Bank Accounts
                </h3>
              </div>
              <div className="space-y-4">
                {bankAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <p className="font-semibold text-primary">{account.bank}</p>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Account Name:</span>{' '}
                        <span className="font-medium text-foreground">{account.accountName}</span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Account Number:</span>{' '}
                        <span className="font-mono font-medium text-foreground">{account.accountNumber}</span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Branch:</span>{' '}
                        <span className="font-medium text-foreground">{account.branch}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Confirmation Note */}
              <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                  <p className="text-xs text-amber-800 dark:text-amber-200">
                    <span className="font-semibold">Important:</span> After making a transfer, please send the receipt 
                    or let us know via WhatsApp so we can track and confirm your payment was received successfully.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact & Social */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Contact Us
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {contacts.map((contact, index) => (
                  <a
                    key={index}
                    href={getWhatsAppLink(contact.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:border-green-500 hover:shadow-md"
                  >
                    <span className="text-sm font-medium text-foreground group-hover:text-green-600">
                      {contact.name}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      {contact.phone}
                      {contact.whatsappOnly && <span className="text-green-600"> (WhatsApp only)</span>}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-green-600">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Chat on WhatsApp
                    </span>
                  </a>
                ))}
              </div>

              {/* Facebook Link */}
              <div className="mt-6">
                <a
                  href="https://www.facebook.com/United17SL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1877F2] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  <Facebook className="h-5 w-5" />
                  Follow us on Facebook
                </a>
              </div>

              {/* International Donors Note */}
              <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                      Donating from Abroad?
                    </h4>
                    <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
                      Sri Lankans residing abroad or any foreign friends wishing to contribute – 
                      we have other convenient transaction methods available! 
                      <span className="font-medium"> Reach out to us via WhatsApp</span>, and we'll share 
                      the method that works best for you to transfer directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}