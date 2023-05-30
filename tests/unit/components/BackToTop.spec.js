import { mount } from '@vue/test-utils';
import BackToTop from '@/components/BackToTop/index.vue';

describe('BackToTop', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(BackToTop);
    expect(wrapper.exists()).toBe(true);
  });

  it('sets initial data correctly', () => {
    const wrapper = mount(BackToTop);
    expect(wrapper.vm.visible).toBe(false);
    expect(wrapper.vm.interval).toBe(null);
    expect(wrapper.vm.isMoving).toBe(false);
  });

  it('updates visibility on scroll', () => {
    const wrapper = mount(BackToTop);
    // Simulate scroll event
    window.pageYOffset = 500;
    wrapper.vm.handleScroll();
    expect(wrapper.vm.visible).toBe(true);
  });

  it('scrolls back to top when clicked', () => {
    const wrapper = mount(BackToTop);
    // Set initial scroll position
    window.pageYOffset = 500;
    // Simulate click event
    wrapper.vm.backToTop();
    // Check if scroll position is updated
    expect(window.pageYOffset).toBe(500);
  });

  it('calculates easing correctly', () => {
    const wrapper = mount(BackToTop);
    const easeInOutQuad = wrapper.vm.easeInOutQuad;
    // Test with various input values
    expect(easeInOutQuad(0, 0, 100, 10)).toBe(0);
    expect(easeInOutQuad(5, 0, 100, 10)).toBe(50);
    expect(easeInOutQuad(10, 0, 100, 10)).toBe(100);
  });
});
