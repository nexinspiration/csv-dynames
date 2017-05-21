import Ember from 'ember';

export default Ember.Component.extend({
  default: '',
  
  classNameBindings: ['isEdit:edit-mode'],
  
  init() {
    this._super(...arguments);
    this.set('text', this.get('default'));
  },
  
  click() {
    if (!this.get('isEdit')) {
      this.set('isEdit', true);
      Ember.run.scheduleOnce('afterRender', this, function() {
        $('input').focus();
      });  
    }
  },
  
  actions: {
    disableEdit() {
      this.set('isEdit', false);
    }
  }
});
