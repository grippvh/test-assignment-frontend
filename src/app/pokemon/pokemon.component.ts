import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";


export interface Pokemon {
  id : number;
  name: string;
  url: string;
  imgUrl: string;
  types: string[];
  height: number
  // add any other properties that the API response includes
}

@Component({
  selector: 'app-pokemon',
  template: `
    <div style="text-align: center;">
      <h2 > {{ pokemon.name | titlecase}}</h2>
      <img [src]="pokemon.imgUrl" [alt]="pokemon.name + ' picture'" width="150" height="150" />
      <p>Height: {{ pokemon.height }}</p>
    </div>
  `,
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  pokemon: Pokemon = {
    id : NaN,
    name : '',
    url : '',
    imgUrl : "/assets/images/poke.jpeg",
    types: [],
    height: NaN
  };

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apiService.getOne(params['id']).subscribe(result => {
        this.pokemon = result;
        this.pokemon.imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params['id']}.png`;
      });
    });
  }

  viewPokemon(pokemon: any) {
    this.router.navigate([`/pokemon/${pokemon.id}`]);
  }

}
