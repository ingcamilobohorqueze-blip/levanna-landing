import { useEffect, useRef, useState } from 'react';

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [isVantaReady, setIsVantaReady] = useState(false);

  // Detect system color scheme preference
  const [isDark, setIsDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  // Initialize and clean up Vanta.js
  useEffect(() => {
    let intervalId: any;
    let effect: any = null;
    let isCleanedUp = false;
    
    const initVanta = () => {
      if (isCleanedUp) return;
      const VANTA = (window as any).VANTA;
      
      if (VANTA && VANTA.NET && vantaRef.current) {
        try {
          // If we already have a running effect, destroy it first
          if (effect) {
            effect.destroy();
            effect = null;
          }
          
          // Clean up the container div to prevent duplicate canvases from stacking
          vantaRef.current.innerHTML = '';
          
          effect = VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            points: 10.0,        // Customizer setting: 10
            maxDistance: 25.0,    // Customizer setting: 25
            spacing: 18.0,        // Customizer setting: 18
            showDots: false,      // Customizer setting: Hide dots entirely
            color: isDark ? 0x555560 : 0x8d8d98,            // Slightly brighter grey for dark mode to prevent lines appearing black
            backgroundColor: isDark ? 0x15161c : 0xf8fafc,  
            backgroundAlpha: 0.0, // Transparent backing so logo is visible underneath
          });
          
          setIsVantaReady(true);
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        } catch (err) {
          console.error('Error initializing Vanta.js:', err);
        }
      }
    };

    const VANTA = (window as any).VANTA;
    if (VANTA && VANTA.NET) {
      initVanta();
    } else {
      intervalId = setInterval(initVanta, 100);
    }

    return () => {
      isCleanedUp = true;
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (effect) {
        try {
          effect.destroy();
        } catch (e) {
          console.warn('Error destroying Vanta:', e);
        }
      }
      if (vantaRef.current) {
        vantaRef.current.innerHTML = ''; // Force clear container on unmount/recreation to prevent HMR leaks
      }
      setIsVantaReady(false);
    };
  }, [isDark]); // Recreate fresh instance when isDark theme shifts

  return (
    <div
      id="vanta-bg-canvas"
      ref={vantaRef}
      className={isVantaReady ? 'vanta-ready' : ''}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -4, // Behind logo wrapper (-3) and glows (-1)
        pointerEvents: 'none',
      }}
    />
  );
}
