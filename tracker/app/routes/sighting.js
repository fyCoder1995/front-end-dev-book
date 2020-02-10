import Route from '@ember/routing/route';
import DS from 'ember-data';

export default Route.extend({
  location: DS.attr('string'),
  createdAt: DS.attr('date'),
  sighteAt: DS.attr('date'),
  cryptid: DS.belongsTo('cryptid'),
  witnesses: DS.hasMany('witness')
});
