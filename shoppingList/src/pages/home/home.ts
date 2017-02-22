/*
Name: D'Arcey Taylor
Student ID: 200302660
Project: Midterm for COMP3025_W2017
Date: 02/22/2017
this is the back end for the home.html
*/
import { Component } from '@angular/core';

import {
  NavController,
  AlertController,
  ActionSheetController
} from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shoppinglist: FirebaseListObservable<any>;
  Items: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    this.shoppinglist = af.database.list('/shoppinglist');
  }
  /*
    Adds a new item to the database
  */
  addItem() {
    let prompt = this.alertCtrl.create({
      title: 'Add New Item',
      message: "Enter the Item's Info",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name of item'
        },
        {
          name: 'quantity',
          placeholder: 'Amount of item'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.shoppinglist.push({
              name: data.name,
              quantity: data.quantity,
              done: false
            });
          }
        }
      ]
    });
    prompt.present();
  }
  /*
    Removes an item to the database
  */
  removeItem(itemId: string) {
    this.shoppinglist.remove(itemId);
  }
  /*
    Updates the database with any changes made
  */
  updateItem(itemId, itemName, itemQuantity) {
    let prompt = this.alertCtrl.create({
      title: 'List Items Information',
      message: "Update the information for this list",
      inputs: [
        {
          name: 'name',
          placeholder: 'Item name',
          value: itemName
        },
        {
          name: 'quantity',
          placeholder: 'Item amount',
          value: itemQuantity
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.shoppinglist.update(itemId, {
              name: data.name,
              quantity: data.quantity
            });
          }
        }
      ]
    });
    prompt.present();

  }
  detailedShoppingList(ShoppingListId, ShoppingListName, ShoppingListItems) {
    let prompt = this.alertCtrl.create({
      title: 'ShoppingList: <br>' + ShoppingListName,
      subTitle: 'Items: ' + ShoppingListItems,

      buttons: [
        {
          text: 'Okay',
          handler: data => {
            console.log('Okay clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  /*
    Switches the done field in the database to change the display accordingly
  */
  switchComplete(itemId, itemCompletion) {
    if (itemCompletion == true) {
      this.shoppinglist.update(itemId, {
        done: false
      });
    }
    if (itemCompletion == false) {
      this.shoppinglist.update(itemId, {
        done: true
      });
    }
  }
  /*
    Adds 1 to an item quantity in the database
  */
  addQuantity(itemId, itemQuantity) {
    this.shoppinglist.update(itemId, {
      quantity: itemQuantity + 1
    })
  }
  /*
    Subtracts 1 to an item quantity in the database
  */
  subtractQuantity(itemId, itemQuantity) {
    if (itemQuantity <= 1) {
      this.shoppinglist.remove(itemId);
    }
    else {
      this.shoppinglist.update(itemId, {
        quantity: itemQuantity - 1
      })
    }

  }
}
