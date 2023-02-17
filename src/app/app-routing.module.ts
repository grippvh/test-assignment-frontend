import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonComponent} from "./pokemon/pokemon.component";
import {AppComponent} from "./app.component";
import {PokemonListComponent} from "./pokemon-list/pokemon-list.component";

const routes: Routes = [
  //{ path: '', component: AppComponent },
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
