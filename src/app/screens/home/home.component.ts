import { Component } from '@angular/core';

import {CARDS} from '../../../MockedCards'

@Component ({
    selector: 'app-root',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent{
    constructor(){}
    cardList = CARDS

    someMethod(event){
        console.log(event);
    }

    newForm(event){
        console.log(event);
    }
};