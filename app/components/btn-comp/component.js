import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  
  classNameBindings: ['isPrimary:primary'],
  
  click() {
    this.attrs.action();
  }
});
