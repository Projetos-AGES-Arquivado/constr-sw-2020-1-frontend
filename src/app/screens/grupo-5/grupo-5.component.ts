import { Component } from '@angular/core';
import { CARDS } from './MockedCards'
import { Card } from '../../../Card'

@Component ({
    selector: 'app-grupo-5',
    templateUrl: './grupo-5.component.html',
    styleUrls: ['./grupo-5.component.scss']
})

export class Grupo5Component{

    constructor(){}
    cardList = CARDS

    cardsSelected(event: Card []){
        let res = ""
        event.forEach(item => {
            if (item.selected){
                res += `${item.label}; `
            }
        });
        alert(`Itens selecionados: ${res}`);
    }

    newForm(event){
        alert(`Disparar novo form`)
    }

    deleteItem(event: Card){
        if (confirm(`deletar ${event.label}?`)){
            alert(`item de ID: ${event.uniqueID} deletado`)
        }
        
    }
};