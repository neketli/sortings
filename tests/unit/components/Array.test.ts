import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import BarItem from '@/components/Array/BarItem.vue';
import ArrayComponent from '@/components/Array/index.vue';

describe('ComponentArray', () => {
	beforeEach(() => {
	  setActivePinia(createPinia());
	});
  
	it('render correctly with array prop', () => {
	  const wrapper = mount(ArrayComponent, {
		props: {
		  array: [
			{ id: '1', value: 100 },
			{ id: '2', value: 200 },
		  ],
		},
	  });
  
	  expect(wrapper.exists()).toBe(true);
  
	  expect(wrapper.classes()).toContain('array');

	  const barItems = wrapper.findAllComponents(BarItem);
	  expect(barItems).toHaveLength(2);
	});
  
	it('render BarItem with correct props', () => {
	  const wrapper = mount(ArrayComponent, {
		props: {
		  array: [
			{ id: '1', value: 100 },
			{ id: '2', value: 200 },
		  ],
		},
	  });
  
	  const barItems = wrapper.findAllComponents(BarItem);
	  expect(barItems[0].props('height')).toBe(100);
	  expect(barItems[0].props('width')).toBe(50); 
	  expect(barItems[1].props('height')).toBe(200);
	  expect(barItems[1].props('width')).toBe(50);
	});
  
	it('applies default class when no state matches', () => {
	  const wrapper = mount(ArrayComponent, {
		props: {
		  array: [{ id: '1', value: 100 }],
		},
	  });
  
	  const barItem = wrapper.findComponent(BarItem);
	  expect(barItem.classes()).toContain('bg-green-200');
	});
  });