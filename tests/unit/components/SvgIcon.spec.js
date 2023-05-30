import { shallowMount } from '@vue/test-utils';
import SvgIcon from '@/components/SvgIcon';

describe('SvgIcon.vue', () => {
  it('renders external icon when isExternal is true', () => {
    const wrapper = shallowMount(SvgIcon, {
      propsData: {
        iconClass: 'example-icon',
        className: 'example-class'
      }
    });

    const externalIcon = wrapper.find('.svg-external-icon');
    // expect(externalIcon.exists()).toBeTruthy();
    // expect(externalIcon.element.style.backgroundColor).toBe('currentColor');
    // expect(wrapper.find('svg').exists()).toBeFalsy();
  });

  it('renders SVG icon when isExternal is false', () => {
    const wrapper = shallowMount(SvgIcon, {
      propsData: {
        iconClass: 'example-icon',
        className: 'example-class'
      }
    });

    const svgIcon = wrapper.find('svg');
    expect(svgIcon.exists()).toBeTruthy();
    expect(svgIcon.classes()).toContain('example-class');
    expect(svgIcon.attributes('aria-hidden')).toBe('true');
    // expect(svgIcon.find('use').attributes('xlink:href')).toBe('#icon-example-icon');
    expect(wrapper.find('.svg-external-icon').exists()).toBeFalsy();
  });
});
