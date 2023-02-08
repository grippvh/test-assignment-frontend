import {Component, OnInit} from '@angular/core';
import {ApiService} from "./api.service";

class Pokemon {
  name: string = "";
  url: string = "";
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pokedex';
  pokemons: Pokemon[] = []
  currentPage = 0;
  limit = 6;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
      this.getPokemons()
  }

  getPokemons() {
    this.apiService.get(this.currentPage * this.limit, this.limit).subscribe(result => {
      this.pokemons = result.results;
    });
  }

  nextPage() {
    this.currentPage++;
    this.getPokemons();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getPokemons();
    }
  }

}
