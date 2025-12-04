import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { Lock, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ADMINS = ['Ayash', 'Atheeq', 'Inas'] as const;

export default function Login() {
  const [selectedAdmin, setSelectedAdmin] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAdmin) {
      toast({
        title: 'Error',
        description: 'Please select an admin',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    const success = await login(selectedAdmin, password);
    setLoading(false);

    if (success) {
      toast({
        title: 'Welcome!',
        description: `Logged in as ${selectedAdmin}`,
      });
      navigate('/admin');
    } else {
      toast({
        title: 'Error',
        description: 'Invalid password',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
        <Card className="w-full max-w-md shadow-card animate-scale-in">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl hero-gradient">
              <Lock className="h-7 w-7 text-primary-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Select your account and enter your password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Admin Selection */}
              <div className="space-y-3">
                <Label>Select Admin</Label>
                <div className="grid grid-cols-3 gap-3">
                  {ADMINS.map((admin) => (
                    <button
                      key={admin}
                      type="button"
                      onClick={() => setSelectedAdmin(admin)}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
                        selectedAdmin === admin
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      )}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarFallback
                          className={cn(
                            'font-semibold',
                            selectedAdmin === admin
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          )}
                        >
                          {admin.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={cn(
                          'font-medium',
                          selectedAdmin === admin
                            ? 'text-primary'
                            : 'text-foreground'
                        )}
                      >
                        {admin}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Password */}
              {selectedAdmin && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pr-10"
                      required
                    />
                    <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                disabled={!selectedAdmin || !password || loading}
              >
                {loading ? (
                  'Logging in...'
                ) : (
                  <>
                    Login as {selectedAdmin || 'Admin'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
