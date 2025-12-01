import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, LogIn, LogOut, LayoutDashboard } from 'lucide-react';

export function Header() {
  const { isLoggedIn, currentAdmin, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-effect">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg hero-gradient">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-lg font-bold leading-tight text-foreground">
              United 17
            </h1>
            <p className="text-xs text-muted-foreground leading-none">
              Flood Relief
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <span className="hidden sm:inline text-sm text-muted-foreground">
                Welcome, <span className="font-medium text-foreground">{currentAdmin}</span>
              </span>
              {location.pathname !== '/admin' && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              )}
              {location.pathname !== '/' && (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/">
                    View Public
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Admin Login
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
