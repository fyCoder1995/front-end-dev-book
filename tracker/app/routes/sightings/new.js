import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { alias } from '@ember/object/computed'

export default Route.extend({
  model(){
    return hash({
      sighting: this.store.createRecord('sighting'),
      cryptids: this.store.findAll('cryptid'),
      witnesses: this.store.findAll('witness')
    });
  },
  sighting: alias('controller.model.sighting'),
  actions:{
    willTransition(){
      var sighting = this.get('controller.model.sighting');
      if(sighting.get('hasDirtyAttributes')){
        sighting.deleteRecord();
      }
    },
    create(){
      var self = this;
      this.get('sighting').save().then(function(){
        self.send('flash', {alertType: "success", message: "New sighting."});
        self.transitionTo('sightings');
      });
    },
    cancel(){
      this.get('sighting').deleteRecord();
      this.transitionToRoute('sightings');
    }
  }
});
