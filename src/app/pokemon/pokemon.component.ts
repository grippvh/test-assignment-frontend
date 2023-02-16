import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";


export interface Pokemon {
  id : number;
  name: string;
  url: string;
  imgUrl: string;
  types: string[];
  height: number,
  //moves: string[];
  abilities: string[];
  // add any other properties that the API response includes
}


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  pokemon: Pokemon = {
    id : NaN,
    name : '',
    url : '',
    imgUrl : "/assets/images/poke.jpeg",
    types: [],
    height: NaN,
    //moves: [],
    abilities: [],
  };

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apiService.getOne(params['id']).subscribe(result => {
        this.pokemon = result;
        this.pokemon.imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params['id']}.png`;
        //this.pokemon.moves = result.moves.map((move : any) => move.move.name);
        this.pokemon.abilities = result.abilities.map((ability: any) => ability.ability.name);
      });
    });
  }

  viewPokemon(pokemon: any) {
    this.router.navigate([`/pokemon/${pokemon.id}`]);
  }

}
