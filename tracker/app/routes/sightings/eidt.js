import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model(params){
    return hash({
      sighting: this.store.findRecord('sighting' , params.sighting_id),
      cryptids: this.store.findAll('cryptid'),
      witnesses: this.store.findAll('witness')
    });
  }
});
