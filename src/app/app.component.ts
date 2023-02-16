import {Component, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import { Router, ActivatedRoute } from '@angular/router';

class Pokemon {
  id : number = NaN;
  name: string = "";
  url: string = "";
  types: string[] = [];
  height: number = NaN;
  moves: any[] = [];
  abilities: any[] = [];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = "Pokemon API Test";
  pokemons: Pokemon[] = []
  limit = 6;
  page = 1;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 1;
      this.loadPokemons();
    });
  }

  loadPokemons() {
    this.apiService.get((this.page) * this.limit, this.limit).subscribe(
      (result: any) => {
        this.pokemons = result.results.map((pokemon : Pokemon) => {
          let newPokemon = new Pokemon();
          newPokemon.name = pokemon.name;
          newPokemon.url = pokemon.url;
          newPokemon.id = Number(pokemon.url.split("/")[6]);
          newPokemon.height = pokemon.height;

          this.apiService.getOne(newPokemon.id).subscribe(
            (data: any) => {
              newPokemon.moves = data.moves;
              newPokemon.abilities = data.abilities;
            },
            error => {
              console.error(error);
            }
          );

          return newPokemon;
        });
      },
      error => {
        console.error(error);
      }
    );
  }



  goToPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  viewPokemon(pokemon: Pokemon) {

    console.log("POKEMON name: " +  pokemon.name);
    console.log("POKEMON ID: " +  pokemon.id);
    this.router.navigate(['/pokemon', pokemon.id], { queryParams: { page: this.page } });
    //this.apiService.getOne(pokemon.id);

  }

}


