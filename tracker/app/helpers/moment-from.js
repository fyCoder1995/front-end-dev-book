import Ember from 'ember';
import { helper } from '@ember/component/helper';

export function momentFrom(params){
  var time = window.moment(...params);
  var formatted = time.fromNow();
  return Ember.String.htmlSafe(
    '<span class="text-primary">'
    + formatted + '</span>'
  );
}

export default helper(momentFrom);
