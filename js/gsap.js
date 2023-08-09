gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollTrigger.normalizeScroll(true);

ScrollSmoother.create({
  smooth: 1.5,
  normalizeScroll: true,
});
