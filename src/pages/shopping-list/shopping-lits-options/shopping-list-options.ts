import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'page-shopping-options',
    template: `
        <ion-grid text-center>
            <ion-row>
                <ion-col>
                    <h3>Strorage & Load</h3>  
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <button ion-button outline (click)="onAction('load')">Load List</button>  
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <button ion-button outline (click)="onAction('store')">Save List</button>  
                </ion-col>
            </ion-row>
        </ion-grid>
    `
})

export class ShoppingListPopoverPage {

    constructor( private viewCtr: ViewController){

    }
    onAction(action: string){
        this.viewCtr.dismiss({action:action});
    }
}