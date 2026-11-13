/**
 * Synthesizes a restrained, luxury electric-energy shimmer and harmonic chord
 * using the browser Web Audio API. Requires prior user interaction in browsers
 * that enforce autoplay policies; fails silently if blocked.
 */
class IntroSoundEngine {
  private ctx: AudioContext | null = null;
  private activeNodes: AudioNode[] = [];

  public playElectricReveal(): boolean {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return false;

      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.14, now + 0.25);
      master.gain.exponentialRampToValueAtTime(0.08, now + 1.8);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 2.9);
      master.connect(this.ctx.destination);

      // Warm sub-bass forest resonance (D2 = 73.42 Hz)
      const subOsc = this.ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(65, now);
      subOsc.frequency.exponentialRampToValueAtTime(73.42, now + 0.8);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.6, now);
      subOsc.connect(subGain);
      subGain.connect(master);

      // Electric shimmer harmonic (A3 + E4)
      const shimmerOsc = this.ctx.createOscillator();
      shimmerOsc.type = 'triangle';
      shimmerOsc.frequency.setValueAtTime(220, now + 0.35);
      shimmerOsc.frequency.exponentialRampToValueAtTime(329.63, now + 1.4);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(420, now);
      filter.frequency.exponentialRampToValueAtTime(1600, now + 1.2);
      filter.Q.value = 3.5;

      const shimmerGain = this.ctx.createGain();
      shimmerGain.gain.setValueAtTime(0.001, now);
      shimmerGain.gain.exponentialRampToValueAtTime(0.28, now + 0.65);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      shimmerOsc.connect(filter);
      filter.connect(shimmerGain);
      shimmerGain.connect(master);

      // Subtle crystalline chime on brand reveal
      const chimeOsc = this.ctx.createOscillator();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(587.33, now + 1.05); // D5
      const chimeGain = this.ctx.createGain();
      chimeGain.gain.setValueAtTime(0.0001, now + 1.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.18, now + 1.15);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
      chimeOsc.connect(chimeGain);
      chimeGain.connect(master);

      subOsc.start(now);
      shimmerOsc.start(now + 0.2);
      chimeOsc.start(now + 1.05);

      subOsc.stop(now + 3.0);
      shimmerOsc.stop(now + 2.5);
      chimeOsc.stop(now + 2.6);

      this.activeNodes = [master, subOsc, shimmerOsc, chimeOsc];
      return true;
    } catch {
      return false;
    }
  }

  public stop(): void {
    try {
      this.activeNodes.forEach((node) => {
        if ('stop' in node && typeof (node as OscillatorNode).stop === 'function') {
          try {
            (node as OscillatorNode).stop();
          } catch {
            // ignore already stopped
          }
        }
        node.disconnect();
      });
      this.activeNodes = [];
    } catch {
      // ignore
    }
  }
}

export const introSound = new IntroSoundEngine();
