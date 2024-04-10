import { Meteor } from 'meteor/meteor';
import { Items } from '../../api/item/Item.js';
import { Profiles } from '../../api/profile/Profiles';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Items.collection.insert(data);
};

// Initialize the ItemsCollection if empty.

// ProfileCollection
const addProfile = (profile) => {
  console.log(`Adding: ${profile.lastName} (${profile.owner})`);
  Profiles.collection.insert(profile);
};

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.forEach(profile => addProfile(profile));
  }
}
