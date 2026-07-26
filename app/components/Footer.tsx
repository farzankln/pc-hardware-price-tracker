import Link from "next/link";
import { Cpu, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
              <Cpu className="h-5 w-5 text-primary" />
              PC Tracker
            </Link>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              Compare, track, and monitor PC hardware prices from multiple retailers.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Categories</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/category/cpu" className="text-sm text-text-secondary transition hover:text-primary">CPUs</Link></li>
              <li><Link href="/category/gpu" className="text-sm text-text-secondary transition hover:text-primary">GPUs</Link></li>
              <li><Link href="/category/ram" className="text-sm text-text-secondary transition hover:text-primary">RAM</Link></li>
              <li><Link href="/category/ssd" className="text-sm text-text-secondary transition hover:text-primary">SSDs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Account</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/wishlist" className="text-sm text-text-secondary transition hover:text-primary">Wishlist</Link></li>
              <li><Link href="/cart" className="text-sm text-text-secondary transition hover:text-primary">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-3 space-y-2">
              <li><span className="text-sm text-text-muted cursor-default">About</span></li>
              <li><span className="text-sm text-text-muted cursor-default">Contact</span></li>
              <li><span className="text-sm text-text-muted cursor-default">Privacy</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-text-muted"> PC Hardware Price Tracker. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-text-muted transition hover:text-foreground" aria-label="GitHub">
              <ExternalLink className="h-5 w-5" />
            </a>
            <a href="#" className="text-text-muted transition hover:text-foreground" aria-label="Twitter">
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
