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

  removeItem(itemId: string) {
    this.shoppinglist.remove(itemId);
  }

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

  addQuantity(itemId, itemQuantity) {
    this.shoppinglist.update(itemId, {
      quantity: itemQuantity + 1
    })
  }
  subtractQuantity(itemId, itemQuantity) {
    if (itemQuantity < 2){
      this.shoppinglist.remove(itemId);
    }
    else{
      this.shoppinglist.update(itemId, {
      quantity: itemQuantity - 1
    })
    }
    
  }
}
