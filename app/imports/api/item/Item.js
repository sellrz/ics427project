import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ItemsCollection. It encapsulates state and variable values for item.
 */
class ItemsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ItemsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      quantity: Number,
      price: Number,
      owner: String,
      image: String,
      description: {
        type: String,
        defaultValue: 'Describe your item here',
      },
      category: {
        type: String,
        allowedValues: ['Books', 'Clothing', 'Electronics', 'Household', 'Others'],
      },
      condition: {
        type: String,
        allowedValues: ['Excellent', 'Good', 'Fair', 'Poor'],
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    // List all the items for user
    this.usersPublicationName = `${this.name}.publication.users`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ItemsCollection.
 * @type {ItemsCollection}
 */
export const Items = new ItemsCollection();
