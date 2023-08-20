gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollTrigger.normalizeScroll(true);

if (ScrollTrigger.isTouch !== 1) {
  ScrollSmoother.create({
    smooth: 1.7,
    normalizeScroll: true,
  });
}
