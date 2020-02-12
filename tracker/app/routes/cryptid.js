import Route from '@ember/routing/route';
// import DS from 'ember-data';

export default Route.extend({
  // name: DS.attr('string'),
  // cryptidType: DS.attr('string'),
  // profileImg: DS.attr('string'),
  // sightings: DS.hasMany('sighting')
  model(params){
    return this.store.findRecord('cryptid', params.cryptid_id);
  }
});
