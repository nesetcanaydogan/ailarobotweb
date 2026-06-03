import { useEffect, useState, MutableRefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export function useScrollTimeline(targetRef?: MutableRefObject<THREE.Group | null>) {
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Ensure the trigger exists in the DOM
    const trigger = document.querySelector('#main-container');
    if (!trigger) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#main-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          markers: false, // Set to true for debugging if needed
        },
      });

      // Define segments
      tl.addLabel('hero', 0);
      tl.addLabel('verticals', 0.5);
      tl.addLabel('story', 1.5);
      tl.addLabel('demo', 2);

      if (targetRef?.current) {
        // HERO -> VERTICALS
        tl.to(targetRef.current.position, {
          x: 2,
          y: -0.5,
          z: 0,
          ease: 'power2.inOut',
        }, 'verticals');
        
        tl.to(targetRef.current.rotation, {
          y: -Math.PI * 0.15,
          ease: 'power2.inOut',
        }, 'verticals');

        tl.to(targetRef.current.scale, {
          x: 0.8,
          y: 0.8,
          z: 0.8,
          ease: 'power2.inOut',
        }, 'verticals');

        // VERTICALS -> STORY
        tl.to(targetRef.current.position, {
          x: -2,
          y: 0,
          z: 1,
          ease: 'power2.inOut',
        }, 'story');

        tl.to(targetRef.current.rotation, {
          y: Math.PI * 0.2,
          ease: 'power2.inOut',
        }, 'story');

        tl.to(targetRef.current.scale, {
          x: 1.2,
          y: 1.2,
          z: 1.2,
          ease: 'power2.inOut',
        }, 'story');

        // STORY -> DEMO
        tl.to(targetRef.current.position, {
          x: 0,
          y: 0.5,
          z: 2,
          ease: 'power3.out',
        }, 'demo');

        tl.to(targetRef.current.rotation, {
          y: 0,
          x: 0.1,
          ease: 'power3.out',
        }, 'demo');

        tl.to(targetRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: 'power3.out',
        }, 'demo');
      }

      setTimeline(tl);
    }); // Scope removed: Three.js objects are not valid DOM scopes

    return () => ctx.revert();
  }, [targetRef]);

  return timeline;
}
